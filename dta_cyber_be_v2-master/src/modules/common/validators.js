/**
 * Custom API exception to specify there is something wrong
 * with the data or query given to the backend api.
 *
 * Ref: https://futurestud.io/tutorials/node-js-create-your-custom-error
 */
const {apiErrorResponse, isNull, getAttr, isEmpty, pick} = require("./helpers");

class ApiError extends Error {
    constructor(errors) {
        super(errors)
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name
        this.errors = errors
    }
}


/**
 * Middleware which is used to handle the `ApiError` on the app level.
 * This sends the error messages with proper schema to the FE.
 */
const apiErrorMiddleware = (err, req, res, next) => {
    try {
        if (err.name === ApiError.name) {
            apiErrorResponse(res, err.errors)
        } else {
            next(err)
        }
    } catch (e) {
        next(e)
    }
}


/**
 * Base validation class that has to be inherited by other validator classes.
 * The error handling are handled on the middleware using `ApiError`.
 *
 * Custom validation functions use the schema `validate_{fieldName}`.
 */
class BaseApiValidator {

    // fields and other config | for future extensions
    fields = {}

    // pass necessary context
    constructor(req) {
        this.request = req
        this.user = req.user

        // for FE | thrown as errors
        this.errors = {}
    }

    // called from outside with await => throws `this.errors` as an `ApiError`
    async isValid() {

        // filter out only necessary data from request body
        this.data = pick(this.request.body, Object.keys(this.fields))

        await Promise.all((
            Object.keys(this.fields).map(async field => {

                // config
                const fieldConfig = this.fields[field]

                // if value is not passed in request, consider it as null
                field in this.data || (this.data[field] = null)

                // meta for validation layers
                const fieldValue = this.data[field]

                // validation - layer 1 --------------------------------------------------------------------------------
                // check if validations present in fieldConfig are satisfied
                if (
                    getAttr(fieldConfig, 'required', true)
                    && !fieldValue
                ) {
                    this.errors[field] = "This field is required. Please fill this field."
                }

                // validation - layer 2 --------------------------------------------------------------------------------
                // pass to custom validation function defined on the child class
                const functionValidator = getAttr(this, `validate_${field}`)
                if (!isNull(functionValidator) && isNull(this.errors[field])) {
                    try {
                        // raises an exception here
                        const returnedValue = await functionValidator(fieldValue)

                        // for use by other functions when needed (i.e) nested validations
                        if (!isNull(returnedValue)) {
                            this.data[field] = returnedValue
                        }
                    } catch (e) {
                        if (e.name === ApiError.name) {
                            this.errors[field] = e.errors
                        } else {
                            throw e
                        }
                    }
                }

            }))
        )

        if (!isEmpty(this.errors)) {
            throw new ApiError(this.errors)
        }

    }
}


module.exports = {
    ApiError,
    apiErrorMiddleware,
    BaseApiValidator
}

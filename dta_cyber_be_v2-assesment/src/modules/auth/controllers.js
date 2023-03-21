const {apiOkResponse, isNull} = require("../common/helpers");
const {BaseApiValidator, ApiError} = require("../common/validators");
const {User} = require("./models");
const {ldapAuthenticate} = require("./helpers");


// central response
const loginResponse1 = (user) => ({
    token: user.id,
    user_data: user
})


// Login api for the app. Sends token.
const loginController = async (req, res, next, ...rest) => {

    class _Validator extends BaseApiValidator {
        fields = {
            "password": {},
            "username": {},
        }

        async validate_username(value, data) {
            let user = await User.findOne({
                where: {
                    username: value,
                }
            })

            // skip ldap check for users
            if (value === 'admin' && !isNull(user)) {
                return user
            }

            // LDAP Try
            let ldapResponse = await ldapAuthenticate(
                value, data['password']
            )

            // LDAP
            if (ldapResponse['isSuccess'] === false) {
                throw new ApiError("Unable to login with provided credentials.")
            }

            // Handle LDAP Auth
            if (!isNull(ldapResponse) && ldapResponse['isSuccess'] === true && isNull(user)) {
                user = await User.create({
                    username: value,
                    password: null
                })
            }

            // TODO: Login Completion with Daimler Integration
            // TODO: GraphQL + LDAP
            return user
        }
    }

    try {

        const validator = new _Validator(req)
        await validator.isValid()
        const user = validator.data['username']

        apiOkResponse(res, loginResponse1(user))

    } catch (e) {
        next(e)
    }
}


const refreshController = async (req, res, next) => {
    try {
        apiOkResponse(res, loginResponse1(req.user))
    } catch (e) {
        next(e)
    }
}


module.exports = {
    loginController,
    refreshController,
}

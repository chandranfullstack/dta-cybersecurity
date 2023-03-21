const {isNull, apiErrorResponse} = require("../common/helpers");
const {User} = require("./models");


/**
 * Middleware which handles the token authentication for the api layer.
 * Gets the token from the request header and sets user to request.
 */
const tokenAuthMiddleware = async (req, res, next) => {
    try {
        // TODO: Token Auth Flow & Models
        const userToken = req.headers.authorization
        if (!isNull(userToken)) {
            const user = await User.findOne({
                where: {id: userToken}
            })
            if (!isNull(user)) {
                req.user = user
            }
        }
        next()
    } catch (e) {
        next(e)
    }
}


/**
 * Middleware which allows only authenticated users to pass through.
 */
const loginRequiredMiddleware = async (req, res, next) => {
    try {
        if (isNull(req.user)) {
            apiErrorResponse(
                res, {
                    message: "Auth credentials were not provided!",
                },
                401
            )
        }
        next()
    } catch (e) {
        next(e)
    }
}


module.exports = {
    tokenAuthMiddleware,
    loginRequiredMiddleware
}

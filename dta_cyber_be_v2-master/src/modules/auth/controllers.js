const {apiOkResponse, isNull} = require("../common/helpers");
const {BaseApiValidator, ApiError} = require("../common/validators");
const {User} = require("./models");


// central response
const loginResponse1 = (user) => ({
    token: user.id,
    user_data: user
})


// Login api for the app. Sends token.
const loginController = async (req, res, next, ...rest) => {

    class _Validator extends BaseApiValidator {
        fields = {
            "username": {},
            "password": {},
        }

        async validate_username(value) {
            const user = await User.findOne({
                where: {
                    username: value
                }
            })

            if (isNull(user)) {
                throw new ApiError("Unable to login with provided credentials.")
            }

            // TODO: Login Completion with Daimler Integration
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

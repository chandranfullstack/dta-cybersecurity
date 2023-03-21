const {Router} = require("express");
const {loginController, refreshController} = require('./controllers')
const {loginRequiredMiddleware} = require("./middlewares");
const {apiOkResponse} = require("../common/helpers");


const authRouter = Router();


authRouter.route('/auth/login/').post(loginController);
authRouter.route('/auth/refresh/').get(loginRequiredMiddleware, refreshController);
authRouter.route('/auth/logout/').get(
    async (req, res, next) => {
        apiOkResponse(res)
    }
);


module.exports = authRouter

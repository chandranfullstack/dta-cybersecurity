const commonRouter = require('./common/routes')
const authRouter = require("./auth/routes");


// only api related routers => will be hosted with `/api/` prefix
const apiRouters = [
    commonRouter,
    authRouter
]


module.exports = {
    apiRouters
}
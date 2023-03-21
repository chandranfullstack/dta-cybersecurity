const commonRouter = require('./common/routes')
const authRouter = require("./auth/routes");
const assessmentRouter = require("./assessment/routes");
const adminRouter = require("./admin/routes");


// only api related routers => will be hosted with `/api/` prefix
const apiRouters = [
    commonRouter,
    authRouter,
    assessmentRouter,
    adminRouter
]


module.exports = {
    apiRouters
}

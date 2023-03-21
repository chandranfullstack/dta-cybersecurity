const express = require("express");
const {envVariables} = require("./config");
const {apiRouters} = require('./modules/routes')
const appLogger = require('./modules/common/logger')
const {apiErrorMiddleware} = require("./modules/common/validators");
const {serverErrorMiddleware} = require("./modules/common/middlewares");
const {tokenAuthMiddleware} = require("./modules/auth/middlewares");


// app
const app = express()


// inbound related middlewares
app.use(tokenAuthMiddleware)
app.use(express.json())


// routes
apiRouters.map(router => app.use("/api/", router))


// outbound related middlewares
app.use(apiErrorMiddleware)
app.use(serverErrorMiddleware);


app.listen(envVariables.PORT, () => {
    appLogger.logInfo(`ENV: ${envVariables.NODE_ENV}`)
    appLogger.logInfo(`App is running at http://localhost:${envVariables.PORT}`)
});

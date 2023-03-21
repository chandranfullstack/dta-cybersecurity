const express = require("express");
const {envVariables} = require("./config");
const {apiRouters} = require('./modules/routes')
const appLogger = require('./modules/common/logger')
const {apiErrorMiddleware} = require("./modules/common/validators");
const {serverErrorMiddleware} = require("./modules/common/middlewares");
const {tokenAuthMiddleware} = require("./modules/auth/middlewares");
const cors = require("cors");
const {adminBro, adminBroRouter} = require("./modules/admin/config");
const path = require("path");
const fileupload = require("express-fileupload");
// const bodyParser = require('body-parser');


// app
const app = express()
app.set('view engine', 'ejs');
console.log(path.join(__dirname, '/views'))
app.set('views', path.join(__dirname, '/views'));


// inbound related middlewares
app.use(cors({
    origin: '*'
}));
app.use(tokenAuthMiddleware)
app.use(adminBro.options.rootPath, adminBroRouter)
// app.use(express.json())
app.use(fileupload());

// set maximum size to 10MB
app.use(express.json({limit: "50mb", extended: true}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))

// routes
apiRouters.map(router => app.use("/api/", router))


// outbound related middlewares
app.use(apiErrorMiddleware)
app.use(serverErrorMiddleware);


app.listen(envVariables.PORT, () => {
    appLogger.logInfo(`ENV: ${envVariables.NODE_ENV}`)
    appLogger.logInfo(`App is running at http://localhost:${envVariables.PORT}`)
});

const {config} = require("dotenv");
const {Sequelize} = require("sequelize");
const appLogger = require("./modules/common/logger");


// read env
config({path: '.env'});


// environment
const envVariables = {
    PORT,
    NODE_ENV
} = process.env


// database definition
const dbClient = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
    // TODO: Read & Write Replication
    // Ref: https://sequelize.org/docs/v6/other-topics/read-replication/
)
// init & sync
dbClient.authenticate().then(r => {
    appLogger.logInfo("Database Connected!")

    dbClient.sync({
        alter: true,
        // force: false,
    }).then(r => {
        appLogger.logInfo("Migrations Synced!")
    }).catch(e => {
        appLogger.logException("Migrations Sync Failed!", e)
    })
}).catch(e => {
    appLogger.logException("Database Connection Failed!", e)
})


module.exports = {
    envVariables,
    dbClient,
}

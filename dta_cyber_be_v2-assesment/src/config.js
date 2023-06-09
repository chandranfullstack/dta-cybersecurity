const {config} = require("dotenv");
const {Sequelize} = require("sequelize");
const appLogger = require("./modules/common/logger");


// read env
config({path: '.env'});


// environment
const envVariables = {
    PORT,
    NODE_ENV,
    LDAP_URL,
    LDAP_DOMAIN,
} = process.env

//const conString =new Sequelize( "postgres://postgres:Ravi@28022001r@localhost:5432/postgres")
const conString =new Sequelize("postgres://chan:Dp4djcq679AmS6jwcFhnxDnb3tqVhcwY@dpg-cgglmakeoogqfc3940j0-a/postgresdatabase_0rn9",{
//const conString=new Sequelize("postgres://chan:Dp4djcq679AmS6jwcFhnxDnb3tqVhcwY@dpg-cgglmakeoogqfc3940j0-a.oregon-postgres.render.com/postgres",{
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: 'false',
        rejectUnauthorized: false
      }
    }
  })
// database definition
const dbClient = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging:false,
    }
    // TODO: Read & Write Replication
    // Ref: https://sequelize.org/docs/v6/other-topics/read-replication/
)
 //init & sync
 dbClient.authenticate().then(r => {
     appLogger.logInfo("Database Connected!",r)

     dbClient.sync({
         alter: true,
         // force: false,
     }).then(r => {
         appLogger.logInfo("Migrations Synced!",r)
     }).catch(e => {
         appLogger.logException("Migrations Sync Failed!", e)
     })
 }).catch(e => {
     appLogger.logException("Database Connection Failed!", e)
 })


module.exports = {
    envVariables,
    dbClient,
    conString
}

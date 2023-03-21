/**
 * Logger class used across the application.
 */
class AppLogger {

    /**
     * Central log function.
     */
    log(message) {
        console.log(message)
    }

    /**
     * Used to log info and other success messages.
     */
    logInfo(message) {
        this.log(message)
    }

    /**
     * Used to log an unhandled exception. Also stops the app.
     */
    logException(message, exception) {
        this.log(message)
        this.log(exception)

        // let it break
        process.exit()
    }
}


const appLogger = new AppLogger()
module.exports = appLogger
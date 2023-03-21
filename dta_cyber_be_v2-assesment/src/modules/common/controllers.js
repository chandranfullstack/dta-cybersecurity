const {apiOkResponse} = require("./helpers");


/**
 * Server status controller. Just sends the server health/status.
 */
const serverStatusController = async (req, res, ...rest) => apiOkResponse(res)


module.exports = {
    serverStatusController,
}

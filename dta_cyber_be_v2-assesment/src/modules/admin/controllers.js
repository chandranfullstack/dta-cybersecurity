const {apiOkResponse} = require("../common/helpers");

// Sends out the admin level config for the dynamic front-end
const configController = async (req, res, next, ...rest) => {
    try {

        // TODO
        apiOkResponse(res, {
            "navigation_tabs": []
        })

    } catch (e) {
        next(e)
    }
}


module.exports = {
    configController,
}


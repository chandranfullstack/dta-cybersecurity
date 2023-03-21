const {envVariables} = require("../../config");
const appLogger = require("../common/logger");

/**
 * Checks with the DTA ldap server to verify if the provided credentials
 * are valid or not. If the user does not have ldap, skips them.
 */
const ldapAuthenticate = (loginUsername, password) => new Promise(async (resolve) => {

    let ldap = require('ldapjs');
    let ldapClient = ldap.createClient({
        url: envVariables.LDAP_URL,
        timeLimit: 7000,
        reconnect: true
    });

    await ldapClient.on('connect', function () {

        ldapClient.bind(envVariables.LDAP_DOMAIN + "\\" + loginUsername, password, (err, res) => {
            if (err) {
                ldapClient.unbind();
                resolve({
                    "isSuccess": false,
                    "error": err.message,
                    "reason": 'bind_failed',
                    "response": null,
                });
            } else {
                appLogger.logInfo("Bind and connection is established: " + ldapClient.connected)
                resolve({
                    "isSuccess": true,
                    "error": null,
                    "reason": null,
                    // "response": res,
                    "response": null,
                });
            }
        });

    });

    ldapClient.on('timeout', function (err) {
        resolve({
            "isSuccess": false,
            "error": err.message,
            "reason": "timeout",
            "response": null,
        });
    });

    ldapClient.on('error', function (err) {
        resolve({
            "isSuccess": false,
            "error": err.message,
            "reason": "failed_with_error",
            "response": null,
        });
    });
})


module.exports = {
    ldapAuthenticate
}

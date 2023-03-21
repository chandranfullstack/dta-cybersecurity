const {Router} = require("express");
const {serverStatusController} = require('./controllers')


const commonRouter = Router();


commonRouter.route('/server/status/').get(serverStatusController);


module.exports = commonRouter
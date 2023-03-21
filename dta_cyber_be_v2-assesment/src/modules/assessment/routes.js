const {Router} = require("express");
const {
    assessmentListController,
    assessmentStartController,
    assessmentAnswerSaveController,
    assessmentEndController,
    saveAsPDFController,
    saveAsExcelController
} = require('./controllers')
const {loginRequiredMiddleware} = require("../auth/middlewares");


const assessmentRouter = Router();


assessmentRouter.route('/assessment/all/').get(assessmentListController);
assessmentRouter.route('/assessment/:quiz_id/start/').post(loginRequiredMiddleware, assessmentStartController);
assessmentRouter.route('/tracker/:tracker_id/answer/save/').post(loginRequiredMiddleware, assessmentAnswerSaveController);
assessmentRouter.route('/tracker/:tracker_id/end/').post(loginRequiredMiddleware, assessmentEndController);
assessmentRouter.route('/tracker/:tracker_id/pdf/').get(saveAsPDFController);
assessmentRouter.route('/tracker/excel/').get(saveAsExcelController);

module.exports = assessmentRouter

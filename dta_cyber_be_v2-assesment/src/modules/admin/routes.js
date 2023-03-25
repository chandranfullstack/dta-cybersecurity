const {Router} = require("express");
const {configController} = require('./controllers')
const AdminDynamicCRUDFactory = require("./dynamic");
const {Quiz, QuizGroup, QuizQuestion} = require("../assessment/models");
const {Reports}=require("../auth/models")


const API_PREFIX = "/admin"
const adminRouter = Router();


adminRouter.route(`${API_PREFIX}/config/`).get(configController);

// dynamic admin routes
new AdminDynamicCRUDFactory(Quiz).registerRoutes(adminRouter, `${API_PREFIX}/quiz`)
new AdminDynamicCRUDFactory(QuizGroup).registerRoutes(adminRouter, `${API_PREFIX}/quiz-group`)
new AdminDynamicCRUDFactory(QuizQuestion).registerRoutes(adminRouter, `${API_PREFIX}/quiz-question`)


module.exports = adminRouter

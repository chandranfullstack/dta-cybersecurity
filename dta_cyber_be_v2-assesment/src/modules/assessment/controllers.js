const {apiOkResponse, isNull, pick} = require("../common/helpers");
const {Quiz, QuizQuestion, QuizGroup, UserQuizTracker, QuizOption, QuizAnswer} = require("./models");
const {getInstanceOrException, BaseApiValidator} = require("../common/validators");
const {dbClient} = require("../../config");
const {QueryTypes} = require("sequelize");
const {getAssessmentEndDataService} = require("./services");
const { User } = require("../auth/models");
const Excel = require('exceljs');


// list out all the quizzes and user level tracker data
const assessmentListController = async (req, res, next) => {
    try {

        const quizQs = await Quiz.findAll({
            where: {
                status: "active"
            },
            include: {
                model: QuizGroup,
                as: "groups",
                include: {
                    model: QuizQuestion,
                    as: 'questions'
                }
            }
        })

        let trackers = []
        if (!isNull(req.user)) {
            trackers = await UserQuizTracker.findAll({
                where: {
                    user_id: req.user.id,
                },
                order: [
                    ['created_at', 'ASC']
                ]
            })
        }


        const quizData = quizQs.map(quiz => {

            let questionsCount = 0
            let questionsScore = 0
            quiz.groups.forEach(group => {
                group.questions.forEach(_ => {
                    questionsCount += 1
                    questionsScore += _.score
                })
            })

            const latestTracker = trackers.filter(t => t.quiz_id === quiz.id && t.status === 'completed')[0]
            const trackerData = !isNull(latestTracker) ? {
                "completed_at": latestTracker.completed_at,
                "score": latestTracker.score,
                "id": latestTracker.id
            } : null

            return {
                'id': quiz.id,
                "title": quiz.title,
                "title_jp": quiz.title_jp,
                "time_to_complete_in_minutes": quiz.time_to_complete_in_minutes,
                questions_count: questionsCount,
                questions_score: questionsScore,
                tracker_data: trackerData
            }
        })

        apiOkResponse(res, quizData)
    } catch (e) {
        next(e)
    }
}


// view from where the user starts taking the quiz
const assessmentStartController = async (req, res, next) => {
    try {
        // quiz
        const quiz = await getInstanceOrException(Quiz, req.params.quiz_id)

        // quiz groups
        const quiz_groups = await QuizGroup.findAll({
            where: {
                quiz_id: quiz.id
            },
            include: {
                model: QuizQuestion,
                as: 'questions',
            }
        })
        let assessment_groups_data = []
        for (let quiz_group of quiz_groups) {
            let questions_data = []
            for (let question of quiz_group['questions']) {

                const options = await dbClient.query(
                    `
                    SELECT DISTINCT "QuizOptions".id, title, title_jp, sub_title, sub_title_jp
                    FROM "QuizOptions"
                        INNER JOIN "QuestionM2MOptions"
                    ON "QuestionM2MOptions".question_id = ${question.id}
                        AND "QuestionM2MOptions".option_id = "QuizOptions".id;
                    `,
                    {type: QueryTypes.SELECT}
                )

                questions_data.push({
                    id: question.id,
                    title: question.title,
                    title_jp: question.title_jp,
                    sub_title: question.sub_title,
                    sub_title_jp: question.sub_title_jp,
                    type: question.type,
                    score: question.score,
                    single_option_all_questions: options
                })
            }
            assessment_groups_data.push({
                questions_data: questions_data,
                id: quiz_group.id,
                title: quiz_group.title,
                title_jp: quiz_group.title_jp
            })
        }

        const tracker = await UserQuizTracker.create({
            user_id: req.user.id,
            quiz_id: quiz.id
        })

        apiOkResponse(res, {
            tracker: {
                id: tracker.id,
            },
            quiz: {
                'id': quiz.id,
                "title": quiz.title,
                "title_jp": quiz.title_jp,
                "time_to_complete_in_minutes": quiz.time_to_complete_in_minutes,
            },
            assessment_groups_data: assessment_groups_data
        })
    } catch (e) {
        next(e)
    }
}


// controller from where the user saves the answer under a tracker
const assessmentAnswerSaveController = async (req, res, next) => {

    class _Validator extends BaseApiValidator {
        fields = {
            "question_id": {},
            "option_id": {},
        }

        async validate_option_id(value, data) {
            return await getInstanceOrException(QuizOption, value)
        }

        async validate_question_id(value, data) {
            return await getInstanceOrException(QuizQuestion, value)
        }
    }

    try {
        // validations
        const quizTracker = await getInstanceOrException(UserQuizTracker, req.params.tracker_id)
        const validator = new _Validator(req)
        await validator.isValid()

        const option = validator.data['option_id']
        const question = validator.data['question_id']

        await QuizAnswer.destroy({
            where: {
                question_id: question.id,
                user_quiz_tracker_id: quizTracker.id
            }
        })
        const isValidAnswer = question.single_option_valid_option_id === option.id

        await QuizAnswer.create({
            question_id: question.id,
            user_quiz_tracker_id: quizTracker.id,
            single_option_selected_option_id: option.id,
            score: isValidAnswer ? question.score : null
        })

        const selected_option = pick(option, ['id', 'title', 'title_jp', 'sub_title', 'sub_title_jp'])
        if (isValidAnswer) {
            apiOkResponse(res, {
                is_valid: true,
                other_data: {
                    selected_option: selected_option,
                    valid_option: selected_option
                }
            })
        } else {
            apiOkResponse(res, {
                is_valid: false,
                other_data: {
                    selected_option: selected_option,
                    valid_option: pick(await QuizOption.findByPk(question.single_option_valid_option_id), ['id', 'title', 'title_jp', 'sub_title', 'sub_title_jp'])
                }
            })
        }
    } catch (e) {
        next(e)
    }
}


// the api where the user finishes the quiz => send the result as well
// TODO: REFACTOR THIS FUNCTION => Move common to the service layer
const assessmentEndController = async (req, res, next) => {
    try {

        const quizTracker = await getInstanceOrException(UserQuizTracker, req.params.tracker_id)

        const outputData = await getAssessmentEndDataService(quizTracker)

        await quizTracker.update({
            status: "completed",
            completed_at: new Date(),
            score: outputData.your_score
        })

        apiOkResponse(res, outputData)
    } catch (e) {
        next(e)
    }
}

/**
 * This controller sends the trackers output data as a pdf file.
 */
const saveAsPDFController = async (req, res, next) => {
    try {

        const quizTracker = await getInstanceOrException(UserQuizTracker, req.params.tracker_id)

        res.render('assessment/save_as_pdf', {context: await getAssessmentEndDataService(quizTracker)});

    } catch (e) {
        next(e)
    }
}

/**
 * This controller sends the trackers output data as a excel sheet.
 */
const saveAsExcelController = async (req, res, next) => {
    try {     
         const  options = {
                timeZone: 'UTC',
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
        const quizes = await Quiz.findAll()
        const users = await User.findAll()
        let exportData = []

        for (let user of users) {
            // console.log(user, "user")
            for (let quiz of quizes) {
                // console.log(quiz, "quiz")

                const quizTracker = await UserQuizTracker.findOne({
                    where: {
                        quiz_id: quiz.id,
                        user_id: user.id,
                        status: "completed"
                    },
                    order: [
                        ['created_at', 'ASC']
                    ]
                })

                if (!isNull(quizTracker)) {
                    let correctAnswersCount = 0;
                    let wrongAnswersCount = 0;
                    let totalQuestionsCount = 0;

                    const answers = await QuizAnswer.findAll({
                        where: {
                            user_quiz_tracker_id: quizTracker.id
                        }
                    })

                    // console.log("answerss", answers);
                    answers.forEach(a => {
                        if (answers.score > 0) {
                            correctAnswersCount = correctAnswersCount + 1;
                        } else {
                            wrongAnswersCount = wrongAnswersCount + 1;
                        }

                    })
                    totalQuestionsCount = correctAnswersCount + wrongAnswersCount;

                    if(totalQuestionsCount > 0)
                    exportData.push([
                        user.username,
                        user.username,
                        quiz.title,
                        correctAnswersCount,
                        wrongAnswersCount,
                        totalQuestionsCount,
                        quizTracker.created_at.toLocaleString('en-US', options),
                        ]
                        )

                }

            } 


        }

        const workbook = new Excel.Workbook();

        const worksheet = workbook.addWorksheet('My Sheet');

        const columns = [
            {header:"Username", key:"username" },
            {header:"Email ID", key:"emailid" },
            {header:"Quiz Name", key:"quizname" },
            {header:"Right Answers", key:"rightanswer" },
            {header:"Wrong Answers", key:"wronganswer" },
            {header:"Total Questions", key:"totalquestions" },
            {header:"Date & Time stamp", key:"dateandtimestamp"}
        ]

        worksheet.columns=columns;

        
        worksheet.addRows(exportData);
       

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=QuizResults.xlsx');

        workbook.xlsx.write(res)
        .then(()=> {
          res.end();
        }).catch(err=>{
            console.log("An error occured while writing data to excel:", err);
        })


    } catch (e) {
        next(e)
    }
}


module.exports = {
    assessmentListController,
    assessmentStartController,
    assessmentAnswerSaveController,
    assessmentEndController,
    saveAsPDFController,
    saveAsExcelController,
}

// TODO: Refactor entire code base
// TODO: Validators inside the Validator Class Fields

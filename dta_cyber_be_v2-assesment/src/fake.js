const {User} = require("./modules/auth/models");
const {Quiz, QuizGroup, QuizQuestion, QuizOption, UserQuizTracker, QuizAnswer} = require("./modules/assessment/models");
const faker = require("faker");
const appLogger = require("./modules/common/logger");
const {dbClient} = require("./config");


// Helpers
// ---------------------------------------------------------------------------------------------------------------------
const getRandomChoice = (array) => array[Math.floor(Math.random() * array.length)];
const queryInterface = dbClient.getQueryInterface()


// Data To Fake
// ---------------------------------------------------------------------------------------------------------------------
const RANDOM_SCORES = [10, 20, 30]
const FAKE_USERS_COUNT = 10
const FAKE_QUIZ_COUNT = 5
const FAKE_QUIZ_GROUP_COUNT = 30
const FAKE_QUIZ_OPTION_COUNT = 20
const FAKE_QUIZ_QUESTION_COUNT = 100
const FAKE_USER_QUIZ_TRACKER_COUNT = 25
const FAKE_QUIZ_ANSWER_COUNT = 250
const FAKE_QUESTION_M2M_OPTION_COUNT = 350

const commonFakeData = {
    "created_at": new Date(),
    "updated_at": new Date(),
}

const fakeUsersData = () => [...Array(FAKE_USERS_COUNT)].map((_) => ({
    "username": faker.internet.userName(),
    "password": "password",
    ...commonFakeData
}))

const fakeQuizData = () => [...Array(FAKE_QUIZ_COUNT)].map((_) => ({
    "title": faker.hacker.phrase(),
    "time_to_complete_in_minutes": faker.random.number(),
    "status": "active",
    ...commonFakeData
}))

const fakeQuizOptionData = () => [...Array(FAKE_QUIZ_OPTION_COUNT)].map((_) => ({
    "title": faker.hacker.phrase(),
    "sub_title": faker.hacker.phrase(),
    ...commonFakeData
}))

const fakeQuizGroupData = (quizzes) => [...Array(FAKE_QUIZ_GROUP_COUNT)].map((_) => ({
    "title": faker.hacker.phrase(),
    "quiz_id": getRandomChoice(quizzes).id,
    ...commonFakeData
}))

const fakeQuizQuestionData = (options, groups) => [...Array(FAKE_QUIZ_QUESTION_COUNT)].map((_) => ({
    "title": faker.hacker.phrase(),
    "sub_title": faker.hacker.phrase(),
    "type": "single_option",
    "score": getRandomChoice(RANDOM_SCORES),
    "group_id": getRandomChoice(groups).id,
    "single_option_valid_option_id": getRandomChoice(options).id,
    ...commonFakeData
}))

const fakeUserQuizTrackerData = (users, quizzes) => [...Array(FAKE_USER_QUIZ_TRACKER_COUNT)].map((_) => {

    const status = getRandomChoice(['started', 'completed'])
    const isCompleted = status === 'completed'

    return {
        "score": isCompleted ? getRandomChoice(RANDOM_SCORES) : null,
        "status": status,
        "completed_at": isCompleted ? new Date() : null,
        "quiz_id": getRandomChoice(quizzes).id,
        "user_id": getRandomChoice(users).id,
        ...commonFakeData
    }
})

const fakeQuizAnswerData = (questions, trackers, options) => [...Array(FAKE_QUIZ_ANSWER_COUNT)].map((_) => {

    // TODO: properly logic validated data => (i.e) valid option under quiz
    return {
        "question_id": getRandomChoice(questions).id,
        "user_quiz_tracker_id": getRandomChoice(trackers).id,
        "single_option_selected_option_id": getRandomChoice(options).id,
        ...commonFakeData
    }
})

const fakeQuestionM2MOptionData = (questions, options) => [...Array(FAKE_QUESTION_M2M_OPTION_COUNT)].map((_) => {

    // TODO: properly logic validated data => (i.e) valid option under quiz
    return {
        "question_id": getRandomChoice(questions).id,
        "option_id": getRandomChoice(options).id,
        ...commonFakeData
    }
})


// Fake Database
// ---------------------------------------------------------------------------------------------------------------------
User.bulkCreate(fakeUsersData()).then(_ => {
    User.findAll().then(users => {

        Quiz.bulkCreate(fakeQuizData()).then(_ => {
            Quiz.findAll().then(quizzes => {

                QuizGroup.bulkCreate(fakeQuizGroupData(quizzes)).then(_ => {
                    QuizGroup.findAll().then(quiz_groups => {

                        QuizOption.bulkCreate(fakeQuizOptionData()).then(_ => {
                            QuizOption.findAll().then(quiz_options => {

                                QuizQuestion.bulkCreate(fakeQuizQuestionData(quiz_options, quiz_groups)).then(_ => {
                                    QuizQuestion.findAll().then(quiz_questions => {

                                        UserQuizTracker.bulkCreate(fakeUserQuizTrackerData(users, quizzes)).then(_ => {
                                            UserQuizTracker.findAll().then(user_quiz_trackers => {

                                                QuizAnswer.bulkCreate(fakeQuizAnswerData(quiz_questions, user_quiz_trackers, quiz_options)).then(_ => {
                                                    QuizAnswer.findAll().then(quiz_answers => {

                                                        queryInterface.bulkInsert('QuestionM2MOptions', fakeQuestionM2MOptionData(quiz_questions, quiz_options)).then(_ => {

                                                            appLogger.logInfo("Faked Database Successfully!")
                                                            process.exit()

                                                        })

                                                    })
                                                })

                                            })
                                        })

                                    })
                                })

                            })
                        })

                    })
                })

            })
        })

    })
})

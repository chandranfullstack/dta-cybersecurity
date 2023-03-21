const {UserQuizTracker, QuizAnswer, QuizGroup, QuizQuestion, QuizOption} = require("./models");
const {isNull} = require("../common/helpers");
/**
 * Sends out data for the end assessment screen. Also, this
 * data is used for the PDF expert screen.
 */
const getAssessmentEndDataService = async (quizTracker) => {
    let score = 0;
    (await QuizAnswer.findAll({
        where: {
            user_quiz_tracker_id: quizTracker.id
        }
    })).forEach(answer => {
        score += answer.score
    })

    const questionGroups = await QuizGroup.findAll({
        where: {
            quiz_id: quizTracker.quiz_id,
        },
        include: {
            model: QuizQuestion,
            as: 'questions',
            include: {
                model: QuizOption,
                as: 'single_option_valid_option'
            }
        }
    })

    const updatedAnswers = await QuizAnswer.findAll({
        where: {
            user_quiz_tracker_id: quizTracker.id
        },
        include: {
            model: QuizOption,
            as: 'single_option_selected_option'
        }
    })

    let questionsScore = 0
    const pdfReportData = []
    questionGroups.forEach(group => {
        group.questions.forEach(question => {

            questionsScore += question.score
            const givenAnswer = updatedAnswers.filter(a => a.question_id === question.id)[0]
            pdfReportData.push({
                question: {
                    id: question.id,
                    title: question.title,
                    title_jp: question.title_jp,
                    sub_title: question.sub_title,
                    sub_title_jp: question.sub_title_jp,
                    type: question.type,
                    score: question.score,
                    valid_option: {
                        id: question.single_option_valid_option.id,
                        title: question.single_option_valid_option.title,
                        title_jp: question.single_option_valid_option.title_jp,
                        sub_title: question.single_option_valid_option.sub_title,
                        sub_title_jp: question.single_option_valid_option.sub_title_jp,
                    }
                },
                answer: !isNull(givenAnswer) ? {
                    id: givenAnswer.id,
                    is_valid: givenAnswer.score > 0,
                    given_option: {
                        id: givenAnswer.single_option_selected_option.id,
                        title: question.single_option_valid_option.title,
                        title_jp: question.single_option_valid_option.title_jp,
                        sub_title: question.single_option_valid_option.sub_title,
                        sub_title_jp: question.single_option_valid_option.sub_title_jp,
                    },
                } : null,
            })

        })
    })

    return {
        id: quizTracker.id,
        your_score: score,
        questions_score: questionsScore,
        pdf_report_data: pdfReportData
    }

}


module.exports = {
    getAssessmentEndDataService,
}

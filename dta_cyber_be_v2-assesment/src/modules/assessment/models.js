const {BaseModel, defaultAttributes, defaultOptions} = require("../common/models");
const {DataTypes, Deferrable} = require("sequelize");
const {User} = require("../auth/models");
const {dbClient} = require("../../config");


/**
 * Main model to hold the quiz details. The user level quiz data
 * are stored on a tracker model along with the score.
 */
class Quiz extends BaseModel {
}

Quiz.init(
    {
        ...defaultAttributes,
        title: DataTypes.STRING,
        title_jp: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },

        time_to_complete_in_minutes: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1
            }
        },
        status: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['active', 'inactive']],
            },
            defaultValue: "inactive"
        }
    },
    defaultOptions
)


/**
 * Just for categorization of the `QuizQuestion` under a `Quiz`.
 */
class QuizGroup extends BaseModel {
}

QuizGroup.init(
    {
        ...defaultAttributes,
        title: DataTypes.STRING,
        title_jp: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
    },
    defaultOptions
)


/**
 * Holds the question and other details under a `QuizGroup`. For a particular
 * given `Quiz`. Based on the type of question, the columns will be filled.
 *
 * (I.E) Config based data validation and data filling.
 */
class QuizQuestion extends BaseModel {
}

QuizQuestion.init(
    {
        ...defaultAttributes,

        title: DataTypes.TEXT,
        title_jp: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },

        sub_title: DataTypes.TEXT,
        sub_title_jp: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },

        // type of the question defined
        type: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['single_option']],
            },
            defaultValue: "single_option"
        },

        // valuation of the question
        score: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1
            }
        },
        ref_image: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        },
        correct_image: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        },
        wrong_image: {
            type: DataTypes.TEXT, 
            allowNull: true,
            defaultValue: null,
        },

        // TODO: why we ask this alert?

    },
    defaultOptions
)


/**
 * Options that are used for `QuizQuestion`. These can be used
 * for other purposes also inside the `assessment` module.
 */
class QuizOption extends BaseModel {
}

QuizOption.init(
    {
        ...defaultAttributes,
        title: DataTypes.STRING,
        title_jp: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },

        sub_title: DataTypes.STRING,
        sub_title_jp: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        // TODO: info button?
    },
    defaultOptions
)


/**
 * Contains `Quiz` and `User` level tracker data. This is
 * basically the attempt based data for the user.
 */
class UserQuizTracker extends BaseModel {
}

UserQuizTracker.init(
    {
        ...defaultAttributes,

        score: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },

        status: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['started', 'completed']],
            },
            defaultValue: "started"
        },
        completed_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
    },
    defaultOptions
)


/**
 * Holds the answer that the `User` had given for a `QuizQuestion`
 * on any one of the `UserQuizTracker` attempt.
 */
class QuizAnswer extends BaseModel {
}

QuizAnswer.init(
    {
        ...defaultAttributes,
        // linkages are defined below

        score: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
    },
    defaultOptions
)


// Relation Definitions
// ---------------------------------------------------------------------------------------------------------------------
QuizGroup.belongsTo(Quiz, {
    foreignKey: {
        name: 'quiz_id',
        allowNull: false
    },
    onDelete: "CASCADE",
    as: "quiz"
});
Quiz.hasMany(QuizGroup, {
    foreignKey: "quiz_id",
    as: "groups"
})
// --------------------------------------------------------

QuizQuestion.belongsTo(QuizGroup, {
    foreignKey: {
        name: "group_id",
        allowNull: false
    },
    onDelete: "CASCADE",
    as: "group"
})
QuizGroup.hasMany(QuizQuestion, {
    foreignKey: "group_id",
    as: "questions"
})
// --------------------------------------------------------

QuizQuestion.belongsTo(QuizOption, {
    foreignKey: {
        name: "single_option_valid_option_id",
        allowNull: false
    },
    onDelete: "RESTRICT",
    as: "single_option_valid_option"
})
QuizOption.hasMany(QuizQuestion, {
    foreignKey: "single_option_valid_option_id",
    as: "single_option_valid_option_questions"
})
// --------------------------------------------------------

/**
 * This is the in-between model created for M2M linkages.
 */
class QuestionM2MOption extends BaseModel {
}

QuestionM2MOption.init(
    defaultAttributes,
    defaultOptions
)
// TODO: REMEMBER:
//      1. One `QuizQuestion` can have many `QuizOption`.
//      2. One `QuizOption` can have many `QuizQuestion`.
QuestionM2MOption.belongsTo(QuizQuestion, {
    foreignKey: {
        name: "question_id",
        allowNull: false
    },
    onDelete: "RESTRICT",
    as: "question"
})
QuizQuestion.hasMany(QuestionM2MOption, {
    foreignKey: "question_id",
    as: "option_m2m_links"
})
QuestionM2MOption.belongsTo(QuizOption, {
    foreignKey: {
        name: "option_id",
        allowNull: false
    },
    onDelete: "RESTRICT",
    as: "options"
})
QuizOption.hasMany(QuestionM2MOption, {
    foreignKey: "option_id",
    as: "question_m2m_links"
})
// TODO: REMEMBER: The below code does not work with AdminBro
// TODO: REMEMBER: This is just a work around for admin panel
// QuizQuestion.belongsToMany(QuizOption, {
//     through: QuestionM2MOption,
//     foreignKey: "question_id",
//     as: "single_option_all_options"
// })
// QuizOption.belongsToMany(QuizQuestion, {
//     through: QuestionM2MOption,
//     foreignKey: "option_id",
//     as: "single_option_all_questions"
// })
// --------------------------------------------------------

UserQuizTracker.belongsTo(Quiz, {
    foreignKey: {
        name: 'quiz_id',
        allowNull: false
    },
    onDelete: "CASCADE",
    as: "quiz"
})
Quiz.hasMany(UserQuizTracker, {
    foreignKey: "quiz_id",
    as: "user_quiz_trackers"
})
// --------------------------------------------------------

UserQuizTracker.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    onDelete: "CASCADE",
    as: "user"
})
User.hasMany(UserQuizTracker, {
    foreignKey: "user_id",
    as: "user_quiz_trackers"
})
// --------------------------------------------------------

QuizAnswer.belongsTo(QuizQuestion, {
    foreignKey: {
        name: "question_id",
        allowNull: false
    },
    onDelete: "CASCADE",
    as: "question"
})
QuizQuestion.hasMany(QuizAnswer, {
    foreignKey: "question_id",
    as: "answers"
})
// --------------------------------------------------------

QuizAnswer.belongsTo(UserQuizTracker, {
    foreignKey: {
        name: "user_quiz_tracker_id",
        allowNull: false
    },
    onDelete: "CASCADE",
    as: "user_quiz_tracker"
})
UserQuizTracker.hasMany(QuizAnswer, {
    foreignKey: "user_quiz_tracker_id",
    as: "answers"
})
// --------------------------------------------------------

QuizAnswer.belongsTo(QuizOption, {
    foreignKey: {
        name: "single_option_selected_option_id",
        allowNull: false
    },
    onDelete: "CASCADE",
    as: "single_option_selected_option"
})
QuizOption.hasMany(QuizAnswer, {
    foreignKey: "single_option_selected_option_id",
    as: "answers"
})


module.exports = {
    Quiz,
    QuizGroup,
    QuizQuestion,
    QuizOption,
    // trackers
    UserQuizTracker,
    QuizAnswer,
    QuestionM2MOption
}

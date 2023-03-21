const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('admin-bro-sequelizejs');
const {User} = require("../auth/models");
const {Quiz, QuizGroup, QuizQuestion, QuizOption, QuestionM2MOption} = require("../assessment/models");


AdminBro.registerAdapter(AdminBroSequelize);
const adminBro = new AdminBro({
    databases: [],
    resources: [
        {
            resource: User,
            options: {
                parent: {
                    icon: 'User'
                },
            },
        },
        {
            resource: Quiz,
            options: {
                parent: {
                    icon: 'ExamMode'
                },
            },
        },
        {
            resource: QuizGroup,
            options: {
                parent: {
                    icon: 'TagGroup'
                },
            },
        },
        {
            resource: QuizQuestion,
            options: {
                parent: {
                    icon: 'Help'
                },
            },
        },
        {
            resource: QuizOption,
            options: {
                parent: {
                    icon: 'Choices'
                },
            },
        },
        {
            resource: QuestionM2MOption,
            options: {
                parent: {
                    icon: 'TextLink',
                },
            },
        },
    ],
    branding: {
        companyName: 'DTA Cyber',
        softwareBrothers: false,
        // TODO: icons & images
        favicon: "https://asia.daimlertruck.com/assets/images/daimler-logo-new.jpg",
        logo: "https://asia.daimlertruck.com/assets/images/daimler-logo-new.jpg",
    },
    rootPath: '/admin',
})


const adminBroRouter = AdminBroExpress.buildRouter(adminBro)


module.exports = {
    adminBroRouter,
    adminBro
}


// REFERENCES:
//  1. https://javascript.plainenglish.io/getting-started-with-adminbro-node-admin-panel-with-react-8552e281b55d

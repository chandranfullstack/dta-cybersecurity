const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('admin-bro-sequelizejs');
const {User} = require("../auth/models");
const { exportToExcel ,down} = require('./customfun')
const {Quiz, QuizGroup, QuizQuestion, QuizOption, QuestionM2MOption,Report} = require("../assessment/models");
const { response } = require('express');
const { request } = require('http');
const XLSX = require('xlsx');
const fs = require('fs');




AdminBro.registerAdapter(AdminBroSequelize);
const getFun=()=>{
    console.log("called")
    alert("callled")
}
  // Add the button to the resource's actions list
  
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
        {
            resource:Report,
             options: {
                 parent: {
                     icon: 'TextLink',
                 },
                 actions: {
                    ReportGenerate: {
                        newAction: {
                          actionType: 'Report',
                          icon: 'New',
                          isVisible: true,
                          handle:()=>console.log("worked the handle function"),
                        fun:  onclick=()=>{console.log("worked")}
                        }
                      },
                    show: {
                        icon: 'View',
                        isVisible: (context) => context.record.param('Username') === 'Username',
                    },
                    edit: {
                        icon: 'edit',
                        isVisible: (context) => context.record.param('Username') === 'Username',
                    },
                    delete: {
                        icon: 'delete',
                        isVisible: (context) => context.record.param('Username') === 'Username',
                    },
                    new: {
                        icon: 'new',
                        isVisible: (context) => false,
                    },
                    list:{
                        icon:'list',
                        isVisible:(context)=>true
                    },
                    search:{
                        icon:'search',
                        isVisible:(context)=>false
                    },
                   

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

const express = require("express");
const {envVariables} = require("./config");
const {apiRouters} = require('./modules/routes')
const appLogger = require('./modules/common/logger')
const {apiErrorMiddleware} = require("./modules/common/validators");
const {serverErrorMiddleware} = require("./modules/common/middlewares");
const {tokenAuthMiddleware} = require("./modules/auth/middlewares");
const cors = require("cors");
const {adminBro, adminBroRouter} = require("./modules/admin/config");
const path = require("path");
const fileupload = require("express-fileupload");
const adminRouter=require("./modules/admin/routes")
const XLSX = require('xlsx');
const fs = require('fs');

// const bodyParser = require('body-parser');


// app
const app = express()
app.set('view engine', 'ejs');
console.log(path.join(__dirname, '/views'))
app.set('views', path.join(__dirname, '/views'));


// inbound related middlewares
app.use(cors({
    origin: '*'
}));
app.use(tokenAuthMiddleware)
app.use(adminBro.options.rootPath, adminBroRouter)
// app.use(express.json())
app.use(fileupload());

// set maximum size to 10MB
app.use(express.json({limit: "50mb", extended: true}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))

// routes
apiRouters.map(router => app.use("/api/", router))
app.use("/admin",adminRouter)
app.get("/",(req,res)=>{
     app.use(adminRouter)
})
app.get("admin/resources/Reports/actions/ReportGenerate",async(req,res)=>{
        const data = [
            ['Name', 'Age', 'Country'],
            ['Alice', 28, 'USA'],
            ['Bob', 35, 'Canada'],
            ['Charlie', 42, 'UK'],
          ];
          console.log(data)
          // Create a new workbook
          const workbook = XLSX.utils.book_new();
          console.log(workbook)
          // Add a new worksheet with the data
          const worksheet = XLSX.utils.aoa_to_sheet(data);
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
          
          // Write the workbook to a file
          const filename = 'data.xlsx';
          XLSX.writeFile(workbook, filename);
          
          // Download the file in the browser
          const fileContents = fs.readFileSync(filename);
           const responseHeaders = {
             'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
             'Content-Disposition': `attachment; filename="${filename}"`,
           };
           res.writeHead(200, responseHeaders);
           res.end(fileContents);
        console.log(fileContents,"file contents")
    }
)

// outbound related middlewares
app.use(apiErrorMiddleware)
app.use(serverErrorMiddleware);


app.listen(envVariables.PORT, () => {
    appLogger.logInfo(`ENV: ${envVariables.NODE_ENV}`)
    appLogger.logInfo(`App is running at http://localhost:${envVariables.PORT}`)
});

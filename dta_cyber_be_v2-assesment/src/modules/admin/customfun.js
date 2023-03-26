const exceljs = require('exceljs');
const XLSX = require('xlsx');
const fs = require('fs');


const exportToExcel = async(req,res) => {
    console.log("called")
    const data = [
                     ['Name', 'Age', 'Country'],
                     ['Alice', 28, 'USA'],
                     ['Bob', 35, 'Canada'],
                     ['Charlie', 42, 'UK'],
                   ];
                   const workbook = XLSX.utils.book_new();
                   console.log(workbook)
                   const worksheet = XLSX.utils.aoa_to_sheet(data);
                   XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
            
                   const filename = 'data.xlsx';
                   XLSX.writeFile(workbook, filename);
            
                   const fileContents = fs.readFileSync(filename);
                    const responseHeaders = {
                      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                      'Content-Disposition': `attachment; filename="${filename}"`,
                    };
                  //  response.writeHead(200, responseHeaders);
                  //  response.end(fileContents);
             }

const down =(response)=>{
console.log("called",response)
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
       response.writeHead(200, responseHeaders);
       response.end(fileContents);
    console.log(fileContents,"file contents")
}

module.exports = {
  exportToExcel,down
};

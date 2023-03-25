const exceljs = require('exceljs');
const XLSX = require('xlsx');
const fs = require('fs');


const exportToExcel = async(request, response, context) => {
    console.log("called",)
  const { resource, records } = context;
console.log(records,resource)
  const workbook = new exceljs.Workbook();
  const sheet = workbook.addWorksheet(resource.name);

  // Define the columns for the Excel sheet
  const columns = resource.decorate().listProperties();

  sheet.columns = columns.map((column) => ({
    header: column.label(),
    key: column.name(),
    width: column.type() === 'richtext' ? 50 : 20,
  }));

  // Add the data rows to the Excel sheet
  records.forEach((record) => {
    const row = {};

    columns.forEach((column) => {
      row[column.name()] = record.params[column.name()];
    });

    sheet.addRow(row);
  });

  // Set the response headers to trigger the file download
  response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  response.setHeader('Content-Disposition', `attachment; filename="${resource.name}.xlsx"`);

  // Write the Excel file to the response stream
  await workbook.xlsx.write(response);

  // End the response
  response.end();
};

const down =(response)=>{

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

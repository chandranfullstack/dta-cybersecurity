//const exceljs = require('exceljs');

const exportToExcel = async (request, response, context) => {
    console.log("called")
  const { resource, records } = context;

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

module.exports = {
  exportToExcel,
};

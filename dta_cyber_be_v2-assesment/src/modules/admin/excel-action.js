const AdminBro = require('admin-bro');
const { Router } = require('express');
const ExcelJS = require('exceljs');

const router = Router();

const createExcelAction = (resource) => {
  return {
    name: 'downloadExcel',
    actionType: 'record',
    isVisible: true,
    icon: 'fas fa-file-excel',
    label: 'Download Excel',
    handler: async (request, response, data) => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Data');

      // Add columns to the worksheet
      resource.getProperties().forEach(property => {
        worksheet.addRow([property.label()]);
      });

      // Add rows to the worksheet
      data.records.forEach(record => {
        const row = [];
        resource.getProperties().forEach(property => {
          row.push(record.params[property.name()]);
        });
        worksheet.addRow(row);
      });

      // Set response headers to download the file
      response.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
      response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

      // Write the workbook to the response
      await workbook.xlsx.write(response);
    }
  };
};

module.exports={createExcelAction}
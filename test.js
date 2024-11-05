const ExcelJS = require('exceljs');

const workbook = new ExcelJS.Workbook();
workbook.addWorksheet('My Sheet', {
  properties: {
    defaultRowHeight: '40'
  }
});
workbook.xlsx.writeFile('test.xlsx');

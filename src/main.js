const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

function getFileName(dictName) {
  const currentDir = path.resolve(__dirname, '..');
  return path.join(currentDir, dictName);
}

function getColumns(columns) {
  return columns.map(column => {
    return {
      header: column["标题"],
      key: column["数据标识"],
      width: column["宽度"],
    }
  });
}

module.exports = class Main {
  filePath;
  columns;
  constructor() { }
  loadConfig(config) {
    this.filePath = getFileName(config["文件名称"]);
    this.columns = getColumns(config["列信息"]);
    console.log('this.columns', this.columns)
  }
  run() {
    function transToString(trans) {
      return trans.map(item => {
        const pos = item.pos ? `[${item.pos}].` : '';
        return `${pos}${item.tranCn}`
      }).join('; ')
    }

    function handleWord(line) {
      if (!line) return '';
      const result = JSON.parse(line);
      const {
        wordHead,
        content
      } = result.content.word;
      const {
        usphone,
        trans
      } = content;
      return {
        wordHead,
        usphone,
        trans: transToString(trans)
      };
    }

    // 使用 fs.readFile 方法读取文件
    fs.readFile(this.filePath, 'utf8', (err, data) => {
      if (err) {
        // 如果读取文件时发生错误，打印错误信息
        console.error('Error reading file:', err);
        return;
      }
      // 如果读取成功，打印文件内容
      const lines = data.split('\n').filter(line => line).map(line => handleWord(line));
      generateExcel(lines, this.columns);
    });

    function generateExcel(records, columns) {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Me';
      workbook.lastModifiedBy = 'Her';
      workbook.created = new Date();
      workbook.modified = new Date();
      workbook.lastPrinted = new Date();

      const sheet = workbook.addWorksheet('My Sheet');

      sheet.columns = columns;
      records.forEach(record => sheet.addRow(record));
      workbook.xlsx.writeFile('词汇表.xlsx');
    }
  }
}

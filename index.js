// 配置信息 start
const CONFIG = {
  "文件名称": "PEPXiaoXue5_2.json",
}
// 配置信息 end

const dictName = CONFIG["文件名称"];
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

// 指定要读取的文件路径
const filePath = path.join(__dirname, dictName); // 假设文件在当前目录下，名为 example.txt

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
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    // 如果读取文件时发生错误，打印错误信息
    console.error('Error reading file:', err);
    return;
  }
  // 如果读取成功，打印文件内容
  const lines = data.split('\n').filter(line => line).map(line => handleWord(line));
  generateExcel(lines);
});

function generateExcel(records) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Me';
  workbook.lastModifiedBy = 'Her';
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();

  const sheet = workbook.addWorksheet('My Sheet');

  sheet.columns = [{
    header: '单词',
    key: 'wordHead',
    width: 32
  }, {
    header: '音标',
    key: 'usphone',
    width: 32
  }, {
    header: '翻译',
    key: 'trans',
    width: 32
  }];
  records.forEach(record => sheet.addRow(record));
  workbook.xlsx.writeFile('词汇表.xlsx');
}

const Main = require('./src/main.js');

// 配置信息 start
const CONFIG = {
  "文件名称": "PEPXiaoXue5_2.json",
  "列信息": [
    {
      "标题": "单词",
      "数据标识": "wordHead",
      "宽度": 32,
    },
    {
      "标题": "音标",
      "数据标识": "usphone",
      "宽度": 20,
    },
    {
      "标题": "翻译",
      "数据标识": "trans",
      "宽度": 20
    }
  ]
}
// 配置信息 end

const app = new Main();
app.loadConfig(CONFIG);
app.run();

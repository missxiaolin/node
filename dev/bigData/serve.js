// server.js

const http = require("http");
const port = 9000;

http
  .createServer(function (req, res) {
    // 开启Cors
    res.writeHead(200, {
      //设置允许跨域的域名，也可设置*允许所有域名
      "Access-Control-Allow-Origin": "*",
      //跨域允许的请求方法，也可设置*允许所有方法
      "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
      //允许的header类型
      "Access-Control-Allow-Headers": "Content-Type",
    });
    let list = [];
    let num = 0;
    // 生成10万条数据的list
    for (let i = 0; i < 100000; i++) {
      num++;
      list.push({
        src: "https://sf6-cdn-tos.bdxiguastatic.com/img/user-avatar/e8a0c923b1cf28db8bd063bca1cdf463~300x300.image",
        text: `大伟聊前端${num}`,
        tid: num,
      });
    }
    res.end(JSON.stringify(list));
  })
  .listen(port, function () {
    console.log("server is listening on port " + port);
  });

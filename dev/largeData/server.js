const http = require("http");
const port = 9000;

http
  .createServer(function (req, res) {
    // 开启cors
    res.writeHead(200, {
      //设置允许跨域的域名，也可设置*允许所有域名
      "Access-Control-Allow-Origin": "*",
      //跨域允许的请求方法，也可设置*允许所有方法
      "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
      //允许的header类型
      "Access-Control-Allow-Headers": "Content-Type;charset=utf-8",
      "Content-Type": "text/plain;charset=utf-8",
    });
    let list = [];
    let count = 0;

    // 生成10万条数据的list
    for (let i = 0; i < 100000; i++) {
      count++;
      list.push({
        imgUrl:
          "https://p9-pc-sign.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_e7e88568ac2dcb215ec5fca0114ef2f8.jpeg?x-expires=1656727200&x-signature=Q4IxAmvo9gKsZ94p6LCEuRa2BzE%3D&from=2480802190",
        name: `前端${count}`,
        id: count,
      });
    }
    res.end(JSON.stringify(list));
  })
  .listen(port, function () {
    console.log("server is listening on port " + port);
  });

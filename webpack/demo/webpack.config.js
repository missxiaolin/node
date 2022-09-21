module.exports = {
  entry: "./src/index.js",
  output: {
    //打包输出的目标文件的绝对路径(其中__dirname为当前目录的绝对路径)
    path: __dirname + "/dist",
    //打包输出的js文件名及相对于dist目录所在路径
    filename: "index.js",
  },
};

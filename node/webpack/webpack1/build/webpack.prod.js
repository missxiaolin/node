const { CleanWebpackPlugin } = require("clean-webpack-plugin");
 
module.exports = {
    mode:'production',
    plugins:[
        new CleanWebpackPlugin(), // 清除重新导入dist文件
    ]
}
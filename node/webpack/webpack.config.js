const path = require('path')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'), // 入口
    output: { // 打包目录配置
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}
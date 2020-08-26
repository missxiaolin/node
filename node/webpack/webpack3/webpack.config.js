const path = require('path')

module.exports = {
    mode: 'development',
    devtool: 'nooe',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: []
    },
    plugins: []
}
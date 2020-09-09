let webpack = require('webpack')
let webpackOptions = require('./webpack.config.js')

const compiler = webpack(webpackOptions)

compiler.run((err, stat) => {
    console.log(stat)
})

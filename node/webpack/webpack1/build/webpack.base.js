const dev = require("./webpack.dev");
const prod = require("./webpack.prod");
const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = (env) => { // env 环境变量
    // env 是环境变量
    let isDev = env.development;
    const base = {
        entry: path.resolve(__dirname, "../src/index.js"),
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "../dist")
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "../public/index.html"),
                filename: "index.html",
                minify: !isDev && {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true
                }
            })
        ]
    }

    // 函数要返回配置文件，没返回会采用默认配置
    if (isDev) {
        return merge(base, dev); // 循环后面的配置 定义到前面去
    } else {
        return merge(base, prod);
    }
}
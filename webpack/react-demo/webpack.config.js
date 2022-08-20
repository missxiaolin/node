const eslintWebpackPlugin = require('eslint-webpack-plugin')
const path = require('path')

module.exports = {
  mode: "production",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  plugins: [
    new eslintWebpackPlugin({
      extensions: ['.js', '.jsx', '.ts']
    })
  ],
  module: {
    rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env"],
                ["@babel/preset-react", {runtime: 'classic'}],
                ['@babel/preset-typescript']
              ],
            },
          },
        },
        {
          test: /\.s[ca]ss$/,
          use: [
            // 将 JS 字符串生成为 style 节点
            'style-loader',
            // 将 CSS 转化成 CommonJS 模块
            'css-loader',
            // 将 Sass 编译成 CSS
            'sass-loader',
          ]
        }
      ],
  }
};

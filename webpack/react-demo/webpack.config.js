const eslintWebpackPlugin = require('eslint-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = 'production'

module.exports = {
  mode: mode,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  plugins: [
    new eslintWebpackPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    mode === 'production' && new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }), new HtmlWebpackPlugin()

  ].filter(Boolean),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js'
  },
  optimization: {
    runtimeChunk: 'single' // 只要不修改入口文件用户就不需要再次下载，节省用户带宽
  },
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
        // {
        //   test: /\.less$/i,
        //   loader: [
        //     // compiles Less to CSS
        //     'style-loader',
        //     'css-loader',
        //     'less-loader',
        //   ],
        // },
        {
          test: /\.s[ca]ss$/,
          use: [
            mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            // 将 JS 字符串生成为 style 节点
            // 'style-loader',
            // MiniCssExtractPlugin.loader,
            // 将 CSS 转化成 CommonJS 模块
            // 'css-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  mode: "icss",
                },
              }
            },
            // 将 Sass 编译成 CSS
            {
              loader: 'sass-loader',
              options: {
                additionalData: `
                  @import "src/css/sass-var.scss";
                `,
                sassOptions: {
                  includaPaths: [__dirname]
                }
              }
            },
          ]
        }
      ],
  }
};

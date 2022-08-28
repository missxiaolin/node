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
    moduleIds: 'deterministic',
    runtimeChunk: 'single', // 只要不修改入口文件用户就不需要再次下载，节省用户带宽
    splitChunks: {
      cacheGroups: {
        vendor: {
          minSize: 0, // 如果不写0 由于react 文件尺寸太小 会直接跳过
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor', // 文件名
          chunks: 'all', // all 表示同步加载和异步加载，async 表示异步加载 initial 表示同步加载
          // 第三行的整体意思就是把两种加载方式的来自node_modules 目录的文件打包为vandor.xx.js
          // 其中vendors 是第三方的意思
        }
      }
    }
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

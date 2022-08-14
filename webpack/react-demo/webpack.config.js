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
      ],
  }
};

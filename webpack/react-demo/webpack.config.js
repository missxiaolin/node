const eslintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: "production",
  plugins: [
    new eslintWebpackPlugin({
      extensions: ['.js', '.jsx']
    })
  ],
  module: {
    rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env"],
                ["@babel/preset-react", {runtime: 'classic'}]
              ],
            },
          },
        },
      ],
  }
};

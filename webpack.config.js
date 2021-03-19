const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/javascript/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./javascript/main.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./stylesheets/[name].css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.html",
      inject: "body",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          { loader: MiniCssExtractPlugin.loader, },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
}

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
      template: "./src/templates/index.pug",
      filename: "index.html",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/access.pug",
      filename: "access.html",
      inject: "body",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      { //--- Styles
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, },
          { loader: "css-loader", },
        ],
      },
      { //--- Images
        test: /\.(png|jpg)$/,
        type: "asset/resource",
        generator: {
          filename: "./images/[name][ext]",
        },
      },
      { //---HTML
        test: /\.pug$/,
        use: [
          { loader: "html-loader", },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
            }
          },
        ]
      },
    ],
  },
}

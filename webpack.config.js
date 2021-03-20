const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/javascript/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./javascript/main.js",
    publicPath: "/",
  },
  plugins: [
    new VueLoaderPlugin(),
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
    new HtmlWebpackPlugin({
      template: "./src/templates/members/taro.pug",
      filename: "members/taro.html",
      inject: "body",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      { //---TypeScript
        test: /\.(ts|tsx)$/,
        exclude: /node-modules/,
        use: [
          { loader: "ts-loader", },
        ],
      },
      { //--- Vue
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          { loader: "vue-loader", },
        ],
      },
      { //---Babel
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  { "targets": "> 0.25%, not dead" },
                ],
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      { //--- Styles
        test: /\.(css|sass|scss)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, },
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
            },
          },
          { loader: "sass-loader" },
        ],
      },
      { //--- Images
        test: /\.(png|jpg|jpeg)$/,
        type: "asset/resource",
        generator: {
          filename: "./images/[name][ext]",
        },
      },
      {
        loader: "image-webpack-loader",
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65,
          },
        },
      },
      { //---HTML/Pug
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

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: false,
  mode: "none",
  entry: ["./src/main.js"],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "output"),
    // 网站的根目录
    publicPath: "output/",
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.jpg$/,
        use: { loader: "url-loader", options: { limit: 10 * 1024 } },
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      meta: {
        viewport: "width=device-width",
      },
      filename: "index.html",
    }),
  ],
};

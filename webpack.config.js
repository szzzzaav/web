const path = require("path");

module.exports = {
  devtool: false,
  mode: "none",
  entry: ["./styles/bg.css", "./src/insertbg.js"],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "output"),
  },
  module: {
    rules: [{ test: /.css$/, use: ["style-loader", "css-loader"] }],
  },
};

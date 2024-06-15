const path = require("path");

module.exports = {
  devtool: false,
  mode: "none",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "output"),
  },
};

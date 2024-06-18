const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

class myPlugin {
  apply(compiler) {
    console.log("hello plugin");
    compiler.hooks.emit.tap("myPlugin", (compilation) => {
      // compilation可以理解为此次打包的上下文
      for (let name in compilation.assets) {
        // console.log(compilation.assets[name].source());
        if (name.endsWith(".js")) {
          const contents = compilation.assets[name].source();
          const withoutComments = contents.replace(/\/\*\*+\*\//g, "");
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments,
          };
        }
      }
    });
  }
}

module.exports = {
  mode: "none",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "output"),
    // publicPath: "output/",
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: [path.join(__dirname, "node_modules/html-webpack-plugin")],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /.md$/,
        // 可以使用文件路径
        use: "./markdown-loader.js",
      },
      {
        test: /.html$/,
        use: "html-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // //生成多个html
    // ...(() => {
    //   let ps = [];
    //   for (let i = 0; i < 10; i++) {
    //     ps.push(
    //       new HtmlWebpackPlugin({
    //         filename: `${i}.html`,
    //       })
    //     );
    //   }
    //   return ps;
    // })(),
    // 用于生成index.html
    new HtmlWebpackPlugin({
      title: "pracitise webpackplugin",
      meta: {
        viewport: "width=device-width",
      },
      template: "src/index.html",
    }),

    // 用于生成about.html
    new HtmlWebpackPlugin({
      filename: "about.html",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "output" }],
    }),
    new myPlugin(),
  ],
};

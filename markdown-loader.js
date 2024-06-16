const marked = require("marked");

module.exports = (source) => {
  // console.log(source);
  // 需要返回JavaScript代码，因为会把它嵌入到bundle里面
  // return "console.log('hellow')";
  const html = marked.parse(source);
  return `module.exports = ${JSON.stringify(html)}`;
};

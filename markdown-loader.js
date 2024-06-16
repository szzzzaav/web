const marked = require("marked");

module.exports = (source) => {
  const html = marked.parse(source);
  return `module.exports = ${JSON.stringify(html)}`;
};

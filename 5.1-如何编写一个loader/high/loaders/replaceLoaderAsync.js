const loaderUtils = require('loader-utils');

module.exports = function (source) {
  // 自动解析option中配置的参数
  const option = loaderUtils.getOptions(this);
  const reslut = source.replace(/world/, option.name);
  // 可代替return，好处在于可以传递更多参数
  this.callback(null, reslut, source); // err content sourceMap meta
};

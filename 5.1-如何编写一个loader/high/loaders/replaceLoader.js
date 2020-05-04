const loaderUtils = require('loader-utils');

module.exports = function (source) {
  // 参数source是源代码 -> console.log('hello world');
  // 不能使用箭头函数，因为webpack调用此方法时，会改变其this指向，此this上有常用函数
  //   console.log('this===', this);
  //   console.log('this===', this.query); // 接受在webpack中配置的参数
  //   console.log('source===', source);
  //   return source.replace(/world/, 'yl');
  /*
  // 自动解析option中配置的参数
  const option = loaderUtils.getOptions(this);
  const meta = { desc: '1111' };
  const reslut = source.replace(/world/, 'yl');
  // 可代替return，好处在于可以传递更多参数
  this.callback(null, reslut, source, meta); // err content sourceMap meta
  */
  const reslut = source.replace(/world/, 'yl');
  // 若是异步操作，需要使用async函数,通过调用此函数返回的函数传递处理后的源码
  const callback = this.async(); // 返回值就是this.callback
  setTimeout(() => {
    callback(null, reslut);
  }, 1000);
};

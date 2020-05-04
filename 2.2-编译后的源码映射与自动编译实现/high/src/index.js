console.log('hello world  ！！！！');

/**
 * sourceMap
 * 现在知道dist目录下main.js的第96行代码出错
 *
 * sourceMap是一个映射关系，它知道dist目录下main.js文件中96行对应的是
 * src目录下index.js文件的第一行
 *
 * 当你点击报错日志，可以定位到编码的index.js文件中
 *
 * 具体配置，在webpack.config.js中查看
 *
 */

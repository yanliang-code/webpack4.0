/**
 * es6 module 模块引入方式，浏览器无法识别，需要webpack对其翻译，浏览器才能进行识别运行
 * 当然webpack除了es6 模块引入方式，也支持其他模块引入方式：
 * 1.CommonJS 模块引入规范（node.js中常用  require）
 * 2.CMD
 * 3.AMD
 *
 * */

// 在其他文件引入此文件时，此文件执行前会先保证import所有的文件后在执行
// 注意：此处import的文件，必须对外声明接口

// import header from './header.js';
// import sider from './sider.js';
// import content from './content.js';

/**
 * webpack打包到js，默认它就是打包js的小能手
 * 打包到png图片时，不知所措，去webpack.config.js中根据配置文件，来加载需要的其他插件（file-loader）
 */
var header = require('./header.js');
var sider = require('./sider.js');
var content = require('./content.js');
// file-loader加载图片，会先将其另命名在指定输出文件路径copy一份，
// 并且返回模块对象，对象内含有访问地址（不止图片，其他文件也可以）
var pngImg = require('./2020-04-12.png');
console.log('pngImg====', pngImg);
// 面向对象编程的思想
new header();
new sider();
new content();

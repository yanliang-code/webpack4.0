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

var header = require('./header.js');
var sider = require('./sider.js');
var content = require('./content.js');
// 面向对象编程的思想
new header();
new sider();
new content();

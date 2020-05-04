/**
 * webpack打包到js，默认它就是打包js的小能手
 * 在遇到非js结尾的文件，它就不知所措，
 * 会去webpack.config.js中根据配置文件，来加载需要的其他loader插件（需要npm install）
 */

// file-loader加载图片，会先将其另命名在指定输出文件路径copy一份，
// 并且返回模块对象，对象内含有访问地址（不止图片，其他文件也可以）
import pngImg from './2020-04-12.png'; // import引入时，返回的是字符串路径
// var pngImg = require('./2020-04-12.png'); //require引入时，返回的是对象，对象的default字段是字符串路径
console.log('pngImg====', pngImg);
// css尾缀的文件根据配置文件使用'style-loader', 'css-loader'加载文件
import './index.css';
// import imgStyle from './index.css'; //此种写法支持scss，普通css无法实现
// console.log('imgStyle====', imgStyle);
import createImg from './createImg.js';
var root = document.getElementById('root');
// 如何在webpack中打包第三方的字体文件，详情配置看index.css以及webpack.config.js
root.innerHTML = '<div class="iconfont iconDyanjing"></div>';
createImg();
var img = new Image();
img.src = pngImg;
// 给img标签加上类选择器
img.classList.add('imgClass');
// img.src = pngImg.default;
root.append(img);

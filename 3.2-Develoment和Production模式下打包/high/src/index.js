/*
    默认只引入add方法，但是编译后的文件内将math.js中的函数都引入其中，造成性能浪费
    通过使用webpack内置的Tree Shaking，来让其只打包真正引入的文件（只支持ES Module）
*/
import { add } from './math';
// 注意：只支持ES Module方式，不支持ComJS方式；
// ES Module：静态引入；  CommonJS：动态引入；

add(1, 7);

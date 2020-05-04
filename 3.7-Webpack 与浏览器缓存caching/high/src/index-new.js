console.log('this===', this); //指向模块（文件自身）
// 若想指向window，需要使用loadere   npm i imports-loader -D
console.log('this===', this === window);

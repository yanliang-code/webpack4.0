// import '@babel/polyfill'; // 在window上直接绑定对象

const arr = [new Promise(() => {}), new Promise(() => {})];

arr.forEach((item) => {
  console.log('item===', item);
});

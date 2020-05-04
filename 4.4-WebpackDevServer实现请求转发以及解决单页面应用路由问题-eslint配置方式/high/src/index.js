// import '@babel/polyfill'; // 在window上直接绑定对象
import axios from 'axios';

// 请求一般使用相对路径，但是生产与开发环境的访问的域名与端口都不相同
// 通过devServer的proxy配置项进行转发  http://www.dell-lee.com
axios.get('/react/api/header.json').then((res) => {
  console.log('res===', res);
});

const arr = [new Promise(() => {}), new Promise(() => {})];

arr.forEach((item) => {
  console.log('item===', item);
});

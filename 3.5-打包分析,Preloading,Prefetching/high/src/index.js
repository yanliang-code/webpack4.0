// /**/ 魔法注释，打包后的名字会使用lodash
// function getComponent() {
//   return import(/* webpackChunkName:"lodash" */ 'lodash').then(
//     ({ default: _ }) => {
//       var element = document.createElement('div');
//       element.innerHTML = _.join(['yl', 'td'], '-');
//       return element;
//     }
//   );
// }

// async function getComponent() {
//   const { default: _ } = await import(/* webpackChunkName:"lodash" */ 'lodash');
//   const element = document.createElement('div');
//   element.innerHTML = _.join(['yl', 'td'], '-');
//   return element;
// }
// // 点击hmtl文档时执行getComponent函数（懒加载，执行import时才会请求资源）
// document.addEventListener('click', () => {
//   getComponent().then((element) => {
//     document.body.appendChild(element);
//   });
// });

// document.addEventListener('click', () => {
//   const element = document.createElement('div');
//   element.innerHTML = 'yl-td';
//   document.body.appendChild(element);
// });

// 需要触发并且异步执行的代码另创文件通过import方式导入后进行执行（webpack建议的方式）
// 这样开始加载页面时，不需要执行的代码就不必要进行加载，通过异步组件方式，等待需要时再加载运行
// 目前的高性能前端代码（加载速度快），重点不是使用缓存，而是减少无用代码的加载，提高代码的使用率
// 异步的代码才能提高首屏加载速度；同步的代码只能提高缓存的能力
document.addEventListener('click', () => {
  import(/* webpackPrefetch: true */ './click').then(({ default: func }) => {
    func();
  });
});

/* 
    比如登录首页，登录后的主页以及逻辑先不加载（采用import方式加载），只加载登录首页的代码，
    但是会不会点击登录后，主页加载的东西以及逻辑太多而导致太慢，所以需要在加载完登录首页后，
    预加载主页的静态资源以及逻辑代码
    通过魔法注释webpackPrefetch: true，在加载完登录首页，有剩余带宽时，去加载主页的资源；
    等到真正使用时，直接使用本地缓存即可。
    webpackPrefetch：等主代码加载完，空闲时间再预加载其他代码（可能会有兼容性问题）
    webpackPreload：与主代码同时加载
*/

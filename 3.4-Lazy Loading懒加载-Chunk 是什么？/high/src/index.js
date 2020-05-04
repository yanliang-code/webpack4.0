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

async function getComponent() {
  const { default: _ } = await import(/* webpackChunkName:"lodash" */ 'lodash');
  const element = document.createElement('div');
  element.innerHTML = _.join(['yl', 'td'], '-');
  return element;
}
// 点击hmtl文档时执行getComponent函数（懒加载，执行import时才会请求资源）
document.addEventListener('click', () => {
  getComponent().then((element) => {
    document.body.appendChild(element);
  });
});

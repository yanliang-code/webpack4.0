import _ from 'lodash';
var element = document.createElement('div');
element.innerHTML = _.join(['yl', 'td'], '-');
document.body.appendChild(element);

// function getComponent() {
//   // /**/ 魔法注释，打包后的名字会使用lodash
//   return import(/* webpackChunkName:"lodash" */ 'lodash').then(
//     ({ default: _ }) => {
//       var element = document.createElement('div');
//       element.innerHTML = _.join(['yl', 'td'], '-');
//       return element;
//     }
//   );
// }

// getComponent().then((element) => {
//   document.body.appendChild(element);
// });

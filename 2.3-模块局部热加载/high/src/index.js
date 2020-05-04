// 目前修改样式代码，会重新刷新页面
import './style.css';

var btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);
btn.onclick = function () {
  var div = document.createElement('div');
  div.innerHTML = 'item';
  document.body.appendChild(div);
};

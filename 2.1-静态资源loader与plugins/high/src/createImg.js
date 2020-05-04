import pngImg1 from './2020-04-12.png';
function createImg() {
  var img = new Image();
  img.src = pngImg1;
  // 给img标签加上类选择器
  img.classList.add('imgClass');
  // img.src = pngImg.default;
  var root = document.getElementById('root');
  root.append(img);
}
export default createImg;

function content() {
  let root = document.getElementById('root');
  let content = document.createElement('div');
  content.innerText = 'content';
  root.append(content);
}
// export default content;
module.exports = content;

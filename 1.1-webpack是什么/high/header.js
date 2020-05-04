function header() {
  let root = document.getElementById('root');
  let header = document.createElement('div');
  header.innerText = 'header';
  root.append(header);
}
// export default header;
module.exports = header;

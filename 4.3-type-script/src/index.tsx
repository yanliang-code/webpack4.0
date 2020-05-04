import * as _ from 'lodash';
class Greeter {
  greeting: String;
  constructor(message: String) {
    this.greeting = message;
  }
  greet() {
    // return _.join('hello',123); // 语法错误提示
    return _.join(['hello', ' ', this.greeting], '');
    // return 'hello' + this.greeting;
  }
}
let greeter = new Greeter('world');
// let greeter = new Greeter(123);
let button = document.createElement('button');
button.textContent = 'say hello';
button.onclick = function () {
  alert(greeter.greet());
};
document.body.appendChild(button);

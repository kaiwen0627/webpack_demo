import '../styles/index.css';
import '../styles/index2.css';
import '../styles/index3.less';
import $ from 'jquery';

const a = 1;
console.log(a);

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('ok');
    resolve();
  }, 1000);
});
console.log(promise);

function sum(...arg) {
  return arg.reduce((p, c) => p + c, 0);
}

console.log(sum(1, 2, 3, 4, 5));
console.log($);

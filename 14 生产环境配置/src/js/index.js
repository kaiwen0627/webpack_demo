import '../styles/index.css'
import '../styles/index2.css'
import '../styles/index3.less'

let a = 1;
console.log(a);

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('ok');
    resolve();
  }, 1000);
});
console.log(promise);

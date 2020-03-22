import '../styles/index.css';
import '../styles/index2.css';
import '../styles/index3.less';


// 注册serviceworker
console.log(navigator);

if ('serviceWorker' in navigator) {
  alert('22')
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(() => {
      console.log('sw注册成功了');
    }).catch(() => {
      console.log('sw注册失败');
    });
  });
} else {
  console.log('error');
}

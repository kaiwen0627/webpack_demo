
console.log('index.js 被加载了~~');

document.querySelector('#addfile').onclick = function () {

  // 懒加载：文件需要时才加载
  // 预加载prefetch：会在使用之前加载。等其他资源加载完毕，浏览器空闲了再偷偷在后台加载
    import (/* webpackChunkName:'test' ,webpackPrefetch:true*/'./test').then(({ add }) => {
      console.log('test被加载了。。。')
    add(2, 3)
    })
}

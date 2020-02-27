/*
  通过js代码。让某个文件被单独打包为一个chunk
  import 为 ES10语法
*/
import (/* webpackChunkName:'test' */'./test')
  .then(({ add }) => {
    console.log(add(1, 2, 3));

  }).catch(() => {
    console.log('文件加载是失败。。。');

  })

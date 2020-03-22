/* index.js ： webpack的入口文件

1.运行指令：
开发环境： webpack ./src/index.js -o ./build/built.js --mode=development

webpack会以 ./src/index.js 为入口文件开始打包。打包后输出到./build/built.js 整体打包环境为开发环境

生产环境： webpack ./src/index.js -o ./build/built.js --mode=production
结论：
1. webpack能处理js、json资源，不能直接处理css、img等其他资源
2. 生产环境和开发环境将ES6模块化编译成浏览器能识别的模块
3. 生产环境比开发环境多了一个压缩代码
 */

function add(x,y) {
  return x+y
}
console.log(add(2,3));

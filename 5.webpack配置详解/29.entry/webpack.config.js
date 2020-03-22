const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

/*
 1. string >>  entry: './src/index.js',
 打包形成一个chunk ，输出一个 bundle文件
*/
// module.exports = {
//   entry: './src/index.js',
//   output: {
//     filename: '[name].js',
//     path:resolve(__dirname,'build')
//   },
//   plugins: [new htmlWebpackPlugin()],
//   mode:'development'
// }

/*
 2. array >>  ['./src/index.js','./src/add.js']
   多入口打包形成一个chunk ，输出一个 bundle文件
   用途：在HMR功能中让html热更新生效
*/
// module.exports = {
//   entry: ['./src/index.js','./src/add.js'],
//   output: {
//     filename: '[name].js',
//     path:resolve(__dirname,'build')
//   },
//   plugins: [new htmlWebpackPlugin()],
//   mode:'development'
// }

/*
 3. object >>  { index: './src/index.js', add: './src/add.js' }
   多入口打包形成多个chunk ，输出多个bundle文件
   chunk名称就是key

   特殊用法：
   {
    // index不引入add。也会被打包在index的chunk里面。
     index: ['./src/index.js','./src/add.js'],
    //  第一种情况
     add: './src/add.js'
  }
*/
module.exports = {
  entry: { index: './src/index.js', add: './src/add.js' },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [new htmlWebpackPlugin()],
  mode: 'development'
}
const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    //文件名称（指定名称+目录）
    filename: 'js/[name].js',
    // 输出文件的目录（所有资源输出的公共目录）
    path: resolve(__dirname, 'build'),
    // 所有资源的引入的公共路径 --> 'imgs/a.jpg'==>> '/imgs/a.jpg'
    // publicPath: '/',
    // 非入口chunk的名称
    chunkFilename:'[name]_chunk.js',
    library: '[name]', // 整个库向外暴露的变量名
    libraryTarget:'window' //变量名添加到那个对象上 brower
    // libraryTarget:'global' //变量名添加到那个对象上 node
  },
  plugins: [new htmlWebpackPlugin()],
  mode: 'development'
}
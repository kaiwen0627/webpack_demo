/*
   使用DLL技术，对某些库（vue，jquery等）进行单独打包。。
   运行的命令修改： webpack --config webpack.dll.js  , 修改运行的查找的配置文件
*/
const { resolve } = require('path');
const webpack = require('webpack')
module.exports = {
  //  入口
  entry: {
    // 最终打包生产的[name]--》 jQuery
    // ['jquery'] 需要打包的库名称jquery
    jquery:['jquery']
  },
  // 输出
  output: {
    // 输出文件名
    filename: '[name].js',
    // 输出的路径
    // __dirname nodejs的变量。代表当前文件的目录的决对路径
    path: resolve(__dirname, 'dll'),
    library:'[name]_[hash]'  // 打包后的库向外暴露出去的名字叫什么名字
  },

  plugins: [
    // 打包生成manifest.json文件。--> 提供和jquery映射
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json'), // 输出的映射文件
    })
  ],
  mode: 'production',  /* 生产模式 */
};

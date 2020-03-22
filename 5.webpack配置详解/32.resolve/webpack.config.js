const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    //文件名称（指定名称+目录）
    filename: 'js/[name].js',
    // 输出文件的目录（所有资源输出的公共目录）
    path: resolve(__dirname, 'build'),
  },
  // 解析模块的规则
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve(__dirname, 'src')
    },
    // 配置省略文件路径的后缀名
    extensions: ['js', 'vue'],
    // 告诉webpack解析模块去哪个目录
    modules:['node_modules']
  },
  plugins: [new htmlWebpackPlugin()],
  mode: 'development'
}
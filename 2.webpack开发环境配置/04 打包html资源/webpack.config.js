/*
webpack.config.js webpack 的配置文件
作用：指示webpack干那些活
所有构件的工具都是基于nodejs平台运行，模块化默认采用commonjs
 */

const { resolve } = require('path');
const HtmlWebpackPlugin= require('html-webpack-plugin')
module.exports = {
  //  入口
  entry: './src/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输出的路径
    // __dirname nodejs的变量。代表当前文件的目录的决对路径
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  // 不同的文件需要配置不同的loader处理
  module: {
    rules: [
      // 详细的loader配置
      {
        // 匹配那些文件
        test: /\.css$/,
        // 使用那些loader处理
        use: [
          // use数组中的执行顺序:从右向左执行,从下到上依次执行
          // 创建style标签，将js中的样式资源插入进行，添加在head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载在js中，里面的内容是样式字符串
          'css-loader'
        ]
      },
      {
        // 匹配那些文件
        test: /\.less$/,
        // 使用那些loader处理
        use: [
          // use数组中的执行顺序:从右向左执行,从下到上依次执行
          // 创建style标签，将js中的样式资源插入进行，添加在head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载在js中，里面的内容是样式字符串
          'css-loader',
          // 将less文件编译成css文件
          // 需要下载less 和 less-loader
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // 详细的plugin配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的html文件。自动引入打包输出的所有资源
    new HtmlWebpackPlugin({
      // 复制template文件并自动引入打包输出的所有资源
      template: './src/index.html'
    })
  ],
  mode: 'development' /* 开发模式 */
  // mode:'production'   /* 生产模式 */
};

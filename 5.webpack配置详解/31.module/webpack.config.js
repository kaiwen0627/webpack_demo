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
  module: {
    rules: [
      // load 的配置
      {
        test: /\.css$/,
        // 多个loader用use
        use: ['style-loader', 'css-loader']
      },
      {
        test: '/\.js$/',
        // 排除第三方代码
        exclude: /node_modules/,
        // 只检查 src 目录下的代码
        include: resolve(__dirname, 'src'),
        // 单个直接用loader
        loader: 'eslint-loader',
        // 优先执行
        enforce: 'pre',
        /*   // 延后执行
          enforce:'post' */
      },
      {
        // 以下的loader只会生效一个
        oneOf: [

        ]
      }

    ]
  },
  plugins: [new htmlWebpackPlugin()],
  mode: 'development'
}
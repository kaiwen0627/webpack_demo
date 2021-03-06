/*
source-map ：一种提示源代码到构建后代码的映射技术（如果侯建后代码出错，可以映射追踪源代码的错误）

可选参数： [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

source-map： 外部 【错误代码的准确信息 和 源代码的错误位置】

inline-source-map : 内联 【只生成一个内联source-map】【map文件在原js文件内部，没有生成外部文件，构建更快】【错误代码的准确信息 和 源代码的错误位置】

hidden-source-map 外部 【错误代码的准确信息 和 不能追踪源代码的错误位置】

eval-source-map  ：内联 【每一个文件生成一个对应内联source-map，都是在eval中】 【错误代码的准确信息 和 源代码的错误位置】

nosources-source-map： 外部 【错误代码的准确信息 和 没有任何源代码的错误信息】

开发环境：速度快、调试友好
速度快（eval>inline>cheap>...）
调试友好 : source-map   cheap-module-source-map  cheap-source-map

生产环境：源代码要不要隐藏？调试友好问题？
内联会让代码体积变大，所以生产环境不用
nosources-source-map 全部隐藏
hidden-source-map    只是隐藏源代码，会提示构建后代码的错误信息

*/

/*
开发环境配置
webpack.config.js webpack 的配置文件
作用：指示webpack干那些活
所有构件的工具都是基于nodejs平台运行，模块化默认采用commonjs
 */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //  入口
  entry: './src/js/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'js/built.js',
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
      },
      {
        // 匹配图片文件
        // 默认处理不了html里面的图片
        test: /\.(jpg|png|gif)$/,
        // 使用那些loader处理,需要下载两个包 url-loader file-loader
        // 使用单个loader可以直接写，不需要use ： []
        loader: 'url-loader',
        options: {
          // 图片小于20Kb，就会使用base64处理
          // 优点：减少请求数量（减小服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          limit: 20 * 1024,
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入的图片使用commonjs，解析时出现问题： <img src="[object Module]" alt="">
          // 解决：关闭url-loader的es6模块化，使用commonjs
          esModule: false,
          // [hash:10] 名称为hash前十位 [ext]为文件扩展名
          name: '[hash:10].[ext]',
          // 输出目录 build/img
          outputPath: 'img'
        }
      },
      {
        // 匹配图片文件
        // url-loader默认处理不了html里面的图片,需要使用html-loader
        test: /\.(html)$/,
        // 使用单个loader可以直接写，不需要use ： []
        loader: 'html-loader'
      },
      {
        // 匹配其他文件。匹配资源可以使用test也可以使用 exclude 排除某些文件，这两个可以同时存在
        test: /\.(ttf|mp4|json)$/,
        exclude: /\.(css|js|html|png|jpg|gif|less)$/,
        // 使用单个loader可以直接写，不需要use ： []
        loader: 'file-loader',
        // [hash:10] 名称为hash前十位 [ext]为文件扩展名
        options: {
          name: '[hash:10].[ext]'
        }
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
  mode: 'development' /* 开发模式 */,
  // mode:'production'   /* 生产模式 */
  // 开发服务器DevServer：用来自动化（自动编译、自动打开浏览器，自动刷新浏览器）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动devServer指令：npx webpack-dev-server ,需要下载webpack-dev-server包
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
    // 打开热更新
    hot: true
  },
  devtool: 'source-map'
};

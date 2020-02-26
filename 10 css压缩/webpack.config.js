/*
开发环境配置
webpack.config.js webpack 的配置文件
作用：指示webpack干那些活
所有构件的工具都是基于nodejs平台运行，模块化默认采用commonjs
 */

//  设置node运行的环境变量
process.env.NODE_ENV = 'development';

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const miniCssExtractPlugin = require('mini-css-extract-plugin');

// 压缩css插件 ：   optimize-css-assets-webpack-plugin

const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

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
          // 将css文件单独提出来
          miniCssExtractPlugin.loader,
          // 将css文件变成commonjs模块加载在js中，里面的内容是样式字符串
          'css-loader',
          // css兼容性处理，需要 postcss处理，安装 postcss-preset-env 和 postcss-loader
          // 帮postcss找到package.json中browserlist里面的配置，通过配置加载指定的css兼容的样式,默认找生产环境的配置
          /*
          "browseslist":{
            "development":[
              "last 1 chrome version",
              "last 1 firefox version",
              "last 1 safari version"
            ],
            "production":[
              ">0.2%",
              "not dead",
              "not op_mini all"
            ]
          }
          */
          /*
          使用loader的默认配置书写格式：
          ‘postcss-loader’
          */
          // 修改loader的配置，按照下列格式书写
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              // postcss-preset-env 插件，有一些预设的兼容性处理
              plugins: () => [require('postcss-preset-env')()]
            }
          }
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
    }),
    // 功能：提取css为单文件
    new miniCssExtractPlugin({
      // 输出的文件名及路径
      filename: 'css/bulid.css'
    }),
    new optimizeCssAssetsWebpackPlugin()
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
    open: true
  }
};

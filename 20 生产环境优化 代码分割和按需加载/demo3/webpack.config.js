/*
生产环境配置
webpack.config.js webpack 的配置文件
作用：指示webpack干那些活
所有构件的工具都是基于nodejs平台运行，模块化默认采用commonjs
 */

process.env.NODE_ENV = 'production';
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const miniCssExtractPlugin = require('mini-css-extract-plugin');

// 压缩css插件 ：   optimize-css-assets-webpack-plugin

const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const commonCssLoader = [
  // use数组中的执行顺序:从右向左执行,从下到上依次执行
  // 将css文件单独提出来
  miniCssExtractPlugin.loader,
  // 将css文件变成commonjs模块加载在js中，里面的内容是样式字符串
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      // postcss-preset-env 插件，有一些预设的兼容性处理
      plugins: () => [require('postcss-preset-env')()]
    }
  }
]

module.exports = {
  //  单入口
  entry: './src/js/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'js/[name]_built.[contenthash:10].js',
    // 输出的路径
    // __dirname nodejs的变量。代表当前文件的目录的决对路径
    path: resolve(__dirname, 'build')
  },
  // 可以将node_modules里的代码单独打包为一个chunk输出
  // 自动分析多入口chunk中，有没有公共的依赖文件。如果有，会打包为一个单独的chunk。不会多次打包
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  // loader的配置
  // 不同的文件需要配置不同的loader处理
  module: {
    rules: [
      {
        // 语法检查： eslint-loader eslint
        // 示例规范： eslint-plugin-import eslint-config-airbnb-base
        /*
           package.json:
          "eslintConfig": {
            "extends": "airbnb-base"
          },
        */
        // 注意： 只检查自己写的代码，不检查第三方代码
        test: /\.js$/,
        // 排除第三方代码
        exclude: /node_modules/,
        loader: 'eslint-loader',
        // 相同文件执行不同loader时优先执行此loader
        enforce: 'pre',
        options: {
          // 自动修复
          fix: true
        }
      },
      {
        //以下loader只会匹配一个
        // 注意：不能有两个配置处理同一类型的文件，所以把eslint提取出去了
        oneOf: [
          // 详细的loader配置
          {
            // 匹配那些文件
            test: /\.css$/,
            // 使用那些loader处理
            use: [
              ...commonCssLoader
            ]
          },
          {
            test: /\.less$/,
            use: [
              ...commonCssLoader,
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
              outputPath: 'imgs'
            }
          },
          {
            // 处理html里面的图片文件
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
          },

          {
            // js 兼容性处理 babel-loader @babel/preset-env @babel/core
            // 方案1，基本JS兼容处理 --》》 @babel/preset-env
            // 问题：只能转化基本的语法
            // 方案2.全部js处理（promise...） @babel/polyfill ，只需要在全局js引入使用即可。不需要配置webpack
            //  问题：引入了所有兼容处理的代码。增加了代码体积
            // 方案3.需要按需加载，需要的兼容才做
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    // 按需加载
                    useBuiltIns: 'usage',
                    // 指定core-js的版本
                    corejs: {
                      version: 3
                    },
                    // 指定兼容到那个浏览器版本
                    targets: {
                      chrome: '60',
                      firefox: '60',
                      ie: '9'
                    }
                  }
                ]
              ]
            }
          },

        ]
      },

    ]
  },
  plugins: [
    // 详细的plugin配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的html文件。自动引入打包输出的所有资源
    new HtmlWebpackPlugin({
      // 复制template文件并自动引入打包输出的所有资源
      template: './src/index.html',
      minify: {
        // 删除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    // 功能：提取css为单文件
    new miniCssExtractPlugin({
      // 输出的文件名及路径
      filename: 'css/bulid.[contenthash:10].css'
    }),
    new optimizeCssAssetsWebpackPlugin()
  ],
  // mode: 'development' /* 开发模式 */,
  mode: 'production' /* 生产模式 */,
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

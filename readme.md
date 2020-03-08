# 1.webpack简介

## 1.webpack五个核心概念

- Entry
  入口（entry）指示webpack以哪个文件作为起点开始打包，分析构建内部依赖图。
- Output
  输出（output）指示webpack打包后的资源 bundles输出到哪里去，以及如何命名。
- Loader
  Loader让webpack能够去处理那些非JavaScript文件（wenpack自身只能理解JavaScript）---扮演翻译官
- Plugins
  插件（plugins）可以用于执行范围更广的任务。插件的范围包括：从打包优化和压缩，一直到重新定义环境中的变量等。
- Mode
  模式（mode）指示webpack使用相应的配置

  |    选项     |                                                                                                        描述                                                                                                        |              特点              |
  | :---------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------: |
  | development |                                                              会将process.env.NODE_ENV的值设为development，启用NamedChunksPlugin和NamedModulesPlugins                                                               | 能让代码在本地调试和运行的环境 |
  | production  | 会将process.env.NODE_ENV的值设为production，启用FlagDependencyUsagePlugin、FlagIncludedChunksPlugin、ModuleConcatenationPlugin、NoEmitOnErrorsPlugin、OccurrenceOrderPlugin、SideEffectsFlagPlugin和UglifyJsPlugin |   能让代码优化上线运行的环境   |

## 2.webpack初体验

#### 2.1 安装 webpack webpack-cli
#### 2.2 打包
```bash
// 1.运行指令：
// 开发环境： webpack ./src/index.js -o ./build/built.js --mode=development

// webpack会以 ./src/index.js 为入口文件开始打包。打包后输出到./build/built.js 整体打包环境为开发环境

// 生产环境： webpack ./src/index.js -o ./build/built.js --mode=production
```

    ***
    结论：
    1. webpack能处理js、json资源，不能直接处理css、img等其他资源
    2. 生产环境和开发环境将ES6模块化编译成浏览器能识别的模块
    3. 生产环境比开发环境多了一个压缩代码
    ***


## 3.打包样式文件

#### 3.1 webpack配置
```js
/*
webpack.config.js webpack 的配置文件
作用：指示webpack干那些活
所有构件的工具都是基于nodejs平台运行，模块化默认采用commonjs
 */

const { resolve } = require('path');
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
          'css-loader',
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
  ],
  mode:'development'   /* 开发模式 */
  // mode:'production'   /* 生产模式 */
};

```

## 4. 打包html
> 主要是需要 html-webpack-plugin 插件

```js
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
```

## 5.打包图片资源
- 打包图片资源，分为html里面的img标签和样式文件中的背景图，需要使用不同的loader相应处理。
```js
/*
webpack.config.js webpack 的配置文件
作用：指示webpack干那些活
所有构件的工具都是基于nodejs平台运行，模块化默认采用commonjs
 */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
          name: '[hash:10].[ext]'
        }
      },
      {
        // 匹配图片文件
        // url-loader默认处理不了html里面的图片,需要使用html-loader
        test: /\.(html)$/,
        // 使用单个loader可以直接写，不需要use ： []
        loader: 'html-loader'
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

```

## 6.打包其他资源
- 打包其他资源均用 file-loader来处理
```js
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
```

## 7. devServer

```js
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
    open:true
  }
```

# 2. 生产环境配置优化

## 8. 提取css文件为单文件
- 需要 mini-css-extract-plugin 插件
- 主要修改两个地方：
   1. 引入并使用插件
   2. 代替 style-loader ， less和css都需要来处理
```js

/*
开发环境配置
webpack.config.js webpack 的配置文件
作用：指示webpack干那些活
所有构件的工具都是基于nodejs平台运行，模块化默认采用commonjs
 */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
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
          // 'style-loader',
          // 使用 miniCssExtractPlugin.loader 代替 style-loader ，将css文件单独提出来
          miniCssExtractPlugin.loader,
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
          // 'style-loader',
          // 使用 miniCssExtractPlugin.loader 代替 style-loader ，将css文件单独提出来
          miniCssExtractPlugin.loader,
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
    }),
    // 功能：提取css为单文件
    new miniCssExtractPlugin({
      // 输出的文件名及路径
      filename:'css/bulid.css'
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
    open: true
  }
};

```

## 9.css文件的兼容性处理

-  css兼容性处理，需要 postcss处理，安装 postcss-preset-env 和 postcss-loader 帮 postcss 找到 package.json 中 browserlist 里面的配置，通过配置加载指定的css兼容的样式,默认找生产环境的配置

```js
/*
开发环境配置
webpack.config.js webpack 的配置文件
作用：指示webpack干那些活
所有构件的工具都是基于nodejs平台运行，模块化默认采用commonjs
 */

//  设置node运行的环境变量
process.env.NODE_ENV='development'

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const miniCssExtractPlugin = require('mini-css-extract-plugin');
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
              plugins: () => [
                 // postcss-preset-env 插件，有一些预设的兼容性处理
                require('postcss-preset-env')();
              ]
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
    open: true
  }
};

```

## 10.压缩css

- 需要 optimize-css-assets-webpack-plugin 插件,引入使用即可

```js
/*
开发环境配置
webpack.config.js webpack 的配置文件
作用：指示webpack干那些活
所有构件的工具都是基于nodejs平台运行，模块化默认采用commonjs
 */
// 压缩css插件 ：   optimize-css-assets-webpack-plugin
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
  plugins: [
    new optimizeCssAssetsWebpackPlugin()
  ],
  mode: 'development' /* 开发模式 */,
};

```

## 11. 代码检查
- 代码检查，一般只是用户检查js文件，不包括第三方代码，需要借助 eslint eslint-loader
- 示例规范： airbnb-base 规范

```js
/*
开发环境配置
webpack.config.js webpack 的配置文件
作用：指示webpack干那些活
所有构件的工具都是基于nodejs平台运行，模块化默认采用commonjs
 */

//  设置node运行的环境变量
process.env.NODE_ENV = 'development';

const { resolve } = require('path');

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
      {
        // 语法检查： eslint-loader eslint
        // 示例规范： eslint-plugin-import eslint-config-airbnb-base
        // 注意： 只检查自己写的代码，不检查第三方代码
        test: /\.js$/,
        // 排除第三方代码
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复
          fix: true
        }
      }
    ]
  },
  plugins: [
  ],
  mode: 'development',
  devServer: {
  }
};


```

package.json

```json
  "eslintConfig": {
    "extends":"airbnb-base"
  },
```

## 12.js兼容性处理

```js
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

const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

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
         {
        // js 兼容性处理 babel-loader @babel/preset-env @babel/core
        // 方案1，基本JS兼容处理 --》》 @babel/preset-env
        // 问题：只能转化基本的语法
        // 方案2.全部js处理（promise...） 下载 @babel/polyfill ，只需要在全局js引入使用即可。不需要配置webpack
        //  问题：引入了所有兼容处理的代码。增加了代码体积
        // 方案3.需要按需加载，需要的兼容才做，这里使用 core-js 来按需加载 ， 如下代码：
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
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
      }
    ]
  },
  plugins: [
  ],
  mode: 'development' /* 开发模式 */,
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

```


## 13.压缩js和html
```js
// 修改mode为生产环境，会自动压缩js文件
mode:'production'

// 压缩html
new HtmlWebpackPlugin({
  // 复制template文件并自动引入打包输出的所有资源
  template: './src/index.html',
  // 压缩html
  minify: {
    // 删除空格
    collapseWhitespace: true,
    // 移除注释
    removeComments: true
  }
})

```

## 14.生产环境基本配置
```js
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
        enforce:'pre',
        options: {
          // 自动修复
          fix: true
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
      filename: 'css/bulid.css'
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

```

# 3.性能优化

## 15.开发环境---HMR

- 只需要配置 devServer 的  hot: true

```js
/*
HMR： 热模块替换|热更新
作用： 一个模块发生改变，只会重新打包这个模块，从而加快打包速度
问题： 样式文件：可以使用HMR，因为style-loader内部实现了；

      js文件：默认不能使用HMR，需要增加HMR支持代码，注意：只能处理非入口文件。

      html文件：默认不能使用HMR。同时会导致一个问题：html文件不能热更新了(不需要做HMR)

解决：html：修改 entry入口为数组，将html文件引入
     js：
    if(module.hot){
      module.hot.accept('./src/xxx.js',function(){
        // 方法会监听xxx.js文件的变化，一旦变化，其他文件默认不会重新打包
        可以在此函数里面做一些事情，比如调用函数
      })
    }


*/

  devServer: {
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
    // 打开HMR
    hot: true
  }
```

## 16.source-map

```js
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
```

## 17.oneOf

- oneOf ,提高打包的速度，优化匹配loader的规则

```js
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
          ...

```

## 18.缓存

```js
/*
缓存：
   1. bable缓存
   // 开启babel缓存
   // 第二次构建时，会读取之前的缓存，让第二次打包速度更快
   cacheDirectory: true,

   2.文件资源缓存
    hash：每次webpack构建时都会生成一个新的唯一的hash值。
    问题：因为js和css同时使用一个hash的值，如果重新打包，会导致所有的缓存失效

    chunkhash：根据chunk生成的hash值，如果打包来源同一个chunk，那么hash值就一样
    问题：js和css的hash值还是一样的，因为css是在js中引入的，属于一个chunk

    contenthash:根据文件的生成内容生成的hash值，不同的文件hash值一定不同
    --》让代码上线运行缓存更好使用
*/


  // 输出
  output: {
    // 输出文件名
    filename: 'js/built.[contenthash:10].js',
    // 输出的路径
    // __dirname nodejs的变量。代表当前文件的目录的决对路径
    path: resolve(__dirname, 'build')
  },
```
## 19.tree shaking

```js
/*

tree shaking ：去除无用的代码
前提： 1.必须使用ES6模块化 2.开启 production 环境模式    无需修改其他！

在package.json中配置：
  "sideEffects":false   所有的代码都没有副作用，（都可以进行tree shaking）
  问题：可能会把css、@babel/polyfill 文件干掉

  解决办法：例： "sideEffects":["*.css"]  意思：css不需要进行tree shaking
*/
```

## 20.生产环境优化 代码分割和按需加载

- 1. 修改入口【后续可区分单页面程序（SPA）或者多页面程序(MPA)】

```js
  //  单入口
  // entry: './src/js/index.js',
  // 多入口，生成多个打包文件
  entry: {
    main: './src/js/index.js',
    test: './src/js/test.js'
  },
```

- 2. optimization方式

```js
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
  ...
```

- 3. js代码方法

```js
/*
通过js代码。让某个文件被单独打包为一个chunk
import 为 ES10语法
webpackChunkName:'test'  给打包的chunk命名
*/

import (/* webpackChunkName:'test' */'./test')
  .then(({ add }) => {
    console.log(add(1, 2, 3));

  }).catch(() => {
    console.log('文件加载是失败。。。');

  })
  ```

## 21. 懒加载

```js
  // 懒加载：文件需要时才加载
  // 预加载prefetch：会在使用之前加载。等其他资源加载完毕，浏览器空闲了再偷偷在后台加载
    import (/* webpackChunkName:'test' ,webpackPrefetch:true*/'./test').then(({ add }) => {
      console.log('test被加载了。。。')
    add(2, 3)
    })
```

## 22. PWA

- PWA：渐进式网络开发应用程序
- 插件：workbox-webpack-plugin

```js
// webpack 插件配置
const workboxWebpackPlugin = require('workbox-webpack-plugin')
// 生成一个serviceworker配置文件。默认在打包的根目录
new workboxWebpackPlugin.GenerateSW({
  clientsClaim: true, /* 帮助serviceworker 快速启动 */
  skipWaiting: true /* 删除旧的serviceworker */
})
```

```js
// 在 入口文件 注册serviceworker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(() => {
      console.log('sw注册成功了');
    }).catch(() => {
      console.log('sw注册失败');
    });
  });
} else {
  console.log('error');
}

```

## 23. 多进程
- 需要安装 thread-loader ，一般只是用在babel之后（必须在后面执行）

```js
{

  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    /*
    开启多进程打包
    进程启动需要时间，进程通信需要时间
    只有工作消耗时间比较长的，才需要多进程打包
    */
  {
    loader:'thread-loader',
    options:{
      workers:2 // 进程两个
    }
  },
  {
    loader: 'babel-loader',
    options: {
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
    }],
  }
},
```

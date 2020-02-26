# webpack简介

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


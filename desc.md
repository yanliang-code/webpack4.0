- 1.1-webpack 是什么
  - 项目需要模块化，webpack 的作用是通过一个入口文件，分析出模块间的依赖图谱，最终打包成一个浏览器能解释的 js 文件
- 1.2-模块打包工具
  - 无内容，合并到 1.1 中
- 1.3-webpack 环境
  - 介绍了 webpack 一些命令以及同样命令带不同参数代表什么意思
- 1.4-webpack 配置
  - 简易版项目结构，通过简单的 webpack 配置文件，进行打包项目
- 2.1-静态资源 loader 与 plugins
  - 介绍 webpack 如何结合 loader 来处理指定类型文件的
  - 介绍 webpack 如何结合 plugins 来在打包前中后各种时期进行某些操作的
  - 介绍 entry 入口、output 出口配置
  - 使用 url-loader 处理图片文件，使用 file-loader 处理字体文件
  - 使用 css-loader、sass-loader、postcss-loader、style-loader 处理 css 文件
  - 使用 html-webpack-plugin 在打包后按指定模板生成 html 并引入 js，使用 clean-webpack-plugin 在打包前删除指定目录下的文件
- 2.2-编译后的源码映射与自动编译实现
  - 不同配置的 devtool 区别，生产、开发环境一般使用什么配置
  - 实现改变源码（src 下代码）自动编译的三种方法
    - webpack --watch
    - npm i webpack-dev-server -D 使用 devServer 启动服务
    - npm i express webpack-dev-middleware -D 自我实现服务器
- 2.3-模块局部热加载(主要是使用 webpack 自带的 HotModuleReplacementPlugin 插件)
  - 开发代码使用 devServer
    - 修改某个 js 文件，只重新加载指定的 js 文件，不全部重新加载
    - 修改某个 css 文件，只重新加载指定的 css 文件，不全部重新加载
- 2.4-Babel 处理 ES6 语法
  - 依赖文件：npm install --save-dev babel-loader @babel/core @babel/preset-env
  - webapck 对应的配置规则，以及.babelrc 的作用
  - 兼容低级浏览器的 polyfill 文件使用
  - 第三方库内使用 babel 与项目内使用的配置区别
- 3.1-Tree Shaking 概念详解
  - 默认引入的模块中的内容会全部打包到主模块内，不管你是否只用了部分函数或变量
  - 通过使用 webpack 内置的 Tree Shaking，来让其只打包真正引入的文件中的指定函数（只支持 ES Module）
  - ES Module：静态引入； CommonJS：动态引入；
- 3.2-Develoment 和 Production 模式下打包
  - 将开发与生产环境共用 webpack 配置提到 common 中，独有配置分别在 dev 与 prod 中
  - npm i webpack-merge -D 独有与共用配置通过 merge 进行合并对外提供
  - package.json 中维护两种命令
  - 开发与生产环境的 devtool 配置有所区别
- 3.3-Webpack 和 CodeSplitting
  - 同步加载需要配置 wepback 中的 optimizatio 配置，若源码都是异步加载则不需要（尽量都配上）
  - 代码分割的好处（将大文件切割为小文件，减少加载代码的时间）、魔法注释使用方法
- 3.4-Lazy Loading 懒加载-Chunk 是什么？
  - 指定事件触发后，在去加载相应文件，减少不必要的性能浪费（搭配 CodeSplitting 使用）
  - 执行 build 命令，一个打包文件对应一个 chunk
- 3.5-打包分析,Preloading,Prefetching（提高首屏渲染速度）
  - 如何生成线上分析网站所需要的 json 文件
  - 目前的高性能前端代码（加载速度快），重点不是使用缓存，而是减少无用代码的加载，提高代码的使用率
  - 预加载：通过魔法注释 webpackPrefetch: true，在加载完登录首页，有剩余带宽时，去加载主页的资源
  - Preloading,Prefetching 一个是同时加载，一个是有剩余带宽时，再去加载暂不需要的资源
  - 通过浏览器查看代码覆盖率方式（开发者工具 - more tools - coverage）
- 3.6-css 代码分割
  - npm install --save-dev mini-css-extract-plugin（css 代码分割）
  - npm install --save-dev optimize-css-assets-webpack-plugin（压缩 css 代码的插件）
  - 模板 html 内直接引入的 css 走 filename；模板 html 内间接引入的 css 走 chunkFilename
- 3.7-Webpack 与浏览器缓存 caching
  - 解决每次打包生成文件名一致，导致浏览器走本地缓存；使用[contentHash]生成唯一 id 名称
  - 多个模块引用使用同一模块，但是部分模块无法编写代码引入；使用 ProvidePlugin 生成垫片
  - 默认每个模块的 this 指向都是自己，统一改变 this 指向；使用 imports-loader 实现
- 3.8-环境变量使用
  - 通过执行命令行进行传参，入口一致，入口判断具体环境，返回具体环境配置
- 4.1-library 打包
  - 兼容多种模块引入方式的方法
  - 不兼容多种模块引入方式，可以选择挂载到指定的全局变量上
  - 排除用户与第三方库同时引入同一库，导致用户打包后，存在两份相同代码
  - 自制库文件上传 npm，供其他用户 install 使用
- 4.2-PWA
  - 使用 http-server 模拟线上服务器（可替代 nginx 部分功能？？）
  - 实现服务器挂掉，用户还可以使用本地的缓存正常访问页面
- 4.3-type-script
  - typescript 与 javascript 的关系
  - 项目如何配置来支持 typescript 语法
  - 如何配置让普通的 js 库也有语法错误提示
- 4.4-WebpackDevServer 实现请求转发、解决单页面应用路由问题以及 eslint 配置方式
  - 开发环境下在不改动源码情况下与后台联调 通过 devServer 的 proxy 配置
  - 单页面路由问题，使用 historyApiFallback 默认找不到 html，都走 index.html
  - eslint 团队内约束编程风格的工具
    - 使用命令行检验编程规范（手动执行命令行）
    - 编码工具中结合现有的 eslint 插件，此插件可以根据配置文件实时的检验代码的规范性
    - webpack 结合 eslint-loader(每次加载代码，先检验 js 代码的规范)
- 4.5-提升 webpack 打包速度
  - 提升 webpack 打包速度大方向（三个方向）
  - resolve 参数合理配置
  - 使用 DllPlugin 提高打包速度（目标：第三方模块只打包一次）
  - 控制包文件大小
  - 选择 split 进行代码拆分
  - webpack 目前是单进程打包，以后有可能会用到多进程的，比如：thread-loader、parallel-webpack、happypack
  - 合理使用 sourceMap
  - 结合 stats.json 与线上解析，来分析打包过程中耗时较长的部分
  - 开发环境内存编译 devServer
  - 开发环境无用插件剔除
- 4.6-多页面打包
  - 用于兼容老项目，配置多个入口，每个入口都生产一个 html，内部自动引入共用以及私有 js 文件
  - clean-webpack-plugin、html-webpack-plugin、add-asset-html-webpack-plugin
- 5.1-如何编写一个 loader
  - 编写函数并对外暴露接口、webpack 配置绝对路径、源码处理并返回（同步、异步）
- 5.2-如何编写一个 plugin
  - 编写类并且内部有 apply 方法、apply 方法入参有许多钩子函数、webpack 内 plugins 使用 new、利用钩子函数进行操作
  - 显式调用 webpack 的 debug 模式，通过 debugger 在浏览器上查看调试代码
- 5.3-Bundler 源码编写
  - 对指定一个模块进行分析（返回入口文件以及它的依赖）
  - 编译成浏览器能识别的语言（es6 引入方式，浏览器无法解释）
  - 依赖图谱（Dependencies Graph）
  - 生成可执行代码
- 6.1-creatReactApp
  - 通过命令显示隐藏的 webpack 配置项
  - 简单的阅读以及每个模块的功能划分
- 6.2-vueCli3
  - vue 与 react 理念上的区别
  - vue 官网的 API 很重要
- webpack 官网介绍

  - concepts：核心概念
  - configuration：具体配置项的含义以及用法
  - api：制作自定义 loaders 与 plugins，需要查看的 API
  - guides：大面上结合语言、配置代码分割。。。
  - loaders：官方建议使用的 loaders（不行去 github，查看官方的文档）
  - plugins：官方建议使用的 plugins（不行去 github，查看官方的文档）

- 合理使用浏览器缓存机制
- webpack 打包后生成 index.html 模板、业务逻辑 js、第三方库 js
- 将三个文件上传到服务器上，浏览器加载 html 时，会加载这两个 js，并将其缓存下来
- 当修改了部分业务逻辑代码，重新打包上传服务器；打包生成的 js 名称不变，浏览器加载时会走缓存
- 导致无法加载最新代码
- 解决方法：通过内容生成以唯一 id 为名称的 js[contentHash],只要是修改了内容，html 模板中引入 js 的名称就不一致，
  就不会出现走缓存的情况
- 目前会生成 main.js(业务逻辑代码)、vendors~main.js(第三方库代码)、默认会有两块代码之间关联的代码 mainfest，会自动合并到 main.js 中（但是老版本的 mainfest 不改内容也会变化，通过配置 runtimeChunk:{name:'runtime',}，让 mainfeset 单独以名为 runtime 的文件存在）

- ==================================================
- 模块的意义以及改变默认模块的 this 指向
- webpack 是基于模块（每个 js 都是模块）打包的，index.js 中引入 jquery、lodash 以及 jquery.ui
  - jquery.ui 中\$会显示未定义，index.js 中会正常。由于 webpack 是基于模块的，index.js 中引入了相关模块，jquery.ui 中没有引入相关模块导致出现问题；可以保证模块之间没有耦合，不会出现其他模块覆盖了本模块的变量
  - 解决方法：在 jquery.ui 中引入 jquery 模块
  - 但是，若 jquery.ui 是第三方插件，无法修改源码呢？
  - 解决方法：使用垫片 webpack 内置的 ProvidePlugin 插件，通过配置 new webpack.ProvidePlugin({\$: 'jquery',\_join: ['lodash', 'join'],}),会在 webpack 打包时，自动给使用指定字符串的模块引入相应插件
- webpack 默认打包后，每个模块的 this 指向都是模块自己，若需要统一改变 this 指向(index-new.js)

  - npm i imports-loader -D
  - 配置{loader: 'imports-loader?this=>window',}来加载 js

- 到此 webpack.js.org - GUIDES 大部分都进行了讲解

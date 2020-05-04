- plugin 是基于事件驱动（发布订阅模式）开发的

  - 定义类，类内需要 apply 方法 详情参考 copyright-webpack-plugin.js
  - webpack 配置中使用，由于插件内部都是类，所以需要 new
  - 插件运行时会被调用 apply 方法，入参的 hooks 属性就是钩子函数（在某一时刻会被执行的函数 -> 生命周期函数）
    webpack - API - Compiler Hooks
  - hooks 内的钩子函数分为同步与异步（详情参考 copyright-webpack-plugin.js）
    - 同步需要调用 tap 函数
    - 异步需要调用 tapAsync 函数，最终必须执行 callback 函数

- debug 模式
  - 显式调用 webpack（好处在于可以配置参数项）"debug": "node --inspect --inspect-brk node_modules/webpack/bin/webpack.js",
    - --inspect：开启 debug 模式
    - --inspect-brk：在第一行打上断点
  - 执行 npm run debug 后，打开 chrome 的开发者工具，点击左上角有个绿色图标(可以在需要断点的地方写上 debugger)

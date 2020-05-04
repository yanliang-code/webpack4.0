- npm install --save-dev babel-loader @babel/core @babel/preset-env
  - babel-loader：加载工具（webpack 与 babel 的沟通桥梁）
  - @babel/core：js 语法编译器
  - @babel/preset-env：es6 转 es5 的所有规则
- 配置规则 [{ test: /\.js\$/, exclude: /node_modules/, loader: 'babel-loader' },options: { presets: ['@babel/preset-env']]
- 弥补低版本浏览器不支持的方法，npm install --save @babel/polyfill，在入口文件加上 import '@babel/polyfill';
- 若为第三方插件的就不适合全局 import '@babel/polyfill'方式，因为此种方式会采用注入全局变量,会产生变量污染
  - npm install --save-dev @babel/plugin-transform-runtime
  - npm install --save @babel/runtime
  - npm install --save @babel/runtime-corejs2
  - options: {plugins: [
    [
    '@babel/plugin-transform-runtime',
    {
    corejs: 2,
    helpers: true,
    regenerator: true,
    useESModules: false,
    },
    ],
    ],}
- babel 的配置项很多，可以单独创建一个.babelrc 文件，用于放置其 options（此文件内无法写注释）
- 设置 useBuiltIns: 'usage', 不需要手动 import '@babel/polyfill'，webpack 会自动引入

- presets 内的插件的执行顺序是由下至上，由右至左

- babeljs - Setup - Webpack
- babeljs - Docs - Usage Guide
- babeljs - Docs - Option
- babeljs - Docs - polyfill
- babeljs - Docs - transfrom-runtime

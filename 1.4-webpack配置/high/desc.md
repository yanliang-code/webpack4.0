- webpack.config.js -> webpack 配置文件
- src 文件夹中是编写的源代码
- 可以在 package.json 中的 script 中配置简化命令项，"bundle": "webpack" === npm run bundle: webpack
  这里执行 webpack 它会从项目中先开始找，而不是从全局中先找
- demo 是一个简易版的项目（结构、位置都一致）
- webpack-cli 是保证命令行中可以执行 npx webpack、webpack 这些命令
- 阅读 webpack 官网

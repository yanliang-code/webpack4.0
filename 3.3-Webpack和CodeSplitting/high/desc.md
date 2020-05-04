- Webpack 和 Code Splitting（代码分割）

- 问题记录：多文件入口无法打包成功、CleanWebpackPlugin 插件无法使用(VScode 自身问题，重启即可)
- index-old.js：库和业务逻辑全部打包到一个文件内
- index.js、lodash.js：库和业务逻辑分别打包（人为代码分割）
- 通过插件自动实现代码分割，webpack 配置 optimization: {splitChunks: {chunks: 'all',},}
- babel-plugin-dynamic-import-webpack 兼容 import().then(()=>{})写法
- 代码分割与 webpack 无关
- 同步加载与异步加载实现代码分割的区别(webpack 实现代码分割的两种方式)

  - './src/index-old.js', // 同步加载（需要 optimizatio 配置）
  - './src/index-sync.js', //异步加载（不需要 optimization 配置，也可实现代码分割）

- webpack 内部实现代码分割是使用的 SplitChunksPlugin 插件
- 阅读 webpack.js.org - PLUGINS - SplitChunksPlugin

* 小贴士：github 上搜索 clean-webpack-plugin 类似的第三方插件，有详细的配置说明
* npm install lodash --save

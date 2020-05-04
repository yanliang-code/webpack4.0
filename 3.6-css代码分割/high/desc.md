- output 中 filename、chunkFilename

  - 首先通过 entry 找到 main: './src/index.js',入口文件，打包完会看 output 中 filename 配置，最终生成 main.js
  - 主文件引入的文件打包会看 output 中 chunkFilename 配置，最终生成 main.chunk.js

- css 代码分割
  - npm install --save-dev mini-css-extract-plugin
  - 关于 css 配置再 webpack.common.js 中
  - 关于打包出的文件是基于插件配置的 filename 还是 chunkFilename，
    - 模板 html 内直接引入的 css 走 filename
    - 模板 html 内间接引入的 css 走 chunkFilename
  - npm install --save-dev optimize-css-assets-webpack-plugin（压缩 css 代码的插件）

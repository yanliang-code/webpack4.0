- 目前配置文件都在 webpack.config.js 中，切换开发与生产环境修改项较多
  - 通过维护两套配置文件（提出共同配置），分别在不同情况下使用不同配置文件进行打包（package.json 中配置）
  - npm i webpack-merge -D 通过 webpack-merge 将共用配置与独有配置合并组合
  - "dev": "webpack-dev-server --config webpack.dev.js", 按照开发环境配置启动一个服务器
    "build": "webpack --config webpack.prod.js" 按照生成环境配置打包生成文件
- Development 与 Production 模式的打包区别

  - Development
    - source-map 对应的全面
    - 代码不压缩
  - Production
    - source-map 对应不全面甚至没有
    - 代码压缩

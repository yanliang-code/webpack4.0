- devServer 实现请求转发
- proxy 用于开发环境下的请求转发，方便在不改动源码情况下与后台联调
- webpack.config.js 中使用的部分配置项，所有配置项的查看地点 webpack - DOCUMENTATION - CONFIGURATION - DevServer - devServer.proxy (https://github.com/chimurai/http-proxy-middleware#options 最下面的 http-proxy options)

- devServer 解决单页面应用路由问题
- 根路径，显示 home 页面； list 路径：显示 list 页面
- 默认根路径下显示 home 页面没问题，切换路径访问 list 路径，返回无法找到，devServer 会默认在项目中找 list.html，但是项目中只有 index.html 也就是主页面。所以访问 list 路径时，返回无法找到(因为是单页应用，只有一个 html)
- 解决方法：

  - webpack - DOCUMENTATION - CONFIGURATION - DevServer - devServer.historyApiFallback(https://github.com/bripkens/connect-history-api-fallback)
  - 在 devServer 中配置 historyApiFallback: true(package.json)
  - 原理：在找不到的 html，会默认加载 index.html

- eslint 团队内约束编程风格的工具，可自定义配置
  - 1.使用命令行检验编程规范
    - npm install eslint --save-dev
    - npx eslint --init(不使用 npx，默认使用全局全局按照的 eslint；使用 npx，使用项目中的 eslint)
      - use a popular style guide
      - airbnb（变态）
      - Y
      - 最终会在项目的路径下生成.eslintrc.js 文件
    - npx eslint src 验证 src 下文件是否符合 eslint 标准
    - .eslintrc.js 文件中配置 parser：babel-eslint 让其支持更多的语法约束
    - 若不想遵循指定规范中的具体某条规范，在.eslintrc.js 配置 rules:[提示名称：0]
    - BOM、DOM 的全局变量会提示红色波浪线，可在.eslintrc.js 配置 globals:{document: false}
  - 2.编码工具中结合现有的 eslint 插件，此插件可以根据配置文件实时的检验代码的规范性
  - 3.webpack 结合 eslint - npm install eslint-loader --save-dev
    - webpack.config 中配置在对 js 进行 babel-loader 转换前，先使用 eslint-loader 进行规范检验 - 在 devServer 上配置 overlay：true，一旦规范检验有问题，会在 web 页面上有一层遮罩层提示（vue 脚手架中就如此展示，eslint、eslint-loader、overlay）
    - 详情阅读 webpack - LOADERS - eslint-loader
    - 由于在加载 js 时每次都需要进行语法校验，不可避免耗费性能；视频建议不使用，在提交 git 仓库时，在钩子函数中进行代码校验，这样在打包过程中不会浪费时间去校验规范，但是调试的便捷性有所降低，做好取舍

- npx create-react-app my-app
  - create-react-app 脚手架工具（node 程序：会初始化工程目录以及 webpack 配置）
- 通过脚手架生成的项目，默认没有 webpack 配置；在你打包编译时会默认读取内置配置，react 可通过 npm run eject 命令显示隐藏项，config 与 scripts 文件夹

- webpack.config.js：通过变量的不同使用不同的 webpack 配置文件
- paths.js：项目内打包需要的所有文件路径（resolveApp -> 相对路径转换成绝对路径）
- env.js：初始化项目运行环境的文件
- webpackDevServer.config.js：webpack 服务器的配置文件，只有 npm run start 时会使用此文件（开发环境）

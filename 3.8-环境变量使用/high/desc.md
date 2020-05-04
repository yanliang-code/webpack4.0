- 实现通过一个配置文件达到两种环境的配置切换

- 通过执行命令时传递参数，让其 common 文件进行判断，返回不同环境的配置
  - "dev": "webpack-dev-server --config ./build/webpack.common.js", 不传参，默认走开发环境
  - "build": "webpack --env.production --config ./build/webpack.common.js" 通过--env.production 传递参数，决定返回生产环境（入参是 env:{production:'production'}）
  - "build": "webpack --env production --config ./build/webpack.common.js" common 中收到的入参直接就是 production
  - "build": "webpack --env production==adc --config ./build/webpack.common.js" common 中收到的入参是 env:{production:'abc'}

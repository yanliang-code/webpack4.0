// 执行npx webpack后，会寻找此文件，找到后按照此文件的配置进行打包
// 没有此文件，webpack会使用默认配置进行打包
// 若想按照指定的文件配置进行打包 npx webpack --config webpackconfig.js
const path = require('path');
module.exports = {
  // 默认使用production模式,打包出的文件会被压缩
  mode: 'development',
  // 打包从哪个文件开始打包
  entry: {
    main: './src/index.js',
  },
  // 定义模块规则
  //   module: {
  //     rules: [
  //       {
  //         // 正则匹配
  //         test: /.(png | jpg | gif | svg)$/,
  //         use: {
  //           // 使用的加载器（需要npm）
  //           loader: 'file-loader',
  //         },
  //       },
  //     ],
  //   },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  // 输出配置项
  output: {
    // 输出的文件名
    filename: 'bundle.js',
    // 输出的文件夹路径，需要绝对路径
    // path.resolve(__dirname, 'bundle')是将webpack.config所在位置拼接上bundle来生成最新路径
    path: path.resolve(__dirname, 'dist'),
  },
};

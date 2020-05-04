const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', //dist文件夹下会有出现一个main.js.map的映射文件
  // 配置服务器
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    // 修改src下文件自动刷新浏览器
    hot: true,
    // 不让浏览器重新刷新
    // hotOnly: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
module.exports = merge(commonConfig, devConfig);

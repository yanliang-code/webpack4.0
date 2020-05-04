const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
// 通过给webpack传入webpack的配置，返回编译器实例，每调用一次，就编译一次
// 在node中直接使用webpack
const complier = webpack(config);

const app = express();
// 文件发生改变，complier会重新运行，对应生成的文件放在publicPath下
app.use(
  webpackDevMiddleware(complier, {
    // publicPath: config.output.publicPath,
  })
);

app.listen(3000, () => {
  console.log('server port 3000 is running');
});

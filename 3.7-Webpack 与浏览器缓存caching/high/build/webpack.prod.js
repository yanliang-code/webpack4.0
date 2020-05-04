const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map', //dist文件夹下会有出现一个main.js.map的映射文件
  output: {
    filename: '[name].[contentHash].js',
    chunkFilename: '[name].[contentHash].chunk.js',
  },
};
module.exports = merge(commonConfig, prodConfig);

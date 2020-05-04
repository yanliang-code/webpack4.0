const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const WorkBoxPlugin = require('workbox-webpack-plugin');
const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map', //dist文件夹下会有出现一个main.js.map的映射文件
  output: {
    filename: '[name].[contentHash].js',
    chunkFilename: '[name].[contentHash].chunk.js',
  },
  plugins: [
    new WorkBoxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }), // sw: serviceWorker
  ],
};
module.exports = merge(commonConfig, prodConfig);

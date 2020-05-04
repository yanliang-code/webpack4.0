const path = require('path');
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  // 由于插件都是类，所以需要new
  plugins: [
    new CopyrightWebpackPlugin({
      name: 'yl',
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};

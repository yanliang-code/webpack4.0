const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');
const commonConfig = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      // 除去node_modules下的第三方插件，其他js通过babel-loader进行加载处理（第三方的都已经处理过）
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {},
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash].[ext]', //Placeholders 占位符
              outputPath: 'images/', //图片会放在dist的images文件夹内
              limit: 2048, //小于2kb使用url-loader，大于2kb使用file-loader(url-loader与file-loader相似，关键在于limit配置项)
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|svg|woff)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};

// 由对外提供对象改为函数
// 返回生产、开发环境配置，取决于传入的env参数
module.exports = (env) => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig);
  } else {
    return merge(commonConfig, devConfig);
  }
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
module.exports = {
  //   mode: 'development',
  mode: 'production',
  // devtool: 'cheap-module-eval-source-map', //dist文件夹下会有出现一个main.js.map的映射文件
  devtool: 'cheap-module-source-map', //dist文件夹下会有出现一个main.js.map的映射文件
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  // 配置服务器
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    hot: true,
    // 不让浏览器重新刷新
    hotOnly: true,
  },
  module: {
    rules: [
      // 除去node_modules下的第三方插件，其他js通过babel-loader进行加载处理（第三方的都已经处理过）
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 此部分移植到.babelrc内
          // plugins: [
          //     [
          //       '@babel/plugin-transform-runtime',
          //       {
          //         corejs: 2,
          //         helpers: true,
          //         regenerator: true,
          //         useESModules: false,
          //       },
          //     ],
          //   ],
          //   --------------------
          //   presets: [
          //     [
          //       '@babel/preset-env',
          //       {
          //         // 会通过判断指定的浏览器版本来进行是否兼容转换
          //         // targets: {
          //         //   chrome: '67',
          //         // },
          //         // 根据业务代码决定是否打包哪些polyfill中的内容到最终文件中
          //         useBuiltIns: 'usage',
          //       },
          //     ],
          //   ],
        },
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
    new webpack.HotModuleReplacementPlugin(),
  ],
  //   optimization: {
  //     usedExports: true,
  //   },
};

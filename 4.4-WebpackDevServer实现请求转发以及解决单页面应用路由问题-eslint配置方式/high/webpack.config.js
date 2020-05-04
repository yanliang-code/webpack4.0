const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', //dist文件夹下会有出现一个main.js.map的映射文件
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  // 配置服务器（只有开发环境下有效）
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    open: true,
    port: 8080,
    proxy: {
      // 正常在index.js配置url为相对路径，真实请求路径为http://localhost:8080/react/api/header.json
      // 配置代理规则后，发现端口后的与/react/api一致的会自动转发给使用指定域名与相对路径拼接的url上
      //   '/react/api': 'http://www.dell-lee.com',
      // 高级玩法
      '/react/api': {
        // target: 更换域名（ip,端口应该是默认的）
        target: 'http://www.dell-lee.com',
        // secure: false, // 转发的网址时https的，需要配置此项
        // 拦截器
        bypass: function (req, res, proxyOptions) {
          // 请求的是html文件时，直接返回index.html；若设置false，此次请求不进行转发，按源请求路径走
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return false;
            // return '/index.html';
          }
        },
        // pathRewrite：替换路径中的部分名称
        pathRewrite: {
          //   'header.json': 'demo.json',
        },
        changeOrigin: true, // 反正请求接口反跨域
        // 匹配多种请求路径的请求：使用context: ['/auth', '/api'],
        // 匹配/根目录时，需要配置index，否则不生效index: '',
        // 动态改变headers模拟登录以及鉴权，header:{}
      },
    },
    // hot: true,
    // 不让浏览器重新刷新
    // hotOnly: true,
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
    // new webpack.HotModuleReplacementPlugin(),
  ],
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    // main: './src/index.js',
    main: './src/index-new.js',
  },
  output: {
    // filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      // 除去node_modules下的第三方插件，其他js通过babel-loader进行加载处理（第三方的都已经处理过）
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 在使用babel前，会使用imports-loader将this指向改为window
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'imports-loader?this=>window',
          },
        ],
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
    // 若发现模块中使用了$这个字符串，就会自动在此模块中引入jquery
    // 可以将其理解为垫片，再发现你不兼容某些方法时，提前为你加载相应方法，防止你使用时因为没有导致报错
    new webpack.ProvidePlugin({
      $: 'jquery',
      // 也可以导入具体方法
      _join: ['lodash', 'join'],
    }),
  ],
  optimization: {
    // 兼容旧版本webpack内容无变化生成的[contentHash]也不一致问题
    // runtimeChunk: {
    //   name: 'runtime',
    // },
    // 代码分割
    splitChunks: {
      chunks: 'all', // 'async'只对异步代码进行代码分割； 'all'同步异步都处理； initial：同步代码处理
      minSize: 30000, //大于30kb,才会采用代码分割
      //   minSize: 0, //大于0kb,就会采用代码分割
      //   maxSize: 50000, //最大50kb  lodash 1mb 会尝试对lodash进行多次分割
      minChunks: 1, //打包后的chunk通过import引入文件的次数，大于等于指定值，才会进行代码分割
      maxAsyncRequests: 6, // 最大异步加载数，10插件应打包10个js，但超过第六个就不会单独打包，会合并到主文件内
      maxInitialRequests: 4, //入口文件文件做代码分割最多4个
      automaticNameDelimiter: '~', //组与文件的中间连接符
      name: true,
      // 它可以起缓存效果，符合上面的要求后，通过此字段配置，分成两种情况
      // 1.在node_modules下的所有插件打包为vendors.js
      // 2.不在node_modules下的所有插件打包为common.js
      cacheGroups: {
        // all或同步代码情况下，会参考vendors配置项，
        // 若在node_modules下进行代码分割，放到vendors.js中
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 优先放入优先级高的组内
          //   filename: 'vendors.js', //重命名
        },
        // 若没在node_modules下，则参考default字段
        default: {
          priority: -20,
          reuseExistingChunk: true, //会判断此时的插件包之前是否打包到某个组内，若打包了，就忽略不在打包
          //   filename: 'common.js',
        },
      },
    },
  },
};

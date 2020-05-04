// 执行npx webpack后，会寻找此文件，找到后按照此文件的配置进行打包
// 没有此文件，webpack会使用默认配置进行打包
// 若想按照指定的文件配置进行打包 npx webpack --config webpackconfig.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
module.exports = {
  // 默认使用production模式,打包出的文件会被压缩
  mode: 'development',
  // 打包从哪个文件开始打包
  entry: {
    // 打包的入口文件为src下的index.js，最终生成main.js
    // 也可以通过配置，对同一个入口文件，打包为main.js、sub.js,若配置filename，这样就会报错多个重名文件
    main: './src/index.js',
    sub: './src/index.js',
  },
  // 输出配置项
  output: {
    // 统一在js前加路径
    publicPath: 'http://cdn.com.cn',
    // 输出的文件名(这里设置后，会将最终的打包文件改名为bundle)
    // filename: 'bundle.js',
    // 使用占位符，[name]使用entry中配置的name，[hash]使用唯一id
    filename: '[name].js',
    // filename: '[hash].js',
    // 输出的文件夹路径，需要绝对路径
    // path.resolve(__dirname, 'bundle')是将webpack.config所在位置拼接上bundle来生成最新路径
    path: path.resolve(__dirname, 'dist'),
  },
  // 定义模块规则
  module: {
    // loader在webpack中的执行顺序：从下到上、从右到左
    rules: [
      {
        // 正则匹配
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            // file-loader会将图片copy一份，并将生成的图片路径返回（图片比较大，适合使用这个）
            // loader: 'file-loader',
            // url-loader直接将图片base64编码，放入js中（图片小，可以使用，也不会加大js加载速度，也不用三次握手发起请求）
            loader: 'url-loader',
            // 额外配置项
            options: {
              // 打包出的图片的名字与尾缀
              name: '[name]_[hash].[ext]', //Placeholders 占位符
              outputPath: 'images/', //图片会放在dist的images文件夹内
              limit: 2048, //小于2kb使用url-loader，大于2kb使用file-loader(url-loader与file-loader相似，关键在于limit配置项)
            },
          },
        ],
      },
      {
        // 使用file-loader处理eot ttf svg woff文件
        test: /\.(eot|ttf|svg|woff)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        // 这里要是使用新潮的css，
        // 比如：scss，在下面两个loader外，还需要sass-loader将scss翻译为普通css
        test: /\.css$/i,
        // css-loader：分析出css间互相引入的关系，合并成一个css文件
        // style-loader：将合并后的css文件挂载到header上
        // postcss-loader：自动加上厂商前缀 例如：transform，在使用时，会寻找postcss.config.js文件，加载autoprefixer插件
        // 若需要给指定的loader加配置项，需要将其写成对象
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 保证import引入的文件会再走一遍postcss-loader
              importLoaders: 2,
              // 开启css模块式打包（默认css都是放到header内，为全局样式）（只支持scss，普通css无法使用）
              // 那些文件需要哪些样式，需要进行引入，列别名，通过对象属性的方式获取
              //   module: true,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  // plugins可以在webpack运行到某个时刻，帮你做一些事情
  // HtmlWebpackPlugin：在整个打包结束后再做一些事情
  // CleanWebpackPlugin：在打包之前执行一些操作
  plugins: [
    // HtmlWebpackPlugin在打包结束时，自动生成index.html文件，并且引入打包后的js（此处html只是标准的模板）
    new HtmlWebpackPlugin({
      // 定制化html，可通过指定参考的html模板
      template: 'src/index.html',
    }),
    // 打包前先删除dist文件夹
    new CleanWebpackPlugin(),
  ],
};

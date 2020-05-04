const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
module.exports = {
  // 开发模式。默认将sourceMap配置了
  mode: 'development',
  // 使用inline-source-map时，main.js.map会被编码为base64放到main.js中（可精确到行列）
  // cheap-inline-source-map效果同inline-source-map（只精确到行）
  // source-map：会生成映射文件
  // cheap：只精确到行，loader、plugin中的错误无法映射
  // module：会把第三方插件也映射进来（来弥补cheap的缺陷）
  // inline：会将映射文件base64编码引入到打包后的js文件中
  // eval：使用eval来执行指定的js，并绑定对应的源文件（也会将映射文件放入js中）
  // development开发实践建议使用：cheap-module-eval-source-map
  // production生产实践建议使用：cheap-module-source-map
  devtool: 'cheap-module-eval-source-map', //dist文件夹下会有出现一个main.js.map的映射文件
  entry: {
    main: './src/index.js',
  },
  output: {
    // publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  // 配置服务器
  devServer: {
    contentBase: './dist',
    // 自动打开浏览器，并访问服务器地址
    open: true,
    port: 8080,
    // 访问http://localhost:8080/api会自动转发到http://localhost:3000
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
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
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
        ],
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

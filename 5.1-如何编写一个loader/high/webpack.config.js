const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  // 在配置loader对应的路径时，先去node_modules下找，再去./loaders下找
  resolveLoader: {
    modules: ['node_modules', './loaders'],
  },
  module: {
    rules: [
      {
        test: /\.js/,
        // 加载js文件时，使用指定路径下的js进行加载处理
        // use: [path.resolve(__dirname, './loaders/replaceLoader.js')],
        use: [
          // 加载多个自定义插件的方式，记得加载顺序由下到上、由右到左
          {
            // loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
            loader: 'replaceLoader',
            // options: {
            //   name: 'yl',
            //   age: 12,
            // },
          },
          {
            // loader: path.resolve(__dirname, './loaders/replaceLoaderAsync.js'),
            loader: 'replaceLoaderAsync',
            options: {
              name: 'world1',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};

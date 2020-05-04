class CopyrightWebpackPlugin {
  constructor(options) {
    console.log('插件被使用了==', options);
  }
  // 插件被调用时，会调用apply方法
  // 传入参数中hooks属性 为钩子函数
  apply(complier) {
    // 同步函数使用tap函数
    complier.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
      console.log('compiler');
    });
    // 即将往dist文件夹中生成文件前的钩子函数（异步函数使用tapAsync函数，必须指定callback函数）
    complier.hooks.emit.tapAsync(
      'CopyrightWebpackPlugin',
      (compilation, callback) => {
        debugger;
        // 打包生成的内容会存储在compilation.assets中
        compilation.assets['copyright.txt'] = {
          // 放入的内容
          source: function () {
            return 'copyright by yl';
          },
          // 内容的字节数
          size: function () {
            return 15;
          },
        };
        callback();
      }
    );
  }
}

module.exports = CopyrightWebpackPlugin;

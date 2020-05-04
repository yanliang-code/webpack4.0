- 只打包引入的依赖函数

  - 开发环境(打包后，为了方便调试，保持定位源码行数，没有引入的还会打包，但是会有文字提示)
    - 在 webpack 中设置 optimization：{usedExports: true,} //会判断依赖文件导出的函数以及父级文件导入的函数
    - 在 package.json 中设置"sideEffects": [“放入不通过 tree sharking 引入的第三方插件名”,"*.css"],没有排除的直接写 false
  - 生成环境()
    - 只需 mode: 'proudct'以及 sideEffects": false，其他的配置不需要，所有没有引入的依赖都不会打入

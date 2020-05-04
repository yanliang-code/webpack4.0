- 提升 webpack 打包速度方向

  - 跟上技术的迭代（node、npm、yarn、webpack）
  - 在尽可能少的模块上应用 loader（应用 exclude 或 include 保证不需要 loader 加载的文件使用 loader）
  - Plungin 尽可能精简并确保可靠（分清生产和开发环境的需求，比如只有生产需要压缩插件，因为这样打包出的文件，用户访问时，加载速度更快；但是开发环境不需要，因为这样打包会浪费更多时间）（尽量使用官方、社区推荐的）

- resolve 参数合理配置

  - webpack 中配置 resolve:{extensions:['.js', '.jsx']} , 通过 import、require 引入模块时，不写后缀；默认先配置对应路径下 js 文件，若没有，匹配 jsx 文件（每次匹配都要调用 node 底层的文件查找接口）（不建议所有后缀都写入，浪费性能，一般逻辑类的后缀可以写在其中，css、jpg 资源类的这些在引入时加上后缀）
  - resolve:{mainFiles:['index', 'child']} 引入模块时，只写路径，不写具体文件名；会默认匹配 index 文件名，可以自定义补充其他选项，先后顺序由数组内元素顺序决定(不建议使用)
  - resolve:{alias:{yl-code: path.resolve(\_\_dirname, '../src/child')}} , 列别名，引入时直接写'yl-code',引入的路径是其对应的值(不建议使用)

- 使用 DllPlugin 提高打包速度（目标：第三方模块只打包一次）

  - 原理：将第三方的包进行打包，下次打包项目时，就不会进行第三方库的打包处理，节省时间。
  - 第三方模块只打包一次
    - 另建 webapck-dll.js，内部配置入口（列出第三方库），输出位置以及设置引入此文件后全局生产的变量名
    - package.json 中设置对应的使用 dll 配置的打包命令
    - npm install add-asset-html-webpack-plugin -save,自动加载 静态资源 到 HtmlWebpackPlugin 插件上（会自动生成 html 模块）plugins：[new add-asset-html-webpack-plugin({filePath: path.resolve(\_\_dirname, '../dll/vendors.dll.js')})]
  - 引入第三方模块时，使用 dll 文件引入
    - 在 dll 配置文件中，配置 plugins：[new webpack.DllPlugin({name:'[name]', path: path.resolve(\_\_dirname, '../dll/[name].mainfest.json')})] 用 webpack 内置的 DllPlugin 的插件分析出第三方库的关系
    - 在 common 中配置 plugins：[new webpack.DllReferencePlugin({mainfest: path.resolve(\_\_dirname, '../dll/vendors.mainfest.json')})] 此配置文件在项目打包时，发现 src 中源码引入的模块在 json 内映射关系中，那么就是直接用 dll 生成的打包文件（全局变量中拿取），不在 node_modules 进行加载
  - 对第三方库进行拆解，分模块打包
    - 打包后会生成多个 dll.js、mainfest.json
    - 需要在 common 中配置多个 new add-asset-html-webpack-plugin、new webpack.DllReferencePlugin
    - 优化：将 plugins 对应的数组写成变量，固定的插件直接写入，动态添加的，通过 fs 模块读指定目录下的文件，循环匹配文件类型，动态添加到数组内

- 控制包文件大小
  - 在某个模块引入许多其他模块，又没引入 tree sharking，这样就会存在冗余代码，造成文件过大
- 选择 split 进行代码拆分，提高打包速度（最好编码时就不要引入不使用的模块）
- webpack 目前是单进程打包，以后有可能会用到多进程的，比如：thread-loader、parallel-webpack、happypack
- 合理使用 sourceMap
- 结合 stats.json 与线上解析，来分析打包过程中耗时较长的部分
- 开发环境内存编译 devServer
- 开发环境无用插件剔除

- node 库文件打包

  - npm init -y
  - npm i webpack webpack-cli --save

- 第三方库引入方式
- import a from 'a.js' (ES6)
- const a = require('a.js') (CMD JS)
- require(['a.js'], function(){}) (AMD)
- <script src="./a.js"></script>  在引入模块中使用变量a进行全局使用

- 兼容前三种引入方式 webpack 配置 libraryTarget: 'umd',
- 若想兼容第四种方式，在兼容前三种的基础上配置 library: 'library'（打包生成全局变量 library，将涉及方法挂载上）
- 若不兼容，前三种引用方式，可以将 library 对应的第三方库对象挂载到 libraryTarget 对应的对象上

- 自作 node 库文件内引入其他插件比如 lodash，用户也有可能会引入 lodash，最终用户打包，打包文件内会有两个 lodash

  - externals: ['lodash',打包是遇到数组内元素名的插件，不进行打包],此种方式必须要让用户手动引入数组内的插件
    详情查看：webpack - DOCUMENTATION - configuration - externals（可指定不同引入方式下的用户给 lodash 的命名 ES6 Module commonJs script）

- 上传 npm，提供其他人下载使用

  - 通过修改 package.json 文件中 main 对应的值，保证入口文件指向打包后的文件
  - npm 官网注册账号 账号密码必须超过十位
  - cmd 中执行 npm adduser 命令，依次输入用户名、密码、邮箱
  - npm publish（别人就可以通过 npm install 名字（package.json 中的 name 对应值））

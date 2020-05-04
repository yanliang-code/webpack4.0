- typescript 是 javascript 的超集，支持 javascript 的所有语法外，还支持 typscript 语法（强类型等等）

- 项目打包 typescript 文件必要前提（需要配置支持这种语法）

  - npm install ts-loader typescript --save-dev 安装对应 tsx 文件的 loader
  - ts-loader 打包时，需要 tsconfig.json 文件（内部存储对 ts 文件打包的配置项）（可在 typescript 官网上了解）

- 想让平时引入的 js 库代码开发过程中也有语法错误的提示
  - npm install @types/lodash lodash --save-dev 需要配套下载对应库的类型文件
  - 引入方式 import \* as \_ from 'lodash';（引用方式由 tsconfig.json 中 module 决定）
  - 查看对应库是否有 @types -> https://github.com/DefinitelyTyped/DefinitelyTyped -> https://microsoft.github.io/TypeSearch/ -> 若能搜到，可以在原有库名前加上@types

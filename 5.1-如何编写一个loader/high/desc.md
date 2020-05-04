- 编写一个 loaders

  - 新建一个 js，通过 commonJs 方式对外暴露一个接口，不能使用箭头函数，入参是加载的 js 源码
  - webpack 中配置指定文件类型使用自定义的 loader 进行加载，loder 对应值需要写绝对路径
  - 配置 loader 时，配置 options，此字段对应的值，会在挂载到 this 的 query 属性上，传递给自定义 loader

- 逻辑中有异步时的应对方式

  - 查看 loders 文件下的对应文件

- 用途（只要是需要对源代码进行包装，就可以使用 loaders）

  - 例如：监听代码异常，可以在不改变源码的情况下，使用 loaders 为源码加上 try catch 语句
  - 国际化，中英文切换，使用 loader 进行判断全局变量区分中英文版本，进行词条的替换

  - 阅读 webpack - API - Loader Interface

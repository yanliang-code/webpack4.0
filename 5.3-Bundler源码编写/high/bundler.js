const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

// 入参：入口文件
// 返回值：入口文件路径、入口文件依赖文件(相对路径：绝对路径)、es6语法经babel编译后的源码
const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, 'utf-8');
  // 打印结果是ast 抽象语法树
  // ast.program.body内type为ImportDeclaration是引用，ExpressionStatement是变量声明
  const ast = parser.parse(content, {
    sourceType: 'module', // es6方式引入的
  });
  const dependencies = {}; // key为相对于入口文件的相对路径，value为相对于项目的相对路径
  // 参数一：抽象语法数；参数二：对象内的对应的key若存在ast.program.body，就会被调用
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filename); //入口文件
      const newFile = './' + path.join(dirname, node.source.value); //入口文件与引入依赖的相对路径进行结合
      dependencies[node.source.value] = newFile; //此时分析出的依赖是相对于入口文件的相对路径
    },
  });
  // 将源码翻译成浏览器可以解释的写法
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
  });
  // 返回入口文件以及它的依赖
  return {
    filename,
    dependencies,
    code,
  };
};

// 获取依赖图谱
const makeDependenciesGraph = (entry) => {
  const entryModule = moduleAnalyser(entry);
  // 维护一个数组，在第一次循环中，若存在依赖，会向数组中添加元素；执行循环内部逻辑，此时数组的长度已变长
  // 再进行下一次的循环，直到某次循环时没有依赖，数组长度不再变长，循环停止
  const graphArray = [entryModule];
  for (let i = 0; i < graphArray.length; i++) {
    const { dependencies } = graphArray[i];
    if (dependencies) {
      for (const j in dependencies) {
        graphArray.push(moduleAnalyser(dependencies[j]));
      }
    }
  }
  // 转换格式 数组 -> 对象
  const graph = {};
  graphArray.forEach((item) => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code,
    };
  });
  return graph;
};

const generateCode = (entry) => {
  // 需要转换为字符串，否则，下面字符串模板无法获取真正数据
  const graph = JSON.stringify(makeDependenciesGraph(entry));
  // 生成代码，代码要放在闭包中，避免污染全局变量
  // 编译后的code代码中含有require、exports，浏览器无法解析，需要构建这两种函数
  return `
  (function(graph){
      function require(module){
          function localRequire(relativePath){
              return require(graph[module].dependencies[relativePath]);
          }
          var exports = {};
          (function(require, exports, code){
              eval(code);
          })(localRequire, exports, graph[module].code);
          return exports;
      }
      require('${entry}');
  })(${graph});
`;
  /**
   * 注释理解版本
  return `
    (function(graph){
        function require(module){
            function localRequire(relativePath){
                // 这里直接调用最外层的require
                // 找当前模块的依赖关系，通过relativePath来找到相对项目的相对路径
                return require(graph[module].dependencies[relativePath]);
            }
            // 在eval执行代码时，除了require，还需要exports(就是借助其导出参数)
            var exports = {};
            (function(require, exports, code){
                // 运行babel编译后的代码，由于code中会调用require方法，但是当前外层的require的入参的相对项目的相对路径
                // 所以，需要半路拦截一下，对路径进行处理,先走闭包内的局部变量require
                eval(code);
            })(localRequire, exports, graph[module].code);
            return exports;
        }
        require('${entry}'); // 调用require方法开始解析
    })(${graph});
  `;
   */
};

// 入参：入口文件
// 返回值：依赖图谱
const code = generateCode('./src/index.js');
console.log('code===', code);

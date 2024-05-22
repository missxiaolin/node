const fsEditor = require('mem-fs-editor');
const postcss = require('postcss');
const postcssImport = require('postcss-import');

// 创建内存文件系统
const memFs = fsEditor.create();

// 在内存中创建两个CSS文件
memFs.write('file1.css', `.class1 { color: red; }`);
memFs.write('file2.css', `.class2 { background-color: blue; }`);

// 创建一个读取内存文件的虚拟文件系统
const virtualFs = require('fs').createReadStream.bind(fs, '/dev/null');
virtualFs.stat = require('fs').statSync.bind(fs, '/dev/null');

// 使用postcss-import处理内存中的CSS文件
const result = await postcss([
  postcssImport({
    resolve: (id, basedir) => {
      // 由于我们使用的是内存文件系统，这里返回文件名即可
      return id;
    },
    load: (id) => {
      // 从内存中读取CSS文件内容
      return memFs.read(id, 'utf8');
    },
  }),
])
.process('@import "file1.css";\n@import "file2.css";', {
  from: undefined,
  map: false,
  parser: require('postcss-safe-parser'),
  sourceMap: false,
  // 提供虚拟文件系统
  customFs: virtualFs,
});

// 输出合并后的CSS
console.log(result.css);
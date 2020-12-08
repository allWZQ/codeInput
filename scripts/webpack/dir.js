const path = require('path');

const root = path.resolve(__dirname, '../../');

const dirs = {
  // 根目录
  root: root,
  // 源码目录
  src: path.resolve(root, './src'),
  // 多页面目录
  pages: path.resolve(root, './src/pages'),
  // vendor
  dll: path.resolve(root, './dll'),
  // 生成目录
  dist: path.resolve(root, './dist'),
  // modules
  modules: path.resolve(root, './node_modules'),

  packageJSON: path.resolve(root, './package.json'),
};

module.exports = dirs;

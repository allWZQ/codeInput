const glob = require('glob');
const path = require('path');
const fs = require('fs');
const dirs = require('./dir');
let tsReg = /([\w-]+)(?=\/index.tsx)/;
const entries = {};
const templates = {};
glob.sync(path.resolve(dirs.src, './pages/*/index.tsx')).forEach((item) => {
  const name = item.match(tsReg)[1];
  let template = path.resolve(dirs.src, `./pages/${name}/index.ejs`);
  if (!fs.existsSync(template)) {
    template = path.resolve(dirs.src, `./pages/common.ejs`);
  }
  entries[name] = item;
  templates[name] = template;
});
module.exports = {
  entries,
  templates,
};

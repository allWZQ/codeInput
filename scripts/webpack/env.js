const envSplitCode = '--';
const dealArgv = () => {
  let argv = [...process.argv];
  argv.splice(0, 2);
  let result = {};
  argv.forEach((item) => {
    let keyValue = item.trim().split('=');
    let key = keyValue[0];
    let value = keyValue[1];
    if (!key || key.indexOf(envSplitCode) < 0) {
      return;
    }
    key = key.replace(envSplitCode, '');
    if (value) {
      result[key] = value;
    }
  });
  return result;
};

const generateDefine = (params) => {
  let defaultParams = {
    API_ENV: JSON.stringify(params.env || 'production'),
    USE_LOCAL_CONFIG: !!params.islocal, // api环境用自己配置的，不用客户端传来的，便于调试各个环境
    LOG: !!params.log, // 可以配置日志的显示与否
    OS: JSON.stringify(params.os || 'win'), // 操作系统
    IS_EXT: !!params.ext,
    IS_DEVELOP: !!params.isdevelop,
  };
  let result = {};
  Object.keys(defaultParams).forEach((key) => {
    let value = defaultParams[key];
    result[`process.env.${key}`] = value;
  });
  return result;
};
let dealedArgv = dealArgv();
let injectedParams = generateDefine(dealedArgv);
module.exports = injectedParams;

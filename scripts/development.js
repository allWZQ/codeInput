const configFactory = require('./webpack/webpack.config');
const { mode, port: PORT } = require('./webpack/config');
const dirs = require('./webpack/dir');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const ignoredFiles = require('react-dev-utils/ignoredFiles');

const {
  createCompiler,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const chalk = require('react-dev-utils/chalk');

const DEFAULT_PORT = PORT;
const HOST = '0.0.0.0';
try {
  const devServerConfigs = {
    hot: true,
    overlay: false,
    quiet: true,
    host: '0.0.0.0',
    port: DEFAULT_PORT,
    historyApiFallback: true,
    contentBase: dirs.dist,
    watchContentBase: true,
    // 使用了webpackHotDevClient这个插件，这边要配置为ws
    transportMode: 'ws',
    injectClient: false,
    watchOptions: {
      ignored: ignoredFiles(dirs.src),
    },
  };
  const appName = require(dirs.packageJSON).name;
  const config = configFactory(mode.DEV, true);
  const devSocket = {
    warnings: (warnings) =>
      devServer.sockWrite(devServer.sockets, 'warnings', warnings),
    errors: (errors) =>
      devServer.sockWrite(devServer.sockets, 'errors', errors),
  };
  const urls = prepareUrls('http', HOST, DEFAULT_PORT, '');
  const compiler = createCompiler({
    appName,
    config,
    webpack,
    urls,
    devSocket,
  });
  const devServer = new WebpackDevServer(compiler, devServerConfigs);
  devServer.listen(DEFAULT_PORT, '0.0.0.0', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.cyan('正在启动服务...\n'));
  });
} catch (err) {
  if (err && err.message) {
    console.log(err.message);
  }
  process.exit(1);
}

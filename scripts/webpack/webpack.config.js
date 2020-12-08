const webpackConfigs = require('./config');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const webpack = require('webpack');
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const dirs = require('./dir');
const { antdVariable } = require('./config');
const { entries, templates } = require('./pages');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appPackageJson = require(dirs.packageJSON);
const envs = require('./env');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (mode, hot) => {
  const isDevelopment = mode == webpackConfigs.mode.DEV || hot;
  const isProduction = !isDevelopment;
  const isFullSourceMap = !!envs['process.env.FULL_SOURCEMAP'];
  const isCDN = !!envs['process.env.IS_CDN'];
  const isAnal = !!envs['process.env.IS_ANAL'];
  const publicPath = isCDN
    ? isProduction
      ? webpackConfigs.cdnPath.PRO
      : webpackConfigs.cdnPath.DEV
    : webpackConfigs.DEFAULT_PUBLICPATH;
  let entriesConfig = {};
  Object.keys(entries).forEach((item) => {
    entriesConfig[item] = [
      isDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'),
      entries[item],
    ].filter(Boolean);
  });
  const config = {
    mode: mode,
    bail: false,
    devtool: isProduction
      ? isFullSourceMap
        ? 'source-map'
        : false
      : 'cheap-module--eval-source-map',

    entry: entriesConfig,
    output: {
      path: isProduction ? dirs.dist : undefined,
      pathinfo: isDevelopment,
      filename: isDevelopment
        ? 'js/bundle_[name].js'
        : 'js/[name].[contenthash:8].js',

      chunkFilename: isDevelopment
        ? 'js/[name].chunk.js'
        : 'js/[name].[contenthash:8].chunk.js',

      publicPath: publicPath,
      jsonpFunction: `webpackJsonp${appPackageJson.name}`,
      // TODO: 暂用this
      globalObject: 'this',
    },

    optimization: {
      minimize: isProduction,
      // 自动分割公共部分代码
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      runtimeChunk: {
        name: (entrypoint) => {
          return `runtime-${entrypoint.name}`;
        },
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              // terser官方推荐，如果不想兼容ie11的话，最好是配置为最新的
              ecma: 8,
            },
            compress: {
              ecma: 3,
              warnings: false,
              // true的时候有bug，官方有介绍
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              inline: 2,
            },
            mangle: {
              // 支持safari
              safari10: true,
            },
            keep_classnames: false,
            keep_fnames: false,
            output: {
              ecma: 5,
              comments: false,
              // 关闭的时候对emoji有影响
              ascii_only: true,
            },
          },
          sourceMap: isFullSourceMap,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parse: safePostCssParser,
            // eslint-disable-next-line indent
            map: isFullSourceMap ? { inline: false, annotation: true } : false,
            cssProcessorPluginOptions: {
              preset: [
                'default',
                { minifyFontValues: { removeQuotes: false } },
              ],
            },
          },
        }),
      ],
    },

    resolve: {
      modules: [dirs.src, dirs.modules],
      extensions: webpackConfigs.moduleFileExtensions,
      alias: {
        '~': dirs.src,
      },
    },

    module: {
      // 错误的导出直接报错
      strictExportPresence: true,
      rules: [
        {
          oneOf: [
            {
              test: /\.tsx?$/,

              include: dirs.src,

              use: [
                // 'thread-loader',
                {
                  loader: 'babel-loader',
                  options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    compact: !isDevelopment,
                  },
                },
              ],
            },
            {
              test: /\.js$/,
              include: dirs.modules,
              use: [
                // 'thread-loader',
                {
                  loader: 'babel-loader',
                  options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    compact: !isDevelopment,
                  },
                },
              ],
            },
            {
              test: /\.css$/,
              use: [
                isDevelopment && 'style-loader',
                isProduction && MiniCSSExtractPlugin.loader,
                'css-loader',
              ].filter(Boolean),
            },
            {
              test: /\.(json|conf)$/,
              loader: 'json-loader',
              include: dirs.src,
              exclude: /node_modules/,
            },
            {
              test: /\.less$/,
              use: [
                isDevelopment && 'style-loader',
                isProduction && MiniCSSExtractPlugin.loader,
                'css-loader',
                {
                  loader: 'less-loader',
                  options: {
                    lessOptions: {
                      javascriptEnabled: true,
                      modifyVars: {
                        ...antdVariable,
                      },
                    },
                  },
                },
              ].filter(Boolean),
            },
            {
              test: /\.scss$/,
              use: [
                isDevelopment && 'style-loader',
                isProduction && MiniCSSExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: true,
                    sourceMap: isFullSourceMap,
                    modules: {
                      localIdentName: '[local]__[name]-[hash:base64:4]',
                    },
                  },
                },
                {
                  loader: 'sass-loader',
                  options: {
                    implementation: require('sass'),
                  },
                },
              ].filter(Boolean),
            },

            {
              test: /\.(json|conf)$/,
              loader: 'json-loader',
              include: dirs.src,
              exclude: /node_modules/,
            },
            {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 5 * 1000,
                    name: 'images/[path][name].[ext]',
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    plugins: [
      ...Object.keys(entries).map((app) => {
        let minifyOptions = {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        };
        if (isDevelopment) {
          minifyOptions = {};
        }

        let options = {
          inject: true,
          template: templates[app],
          filename: `${app}.html`,
          title: '',
          chunks: [app],
          ...minifyOptions,
        };
        return new HtmlWebpackPlugin(options);
      }),
      new webpack.DefinePlugin({
        // TODO: 任意的想要注入到js代码中的变量
        ...envs,
      }),

      // 当项目运行过程中，如果新安装了一些包，每次都需要重启应用才能生效，
      // 此插件可以允许在运行过程中安装新包，而不需要重启整个应用
      isDevelopment && new WatchMissingNodeModulesPlugin(dirs.modules),

      isProduction &&
        new MiniCSSExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].chunk.css',
        }),
      isAnal &&
        new BundleAnalyzerPlugin({
          analyzerHost: '0.0.0.0',
          analyzerPort: 8088,
          openAnalyzer: false,
        }),
    ].filter(Boolean),
  };

  return config;
};

const { defineConfig } = require('@vue/cli-service');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const VConsolePlugin = require('vconsole-webpack-plugin');
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

const path = require('path');

const cliConfig = require('./src/config/cli');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const {
  transpileDependencies,
  publicPath,
  outputDir,
  lintOnSave,
  assetsDir,
  productionSourceMap,
  css,
  pwa,
  devServer,
  pluginOptions,
  cdn,
  productionGzipExtensions,
  isProcess,
  isProduction,
} = cliConfig;

module.exports = defineConfig({
  transpileDependencies,
  publicPath,
  outputDir,
  lintOnSave,
  assetsDir,
  productionSourceMap,
  css,
  // PWA 插件相关配置
  pwa,
  // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
  devServer,
  // 第三方插件配置 https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
  pluginOptions,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'));

    config.optimization.runtimeChunk('single');
    config.plugin('html').tap((args) => {
      args[0].title = '';
      // 配置环境cdn
      isProcess && (args[0].cdn = cdn);
      return args;
    });

    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
    // 压缩代码
    config.optimization.minimize(true);

    if (isProcess) {
      config.externals(cdn.externals);
    }
  },

  configureWebpack: (config) => {
    // 利用splitChunks将每个依赖包单独打包，在生产环境下配置
    // 开启gzip压缩
    config.plugins.push(
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8,
      }),
      new VConsolePlugin({
        filter: [],
        enable: !isProduction,
      }),
      ComponentsPlugin({
        resolvers: [VantResolver()],
      })
    );

    // config.externals = isProcess ? cdn.externals : {};

    // 取消webpack警告的性能提示
    config.performance = {
      hints: 'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 ts 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.ts');
      },
    };

    // 开启分离js
    config.optimization = {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'async',
        maxInitialRequests: 3,
        maxAsyncRequests: 5,
        automaticNameDelimiter: '~',
        minSize: 20000,
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,
          },
          default: {
            name: 'default',
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    };
  },
});

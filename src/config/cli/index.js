function env(envArr = ['production', 'test', 'pre']) {
  return envArr.includes(process.env.NODE_ENV);
}

module.exports = {
  //  是否兼容ie
  transpileDependencies: true,
  //  公共路径
  publicPath: './',
  //  打包的目录
  outputDir: 'dist',
  //  保存是是否lint操作
  lintOnSave: true,
  //  静态资源打包目录
  assetsDir: 'static',
  //  是否生成map文件
  productionSourceMap: false,
  //  css的设置
  css: {
    // 是否使用css分离插件
    extract: false,
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  //  pwa
  pwa: {},
  //  devServer
  devServer: {
    //局域网和本地访问
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    open: false,
    historyApiFallback: true,
    allowedHosts: 'all',
  },
  // 第三方插件配置 https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
  pluginOptions: {},
  // 配置 cdn, 拆分模块
  cdn: {
    css: ['https://file.anbangke.com/js/npm/vant@3.6.2/lib/index.css'],
    js: [
      'https://file.anbangke.com/js/npm/vue@3.2.13/dist/vue.global.min.js',
      'https://file.anbangke.com/js/npm/vue-router@4.0.3/dist/vue-router.global.min.js',
      'https://file.anbangke.com/js/npm/axios@0.27.2/dist/axios.min.js',
      'https://file.anbangke.com/js/npm/vant@3.6.2/lib/vant.min.js',
    ],
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
      vant: 'vant',
    },
  },
  productionGzipExtensions: ['js', 'css', 'html', 'json', 'ts', 'png', 'jpg'],
  //  什么情况下才会显示cdn
  isProcess: env(),
  //  是否为生产环境
  isProduction: env(['production']),
};

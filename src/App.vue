<script>
import initRouterApp from "./router/watchRouter";
import {CanIUse, GetCache, GetSystemInfo} from "./utils/uniVab";
import cacheConfig from "./config/cache.config";
import {EmptyStore} from "./utils/util";
import AppStore from "./store/app.store";
export default {
  onLaunch: function () {

    // token的处理方式; 如失效清除所有状态;
    !GetCache(cacheConfig.token_cache) && EmptyStore();

    // 设备启动, 将设备安全区域设置;
    GetSystemInfo({
      success: (res) => {
        console.log("获取设备信息", res);
        let statusBar = 0, customBar = 0;
        // #ifdef MP
        statusBar = res.statusBarHeight;
        customBar = statusBar + 45;
        if (res.platform === 'android') {
          customBar = statusBar + 50;
        }
        // #endif

        // #ifdef MP-WEIXIN
        statusBar = res.statusBarHeight;
        const custom = uni.getMenuButtonBoundingClientRect();
        customBar = custom.bottom + custom.top - statusBar;
        // #endif

        // #ifdef MP-ALIPAY
        statusBar = res.statusBarHeight;
        customBar = statusBar + res.titleBarHeight;
        // #endif

        // #ifdef H5
        statusBar = 0;
        customBar = res.statusBarHeight + 45;
        // #endif

        AppStore().SET_APP_STATUS_HEIGHT(statusBar);
        AppStore().SET_APP_CUSTOM_HEIGHT(customBar);
        AppStore().SET_APP_PLATFORM(res.platform || '');
        AppStore().SET_SAFE_AREA(res.safeAreaInsets || null);
      }
    });

    // 注册路由跳转拦截
    initRouterApp();

    // #ifdef MP-WEIXIN || mp-dingtalk
    if (CanIUse('getUpdateManager')) {
      const updateManager = uni.getUpdateManager();
      updateManager.onCheckForUpdate(function(res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function() {
            updateManager.applyUpdate();
          });
          updateManager.onUpdateFailed(function() {
            // 新的版本下载失败
            // that.tui.modal('更新失败', '新版本更新失败，为了获得更好的体验，请您删除当前小程序，重新搜索打开', false, res => {});
          });
        }
      });
    }
    // #endif


  },
  onShow: function () {
  },
  onHide: function () {
  },
  onError: function(err) {
    const res = uni.getSystemInfoSync();
    console.table({
      '手机品牌': res.brand,
      '手机型号': res.model,
      '操作系统版本': res.system,
      '客户端平台': res.platform,
      '错误描述': err.message,
    })
    console.error(err.stack);
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "static/scss/global.scss";
</style>

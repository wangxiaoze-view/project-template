/**
 * @description 监听路由
 */

import {PageJump, ShowToast} from "../utils/uniVab";
import AppStore from "../store/app.store";
import handlerNextRoute from "./handlerRoute";
import getWhiteList from "./whiteList";

/**
 * @description 跳转页面的监听; 监听的仅仅是token的登录： 如其他需要在Onshow判断（暂时这样处理）
 */
export default function initRouterApp() {
    ["navigateTo", "redirectTo", "reLaunch", "switchTab"].forEach(item => {
        uni.addInterceptor(item, {
            invoke(e) {
                let token = AppStore().token;
                // 获取点击的页面的路由信息;
                const {options, nextRoute} = handlerNextRoute(e.url, true);

                // 如果query有token。 存token 继续跳转
                if (options && options.token) {
                    AppStore().SET_TOKEN(options.token);
                    return e;
                } else {
                    // 白名单 或者 meta 不设置登录（跳转的路由是否需要登录;） 直接跳转页面
                    // 在白名单之内或者 没有在meta设置 需要登录的字段 则默认跳转
                    if (getWhiteList(true).includes((nextRoute && nextRoute.path) || e.url) || (nextRoute && nextRoute.meta && !nextRoute.meta['isLogin'])) {
                        // !token && appStore().setAppBarIndex(0);
                        return e
                    } else {

                        // 没有登录的情况， 设置不同的跳转方式;
                        // 如果有重定向链接，则关闭所有页面（适用于登录失效，清除缓存）， 否则正常跳转｛适用于点击的页面需要登录 跳转登录｝
                        if (!token) {
                            let isRedirect = 'redirect' in options;

                            if (isRedirect) {
                                PageJump({url: `${AppStore().loginPage}?redirect=${options['redirect']}`}, 'reLaunch');
                            } else {
                                PageJump({url: AppStore().loginPage}, 'navigateTo')
                            }
                            return false
                        } else {
                            return e;
                        }
                    }
                }
            },
            success: function () {
            },
            fail: function (err) {
                ShowToast({
                    title: err.errMsg,
                    icon: "none",
                    position: "center",
                    mask: true
                })
            }
        })
    })
}
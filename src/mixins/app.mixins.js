import AppStore from "../store/app.store";
import {PageJump} from "../utils/uniVab";
import getWhiteList from "../router/whiteList";

export default {
    onLoad(params) {
        // 切记： 重复在这里写 是因为h5适用于app的webview无法监听， 暂时先判断 h5的页面


        // 当前的路由，  params 当前路由的参数;
        // #ifdef H5
        console.log("页面Onload加载初始化:::");
        let pages = getCurrentPages();
        let currentRoute = (pages[pages.length - 1]).route;
        let token = AppStore().token || '';
        if (params && params.token) {
            AppStore().SET_TOKEN(params.token);
        } else {
            // 白名单 或者 meta 不设置登录（跳转的路由是否需要登录;） 直接跳转页面
            // 在白名单之内或者 没有在meta设置 需要登录的字段 则默认跳转
            if (getWhiteList(false).includes(currentRoute)) return;
            if (!token) {
                let isRedirect = 'redirect' in params;
                if (isRedirect) {
                    PageJump({url: `${AppStore().loginPage}?redirect=${params['redirect']}`}, 'reLaunch');
                } else {
                    PageJump({url: AppStore().loginPage}, 'navigateTo')
                }
            }
        }
        // #endif
    },
    onShow() {
    },
    // 分享到好友
    onShareAppMessage(el) {
        // // 分开写是因为有些情况 部分参数会丢失
        // let pages = getCurrentPages();
        // let routeParams = '', route = '';
        // if (pages.length >= 1) {
        //     route = (pages[pages.length - 1]).route;
        //     routeParams = (pages[pages.length - 1])['options'] || {};
        // }
        // // isShare = 0,表示不是从分享进入, isShare = 1 表示是从分享进入
        // return {
        //     title: '',
        //     path: route + '?isShare=1' + FormatStrOptions(routeParams)
        // }
    },
    // 分享到朋友圈
    onShareTimeline() {
        // let pages = getCurrentPages();
        // let routeParams = '', route = '';
        // if (pages.length >= 1) {
        //     route = (pages[pages.length - 1]).route;
        //     routeParams = (pages[pages.length - 1])['options'] || {};
        // }
        // return {
        //     title: '',
        //     path: route + '?isShare=1' + FormatStrOptions(routeParams)
        // }
    }
}
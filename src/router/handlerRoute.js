import routerConfig from "./routerConfig";
import {GetUrlParam} from "../utils/util";


/**
 * 路由处理， 获取当前路由的 query参数, 下一个(to)路由的信息  [适用于路由拦截， 而不是每个页面的onShow]
 *
 * @param url {String} 当前的路由
 *
 * @param isRoot {Boolean} 是否需要加前缀/
 *
 * @returns {{nextRoute: (T|null), options: ({}|null), url}}
 */
export default function handlerNextRoute (url, isRoot = false) {
    const routes = routerConfig(isRoot);
    let tempNextPath = url.split('?').length > 0 ? url.split('?')[0] : '';
    let tempNextRoute = routes.find(route => route.path === tempNextPath);
    return {
        // 跳转的完整路由
        url,
        // 跳转的路由的query参数
        options: GetUrlParam(url) || null,
        // 跳转路由的当前信息
        nextRoute: tempNextRoute || null,
    }
}
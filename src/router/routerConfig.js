import PageJson from '../pages.json'
import {DeepClone} from "../utils/util";

/**
 * 二次处理全部路由; 包括主包pages和分包subPackages 统一数据格式： ｛path: '', meta: {}, style: {}｝ meta暂时做埋点；后期需要校验一些其他东西；
 *
 * @param isRoot {Boolean}  是否需要加前缀 /
 * @returns {*[]|*}
 */

export default function routerConfig(isRoot = false) {
    // 默认主包;
    let route = DeepClone(PageJson.pages) || [];
    // 分包页面
    if ("subPackages" in DeepClone(PageJson)) {
        let subPages = PageJson["subPackages"];
        // 将数据统一
        subPages.forEach(root => {
            let path = root.root;
            if (!path) return;
            let tempSubArr = [];
            (root.pages || []).forEach(item => {
                item.path = (path + '/' + item.path);
                tempSubArr.push(item);
            })
            route.push(...tempSubArr)
        })
    }

    if (isRoot) {
        route.forEach(route => {
            route.path = '/' + route.path;
        })
    }

    return route;
}
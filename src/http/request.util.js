import CryptoJS from "crypto-js";
import qs from "qs";
import md5 from "md5";
import {GetCache} from "../utils/uniVab";
import cacheConfig from "../config/cache.config";

// 获取随机数
export function getNonce() {
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let res = "";
    for (let i = 0; i < 6; i++) {
        let id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}

// 加密
export function encrypt(key, iv, data) {
    let encrypted = CryptoJS['AES'].encrypt(CryptoJS['enc'].Utf8.parse(data), CryptoJS['enc'].Utf8.parse(key), {
        iv: CryptoJS['enc'].Utf8.parse(iv),
        mode: CryptoJS['mode'].CBC,
        padding: CryptoJS['pad'].Pkcs7
    });
    return encrypted.toString();
}


// 合并json
export function extend(des, src, override) {
    if (src instanceof Array) {
        for (let i = 0, len = src.length; i < len; i++)
            extend(des, src[i], override);
    }
    for (let i in src) {
        if (override || !(i in des)) {
            des[i] = src[i];
        }
    }
    return des;
}

// 对JSON格式的参数进行排序
export function jsonSort(params) {
    let arr = [];
    for (let it in params) {
        let val = params[it];
        if (typeof val === "object" && (!(val instanceof Array) || (val.length > 0 && typeof val[0] === "object"))) {
            val = JSON.stringify(val);
        }
        arr.push(it + "=" + val);
    }
    // 字典升序
    arr.sort();
    return arr.join("&");
}

// 对字符串格式的参数进行排序
export function paramSort(params) {
    params = params.replace(/%3A/g, ':')
    params = params.replace(/%2C/g, ',')
    params = params.replace(/%3B/g, ';')
    params = params.replace(/%3D/g, '=')
    params = params.replace(/%2F/g, '/')
    params = params.replace(/%2B/g, '+')
    params = params.replace(/%23/g, '#')
    params = params.replace(/%24/g, '$')
    params = params.replace(/%26/g, '&')
    params = params.replace(/%40/g, '@')
    let arr = []
    params.split('&').forEach(function (e) {
        let index = e.indexOf('=')
        if (index === -1) {
            arr.push([e, ''])
        } else {
            let value = e.substring(index + 1, e.length)
            arr.push([e.substring(0, index), value])
        }
    })
    arr.sort()
    params = ''
    arr.forEach(function (e) {
        if (e[1] != null && e[1] !== '') {
            params += '&' + (e[0] + '=' + e[1])
        }
    })
    if (params.length > 0) {
        params = params.substring(1)
    }
    return params
}


// 登录失效的code
export function getQuestTokenCode() {
    return [
        '0x00000110',
        '0x00000111',
        '0x00000112',
        '0x00000113',
        '0x00000109',
    ]
}

// 授权提示
export function warrantTipCode() {
    return [
        '0x000022080',
        '0x000022081',
    ]
}


// 获取config
export function getConfig(url, method, params) {
    let config = {
        url: url,
        method: method
    };
    // 设置参数
    if (method in {'get': true, 'delete': true}) {
        config.params = params;
    } else if (method in {'post': true, 'put': true}) {
        config.data = params;
    }
    return config
}

export function getExtendConfig(config) {
    const {VITE_APP_ID, VITE_APP_KEY} = import.meta.env;
    let appId = VITE_APP_ID
    let appKey = VITE_APP_KEY
    let timestamp = new Date().getTime()
    let nonce = getNonce() // timestamp 和 nonce这两个每次发送前都需要重新生成
    let token = GetCache(cacheConfig.token_cache) || '';
    let signStr

    let requestParams, sortedParams
    //对get、delete 类型的请求，获取排序后的参数
    if (config.method in {'get': true, 'delete': true}) {
        requestParams = config.params;
        //为了兼容不规范写法，获取url上的参数进行处理，正常应该不会放在url上，而是使用axios的方式
        let urlParams = {}, arr = config.url.split("?");
        if (arr && arr.length > 1) {
            let pArr = arr[1].split("&")
            if (pArr) {
                for (let i of pArr) {
                    let p = i.split("=");
                    if (p.length > 1 && p[1]) {
                        urlParams[p[0]] = p[1];
                    }
                }
            }
        }
        //用config里参数覆盖url上的参数
        if (requestParams && typeof requestParams === 'object') {
            sortedParams = jsonSort(extend(urlParams, requestParams, true))
        } else {
            sortedParams = jsonSort(urlParams)
        }

        //对post、put 类型的请求，获取排序后的参数
    } else if (config.method in {'post': true, 'put': true}) {
        requestParams = config.data;

        if (typeof requestParams == 'string') {
            if (requestParams) {
                requestParams = decodeURI(requestParams)
                sortedParams = paramSort(requestParams)
                config.data = requestParams
            }
        } else {
            if (requestParams.data != null) {
                let iv = Math.floor(timestamp / 1000) + '' + nonce;
                requestParams.data = encrypt(appKey, iv, requestParams.data)
                requestParams = qs.stringify(requestParams, {arrayFormat: 'repeat'})
                requestParams = decodeURI(requestParams)
                sortedParams = paramSort(requestParams)
                config.data = requestParams
            }
        }
    }

    if (sortedParams) {
        signStr = sortedParams + '&' + appKey + '&' + timestamp + '&' + nonce
    } else {
        signStr = appKey + '&' + timestamp + '&' + nonce
    }
    let sign = md5(signStr)

    config.headers = {
        'content-type': 'application/x-www-form-urlencoded',
        appId: appId,
        timestamp: timestamp,
        nonce: nonce,
        token: token,
        sign: sign,
        sysCode: 'wechat-applet',
    }
    return config;
}
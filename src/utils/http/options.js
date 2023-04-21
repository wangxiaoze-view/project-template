import VueCookies from 'vue-cookies';
import md5 from 'md5';
import qs from 'qs';
import CryptoJS from 'crypto-js';
import cacheConfig from '@/config/cache';

export function encrypt(skey, siv, sdata) {
  const key = CryptoJS.enc.Utf8.parse(skey);
  const iv = CryptoJS.enc.Utf8.parse(siv);
  const data = CryptoJS.enc.Utf8.parse(sdata);
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

// 请求之前拦截，封装headers
export const getQuestHeaders_util = (config) => {
  const { VUE_APP_API_BASE_APPID, VUE_APP_API_BASE_APPKEY } = process.env;
  const appId = VUE_APP_API_BASE_APPID;
  const appKey = VUE_APP_API_BASE_APPKEY;
  const timestamp = new Date().getTime();
  // timestamp 和 nonce这两个每次发送前都需要重新生成
  const nonce = getNonce();
  const token = VueCookies.get(cacheConfig.token_cache) || '';

  let signStr, requestParams, sortedParams;

  if (config.method in { get: true, delete: true }) {
    requestParams = config.params;
    //为了兼容不规范写法，获取url上的参数进行处理，正常应该不会放在url上，而是使用axios的方式
    let urlParams = {},
      arr = config.url.split('?');
    if (arr && arr.length > 1) {
      let pArr = arr[1].split('&');
      if (pArr) {
        for (let i of pArr) {
          let p = i.split('=');
          if (p.length > 1 && p[1]) {
            urlParams[p[0]] = p[1];
          }
        }
      }
    }
    //用config里参数覆盖url上的参数
    if (requestParams && typeof requestParams === 'object') {
      sortedParams = jsonSort(extend(urlParams, requestParams, true));
    } else {
      sortedParams = jsonSort(urlParams);
    }

    //对post、put 类型的请求，获取排序后的参数
  } else if (config.method in { post: true, put: true }) {
    requestParams = config.data;
    if (typeof requestParams == 'string') {
      if (requestParams) {
        requestParams = decodeURI(requestParams);

        sortedParams = paramSort(requestParams);
        config.data = requestParams;
      }
    } else {
      if (requestParams.data != null) {
        const iv = Math.floor(timestamp / 1000) + '' + nonce;
        requestParams.data = encrypt(appKey, iv, requestParams.data);
        requestParams = qs.stringify(requestParams, { arrayFormat: 'repeat' });
        requestParams = decodeURI(requestParams);
        sortedParams = paramSort(requestParams);
        config.data = requestParams;
      }
    }
  }

  if (sortedParams) {
    signStr = sortedParams + '&' + appKey + '&' + timestamp + '&' + nonce;
  } else {
    signStr = appKey + '&' + timestamp + '&' + nonce;
  }
  let sign = md5(signStr);
  let headers = {
    'content-type': 'application/x-www-form-urlencoded',
    appId: appId,
    timestamp: timestamp,
    nonce: nonce,
    sign: sign,
    sysCode: 'worker-h5',
  };
  token && (headers.token = token);
  return headers;
};

/**
 * @description 对JSON格式的参数进行排序
 * @param params
 * @returns {string}
 */
function jsonSort(params) {
  let txt = '';
  if (Object.prototype.toString.call(params) === '[object Object]') {
    const arr = [];
    for (const key in params) {
      const val = params[key];
      if (Object.prototype.toString.call(val) === '[object Array]' || Object.prototype.toString.call(val) === '[object Object]') {
        continue;
      }
      // 有效值才参与签名
      if (![undefined, null, ''].includes(val) && JSON.stringify(val) !== '{}' && JSON.stringify(val) !== '[]') {
        arr.push(key + '=' + val);
      }
    }
    // 字典升序
    arr.sort();
    txt = arr.join('&');
  }
  return txt;
}

/**
 * @description 合并json
 * @param des
 * @param src
 * @param override
 * @returns {*}
 */
function extend(des, src, override) {
  if (src instanceof Array) {
    for (let i = 0, len = src.length; i < len; i++) {
      extend(des, src[i], override);
    }
  }
  for (const i in src) {
    if (override || !(i in des)) {
      des[i] = src[i];
    }
  }
  return des;
}

/**
 * @description 对字符串格式的参数进行排序
 * @param params
 * @returns {string}
 */
function paramSort(params) {
  const arr = [];
  params.split('&').forEach(function (e) {
    const index = e.indexOf('=');
    if (index === -1) {
      arr.push([e, '']);
    } else {
      const value = e.substring(index + 1, e.length);
      arr.push([e.substring(0, index), value]);
    }
  });
  arr.sort();
  params = '';
  arr.forEach(function (e) {
    if (e[1] != null && e[1] !== '') {
      params += '&' + (e[0] + '=' + e[1]);
    }
  });
  if (params.length > 0) {
    params = params.substring(1);
  }

  return params;
}

/**
 * @description         获取随机数
 * @returns {string}
 */
function getNonce() {
  const chars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  let res = '';
  for (let i = 0; i < 6; i++) {
    const id = Math.ceil(Math.random() * 35);
    res += chars[id];
  }
  return res;
}

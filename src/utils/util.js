import currency from "currency.js";
import {RemoveCache} from "./uniVab";
import cacheConfig from "../config/cache.config";
import AppStore from "../store/app.store";
/**
 * @description     去左右空格
 * @param value { String } 需要处理的字符串
 * @returns {*}
 */
export function Trim(value) {
    return value.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * @description     去除所有空格
 * @param value {String} 需要处理的字符串
 * @returns {*}
 */
export function TrimAll(value) {
    return value.replace(/\s+/g, '');
}

/**
 * @description     替换所有相同字符串
 * @param text {String} 需要处理的字符串
 * @param repStr {RegExp | String}
 * @param newStr {String}
 * @returns {*}
 */
export function replaceAll(text, repStr, newStr) {
    return text.replace(new RegExp(repStr, 'gm'), newStr);
}

/**
 * @description  格式化手机号码
 * @param num {String | Number}
 * @returns {*}
 */
export function FormatNumber(num) {
    return num.length === 11 ? num.replace(/^(d{3})\d{4}(\d{4})/, '$1****$2') : num;
}

/**
 * @description  获取Url参数，返回一个对象 ?a=1&b=2 ==> {a: "1", b: "2"}
 * @param url {String}
 * @returns {{}}
 */
export function GetUrlParam(url) {
    let arrObj = url.split("?");
    let params = {};
    if (arrObj.length > 1) {
        arrObj = arrObj[1].split("&");
        arrObj.forEach(item => {
            item = item.split("=");
            params[item[0]] = item[1];
        })
    }
    return params;
}


/**
 * @description 防抖
 * @param func {Function}   目标函数
 * @param wait {Number}   延迟执行毫秒数
 * @param immediate    true - 立即执行， false - 延迟执行
 * @returns {(function(): void)|*}
 */
export function Debounce(func, wait = 1000, immediate = true) {
    let timer;
    return function () {
        let context = this, args = arguments;
        if (timer) clearTimeout(timer);
        if (immediate) {
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait);
            if (callNow) func.apply(context, args);
        } else {
            timer = setTimeout(() => {
                func.apply(context, args);
            }, wait)
        }
    }
}

/**
 * @description  节流  指连续触发事件，但是在 n 秒内只执行一次函数。即 2n 秒内执行 2 次... 。会稀释函数的执行频率。
 * @param func {Function} 函数
 * @param wait {Number}  延迟执行毫秒数
 * @param type {Number} 1 在时间段开始的时候触发 2 在时间段结束的时候触发
 * @returns {(function(): void)|*}
 */
export function Throttle(func, wait = 1000, type = 1) {
    let previous = 0;
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        if (type === 1) {
            let now = Date.now();
            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        } else if (type === 2) {
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args)
                }, wait)
            }
        }
    }
}

/**
 * @description  获取日期时间段
 * @param type {Number}  1-今天 2-昨天 3-本周 4-本月 5-本年
 * @returns {{start: Date, end: Date}}
 */
export function GetDateTimeSlot(type) {
    let now = new Date()
    let start = now.toDateString()
    let end = now.toDateString()
    switch (type) {
        case 1:
            start = `${start} 00:00:00`
            end = `${end} 23:59:59`
            break
        case 2:
            now.setTime(now.getTime() - 3600 * 1000 * 24)
            start = `${now.toDateString()} 00:00:00`
            end = `${now.toDateString()} 23:59:59`
            break
        case 3:
            // 获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
            let weekday = now.getDay() || 7
            // 往前算（weekday-1）天，年份、月份会自动变化
            now.setDate(now.getDate() - weekday + 1)
            start = `${now.toDateString()} 00:00:00`
            end = `${end} 23:59:59`
            break
        case 4:
            start = `${now.getFullYear()}-${now.getMonth() + 1}-01 00:00:00`
            end = `${end} 23:59:59`
            break
        case 5:
            start = `${now.getFullYear()}-01-01 00:00:00`
            end = `${end} 23:59:59`
            break
        default:
            break
    }

    return {
        start: new Date(start.replace(/\-/g, '/')),
        end: new Date(end.replace(/\-/g, '/'))
    }
}

/**
 * @description     简单数组合并去重
 * @param arr1 {Array}
 * @param arr2 {Array}
 * @returns {*[]}
 */
export function DistinctArray(arr1, arr2) {
    return [...new Set([...(arr1 || []), ...(arr2 || [])])]
}

/**
 * @description 获取uuid
 * @returns {string}
 */
export function GetUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
    })
}

/**
 * @description     唯一标识，随机数
 * @param n {Number} 随机数位数
 * @returns {string}
 */
export function Unique(n) {
    n = n || 6;
    let rnd = '';
    for (let i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
    return 'abk_' + new Date().getTime() + rnd;
}

/**
 * @description 十六进制颜色转RGB颜色
 * @param hex {String}
 * @returns {{r: number, b: number, g: number}|null}
 */
export function HexToRGB(hex) {
    if (hex.length === 4) {
        let text = hex.substring(1, 4);
        hex = '#' + text + text;
    }
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16)
    } : null;
}

/**
 * @description RGB颜色转十六进制颜色
 * @param r
 * @param g
 * @param b
 * @returns {string}
 */
export function RgbToHex(r, g, b) {
    const _toHex = (n) => {
        n = parseInt(n, 10);
        if (isNaN(n)) return "00";
        n = Math.max(0, Math.min(n, 255));
        return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
    }
    return "#" + _toHex(r) + _toHex(g) + _toHex(b)
}

/**
 * @description 金额格式化，保留两位小数
 * @param money {Number | String}
 * @returns {string}
 */
export function FormatMoney(money) {
    return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,')
        .replace(/\,$/, '').split('').reverse().join('');
}

/**
 * @description 日期格式化
 * @param formatStr 格式化字符串(y-m-d h:i:s)
 * @param fDate
 * @param type  fDate的格式：1-日期字符串(2017/12/04 12:12:12) 2-时间戳(1603676514690) 3-日期字符串，无连接符(20171204121212)
 * 4-new Date()时间格式(Thu Oct 01 2020 00:00:00 GMT+0800 (中国标准时间))
 * @param isMs  时间戳精度是否为毫秒（精度是秒时传false），type=2时有效
 **/
export function FormatDate(formatStr, fDate, type = 1, isMs = true) {
    let date
    if (type === 3) {
        date = FormatTimeStr(fDate, formatStr)
    } else {
        date = FormatDateStr(formatStr, fDate, type, isMs)
    }
    return date;
}

export function FormatDateStr(formatStr, fDate, type = 1, isMs) {
    if (!fDate) return;
    let fTime, fStr = 'ymdhis';
    if (type === 4) {
        fTime = fDate;
    } else {
        fDate = fDate.toString()
        if (~fDate.indexOf('.')) {
            fDate = fDate.substring(0, fDate.indexOf('.'));
        }
        fDate = fDate.replace('T', ' ').replace(/\-/g, '/');
        if (!formatStr) formatStr = "y-m-d h:i:s";
        if (fDate) {
            if (type === 2) {
                fDate = isMs ? Number(fDate) : Number(fDate) * 1000
            }
            fTime = new Date(fDate);
        } else {
            fTime = new Date();
        }
    }
    let month = fTime.getMonth() + 1;
    let day = fTime.getDate();
    let hours = fTime.getHours();
    let minu = fTime.getMinutes();
    let second = fTime.getSeconds();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? ('0' + hours) : hours;
    minu = minu < 10 ? '0' + minu : minu;
    second = second < 10 ? '0' + second : second;
    let formatArr = [fTime.getFullYear().toString(), month.toString(), day.toString(), hours.toString(), minu.toString(), second.toString()]
    for (let i = 0; i < formatArr.length; i++) {
        formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
    }
    return formatStr;
}

/**
 * @desc 格式化时间
 * @param timeStr 时间字符串 20191212162001
 * @param formatStr 需要的格式 如 y-m-d h:i:s | y/m/d h:i:s | y/m/d | y年m月d日 等
 **/
export function FormatTimeStr(timeStr, formatStr) {
    if (!timeStr) return;
    timeStr = timeStr.toString()
    if (timeStr.length === 14) {
        let timeArr = timeStr.split('')
        let fStr = 'ymdhis'
        if (!formatStr) {
            formatStr = 'y-m-d h:i:s'
        }
        let formatArr = [[...timeArr].splice(0, 4).join(''), [...timeArr].splice(4, 2).join(''), [...timeArr].splice(6, 2).join(''), [...timeArr].splice(8, 2).join(''), [...timeArr].splice(10, 2).join(''), [...timeArr].splice(12, 2).join('')]
        for (let i = 0; i < formatArr.length; i++) {
            formatStr = formatStr.replace(fStr.charAt(i), formatArr[i])
        }
        return formatStr
    }
    return timeStr
}

/**
 * @description 预约时间的显示  12-30[周四] 10:00
 * @param time {String | Date | Number} 时间
 * @param concise { Boolean}  是否显示年
 * @returns {string}
 */
export function FormatDateOrderDesc(time, concise = true) {
    if (!time) return '';
    // fix: 解决ios兼容问题，
    let initDate = new Date(time.replace(/-/g, "/")),
        year = initDate.getFullYear(),
        month = initDate.getMonth() + 1,
        date = initDate.getDate(),
        hour = initDate.getHours(),
        minutes = initDate.getMinutes(),
        day = initDate.getDay(),
        weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

    month = month < 10 ? `0${month}` : month;
    date = date < 10 ? `0${date}` : date;
    hour = hour < 10 ? `0${hour}` : hour;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let week = weeks[day];

    return concise ? `${month}-${date}[${week}] ${hour}:${minutes}` : `${year}-${month}-${date}[${week}] ${hour}:${minutes}`
}


/**
 * @description 获取资源大小
 * @param fileSize {Number}
 * @returns {string}
 */
export function FormatFileSize(fileSize) {
    if (fileSize < 1024) {
        return fileSize + 'B';
    } else if (fileSize < (1024 * 1024)) {
        let temp = fileSize / 1024;
        temp = temp.toFixed(2);
        return temp + 'KB';
    } else if (fileSize < (1024 * 1024 * 1024)) {
        let temp = fileSize / (1024 * 1024);
        temp = temp.toFixed(2);
        return temp + 'MB';
    } else {
        let temp = fileSize / (1024 * 1024 * 1024);
        temp = temp.toFixed(2);
        return temp + 'GB';
    }
}

/**
 * @description 获取当前日期是本年的第几周
 * @param date {Number|String|Date}
 * @returns {string|number}
 */
export function GetWeek(date) {
    date = new Date(date);
    let date2 = new Date(date.getFullYear(), 0, 1);
    let day1 = date.getDay();
    if (day1 === 0) day1 = 7;
    let day2 = date2.getDay();
    if (day2 === 0) day2 = 7;
    let d = Math.round((date.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000);
    // 当周数大于52则为下一年的第一周
    if ((Math.ceil(d / 7) + 1) > 52) {
        return (date.getFullYear() + 1) + "第1周"
    }
    return Math.ceil(d / 7) + 1;
}


/**
 * @description         图片缩略图
 * @param img {String}  图片链接地址
 * @param w {Number}    宽
 * @param h {Number}    高
 * @param q {Number}    清晰度
 * @returns {string}
 */
export function LazyImg(img, w = 200, h = 200, q = 75) {
    return (
        img +
        `?imageView2/2/w/${w}/h/${h}/q/${q}|watermark/2/text/QUJL/font/5b6u6L2v6ZuF6buR/fontsize/240/fill/I0ZGRkZGRg==/dissolve/100/gravity/SouthEast/dx/5/dy/5|imageslim`
    );
}

/**
 * @description     深拷贝。克隆
 * @param target {*}
 * @param map {Map}
 * @returns {*[]|*}
 * @constructor
 */
export function DeepClone(target, map = new Map()) {
    if (Object.prototype.toString.call(target) === '[object Object]') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return target;
        }
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = DeepClone(target[key], map);
        }
        return cloneTarget;
    }
    return target;
}

/**
 * @description     金额的处理方式
 * @param value {String | Number}
 * @returns {currency}
 */
export function FormatCurrency(value) {
   return currency(value);
}

/**
 * @description     俩数计算， 解决精度丢失问题
 * @param intA {Number}
 * @param intB {Number}
 * @param key {String}
 * @returns {currency}
 */
export function ComputedNumber(intA = 0, intB = 0, key = 'add') {
    if (!['add', 'subtract', 'multiply', 'divide'].includes(key)) {
        throw new Error('计算方式错误~!');
    }
    return currency(intA)[key](intB);
}


export function FormatStrOptions(options) {
    if (!options) return '';
    let str = '';
    let optionVal = [];
    for (let key in options) {
        str += '&' + key + '=' + options[key]
    }
    return str;
}

/**
 * @description     适用于退出登录， 登录失效， 清除缓存
 * @param sync
 */
export function EmptyStore(sync = true) {
    let clearKey = ['token_cache']
    for (const key in cacheConfig) {
        if (clearKey.includes(key)) {
            RemoveCache(key);
        }
    }
    AppStore().EMPTY_APP();
}
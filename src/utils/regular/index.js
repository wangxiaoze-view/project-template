// 全局正则 校验
/**
 * @description             大数字每隔三位加点, 例如： 1234 ===>  1,234
 * @param num {Number}      数字
 * @returns {string}
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

/**
 * @description             检验是否是纯汉字, 例如： 安帮客 ====> true
 * @param chart {String}    校验的字符串
 * @returns {boolean}
 */
export function isChina(chart) {
  return /^[\u4e00-\u9fa5]+$/.test(chart);
}

/**
 * @description             校验特殊符号, 例如： "[test]" ===> true
 * @param chart {String}    校验的字符串
 * @returns {boolean}
 */
export function symbolChart(chart) {
  return /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(chart);
}

/**
 * @description             密码强度校验 例如："AnBangKe666!!!" ===> true
 * @param pass {String}     校验的字符串
 * @returns {boolean}
 */
export function passIntensity(pass) {
  return /^\S*(?=\S{5,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(pass);
}

/**
 * @description             检验是否是电子邮箱 例如： “anBangKe@anBangKe.com” ===> true
 * @param email {String}    检验的正则字符
 * @returns {boolean}
 */
export function emailChart(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

/**
 * @description                     检验是否为手机号  例如：13413131111 ===> true
 * @param phone {Number | String}   校验的数字 或者 字符串
 * @returns {boolean}
 */
export function isPhone(phone) {
  return /^1[23456789]\d{9}$/.test(phone);
}

/**
 * @description         检测机型是否是ios
 * @returns {boolean}
 */
export function isIos() {
  const u = navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

/**
 * @description         检测机型是否是Android
 * @returns {boolean}
 */
export function isAndroid() {
  const u = navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
}

/**
 * @description                     检测是否 为纯数字
 * @param number {Number | String}  数字 可以为整形数字，也可以为字符串数字
 * @returns {boolean}
 */
export function pureNumbers(number) {
  return /^\d+$/g.test(number);
}

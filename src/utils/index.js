import currency from 'currency.js';
import dayjs from 'dayjs';

/**
 * @description                         格式化金额 1 ==> '1.00'  1.00 ==> '1.00'
 * @param costFree {String | Number}    金额，可以字符串，数字
 * @param isStr    {Boolean}        是否显示字符串的形式显示
 * @returns {string}
 */
export function formattedAmount(costFree = 0, isStr = true) {
  return isStr ? currency(costFree).toString() : currency(costFree);
}

/**
 * @description             数字计算， 加减乘除  2.51 + .01 = 2.5199999999999996 ====>  2.52
 * @param intA {Number}     第一个数字
 * @param intB {Number}     第二个数字
 * @param key {String}      计算方式
 * @returns {currency}
 */
export function computedNumber(intA = 0, intB = 0, key = 'add') {
  if (!['add', 'subtract', 'multiply', 'divide'].includes(key)) {
    throw new Error('计算方式错误~!');
  }
  return currency(intA)[key](intB);
}

/**
 * @description                 时间格式化
 * @param time {String | Date | Number}  时间
 * @param format {String}       格式化字符
 * @returns {string}
 */
export function formatDate(time, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(format);
}

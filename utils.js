/**
 * @Description:  工具库
 * @name: node-service-template
 * @author: 王小泽
 * @date: 2022/5/21-20:47
 **/

const dayJs = require("dayjs");
const jsonwebtoken = require("jsonwebtoken");

/**
 * @description             获取时间的方法;
 * @param {number} time     初始化的时间戳
 * @param {String} format   初始化时间的格式
 * @returns
 */
exports.initDayJs = (time = new Date().getTime(), format = "YYYY-MM-DD HH:mm:ss") => {
    return dayJs(time).format(format);
}

/**
 * @description 获取uuid, 可以作为请求id, 或者其他
 * @returns
 */
const getUUid = function () {
    return "xxxx-xxxx-xxxx-xxxx-xxxx".replace(/[xy]/g, function (c) {
        let r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
exports.getUUid = getUUid;


/**
 * @description 获取初始化时间的时间戳
 * @returns
 */
const initGetTime = function () {
    return new Date().getTime();
};
exports.initGetTime = initGetTime;


/**
 * @description                     报文的消息
 * @param {String} message          报文的消息文案
 * @param {Object | Array} result   结果集
 * @param {Boolean} success         是否请求成功;
 * @param {Object} params           其他回调参数
 * @returns
 */
const sendResData = function (message = "", result = null, success = true, params = {}) {
    return {
        message,
        data: result,
        success,
        time: initGetTime(),
        uuid: getUUid(),
        ...params,
    };
};
exports.sendResData = sendResData;

/**
 * @description     错误报文
 * @param res       res对象
 * @param message   提示消息
 * @param result    结果集
 * @param success   是否操作成功
 * @param params    其他参数
 */
exports.sendResponse = (res, message = '', result = null, success = false, params = {}) => {
    res.send(sendResData(message, result, success, params));
}


/**
 * @description 加密函数  token加密
 * @param data  要加密的数据
 * @param time  过期的时间
 * @returns {*}
 */
const encrypt = (data, time) => {
    return jsonwebtoken.sign(data, 'token', {expiresIn: time}, null);
}
exports.encrypt = encrypt;

/**
 * @description     解密函数
 * @param token     要解密的token
 * @returns {{userId, token: boolean}|{userId: *, token: boolean}}
 */
const decrypt = (token) => {
    try {
        let data = jsonwebtoken.verify(token, 'token');
        return {
            userId: data.userId,
            identity: data.identity,
            token: true
        }
    } catch (err) {
        return {
            userId: err,
            identity: -1,
            token: false
        }
    }
}
exports.decrypt = decrypt;

/**
 * @description 检测token是否失效
 * @param req   req对象
 * @returns {{userId, token: boolean}|{userId: *, token: boolean}}
 */
exports.isInvalid = (req) => {
    return decrypt(req.headers.token)
}
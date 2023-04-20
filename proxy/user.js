/**
 * @Description:  操作数据库数据的处理函数
 * @name: node-service-template
 * @author: 王小泽
 * @date: 2022/5/21-20:52
 **/


const models = require("../models");

const User = models.User;

/**
 * @description     用户注册, 用户添加;
 * @param userData  用户数据: {account: '', password: ''}
 * @param callback  回调函数
 * @constructor
 */
exports.ApiInsertUser = (userData, callback) => {
    User(userData).save(callback);
}


/**
 * @description     用户名是否存在;
 * @param account   用户名
 * @param callback  回调函数
 * @constructor
 */
exports.ApiIsExistAccount = (account, callback) => {
    User.findOne({account}, callback);
};
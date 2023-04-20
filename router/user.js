/**
 * @Description:  user 路由处理函数合集
 * @name: node-service-template
 * @author: 王小泽
 * @date: 2022/5/21-20:43
 **/

const {sendResponse} = require("../utils");
const UserProxy = require("../proxy").User;


// 用户注册, 注册之前先查询用户是否以注册;
exports.UserInsert = (req, res) => {
    const {account, password} = req.body;
    // 校验 用户名和密码 是否必填
    if (!account && !password) {
        sendResponse(res, '用户名/密码必填', null, false);
    } else {
        // 先查询用户名是否存在
        UserProxy.ApiIsExistAccount(account, (err, user) => {
            if (err) {
                sendResponse(res, '系统开小差', null, false);
            } else if (user) {
                sendResponse(res, '用户已存在', null, false);
            } else {
                // 添加用户;
                UserProxy.ApiInsertUser({account, password}, err => {
                    if (err) {
                        sendResponse(res, '系统开小差', null, false);
                    } else {
                        sendResponse(res, '用户添加成功', null, true);
                    }
                })
            }
        })
    }
}
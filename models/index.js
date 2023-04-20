/**
 * @Description:  数据库模块
 * @name: node-service-template
 * @author: 王小泽
 * @date: 2022/5/21-20:53
 **/

const mongoose = require("mongoose");

// 链接本地数据库；
mongoose
    .connect("mongodb://localhost/blogServiceDb")
    .then(() => {
        console.log("\n======== 数 据 库 链 接 成 功 ========".rainbow.bold.underline);
    })
    .catch(err => {
        console.log("\n======== 数 据 库 链 接 失 败 ========".bold.red.underline, err);
    });

// 用户
require('./userModel');

exports.User = mongoose.model("User");
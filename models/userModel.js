/**
 * @Description:  用户数据库 定义字段；
 * @name: node-service-template
 * @author: 王小泽
 * @date: 2022/5/21-20:55
 **/

const mongoose = require("mongoose");

const {initGetTime, initDayJs, getUUid} = require("../utils");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // 用户名(账号)
    account: {type: String, trim: true, required: true},

    // 密码
    password: {type: String, trim: true, required: true},

    // 头像
    author: {type: String, default: ''},

    // 真实姓名
    name: {type: String, trim: true, default: ''},

    // 手机号
    phone: {type: String, trim: true, default: ''},

    // 邮箱  尽量绑定QQ邮箱, 方便后期发邮件;
    email: {type: String, trim: true, default: ''},

    // 是否完善用户信息
    isPerfect: {type: Boolean, default: false},

    // 状态
    // 1: 正常, 0：异常 2：冻结
    status: {type: Number, default: 1},

    // 身份标识:
    // 99: 博主  88：管理员  77：作者  0：游客;
    identity: {type: Number, default: 77},

    // 身份中文名称
    identityZh: {type: String, default: '作者'},

    // 评论文章的数据;  功能暂时不做; 字段暂时保留;
    arguments: {type: Array, default: []},

    // 发表文章数;
    pubArticleNum: {type: Number, default: 0},

    // 收藏文章数
    collectionNum: {type: Number, default: 0},

    // 点赞数
    likesNum: {type: Number, default: 0},

    // 是否删除
    // true: 已被删除  false: 未删除
    isDelete: {type: Boolean, default: false},

    // 创建时间 时间戳
    createTime: {type: Date, default: initGetTime()},

    // 创建时间 YYYY-MM-DD HH:mm:ss格式;
    createZh: {type: String, default: initDayJs()},

    // 请求 UUID
    uuId: {type: String, default: getUUid()},
});

// 动态添加字段;
userSchema.add({
    // 用户介绍
    infoDesc: {type: String, trim: true, default: ''}
});

mongoose.model("User", userSchema);

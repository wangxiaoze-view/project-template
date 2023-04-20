/**
 * @Description:  所有的api地址
 * @name: node-service-template
 * @author: 王小泽
 * @date: 2022/5/21-20:41
 **/

const express = require("express");
const router = express.Router();
const UserController = require("./router/user");
const FileController = require('./router/file');

// 添加用户
router.post('/user/insert', UserController.UserInsert);

// 文件上传
router.post('/file/uploadFile', FileController.UploadFile);


module.exports = router;

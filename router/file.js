/**
 * @Description:  文件上传 路由 处理函数
 * @name: node-service-template
 * @author: 王小泽
 * @date: 2022/5/21-21:21
 **/

let formidable = require('formidable');
const {ApiUploadFile} = require("../proxy/file");

const {initDayJs, sendResponse} = require("../utils");


exports.UploadFile = (req, res) => {
    // 创建上传表单
    let formMap = new formidable.IncomingForm({
        encoding: 'utf-8',
        // 保留后缀
        keepExtensions: true,
        // 设置上传目录 设置则会存储在中控服务器，
        // 不设置则建立一个临时文件 最后要上传到七牛，所以不用设置
        // uploadDir: '/',
        // 文件大小5M    报错413上传文件太大了 暂时不设置  使用默认;
        // maxFieldsSize: 5 * 1024 * 1024
    });

    formMap.parse(req, (err, fields, files) => {

        let {fileType} = fields;
        const fileTypeList = ['picture', 'music', 'audio', 'video', 'file', 'icon'];
        if (!fileTypeList.includes(fileType)) {
            // 默认未分类;
            fileType = 'unFiled'
        }

        if (err) {
            return sendResponse(res, err, null, false);
        }

        // 上传到七牛后保存的文件名
        let key = `${fileType}/${initDayJs(Date.now(), 'YYYY-MM-DD')}/${files.file.name}`;


        // 如果是表单的数据提交会存储在fields中，
        // 图片文件提交会存储在files中 files.file中的file指的是前端设定input的name一般设置为file
        let filePath = files.file.path;

        ApiUploadFile(key, filePath, responseData => {
            if (responseData.uploadSuccess) {
                sendResponse(res, '上传成功', responseData, true);
            } else {
                sendResponse(res, '上传失败', responseData, false);
            }
        })

    })
}
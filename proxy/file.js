/**
 * @Description:
 * @name: node-service-template
 * @author: 王小泽
 * @date: 2022/5/21-21:23
 **/

const qiNiu = require('qiniu');
const {QI_NIU_CONFIG} = require("../global_config");
/**
 * @description         获取七牛上传的token
 * @returns {string}    返回的token
 */
const qiNiuUpToken = () => {
    const {bucket, accessKey, secretKey} = QI_NIU_CONFIG;
    const putPolicy = new qiNiu.rs.PutPolicy({scope: bucket});
    const mac = new qiNiu.auth.digest.Mac(accessKey, secretKey);
    return putPolicy.uploadToken(mac);
}
exports.qiNiuUpToken = qiNiuUpToken;


const ApiUploadFile = (key, filePath, callback) => {
    //  文件上传（以下四行代码都是七牛上传文件的配置设置）
    const config = new qiNiu.conf.Config({
        //  设置传输机房的位置根据自己的设置选择
        zone: qiNiu.zone.Zone_z2
    })
    const formUploader = new qiNiu.form_up.FormUploader(config);
    const putExtra = new qiNiu.form_up.PutExtra();
    formUploader.putFile(qiNiuUpToken(), key, filePath, putExtra, (respErr, respBody, respInfo) => {
        let responseData = {
            // 是否上传成功
            uploadSuccess: false,
            // 上传成功失败的消息
            uploadMessage: '上传失败',
            // 上传的链接
            uploadUri: '',
            respBody,
            respInfo
        }

        if (respErr) {
            return callback && callback(responseData);
        }

        if (respInfo.statusCode === 200) {
            responseData.uploadMessage = '上传成功';
            responseData.uploadSuccess = true;
            responseData.uploadUri = `${QI_NIU_CONFIG.url}${respBody.key}`;
            callback && callback(responseData)
        } else {
            callback && callback(responseData);
        }
    })
}
exports.ApiUploadFile = ApiUploadFile;
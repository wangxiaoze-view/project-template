/**
 * @Description:  全局模板的配置文件
 * @name: node-service-template
 * @author: 王小泽
 * @date: 2022/5/21-19:05
 **/

// http的端口配置和本地ip配置
exports.HTTP_CONFIG = {
    port: '9009',
    localIp: '127.0.0.1'
}


// accessKey 和 secretKey 去七牛申请一个空间就可以获得了;
exports.QI_NIU_CONFIG = {
    accessKey: 'xxxxxxx',  // accessKey
    secretKey: 'xxxxxxxxxxxxxx', // secretKey
    bucket: 'xxxxxx', // 存储空间的名字
    url: 'xxxxxxx' // 配置的域名
}
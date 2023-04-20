/**
 * @Description: 服务器启动文件
 * @name: node-service-template
 * @author: 王小泽
 * @date: 2022/5/21-18:53
 **/

require("colors");
const express = require("express");
const http = require("http");
const debug = require("debug")('hbuilderproject:server');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const {HTTP_CONFIG} = require("./global_config");
const apiRouterV1 = require('./api_router_v1');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

// 注册路由或api地址
app.use('/api/v1', apiRouterV1);

/**
 * @description 这里是本地服务器配置
 */
// 设置端口号
const port = HTTP_CONFIG.port;
app.set('port', port.port);
// 创建服务器
const server = http.createServer(app).listen(port);
// 监听服务器的错误信息
server.on('error', (error) => {
    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
})

// 监听服务器启动信息
server.on('listening', () => {
    const address = server.address();
    let bind = typeof address === 'string'
        ? 'pipe ' + address
        : 'port ' + address.port;
    debug('Listening on ' + bind);
    console.log(`项目启动成功: 端口号为 === ${port}.`.bold.green.underline);
})

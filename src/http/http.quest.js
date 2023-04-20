import Axios from 'axios'
import settle from 'axios/lib/core/settle';
import buildURL from 'axios/lib/helpers/buildURL';
import {
    getConfig, getExtendConfig,
    getQuestTokenCode,
    warrantTipCode
} from "./request.util";
import {HideLoading, ShowLoading, ShowToast} from "../utils/uniVab";

const {VITE_BASE_URL, VITE_MODE_NAME} = import.meta.env;

Axios.defaults.baseURL = VITE_BASE_URL
Axios.defaults.timeout = 60000

// 请求拦截器
Axios.interceptors.request.use(function (config) {
    ShowLoading({title: '加载中', mask: true});
    return getExtendConfig(config)
}, function (error) {
    return error
})

// 响应拦截器
Axios.interceptors.response.use(response => {
    HideLoading()
    if (response.data && !response.data.success) {
        if (getQuestTokenCode().includes(response.data.code)) {
            ShowToast({
                title: '会话登录已失效',
                icon: "none",
                mask: true,
                success: function () {
                    // 清除商家信息  并跳转
                },
            })
        } else if (!warrantTipCode().includes(response.data.code)) {
            ShowToast({
                title: response.data.message || '系统开小差了，请稍后再试',
                icon: "none",
                mask: true,
            })
        }
        return Promise.reject(response.data)
    }

    // 本地开发中 可能存在 请求域名并不是 证书域名 可能会报错
    if (!['release', 'production'].includes(VITE_MODE_NAME) && !response.data) {
        ShowToast({
            title: response['errMsg'] || '系统异常',
            icon: "none",
            mask: true,
        })
        return Promise.reject(response)
    }
    return response.data
}, error => {

    if (error.message.includes('timeout')) {
        ShowToast({
            title: '请求超时',
            icon: "none",
            mask: true,
        })
        return Promise.reject(error)
    }
    if (error.response) {
        if (error.response.status === 404) {
            ShowToast({
                title: '页面未找到',
                icon: "none",
                mask: true,
            })
            return Promise.reject(error)
        } else if (error.response.status >= 400 && error.response.status <= 499 && error.response.data && error.response.data.message) {
            ShowToast({
                title: error.response.data.message,
                icon: "none",
                mask: true,
            })
            return Promise.reject(error.response.data)
        }
    }
    ShowToast({
        title: error.message,
        icon: "none",
        mask: true,
    })
    return Promise.reject(error)
})

// 兼容h5和小程序
Axios.defaults.adapter = function (config) {
    return new Promise((resolve, reject) => {
        uni.request({
            method: config.method.toUpperCase(),
            url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config['dataType'],
            responseType: config.responseType,
            sslVerify: config['sslVerify'],
            complete: function complete(response) {
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };
                settle(resolve, reject, response);
            }
        })
    })
}


export default {
    get: function (url, body) {
        return Axios(getConfig(url, 'get', body))
    },
    post: function (url, body) {
        return Axios(getConfig(url, 'post', body))
    },
    put: function (url, body) {
        return Axios(getConfig(url, 'put', body))
    },
    delete: function (url, body) {
        return Axios(getConfig(url, 'delete', body))
    }
}

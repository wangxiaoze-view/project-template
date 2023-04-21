import axios from 'axios';
import { Toast } from 'vant';
import 'vant/es/toast/style';
import { axiosOptions_config, responseCode_config } from '@/config/http';
import { getQuestHeaders_util } from './options';
import NavigatorUtil from '@/utils/navigator';
import NProgress from 'nprogress';

const service = axios.create(axiosOptions_config);

service.interceptors.request.use((config) => {
  const { method } = config;
  // 过滤 option预发请求
  if (method in { options: true }) {
    return;
  }
  NProgress.start();
  config.headers = getQuestHeaders_util(config);
  return config;
});

service.interceptors.response.use(
  (response) => {
    NProgress.done();
    if (response.data && !response.data.success) {
      if (responseCode_config.TOKEN_EXPIRED.includes(response.data.code)) {
        Toast({
          type: 'fail',
          message: response.data.message,
          forbidClick: true,
          onClose() {
            NavigatorUtil.login();
          },
        });
      } else {
        Toast({
          type: 'fail',
          message: response.data.message || '系统开小差了，请稍后再试',
          forbidClick: true,
        });
      }
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    NProgress.done();
    // AppStore().SET_QUEST_LOADING(false);

    if (error.message.includes('timeout')) {
      return Promise.reject(error);
    }
    if (error.response) {
      if (error.response.status === 404) {
        Toast({
          type: 'fail',
          message: error.data.message || '访问地址不存在',
          forbidClick: true,
        });
        return Promise.reject(error);
      } else if (error.response.status >= 400 && error.response.status <= 499 && error.response.data && error.response.data.message) {
        Toast({
          type: 'fail',
          message: error.data.message || '系统异常',
          forbidClick: true,
        });
        return Promise.reject(error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default service;

import { createRouter, createWebHashHistory } from 'vue-router';
import cacheConfig from '@/config/cache';
import VueCookies from 'vue-cookies';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import handlerRouter from './handler.js';
import NavigatorUtil from '@/utils/navigator';
import { Toast } from 'vant';

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes: handlerRouter,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  //  由于console插件无参数自定义位置， 只能通过缓存去设置；
  // 解决电脑端  console标识移动不了的问题;  只在本地调试显示固定 位置
  if (process.env.NODE_ENV !== 'production') {
    localStorage.setItem('vConsole_switch_x', '0');
    localStorage.setItem('vConsole_switch_y', '150');
  }

  const { token, navHeight } = to.query;

  const { token_cache, navHeight_cache } = cacheConfig;
  // token
  token && VueCookies.set(token_cache, token, '7d');
  // 存储手机状态栏高度
  navHeight && VueCookies.set(navHeight_cache, navHeight);

  // 是否需要隐藏原声App导航栏
  NavigatorUtil.navHead(to.meta['notShowNavBar'] ? false : true);
  if (to.matched.some((record) => record.meta.auth)) {
    if (VueCookies.get(token_cache)) {
      next();
    } else {
      Toast({
        message: '登录过期，请重新登录',
        duration: 3000,
        forbidClick: true,
        onClose() {
          NavigatorUtil.login();
        },
      });
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

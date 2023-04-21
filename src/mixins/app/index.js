import { ref } from 'vue';
import NavigatorUtil from '@/utils/navigator.util';
import VueCookies from 'vue-cookies';
import cacheConfig from '@/config/cache.config';

const { navHeight_cache } = cacheConfig;

export default function appMixins() {
  // 46是系统默认的 组件默认的; 默认导航栏
  const defaultNavBarHei = ref(46);

  // 获取header的高度
  const defaultNavBarHeiPx = (px) => {
    return !px ? defaultNavBarHei.value : defaultNavBarHei.value + 'px';
  };

  // 获取整体的高度
  const getNavHeiPx = (px = false) => {
    let navHeight = VueCookies.get(navHeight_cache) ? Number(VueCookies.get(navHeight_cache)) : 0;
    return !px ? navHeight : navHeight + 'px';
  };

  // 获取状态栏的高度
  const getStatusHei = (px = false) => {
    let navHeight = getNavHeiPx(false);
    let hei = navHeight - defaultNavBarHei.value;
    return !px ? hei : hei + 'px';
  };

  // 自定义导航栏，app删除状态栏的情况
  const getCustomAppStatusHei = (px = false) => {
    const hei = getNavHeiPx(false);
    return !px ? hei : hei + 'px';
  };
  const getCustomArrBarHei = (px = false) => {
    const hei = getNavHeiPx(false) + defaultNavBarHei.value;
    return !px ? hei : hei + 'px';
  };

  // 返回页面
  const backPageView = (title, url = '-1') => {
    NavigatorUtil.goto(title, url);
  };

  return {
    defaultNavBarHei,
    defaultNavBarHeiPx,
    getStatusHei,
    getNavHeiPx,
    backPageView,
    getCustomAppStatusHei,
    getCustomArrBarHei,
  };
}

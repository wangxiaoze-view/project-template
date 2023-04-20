import {defineStore} from 'pinia'
import {GetCache, SetCache} from "../utils/uniVab";
import cacheConfig from "../config/cache.config";


export default defineStore({
    id: "AppStore",
    state: () => ({
        token: GetCache(cacheConfig.token_cache) || '',
        // 登录页面地址
        loginPage: '/pages/login/index',
        // 重定向地址
        redirect: '/pages/login/index',
        // 安全区域
        safeArea: GetCache(cacheConfig.safe_area) || {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
        // 设备状态栏高度
        appStatusHeight: GetCache(cacheConfig.app_status_height) || 0,
        // 设备的自定义顶部导航栏高度
        appCustomHeight: GetCache(cacheConfig.app_custom_height) || 0,
        // 设备名称，android, ios, linux, mac
        appPlatform: GetCache(cacheConfig.app_platform) || '',
    }),
    getters: {},
    actions: {
        SET_TOKEN(token) {
            this.token = token;
            SetCache(cacheConfig.token_cache, token, true)
        },

        SET_SAFE_AREA(safeArea) {
            this.safeArea = safeArea;
            SetCache(cacheConfig.safe_area, safeArea, true, 0)
        },

        SET_APP_STATUS_HEIGHT(height) {
            this.appStatusHeight = height;
            SetCache(cacheConfig.app_status_height, height, true, 0)
        },

        SET_APP_CUSTOM_HEIGHT(height) {
            this.appCustomHeight = height;
            SetCache(cacheConfig.app_custom_height, height, true, 0)
        },

        SET_APP_PLATFORM(platform) {
            this.appPlatform = platform;
            SetCache(cacheConfig.app_platform, platform, true, 0)
        },

        EMPTY_APP() {
            this.token = '';
            for (const key in this.safeArea) {
                this.safeArea[key] = 0;
            }
        }
    }
});
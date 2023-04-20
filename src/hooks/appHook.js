import {computed} from "vue";
import AppStore from "../store/app.store";

export default function () {

    const getToken = computed(() => {
        return AppStore().token;
    })

    const getAppHeader = computed(() => {
        return {
            // 安全区域
            safeArea: AppStore().safeArea,
            // 状态栏高度
            statusH: AppStore().appStatusHeight,
            // 自定义顶部高度 包括状态栏
            customH: AppStore().appCustomHeight,
            // 自定义顶部高度  不包括状态栏
            navH: AppStore().appCustomHeight - AppStore().appStatusHeight,
        }
    })

    const getAppPlatForm = computed(() => {
        return AppStore().appPlatform;
    })


    return {
        getToken,
        getAppHeader: getAppHeader.value,
        getAppPlatForm: getAppPlatForm.value,
    }

}
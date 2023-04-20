
/**
 * @description 判断应用的 API，回调，参数，组件等是否在当前版本可用。
 * @param api {String}
 */
export function CanIUse(api) {
    return uni.canIUse(api);
}

/**
 * @description     将本地资源上传到开发者服务器
 * @param option {UploadFileOption}
 */
export function UploadFile(option) {
    uni.uploadFile(option);
}

/**
 * @description     下载文件资源到本地，
 * @param option {DownloadFileOption}
 */
export function DownLoadFile(option) {
    uni.downloadFile(option);
}

/**
 * @description   页面跳转
 * @param key {String}
 * @param option {UniNamespace}
 */
export function PageJump(option, key = 'navigateTo') {
    if (!['navigateTo', 'redirectTo', 'reLaunch', 'switchTab', 'navigateBack', 'preloadPage'].includes(key)) {
        throw new Error("【key】不存在!")
    }
    uni[key](option);
}

/**
 * @description             设置缓存
 * @param key {String}      缓存key
 * @param data {Object}     需要存储的缓存值
 * @param sync {Boolean}    是否同步
 * @param expire {Number}   过期时间，默认0表示永久有效
 */
export function SetCache(key, data, sync = true, expire = 1000 * 60 * 60 * 24 * 3) {
    let cacheObj = {
        // 存储的数据
        data,
        // 记录存储的时间戳
        time: Date.now() / 1000,
        // 记录过期时间，单位秒
        expire
    }
    try {
        if (sync) return uni.setStorageSync(key, JSON.stringify(cacheObj));
        uni.setStorage({
            key,
            data: JSON.stringify(cacheObj),
            success: function () {
                console.log(`【${key}】设置缓存成功`);
            },
            fail: function (err) {
                throw new Error(err);
            }
        });
    } catch (e) {
        throw new Error(e);
    }
}


/**
 * @description 获取缓存
 * @param key {String} 缓存key
 * @param sync {Boolean} 是否同步
 * @returns {null|*} 返回的结果
 */
export function GetCache(key, sync = true) {
    try {
        let value = uni.getStorageSync(key) || null;
        if (!sync) {
            uni.getStorage({
                key,
                success: function (res) {
                    value = res['data'];
                }
            })
        }
        if (!value) return null;
        value = JSON.parse(value);
        if (value.expire && Date.now() / 1000 - value.time > value.expire) {
            RemoveCache(key, sync);
            return null
        }
        return value.data;
    } catch (e) {
        return null;
    }
}

/**
 * @description     移除缓存
 * @param key {String} 缓存key
 * @param sync {Boolean} 是否同步
 */
export function RemoveCache(key, sync = true) {
    sync ? uni.removeStorageSync(key) : uni.removeStorage({key});
}

/**
 * @description    清理本地数据缓存。
 * @param sync {Boolean} 是否同步
 */
export function ClearCache(sync = true) {
    sync ? uni.clearStorageSync() : uni.clearStorage();
}


/**
 * @description     获取全部缓存信息
 * @param sync {Boolean} 是否同步 true: 同步 false: 异步
 * @returns {UniNamespace.GetStorageInfoSuccess}
 */
export function GetAllCacheInfo(sync = true) {
    let value = uni.getStorageInfoSync() || null;
    if (!sync) {
        uni.getStorageInfo({
            success: function (res) {
                value = res;
            }
        })
    }
    return value;
}


/**
 * @description  获取当前的地理位置、速度
 * @param option {GetLocationOptions}
 */
export function GetLocation(option) {
    uni.getLocation(option);
}

/**
 * @description  使用应用内置地图查看位置。
 * @param option {OpenLocationOptions}
 */
export function OpenLocation(option) {
    uni.openLocation(option);
}

/**
 * @description     监听实时地理位置变化事件，需结合 uni.startLocationUpdate 或 uni.startLocationUpdateBackground 使用。
 * @param callback {Function}
 */
export function OnLocationChange(callback) {
    uni.onLocationChange(callback);
}

/**
 * @description     地图组件控制
 * @param mapId｛String｝
 * @param self ｛*｝
 */
export function CreateMapContext(mapId, self) {
    uni.createMapContext(mapId, self);
}

/**
 * @description     从本地相册选择图片或使用相机拍照。
 * @param option {ChooseImageOptions}
 */
export function ChooseImage(option) {
    uni.chooseImage(option);
}

/**
 * @description 获取系统信息
 * @param option {UniNamespace.GetSystemInfoOptions}
 */
export function GetSystemInfo(option) {
    uni.getSystemInfo(option);
}

/**
 * @description  获取网络类型
 * @param option {GetNetworkTypeOptions}
 */
export function GetNetworkType(option) {
    uni.getNetworkType(option);
}

/**
 * @description     拨打电话
 * @param option {MakePhoneCallOptions}
 */
export function MakePhoneCall(option) {
    uni.makePhoneCall(option);
}

/**
 * @description 调起客户端扫码界面，扫码成功后返回对应的结果。
 * @param option {ScanCodeOptions}
 */
export function ScanCode(option) {
    uni.scanCode(option);
}

/**
 * @description     设置系统剪贴板的内容。
 * @param data {String}
 * @param showToast {Boolean}
 */
export function SetClipboardData(data, showToast = true) {
    uni.setClipboardData({
        data,
        showToast,
    })
}

/**
 * @description 获取系统剪贴板内容。
 * @returns {null}
 */
export function GetClipboardData() {
    let value = null;
    uni.getClipboardData({
        success: function (res) {
            value = res.data
        },
        fail: function(err) {
            throw new Error(err);
        }
    })
    return value;
}


/**
 * @description 隐藏软键盘
 */
export function HideKeyboard() {
    uni.hideKeyboard();
}


/**
 * @description     显示loading
 * @param option {ShowLoadingOptions}
 */
export function ShowLoading(option) {
    uni.showLoading(option)
}

/**
 * @description 关闭loading
 */
export function HideLoading() {
    uni.hideLoading();
}


/**
 * @description 显示吐司
 * @param option {UniNamespace.ShowToastOptions}
 */
export function ShowToast(option) {
    uni.showToast(option);
}

/**
 * @description 隐藏消息提示框。
 */
export function HideToast() {
    uni.hideToast();
}


/**
 * @description 动态设置当前页面的标题。
 * @param option {SetNavigationBarTitleOptions}
 */
export function SetNavigationBarTitle(option) {
    uni.setNavigationBarTitle(option)
}


/**
 * @description 设置页面导航条颜色。如果需要进入页面就设置颜色，请延迟执行，防止被框架内设置颜色逻辑覆盖
 * @param option {SetNavigationbarColorOptions}
 */
export function SetNavigationBarColor(option) {
    uni.setNavigationBarColor(option)
}

/**
 * @description    在当前页面显示、隐藏导航条加载动画。
 * @param isShow {Boolean}
 * @param option
 */
export function NavigationBarLoading(isShow = true, option = {}) {
    uni[isShow ? 'showNavigationBarLoading' : 'hideNavigationBarLoading'](option)
}

/**
 * @description 图片预览
 * @param option {PreviewImageOptions}
 */
export function PreviewImage(option) {
    uni.previewImage(option);
}

/**
 * @description  微信登录
 * @param option {LoginOptions}
 */
export function WxLogin(option) {
    uni.login(option);
}
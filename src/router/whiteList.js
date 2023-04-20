/**
 * 动态白名单   每个页面的onShow生命周期是没有 前缀/的， 而路由拦截事件获取到的路径是有前缀/的； 因此，设置一个hooks方法， 动态获取;
 * @param isRoot {Boolean}  是否需要加前缀 / ;
 * @returns {string[]}
 */
export default function getWhiteList(isRoot = false) {
    let whiteList = [
        '/',
        'pages/tabBar/home/index',
        'pages/tabBar/sort/index',
        'pages/index/index',
        'pages/login/index',
    ]

    let tempArr = ['/']

    if (isRoot) {
        whiteList.forEach(router => {
            if (router !== '/') {
                router = '/' + router
                tempArr.push(router)
            }
        })
    }

    return !isRoot ? whiteList : tempArr;
}
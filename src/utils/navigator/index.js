import { isAndroid, isIos } from '@/utils/regular';


// 这里是 app端暴露的方法， 可通过调用下面的方法直接访问app接口
export default {
  device(opts) {
    try {
      if (isIos()) {
        window.webkit.messageHandlers.navShouldHidden.postMessage(opts);
      } else if (isAndroid()) {
        console.log(JSON.stringify(opts));
      } else {
        console.log(JSON.stringify(opts));
      }
    } catch (e) {
      console.warn(e);
    }
  },

  // 缴纳保证金
  goBail() {
    let opts = {
      type: 'goto',
      url: 'nav://goBail',
    };
    this.device(opts);
  },
  // ios刷新订单详情
  updateOrderDetails() {
    let opts = {
      type: 'goto',
      url: 'nav://notifyOrderDetailRefresh',
      data: {},
    };
    this.device(opts);
  },
  // 点击上传视频
  upLoadVideo() {
    let opts = {
      type: 'goto',
      url: 'nav://uploadVideo',
      data: {},
    };
    this.device(opts);
  },
  // 点击上传图片
  upLoadImg(size, showCamera) {
    let opts = {
      type: 'goto',
      url: 'nav://uploadImage',
      data: {
        actionType: 1,
        photoCount: size, // 上传图片数量
        showCamera: showCamera, // 是否支持拍照
      },
    };
    this.device(opts);
  },

  // 点击保存图片的按钮传递的参数
  downloadImg(url) {
    let opts = {
      type: 'goto',
      url: 'nav://savePicture',
      data: {
        imgUrl: url,
      },
    };
    this.device(opts);
  },
  // 设置webview的head显示与否
  navHead(show, color = '') {
    let opts = {
      type: 'navHead',
      headSetting: {
        show: show,
        color: color,
      },
    };
    this.device(opts);
  },
  // 跳转到原生客户端的指定页面
  goto(title, url) {
    let opts = {
      type: 'goto',
      title: title,
      url: url,
    };
    this.device(opts);
  },
  // 跳转到原生客户端的指定页面
  login() {
    let opts = {
      type: 'goto',
      url: 'nav://login',
    };
    this.device(opts);
  },
  tel(phoneNum) {
    let opts = {
      type: 'goto',
      url: 'nav://tel',
      data: {
        phone: phoneNum, //手机号
        actionType: 1,
      },
    };
    this.device(opts);
  },
  // 跳转至TA参与的项目
  gotoProduct(info) {
    let opts = {
      type: 'goto',
      url: 'nav://product',
      data: {
        friendUserId: info,
      },
    };
    this.device(opts);
  },
  // 下载文件
  download(url) {
    let opts = {
      type: 'download',
      url: url,
    };
    this.device(opts);
  },
};

<template>
  <view class="content">
    <view class="os-button">
      <view class="mb-20">uni-api</view>
      <tui-button margin="0 0 20px 0" type="warning" @click="testTopage">跳转测试页面</tui-button>
      <tui-button margin="0 0 20px 0" type="warning" @click="testTopageLog">跳转日志页面</tui-button>
      <tui-button margin="0 0 20px 0" type="warning" @click="testTopageLogin">跳转登录页</tui-button>


      <tui-button margin="0 0 20px 0" @click="testClick">测试页面请求</tui-button>
      <tui-button margin="0 0 20px 0" type="warning" @click="testSetCache">测试存缓存</tui-button>
      <tui-button margin="0 0 20px 0" type="danger" @click="getSetCache">获取缓存</tui-button>
      <tui-button margin="0 0 20px 0" type="gray-primary" @click="testClearCache">清理本地数据缓存</tui-button>
      <tui-button margin="0 0 20px 0" @click="testAllInfo">获取全部缓存信息</tui-button>
      <tui-button margin="0 0 20px 0" type="warning" @click="testGetSystemInfo">获取设备信息</tui-button>
      <tui-button margin="0 0 20px 0" type="danger" @click="testGetNetworkType">获取网络类型</tui-button>
      <tui-button margin="0 0 20px 0" type="gray-primary" @click="testMakePhoneCall">拨打电话</tui-button>
      <tui-button margin="0 0 20px 0" @click="testScanCode">扫码</tui-button>
      <tui-button margin="0 0 20px 0" type="warning" @click="testSetClipboardData">设置系统剪贴板的内容</tui-button>
      <tui-button class="mb-20" type="gray-primary" @click="testGetClipboardData">获取系统剪贴板内容</tui-button>
      <view class="mb-20">金额处理</view>
      <tui-button class="mb-20" @click="testGetMoney">金额处理</tui-button>

    </view>
  </view>
</template>

<script>
import {testLogin} from '../../../api/test'
import {
  GetAllCacheInfo,
  GetCache, GetClipboardData,
  GetNetworkType,
  GetSystemInfo,
  MakePhoneCall, PageJump, ScanCode,
  SetCache, SetClipboardData
} from "../../../utils/uniVab";
import {EmptyStore, FormatCurrency} from "../../../utils/util";

export default {
  onLoad() {
    console.log(1111)
  },

  setup: function () {
    const testClick = () => {
      // todo: 测试接口
      testLogin({
        loginId: '15534076357',
        data: 'password=994978704',
        domainName: 'oppein.com'
      })
    }

    const testTopage = () => {
      PageJump({
        url: '/pages/test/index?test=1&token=1'
      }, 'navigateTo')
    }

    const testTopageHome = () => {
      PageJump({
        url: '/pages/index/index?test=1'
      }, 'navigateTo')
    }

    const testTopageLog = () => {
      PageJump({
        url: '/pages/index/test?test=1'
      }, 'navigateTo')
    }
    const testTopageLogin = () => {
      PageJump({
        url: '/pages/login/index?test=1'
      }, 'navigateTo')
    }

    const testSetCache = () => {
      SetCache('test-test-test', {data: 1, value: 2}, false)
    }

    const getSetCache = () => {
      console.log(GetCache('test-test-test', false))
    }

    const testClearCache = () => {
      // ClearCache(true)
      EmptyStore(true)
    }

    const testAllInfo = () => {
      console.log(GetAllCacheInfo(false))
    }

    const testGetSystemInfo = () => {
      GetSystemInfo({
        success: function (res) {
          console.log("获取设备信息", res)
        }
      })
    }

    const testGetNetworkType = () => {
      GetNetworkType({
        success: function (res) {
          console.log(res.networkType);
        }
      })
    }

    const testMakePhoneCall = () => {
      MakePhoneCall({
        phoneNumber: '15534076357',
        fail: (err) => {
          console.log(err)
        }
      })
    }

    const testScanCode = () => {
      ScanCode({
        success: function (res) {
          console.log('条码类型：' + res.scanType);
          console.log('条码内容：' + res.result);
        },
        fail: (err) => {
          console.log("扫码失败", err)
        }
      })
    }

    const testSetClipboardData = () => {
      SetClipboardData("123123123")
    }

    const testGetClipboardData = () => {
      console.log(GetClipboardData());
    }

    const testGetMoney = () => {
      console.log("默认保留俩为小数", FormatCurrency(100).toString());
      console.log("$", FormatCurrency(100).format());
      console.log("俩数计算相加", FormatCurrency(0.2).add(0.1).value);
      console.log("俩数计算相减", FormatCurrency(0.8).subtract(0.6).value);
    }

    const getSystemInfo = () => {
      GetSystemInfo({
        success: (res) => {
          // console.log("获取设备信息", res);
        }
      });
    }

    getSystemInfo();
    return {
      testClick,
      testTopage,
      testTopageHome,
      testTopageLog,
      testTopageLogin,
      testSetCache,
      getSetCache,
      testClearCache,
      testAllInfo,
      testGetSystemInfo,
      testGetNetworkType,
      testMakePhoneCall,
      testScanCode,
      testSetClipboardData,
      testGetClipboardData,
      testGetMoney
    }
  },
}
</script>

<style lang="scss" scoped>
.content {
  padding: 20px;
}

.mb-20 {
  margin-bottom: 20px;

}


.os-button {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>

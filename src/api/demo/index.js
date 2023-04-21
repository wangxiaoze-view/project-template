import service from '@/utils/http';
const testUri = {
  loginByBigMerchant: '***',
};

// 测试手机号登录
export function ProxyLogin(params) {
  // 除了正常post， 还有一种 qs.stringify(params, {arrayFormat: 'repeat'})
  return service.post(testUri.loginByBigMerchant, params);
}

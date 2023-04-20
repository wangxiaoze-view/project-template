import SimHttp from '@/utils/http/index'

export default class Notice {
  static async getList() {
    return SimHttp.get('/sim-api/getNotice', {})
  }

  static async getUpdateList() {
    return SimHttp.get('/sim-api/getUpdateList', {})
  }
}

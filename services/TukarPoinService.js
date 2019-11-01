import Api from './Api'

export default {
  getRedeemItems(n) {
    return Api().get('/store/all/5?page='+n)
  },
  getFlashPoint() {
    return Api().get('/store/flash-point')
  },
  getRedeemDetail(slug) {
    return Api().get('/store/detail/' + slug)
  },
  getRedeemHistory(redeem_id) {
    return Api().get('/store/history/' + redeem_id)
  }
}

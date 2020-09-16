import Api from './Api'

export default {
	getRedeemItems(n) {
		return Api().get('/store/all/5?page=' + n)
	},
	getFlashPoint() {
		return Api().get('/store/flash-point')
	},
	getRedeemDetail(slug) {
		return Api().get('/store/detail/' + slug)
	},
	getRedeemHistory(redeem_id, n) {
		var n = n ? n : 1
		return Api().get('/store/history/' + redeem_id + '?page=' + n)
	},
	getDiscount() {
		return Api().get('/redeem/discount')
	},
	getGrouped() {
		return Api().get('/store/items/categories')
	},
	getHelp() {
		return Api().get('/help/store');
	}
}

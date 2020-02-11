import AuthApi from '@/services/AuthApi'
import Api from './Api'
// import AuthApiLocal from '@/services/AuthApiLocal'

export default {
	getSingleUser() {
		return AuthApi().get('/member/get-single-member')
	},
	getReward() {
		return AuthApi().get('/member/reward')
	},
	postComment(params) {
		return AuthApi().post('/member/comment', params)
	},
	answerQuiz(params) {
		return AuthApi().post('/member/post-quiz', params)
	},
	/**
	 * TUKAR POIN
	 * @param {redeem_id,target_point} params
	 */
	tukarPoin(params) {
		return AuthApi().post('/member/change-point', params)
	},
	getHistoryVip() {
		return AuthApi().get('/member/vip-history')
	},
	updateProfile(data) {
		return AuthApi().put('/member/profile', data)
	},
	getAddresses() {
		return AuthApi().get('/member/address')
	},
	addAddress(params) {
		return AuthApi().post('/member/address', params)
	},
	editAddress(params) {
		return AuthApi().put('/member/address', params)
	},
	deleteAddress(id) {
		return AuthApi().delete('/member/address', { data: { id: id } })
	},
	provinsi() {
		return Api().get('/master/address/province')
	},
	kota(provinsi) {
		return Api().get('/master/address/district/' + provinsi)
	},
	kecamatan(kota) {
		return Api().get('/master/address/district-sub/' + kota)
	},
	kelurahan(kecamatan) {
		return Api().get('/master/address/village/' + kecamatan)
	},
	// Voucher
	getContacts() {
		return AuthApi().get('/member/contact')
	},
	getVoucherType() {
		return AuthApi().get('/static/number')
	},
	getBank() {
		return AuthApi().get('/static/banks')
	},
	addNumber(params) {
		return AuthApi().post('/member/contact', params)
	},
	editNumber(params) {
		return AuthApi().put('/member/contact', params)
	},
	deleteNumber(id) {
		return AuthApi().delete('/member/contact', { data: { id: id } })
	},
	mutasiPoin(page, filter) {
		var n = page ? page : 1
		var fil = filter ? filter : 'all'
		return AuthApi().get('/member/mutasi-poin/' + fil + '?page=' + n + '&filter_poin=' + fil)
	},
	rewardsWait(n) {
		return AuthApi().get('/member/transaction/wait/?page=' + n)
	},
	rewardsSent(n) {
		return AuthApi().get('/member/transaction/process/?page=' + n)
	},
	rewardsReceived(n) {
		return AuthApi().get('/member/transaction/confirmation/?page=' + n)
	},
	rewardsFinished(n) {
		return AuthApi().get('/member/transaction/finish?page=' + n)
	},

	claimDigital(params) {
		return AuthApi().post('/member/transaction/process/redeem-non-physical', params)
	},
	claimFisik(params) {
		return AuthApi().post('/member/transaction/process/redeem-physical', params)
	},
	confirmReward(params) {
		return AuthApi().post('/member/transaction/process/confirmation', params)
	},
	statusTransfer() {
		return AuthApi().get('/member/status-transfer')
	},
	getCodePW(page) {
		return AuthApi().get('/member/history-payment?page=' + page)
	}
}

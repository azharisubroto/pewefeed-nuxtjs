import AuthApi from "@/services/AuthApi"
import Api from "./Api"
// import AuthApiLocal from '@/services/AuthApiLocal'

export default {
	getSingleUser() {
		return AuthApi().get("/member/get-single-member")
	},
	getReward() {
		return AuthApi().get("/member/reward")
	},
	postComment(slug, params) {
		return AuthApi().post("/member/comment/" + slug, params)
	},
	answerQuiz(params) {
		return AuthApi().post("/member/post-quiz", params)
	},
	answerMultiple(params) {
		return AuthApi().post("member/multiple-quiz", params)
	},
	/**
	 * TUKAR POIN
	 * @param {redeem_id,target_point} params
	 */
	tukarPoin(params) {
		return AuthApi().post("/member/change-point", params)
	},
	getHistoryVip() {
		return AuthApi().get("/member/vip-history")
	},
	updateProfile(data) {
		return AuthApi().put("/member/profile", data)
	},
	getAddresses() {
		return AuthApi().get("/member/address")
	},
	addAddress(params) {
		return AuthApi().post("/member/address", params)
	},
	editAddress(params) {
		return AuthApi().put("/member/address", params)
	},
	deleteAddress(params) {
		return AuthApi().post("/member/delete-address", params)
	},
	provinsi() {
		return Api().get("/master/address/province")
	},
	kota(provinsi) {
		return Api().get("/master/address/district/" + provinsi)
	},
	kecamatan(kota) {
		return Api().get("/master/address/district-sub/" + kota)
	},
	kelurahan(kecamatan) {
		return Api().get("/master/address/village/" + kecamatan)
	},
	// Voucher
	getContacts() {
		return AuthApi().get("/member/contact")
	},
	getVoucherType() {
		return AuthApi().get("/static/number")
	},
	getBank() {
		return AuthApi().get("/static/banks")
	},
	addNumber(params) {
		return AuthApi().post("/member/contact", params)
	},
	editNumber(params) {
		return AuthApi().put("/member/contact", params)
	},
	deleteNumber(params) {
		return AuthApi().post("/member/delete-contact", params)
	},
	mutasiPoin(page, filter) {
		var n = page ? page : 1
		var fil = filter ? filter : "all"
		return AuthApi().get("/member/mutasi-poin/" + fil + "?page=" + n)
	},
	rewards(type = "wait", paged = 1, limit = 10) {
		//return AuthApi().get("/member/transaction/wait/?page=" + n)
		return AuthApi().get(
			`/v2/member/transaction/status?type=${type}&limit=${limit}&page=${paged}`
		)
	},
	rewardsSent(n) {
		return AuthApi().get("/member/transaction/process/?page=" + n)
	},
	rewardsReceived(n) {
		return AuthApi().get("/member/transaction/confirmation/?page=" + n)
	},
	rewardsFinished(n) {
		return AuthApi().get("/member/transaction/finish?page=" + n)
	},

	claimDigital(params) {
		return AuthApi().post(
			"/member/transaction/process/redeem-non-physical",
			params
		)
	},
	claimFisik(params) {
		return AuthApi().post(
			"/member/transaction/process/redeem-physical",
			params
		)
	},
	confirmReward(params) {
		return AuthApi().post(
			"/member/transaction/process/confirmation",
			params
		)
	},
	statusTransfer() {
		return AuthApi().get("/member/status-transfer")
	},
	getCodePW(page) {
		return AuthApi().get("/member/history-payment?page=" + page)
	},

	share(data) {
		return AuthApi().post("/member/share-social", data)
	},

	claimDailyPoint(data = null) {
		return AuthApi().post("/member/daily-point", data)
	},

	checkDailyPoint() {
		return AuthApi().get("/member/check-daily-point")
	},

	generateDailyPoint(data) {
		return AuthApi().post("/member/check-daily-point", data)
	},

	voucherDailyPoint() {
		return AuthApi().get("master/voucher/daily-point")
	},

	sendOTP() {
		return AuthApi().get("/member/otp")
	},

	verifyOTP(params) {
		return AuthApi().post("/member/otp", params)
	},

	eWalletBuy(params) {
		return AuthApi().post(
			"https://api.pewefeed.com/api/xendit/e-wallets",
			params
		)
	},

	fetchStatusSms(n) {
		return AuthApi().get("/member/purchase-status/sms?page=" + n)
	},

	fetchBanner(slug) {
		return Api().get("/static/banner/" + slug)
	},

	addPin(params) {
		return AuthApi().post(`/member/pin/create`, params)
	},

	updatePin(params) {
		return AuthApi().post(`/member/pin/update`, params)
	},

	resetPin(params) {
		return AuthApi().get(`/member/pin/reset`)
	},

	checkPinToken(token) {
		return AuthApi().get(`/member/pin/check-token/${token}`)
	},
}

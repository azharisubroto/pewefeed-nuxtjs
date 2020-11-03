import Api from "@/services/Api"
// import Api from '@/services/ApiLocal'

export default {
	/**
	 * Code PW
	 * @params {msisdn & code}
	 */
	getCodePw(params) {
		return Api().get("/master/voucher/form/" + params)
	},

	/**
	 * Code PW
	 * @params {msisdn & code}
	 */
	submitVoucher(params) {
		return Api().post("/master/voucher/confirm", params)
	},
}

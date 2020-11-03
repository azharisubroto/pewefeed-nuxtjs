import Api from "@/services/Api"

export default {
	getRedeem() {
		return Api().get("/static/redeem")
	},
	getDiscount() {
		return Api().get("/redeem/discount")
	},
	getCategory() {
		return Api().get("/redeem/category")
	},
}

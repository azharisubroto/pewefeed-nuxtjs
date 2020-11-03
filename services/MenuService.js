import Api from "@/services/Api"

export default {
	getHighlight() {
		return Api().get("/static/highlight")
	},
}

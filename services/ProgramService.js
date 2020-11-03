import Api from "@/services/Api"

export default {
	getProgram() {
		return Api().get("/program")
	},
	getChallange() {
		return Api().get("/static/challenges")
	},
}

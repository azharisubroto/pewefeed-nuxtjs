import Api from "./Api"
// import ApiLocal from './ApiLocal'

export default {
	getDailyLimit() {
		return Api().get("/help/daily-limit")
	},
}

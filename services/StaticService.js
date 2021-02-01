import Api from "./Api"
import AuthApi from "./AuthApi"
// import ApiLocal from './ApiLocal'

export default {
	getPoint() {
		return Api().get("/static/point")
	},
	getBanner() {
		return Api().get("/static/banner")
	},
	getChallenge() {
		return Api().get("/static/challenges")
	},
}

import Api from "@/services/Api"
import AuthApi from "@/services/AuthApi"

export default {
	getDetail(slug) {
		return Api().get("/kelas/" + slug)
	},
	getDetailAuth(slug) {
		return AuthApi().get("/kelas/" + slug)
	},
}

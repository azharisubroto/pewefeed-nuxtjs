import AuthApi from "@/services/AuthApi"

export default {
	getCities() {
		return AuthApi().get("/all")
	},
}

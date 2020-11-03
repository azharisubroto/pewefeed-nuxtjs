import axios from "axios"

const HTTP = axios.create({
	baseURL: "API_BASE_URL",
	headers: { "X-API-TOKEN": store.state.token },
	auth: {
		username: SOME_USERNAME,
		password: SOME_PASSWORD,
	},
})

export default {
	getSomeData() {
		return HTTP.get("/endpoint")
	},
	postSomeData(id, name) {
		return HTTP.post("/endpoint", {
			id: id,
			name: name,
		})
	},
}

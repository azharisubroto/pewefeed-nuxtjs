import axios from "axios"

export default () => {
	return axios.create({
		baseURL: `http://localhost/pw-api/public/api`,
		withCredentials: false,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
}

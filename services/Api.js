import axios from "axios"

export default () => {
	return axios.create({
		baseURL: `https://s1.playworld.id/api`,
		withCredentials: false,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
}

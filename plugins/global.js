const history = {
	name: "Test",
	back() {
		this.$router.back()
	},
}

export default ({ app }, inject) => {
	inject("test", history)
}

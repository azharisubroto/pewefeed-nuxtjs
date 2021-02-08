const helpers = {
	name: "Helpers",
	indoDate(date) {
		var months = [
			"Januari",
			"Februari",
			"Maret",
			"April",
			"Mei",
			"Juni",
			"Juli",
			"Agustus",
			"September",
			"Oktober",
			"November",
			"Desember",
		]

		var days = [
			"Minggu",
			"Senin",
			"Selasa",
			"Rabu",
			"Kamis",
			"Jum&#39;at",
			"Sabtu",
		]

		var curdate = new Date(date)
		var curmonth = curdate.getMonth()
		var curday = curdate.getDay()

		return (
			days[curday] +
			", " +
			curdate.getDate() +
			" " +
			months[curmonth] +
			" " +
			curdate.getFullYear()
		)
	},
}

export default ({ app }, inject) => {
	inject("helpers", helpers)
}

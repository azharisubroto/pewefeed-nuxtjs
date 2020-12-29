<template>
	<section>
		<!-- STATISTIK -->
		<template v-if="tab_state == 0">
			<v-container>
				<PoinStatistik />
			</v-container>
		</template>

		<template v-if="tab_state != 0">
			<v-container>
				<v-alert color="#0057FF" prominent class="text-12">
					<template v-slot:prepend>
						<v-img
							src="/img/icons/info-white.svg"
							width="20"
							max-width="20"
							class="mr-3 infoarticleicon"
						></v-img>
					</template>
					Ini adalah daftar transaksi seluruh POIN yang diterima atas
					interaksi valid seperti Menyukai hingga menjawab Kuis
				</v-alert>
				<PoinMutasi v-if="tab_state == 1" type="dapat" key="dapat" />
				<PoinMutasi v-if="tab_state == 2" type="tukar" key="tukar" />
				<PoinMutasi v-if="tab_state == 3" type="fraud" key="fraud" />
			</v-container>
		</template>

		<!-- NAVIGATION BAR -->
		<v-bottom-navigation
			fixed
			dark
			grow
			color="white"
			background-color="#2c2c2d"
			v-model="tab_state"
		>
			<v-btn v-for="item in tabs" :key="item">
				{{ item }}
			</v-btn>
		</v-bottom-navigation>
	</section>
</template>

<script>
import UserService from "@/services/UserService"
import PoinStatistik from "@/components/PoinStatistik"
import PoinMutasi from "@/components/PoinMutasi"

export default {
	middleware: "auth",
	name: "historiPoinPage",
	components: {
		PoinStatistik,
		PoinMutasi,
	},
	data() {
		return {
			mainloading: true,
			processClaim: false,
			userdata: null,
			mutasi: [],
			page: 1,
			last_page: 1,
			available: false,
			overlay: false,
			position: "all",
			moreloading: false,
			tab_state: 0,
			tabs: ["Statistik", "Diterima", "Ditukar", "Dihapus"],
		}
	},
	methods: {
		fetchUserdata() {
			// this.$auth.fetchUser()

			var res = []
			// res.data = this.$auth.user
			res.data = JSON.parse(localStorage.getItem("userdata"))

			this.userdata = res.data
		},
		kFormatter(number, decPlaces) {
			decPlaces = Math.pow(10, decPlaces)

			var abbrev = ["K", "M", "B", "T"]

			for (var i = abbrev.length - 1; i >= 0; i--) {
				var size = Math.pow(10, (i + 1) * 3)

				if (size <= number) {
					number = Math.round((number * decPlaces) / size) / decPlaces

					if (number == 1000 && i < abbrev.length - 1) {
						number = 1
						i++
					}

					number += abbrev[i]

					break
				}
			}

			return number
			return Math.abs(num) > 999
				? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K"
				: Math.sign(num) * Math.abs(num)
		},
		numberWithCommas(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		},
		async claim() {
			this.processClaim = true
			this.overlay = true
			let vm = this
			try {
				const res = await UserService.claimDailyPoint()

				this.$auth.fetchUser().then(() => {
					localStorage.setItem(
						"userdata",
						JSON.stringify(vm.$auth.user)
					)
					this.fetchUserdata()
				})

				this.fethMutasi()

				setTimeout(() => {
					this.overlay = false
					location.reload()
				}, 1000)
			} catch (error) {
				this.overlay = false
				console.log(error)
			}
		},
	},
	mounted() {
		this.fetchUserdata()
		this.position = "all"
	},
}
</script>

<style lang="scss">
.highlight {
	background: transparent;
	color: #fff;
}
.text-dark {
	color: #000;
}
.devider {
	position: relative;
	text-align: center;
	z-index: 0;
	&:before {
		content: "";
		width: 100%;
		z-index: -1;
		height: 1px;
		background: #000;
		opacity: 0.1;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto 0;
	}
	span {
		padding: 0 10px;
		background: #303030;
	}
}
.statusquo {
	.v-btn.active {
		color: var(--primary) !important;
	}
}
</style>

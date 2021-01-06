<template>
	<div class="bg-dark fill-height">
		<v-app-bar
			dark
			color="dark"
			flat
			fixed
			tile
			class="main-app-bar"
			style="z-index: 20"
		>
			<v-btn @click="$router.go(-1)" small icon>
				<v-icon>mdi-chevron-left</v-icon>
			</v-btn>
			<div class="flex-grow-1"></div>
			<v-toolbar-title>
				<strong>BANTUAN</strong>
			</v-toolbar-title>
			<div class="flex-grow-1"></div>

			<div
				@click="
					$router.push('/')
					clearStorage()
				"
				class="pr-1"
			>
				<img src="/img/peweicon.svg" width="20" />
			</div>
		</v-app-bar>

		<v-main>
			<v-card elevation="0">
				<v-img
					class="white--text align-end"
					src="/img/bantuan-cover.jpg"
					gradient=""
					height="289"
				>
					<v-card-title>
						<v-avatar size="56">
							<img alt="user" src="/img/peweicon.svg" />
						</v-avatar>
						<p class="ml-3 my-0">
							Selamat hari {{ day }}<br />Ada yang bisa kami
							bantu?
						</p>
					</v-card-title>
				</v-img>
			</v-card>

			<section style="background: #ffe4db" class="py-4">
				<v-container class="black--text">
					<h4 class="pw-title">PeweFeed Secara Singkat</h4>

					<v-carousel
						class="bantuan-slide"
						v-model="slide_state"
						height="300"
						:show-arrows="false"
					>
						<v-carousel-item
							v-for="(item, i) in slides"
							:key="'bnantuan-slide-' + i"
						>
							<v-row align="center" justify="center" class="mt-4">
								<v-col cols="4">
									<v-img :src="item.img" height="217"></v-img>
								</v-col>
								<v-col cols="8" class="black--text">
									<div class="text-16 font-weight-bold">
										{{ item.title }}
									</div>
									<p class="text-14">
										{{ item.text }}
									</p>

									<v-btn
										color="#ff4200"
										depressed
										small
										class="pl-0"
										v-if="slide_state >= 1"
										@click="
											slide_state = parseInt(
												slide_state - 1
											)
										"
									>
										<v-icon>mdi-chevron-left</v-icon>
										<span class="text-10">Kembali</span>
									</v-btn>
									<v-btn
										color="#ff4200"
										depressed
										small
										class="pr-0"
										@click="
											slide_state = parseInt(
												slide_state + 1
											)
										"
									>
										<span class="text-10">Selanjutnya</span>
										<v-icon>mdi-chevron-right</v-icon>
									</v-btn>
								</v-col>
							</v-row>
						</v-carousel-item>
					</v-carousel>
				</v-container>
			</section>

			<section style="background: #2e3a59" class="white--text py-4">
				<v-container>
					<h4 class="pw-title white--text">Kategori Bantuan</h4>

					<v-row no-gutters class="mt-5">
						<template v-for="(item, i) in cat">
							<v-col
								class="px-1 mb-2"
								cols="6"
								:key="'bantuan-basic-' + i"
							>
								<v-card
									:to="'/bantuan/menu?index=' + i"
									color="#FFE4DB"
									elevation="0"
									light
									class="pl-3 py-3"
									height="100%"
								>
									<div
										class="d-flex align-center justify-space-between"
									>
										<div class="black--text text-12">
											{{ item.name ? item.name : "" }}
										</div>
										<div>
											<v-icon>mdi-chevron-right</v-icon>
										</div>
									</div>
								</v-card>
							</v-col>
						</template>
					</v-row>
				</v-container>
			</section>

			<section style="background: #1c1c1c" class="white--text">
				<v-container>
					<v-card outlined color="#303030" style="border-color: #fff">
						<v-card-title
							primary-title
							style="
								background: #404040;
								border-bottom: 1px solid #fff;
							"
						>
							<h4 class="pw-title white--text text-14">
								Informasi dasar yang perlu kamu ketahui
							</h4>
						</v-card-title>
						<v-card-text class="px-0 pb-0">
							<template v-if="basic.length > 0">
								<v-card
									style="border-bottom: 1px solid #fff"
									tile
									elevation="0"
									color="#303030"
									v-for="(item, i) in basic"
									:key="'dasar-' + i"
									:to="'/bantuan/detail/' + item.slug"
								>
									<v-list-item
										two-line
										class="align-center d-flex"
									>
										<v-list-item-content>
											<v-list-item-title class="mb-3">{{
												item.name ? item.name : ""
											}}</v-list-item-title>
											<v-list-item-subtitle
												v-html="item.content"
											></v-list-item-subtitle>
										</v-list-item-content>
										<v-list-item-icon class="ml-4">
											<v-icon
												class="align-self-center my-0"
											>
												mdi-chevron-right
											</v-icon>
										</v-list-item-icon>
									</v-list-item>
								</v-card>
							</template>
						</v-card-text>
					</v-card>
				</v-container>
			</section>

			<BantuanFooter />
		</v-main>
	</div>
</template>

<script>
import MenuService from "@/services/MenuService"
import ArticleService from "@/services/ArticleService"
import BantuanFooter from "@/components/BantuanFooter"
import axios from "axios"

export default {
	name: "categories",
	layout: "blank",
	components: {
		BantuanFooter,
	},
	data() {
		return {
			slide_state: 0,
			slides: [
				{
					img: "/img/smartmockups_ki8cm2nw.png",
					title: "Baca Terus",
					text:
						"Baca artikelnya, banyak informasi viral, menghibur dan tentunya bermanfaat",
				},
				{
					img: "/img/bantuan-slide-2.png",
					title: "Ikuti Interaksinya",
					text:
						"Lakukan Interaksi seperti memberi komentar atau bermain kuis di dalam artikel",
				},
				{
					img: "/img/bantuan-slide-3.png",
					title: "Kumpulkan Poinnya",
					text:
						"Setiap interaksi kamu yang berhasil akan diubah menjadi Poin yang bisa dikumpulkam",
				},
				{
					img: "/img/bantuan-slide-4.png",
					title: "Dapatkan Rewardsnya",
					text:
						"Poinnya bisa kamu tukar dengan rewards secara langsung tanpa diundi",
				},
			],
			facebook: process.env.facebook,
			instagram: process.env.instagram,
			twitter: process.env.twitter,
			youtube: process.env.youtube,
			youtubeUrl: process.env.youtubeUrl,
			bantuanMenu: null,
			contact: 2,
			contacts: [
				{
					title: "(021) 293 85 381",
					phone: "02129385381",
					isWhatsapp: false,
					subtitle: "(Business Hour)",
				},
				{
					title: "0815 1906 0929",
					phone: "6281519060929",
					isWhatsapp: true,
					subtitle: "(24 Hour)",
				},
			],
			contacttwo: 2,
			contactmail: 2,
			contactstwo: [
				{
					title: "0817 1717 3029",
					phone: "6281717173029",
					isPhone: true,
					subtitle: "(24 Hour)",
				},
			],
			day: "",
			cat: [],
			basic: [],
			contactsmail: [
				{
					title: "halo@pewefeed.com",
					mail: "halo@pewefeed.com",
					isSubtitle: false,
					subtitle: "(Official Email Address)",
				},
				// {
				//   title: process.env.email,
				//   mail: process.env.email,
				//   isSubtitle: true,
				//   subtitle: "(Official Email Address)"
				// }
			],
		}
	},
	methods: {
		showDay() {
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

			var myDays = [
				"Minggu",
				"Senin",
				"Selasa",
				"Rabu",
				"Kamis",
				"Jum&#39;at",
				"Sabtu",
			]

			var date = new Date()

			var day = date.getDate()

			var month = date.getMonth()

			var thisDay = date.getDay()

			this.day = myDays[thisDay]
		},
		async fetchBantuan() {
			try {
				const res = await ArticleService.getBantuan()
				const data = res.data.data
				// //console.log(JSON.parse(JSON.stringify(data)));
				this.bantuanMenu = data
				//this.loading = false
			} catch (error) {
				console.log(error)
			}
		},
		async basicInfo() {
			try {
				const response = await axios.get(
					"https://api.pewefeed.com/api/v2/help/how-to-basic?limit=5"
				)
				const data = await response.data
				this.basic = data.data
			} catch (error) {}
		},
		async getCategory() {
			try {
				const response = await axios.get(
					"https://api.pewefeed.com/api/v2/help/how-to"
				)
				const data = await response.data
				this.cat = data.data
			} catch (error) {}
		},
	},
	mounted() {
		this.showDay()
		this.fetchBantuan()
		this.getCategory()
		this.basicInfo()
	},
}
</script>
<style lang="scss">
.fill-height {
	min-height: 100vh;
}
.bg-dark {
	.devider-small {
		opacity: 0.3;
	}
}
.contaclist {
	.v-list-item__title {
		font-size: 18px !important;
	}
	.v-list-item--link:before {
		display: none !important;
	}
	.v-ripple__container {
		display: none !important;
	}
}

.bantuan-slide {
	.v-carousel__controls {
		background: transparent;
		button {
			.v-icon {
				color: #bababa;
				opacity: 1 !important;
			}
			&.v-btn--active {
				.v-icon:before {
					color: #ff4200;
				}
			}
		}
	}
}
</style>

<style lang="scss" scoped>
.pw-title {
	padding-left: 30px;
	position: relative;
	font-weight: bold;
	color: #000;
	line-height: 20px;
	&:before {
		content: "";
		width: 20px;
		height: 20px;
		left: 0;
		background: #ff4200;
		position: absolute;
		border-radius: 90px;
	}
}
</style>

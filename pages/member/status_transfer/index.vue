<template>
	<section class="statusbank">
		<v-container>
			<v-alert class="mt-4 text-14" color="#0057FF" prominent>
				<template v-slot:prepend>
					<v-img
						src="/img/icons/info.svg"
						width="35"
						max-width="35"
						class="mr-3 infoarticleicon"
					></v-img>
				</template>
				Transaksi yang tidak dibayarkan dalam waktu 1 jam akan dihapus
				otomatis
			</v-alert>

			<span class="white--text">Filter: </span>

			<v-btn
				v-for="(item, i) in tabItems"
				:key="item.label"
				class="text-uppercase ml-1"
				outlined
				small
				:color="tab == i ? '#ff4200' : 'grey'"
				@click="tab = i"
			>
				<span class="text-capitalize">{{ item.label }}</span>
			</v-btn>
		</v-container>

		<template v-if="tab == 0">
			<Pending />
		</template>

		<template v-if="tab == 1">
			<Sukses />
		</template>

		<template v-if="tab == 2">
			<client-only>
				<v-stepper class="stepperHelp" v-model="helpStep">
					<v-stepper-items>
						<v-stepper-content class="pa-0" back step="1">
							<!-- BANTUAN -->
							<template v-if="bantuanMenu != null">
								<template
									v-for="(bantuan, i) in bantuanMenu[0][
										'submenu'
									].slice(11)"
								>
									<div
										v-if="i == 0"
										class="devider-small my-0"
										:key="'asdasasd-' + i"
									></div>
									<v-expansion-panels
										:key="'asdaasdass-' + i"
									>
										<v-expansion-panel class="mb-0">
											<v-expansion-panel-header
												class="py-5 text-uppercase"
												><span
													style="line-height: 25px"
													>{{ bantuan.title }}</span
												></v-expansion-panel-header
											>
											<v-expansion-panel-content
												class="text-left"
											>
												<div
													v-html="bantuan.content"
												></div>
											</v-expansion-panel-content>
										</v-expansion-panel>
									</v-expansion-panels>
									<div
										class="devider-small my-0"
										:key="'cats-' + i"
									></div>
								</template>
							</template>
						</v-stepper-content>

						<v-stepper-content class="pa-0" step="2">
							<template
								v-if="
									secondahelpdata != null &&
									secondahelpdata.length > 0
								"
							>
								<template
									v-for="(bantuan, i) in secondahelpdata"
								>
									<div
										v-if="i == 0"
										class="devider-small my-4"
										:key="'asasdfsddas-' + i"
									></div>
									<div
										cols="12"
										class="px-4"
										:key="'cat-' + i"
									>
										<a
											class="pl-0"
											text
											dark
											:id="'help-' + bantuan.id"
											@click="
												helpStep = 3
												thirdhelpdata = bantuan.content
												thirdhelptitle = bantuan.title
											"
											>{{ bantuan.title }}</a
										>
									</div>
									<div
										class="devider-small my-4"
										:key="'cats-' + i"
									></div>
								</template>
							</template>
							<template v-else>
								<div class="pa-10 text-center">
									Konten tidak tersedia
								</div>
							</template>
						</v-stepper-content>

						<v-stepper-content class="pa-0" step="3">
							<template v-if="thirdhelpdata != null">
								<v-container>
									<h4
										class="deep-orange--text text-20 mb-4 mt-5"
									>
										{{ thirdhelptitle }}
									</h4>
									<div v-html="thirdhelpdata"></div>
								</v-container>
							</template>
							<template v-else>
								<div class="pa-10 text-center">
									Konten tidak tersedia
								</div>
							</template>
						</v-stepper-content>
					</v-stepper-items>
				</v-stepper>
			</client-only>
		</template>

		<!-- MENU -->
		<!-- <v-bottom-navigation
			fixed
			dark
			grow
			color="white"
			background-color="#2C2C2D"
			v-model="tab"
			height="80"
			class="pwmenubottom"
		>
			<v-btn
				v-for="item in tabItems"
				:key="item.label"
				class="text-uppercase"
			>
				<span class="text-capitalize">{{ item.label }}</span>
				<img
					:src="'/img/icons/' + item.image"
					class="mb-1 d-block"
					width="20"
					height="20"
				/>
			</v-btn>
		</v-bottom-navigation> -->

		<LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose" />

		<DrawerPurchaseStatus
			:dialogVisible="openPurchaseStatus"
			:expireDate="expire_date"
			:statusPurchase="statusPurchase"
			@close="myDialogClose()"
		/>
	</section>
</template>
<script>
import Pending from "@/components/member/midtrans/Pending"
import Sukses from "@/components/member/midtrans/Sukses"
import UserService from "@/services/UserService"
import ArticleService from "@/services/ArticleService"
import LoginModal from "@/components/modal/LoginModal"
import DrawerPurchaseStatus from "@/components/common/DrawerPurchaseStatus"
export default {
	components: {
		Pending,
		Sukses,
		LoginModal,
		DrawerPurchaseStatus,
	},
	layout: "payment",
	data() {
		return {
			tab: 0,
			addresses: null,
			contact: null,
			tabItems: [
				{
					label: "Belum dibayar",
					image: "pending.svg",
				},
				{
					label: "Sudah dibayar",
					image: "success.svg",
				},
				// {
				// 	label: "Info",
				// 	image: "transferinfo.svg",
				// },
			],
			loginModalVisible: false,
			bantuanMenu: null,
			helpStep: 1,
			secondahelpdata: null,
			thirdhelptitle: null,
			thirdhelpdata: null,
			openPurchaseStatus: false,
			statusPurchase: false,
			expire_date: "",
		}
	},
	methods: {
		async getAddresses() {
			this.isLoading = true
			try {
				const res = await UserService.getAddresses()
				var items = res.data.data
				if (items && items.length > 0) {
					////console.log(JSON.parse(JSON.stringify(items)))
					this.addresses = items
				}
			} catch (error) {
				console.log(error)
			}
		},
		async getNumbers() {
			this.isLoading = true
			try {
				const res = await UserService.getContacts()
				var items = res.data.data
				if (items && items.length > 0) {
					////console.log(JSON.parse(JSON.stringify(items)))
					this.contact = items
				}
			} catch (error) {
				//console.log(res);
			}
		},
		openModalLogin() {
			this.loginModalVisible = true
		},
		myDialogClose() {
			this.loginModalVisible = false
			this.openPurchaseStatus = false
		},
		async fetchBantuan() {
			try {
				const res = await ArticleService.getBantuan()
				const data = res.data.data
				// //console.log(JSON.parse(JSON.stringify(data)));
				this.bantuanMenu = data
				setTimeout(() => {
					if (this.$router.currentRoute.query["tab"]) {
						document.getElementById("help-2").click()
						setTimeout(() => {
							document.getElementById("help-73").click()
						}, 100)
					}
				}, 2000)
				//this.loading = false
			} catch (error) {
				console.log(error)
			}
		},
		getParameterByName(name, url = window.location.href) {
			name = name.replace(/[\[\]]/g, "\\$&")
			var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
				results = regex.exec(url)
			if (!results) return null
			if (!results[2]) return ""
			return decodeURIComponent(results[2].replace(/\+/g, " "))
		},
	},
	mounted() {
		this.fetchBantuan()
		if (!this.$auth.user) {
			this.openModalLogin()
		} else {
			this.getAddresses()
			this.getNumbers()
		}

		// var queryURL = this.getParameterByName("transaction_status")

		// if (queryURL) {
		// 	if (queryURL == "pending") {
		// 		this.openPurchaseStatus = true
		// 	} else {
		// 		this.$router.push("/?tab=4")
		// 		localStorage.setItem("onpurchasevip", true)
		// 	}
		// }

		// if (localStorage.getItem("onpurchasevip")) {
		// 	localStorage.removeItem("onpurchasevip")
		// 	this.statusPurchase = false
		// 	this.openPurchaseStatus = true
		// }
	},
}
</script>

<style lang="scss">
.statusbank {
	.theme--dark.v-expansion-panels .v-expansion-panel {
		background: transparent !important;
		.v-expansion-panel-content {
			background: rgba(255, 255, 255, 0.07);
		}
	}
}
</style>

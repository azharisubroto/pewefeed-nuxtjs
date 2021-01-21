<template>
	<div class="paymentpage">
		<v-app-bar dark color="dark" flat fixed tile class="main-app-bar">
			<template v-if="$route.name != 'index'">
				<v-btn @click="prev()" small icon>
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
				<div class="flex-grow-1"></div>
			</template>
			<template v-else>
				<v-btn @click="prev()" small icon>&nbsp;</v-btn>
				<div class="flex-grow-1"></div>
			</template>

			<v-toolbar-title
				@click="
					$router.push('/')
					drawer = false
				"
				class="px-0"
				>{{
					appBarLabel ? appBarLabel : "KEANGGOTAAN VIP"
				}}</v-toolbar-title
			>
			<div class="flex-grow-1"></div>

			<div
				@click="$router.push('/')"
				v-if="$route.name != 'index'"
				class="pt-2"
			>
				<img src="/img/peweicon.svg" width="20" />
			</div>
		</v-app-bar>

		<v-card :elevation="0">
			<!-- Step -->
			<v-stepper v-model="e1">
				<v-stepper-items>
					<v-stepper-content step="1" class="px-0">
						<v-card
							outlined
							class="mx-3 my-3 text-16"
							style="border: 1px solid #fff !important"
						>
							<div
								style="background: #404040"
								class="px-4 py-5 text-16"
							>
								Paket Non-Berlangganan
							</div>
							<v-list-item-group>
								<template v-for="(item, i) in vipItems">
									<div
										v-if="i == 0"
										class="devider-small"
										:key="'purchase-menu-devider-1' + i"
									></div>
									<v-list-item
										class="py-3"
										:key="'purchase-menu' + i"
										@click="
											e1 = 2
											setPrechoices(item)
										"
									>
										<v-list-item-content>
											<v-list-item-title
												style="line-height: 23px"
											>
												<strong
													class="d-block text-16 text-thirdary"
													>{{ item.label }}</strong
												>
												<span class="d-block text-16"
													>{{ item.price }} (exclude
													PPN 10%)</span
												>
											</v-list-item-title>
										</v-list-item-content>
										<v-list-item-icon>
											<v-icon size="30"
												>mdi-chevron-right</v-icon
											>
										</v-list-item-icon>
									</v-list-item>
									<div
										class="devider-small"
										:key="'purchase-menu-devider' + i"
									></div>
								</template>
							</v-list-item-group>
						</v-card>

						<v-card
							outlined
							class="mx-3 my-3 text-16"
							style="border: 1px solid #fff !important"
						>
							<div
								style="background: #404040"
								class="px-4 py-5 text-16"
							>
								Paket Berlangganan
							</div>

							<v-list-item-group>
								<template v-for="(item, i) in subsitems">
									<div
										v-if="i == 0"
										class="devider-small"
										:key="'purchase-menu-devider-xx' + i"
									></div>
									<v-list-item
										class="py-3"
										:key="'purchase-menu-asdfd' + i"
										@click="
											e1 = 2
											setPrechoices(item)
										"
									>
										<v-list-item-content>
											<v-list-item-title
												style="line-height: 23px"
											>
												<strong
													class="d-block text-16 text-thirdary"
													>{{ item.label }}</strong
												>
												<span class="d-block text-16"
													>{{ item.price }} (exclude
													PPN 10%)</span
												>
												<div class="d-block text-16">
													{{ item.desc }}
												</div>
											</v-list-item-title>
										</v-list-item-content>
										<v-list-item-icon>
											<v-icon size="30"
												>mdi-chevron-right</v-icon
											>
										</v-list-item-icon>
									</v-list-item>
									<div
										class="devider-small"
										:key="'purchase-menu-deviderxxas' + i"
									></div>
								</template>
							</v-list-item-group>
						</v-card>
					</v-stepper-content>

					<v-stepper-content step="2" class="px-0 pt-0">
						<v-container>
							<v-card
								outlined
								class="text-16 mb-4"
								style="border: 1px solid #fff !important"
							>
								<div class="pa-4" style="background: #404040">
									via SMS
								</div>
								<!-- SMS  -->
								<template v-if="prechoice.payment != null">
									<v-list-item-group>
										<template
											v-for="(item, i) in smspayment"
										>
											<div
												v-if="i == 0"
												class="devider-small"
												:key="
													'purchase-menu-devider-1' +
													i
												"
											></div>
											<v-list-item
												class="py-3"
												:key="'purchase-menu' + i"
												@click="
													e1 = 3
													guessVoucher(item)
													getWapType = item.key
												"
												:disabled="
													!prechoice.payment.includes(
														item.key
													)
												"
											>
												<v-list-item-content>
													<v-list-item-title
														style="
															line-height: 23px;
														"
													>
														<strong
															class="d-block text-thirdary"
															>{{
																item.label
															}}</strong
														>
														<span class="d-block">{{
															item.desc
														}}</span>
														<div class="text-10">
															{{
																!prechoice.payment.includes(
																	item.key
																)
																	? "tidak tersedia"
																	: ""
															}}
														</div>
													</v-list-item-title>
												</v-list-item-content>
												<v-list-item-icon>
													<v-icon size="30"
														>mdi-chevron-right</v-icon
													>
												</v-list-item-icon>
											</v-list-item>
											<div
												class="devider-small"
												:key="
													'purchase-menu-devider' + i
												"
											></div>
										</template>
									</v-list-item-group>
								</template>
							</v-card>

							<v-card
								outlined
								class="text-16 mb-3"
								style="border: 1px solid #fff !important"
							>
								<div class="pa-4" style="background: #404040">
									via BANK / CREDIT CARD
								</div>
								<!-- Bank Transfer / Credit Card  -->
								<v-list-item-group
									v-if="prechoice.payment != null"
								>
									<template
										v-for="(item, i) in transferpayment"
									>
										<div
											v-if="i == 0"
											class="devider-small"
											:key="'purchase-menu-devider-1' + i"
										></div>
										<v-list-item
											class="py-3"
											:key="'purchase-menu' + i"
											@click="guessBank(item.value)"
											:disabled="
												!prechoice.payment.includes(
													'bank'
												)
											"
										>
											<v-list-item-content>
												<v-list-item-title
													style="line-height: 23px"
												>
													<strong
														class="d-block text-16 text-thirdary"
														>{{
															item.label
														}}</strong
													>
													<div>
														{{ item.desc }}
													</div>
													<div class="text-10">
														{{
															!prechoice.payment.includes(
																"bank"
															)
																? "tidak tersedia"
																: ""
														}}
													</div>
												</v-list-item-title>
											</v-list-item-content>
											<v-list-item-icon>
												<v-icon size="30"
													>mdi-chevron-right</v-icon
												>
											</v-list-item-icon>
										</v-list-item>
										<div
											class="devider-small"
											:key="'purchase-menu-devider' + i"
										></div>
									</template>
								</v-list-item-group>
							</v-card>

							<v-card
								outlined
								class="text-16"
								style="border: 1px solid #fff !important"
							>
								<div class="pa-4" style="background: #404040">
									via E-WALLETS
								</div>

								<v-list-item-group
									v-if="prechoice.payment != null"
								>
									<template
										v-for="(item, i) in ewalletspayment"
									>
										<div
											v-if="i == 0"
											class="devider-small"
											:key="'purchase-menu-devider-1' + i"
										></div>
										<v-list-item
											class="py-3"
											:key="'purchase-menu' + i"
											@click="eWalletPurchase(item.key)"
											:disabled="
												!prechoice.payment.includes(
													'ewallets'
												)
											"
										>
											<v-list-item-content>
												<v-list-item-title
													style="line-height: 23px"
												>
													<strong
														class="d-block text-16 text-thirdary"
														>{{
															item.label
														}}</strong
													>
													<div>
														{{ item.desc }}
													</div>
													<div class="text-10">
														{{
															!prechoice.payment.includes(
																"ewallets"
															)
																? "tidak tersedia"
																: ""
														}}
													</div>
												</v-list-item-title>
											</v-list-item-content>
											<v-list-item-icon>
												<v-icon size="30"
													>mdi-chevron-right</v-icon
												>
											</v-list-item-icon>
										</v-list-item>
										<div
											class="devider-small"
											:key="'purchase-menu-devider' + i"
										></div>
									</template>
								</v-list-item-group>
							</v-card>
						</v-container>
					</v-stepper-content>

					<!-- SMS CHECKPOINT -->
					<v-stepper-content step="3" class="px-0 pt-0">
						<v-container
							style="
								position: fixed;
								top: 50px;
								bottom: 0;
								z-index: 1000;
								background: #1c1c1c;
							"
						>
							<v-card
								outlined
								class="text-16 mb-3"
								style="border: 1px solid #fff !important"
							>
								<div class="pa-4" style="background: #404040">
									Rincian Pembelian
								</div>
								<div class="pa-3">
									<div class="text-thirdary">
										<strong>{{ prechoice.label }}</strong>
									</div>
									<div>
										{{ prechoice.price }} (exclude PPN 10%)
									</div>
								</div>
							</v-card>

							<v-card
								outlined
								class="text-16 mb-3"
								style="border: 1px solid #fff !important"
							>
								<div class="pa-4" style="background: #404040">
									Langkah Pembelian
								</div>
								<div class="py-3">
									<v-list-item-group>
										<v-list-item>
											<v-list-item-icon>
												<div class="iconnumer">1</div>
											</v-list-item-icon>
											<v-list-item-content>
												Pastikan anda menggunakan nomor
												ponsel dari XL Axiata
											</v-list-item-content>
										</v-list-item>
										<div class="devider-small"></div>
										<v-list-item>
											<v-list-item-icon>
												<div class="iconnumer">2</div>
											</v-list-item-icon>
											<v-list-item-content>
												Ketik SMS dengan format
												<div
													class="text-thirdary"
													v-html="'REG<spasi>PW'"
												></div>
											</v-list-item-content>
										</v-list-item>
										<div class="devider-small"></div>
										<v-list-item>
											<v-list-item-icon>
												<div class="iconnumer">3</div>
											</v-list-item-icon>
											<v-list-item-content>
												Kirim ke
												<div class="text-thirdary">
													97789
												</div>
											</v-list-item-content>
										</v-list-item>
										<div class="devider-small"></div>
										<v-list-item>
											<v-list-item-icon>
												<div class="iconnumer">4</div>
											</v-list-item-icon>
											<v-list-item-content>
												Selanjutnya tunggu SMS balasan
												dari 97789 dan ikuti instruksi
												selanjutnya
											</v-list-item-content>
										</v-list-item>
									</v-list-item-group>
								</div>
							</v-card>
						</v-container>
					</v-stepper-content>
				</v-stepper-items>
			</v-stepper>
		</v-card>

		<!-- SUKSES -->
		<v-bottom-sheet v-model="success">
			<v-sheet height="100%">
				<v-toolbar :elevation="1" style="border-top: 2px solid #fff">
					<v-row class="pa-0" align="center">
						<v-col cols="2">
							<v-btn
								dark
								icon
								tile
								style="border-right: 0px solid #717171"
								light
								@click="success = false"
							>
								<v-icon>mdi-close</v-icon>
							</v-btn>
						</v-col>
						<v-col cols="8" class="deep-orange--text text-center"
							>SUCCESS</v-col
						>
					</v-row>
				</v-toolbar>

				<div class="mx-2">
					<div class="pb-10">
						<v-row align="center" justify="center">
							<v-icon color="green" class="display-3"
								>mdi-check-circle</v-icon
							>
						</v-row>
						<v-row align="center" justify="center">
							<p class="heading mt-4 text-center">
								PERIKSA HANDPHONE ANDA
								<br />UNTUK PROSES SELANJUTNYA
							</p>
						</v-row>
						<v-row align="center" justify="center" class="mx-4">
							<div>
								<v-btn
									@click="success = false"
									dark
									color="deep-orange"
									class="text-capitalize"
									>CLOSE</v-btn
								>
							</div>
						</v-row>
					</div>
				</div>
			</v-sheet>
		</v-bottom-sheet>

		<IframePreview
			:dialogVisible="iframeDialogVisible"
			:invoiceUrl="invoiceUrl"
			@close="iframeClose()"
		/>

		<v-overlay :opacity="1" :value="ewalletOverlay">
			<div class="text-center">
				<v-progress-circular
					indeterminate
					size="64"
					color="green"
				></v-progress-circular>
				<div class="mt-4">Connecting Provider...</div>
			</div>
		</v-overlay>

		<IframePreview
			:dialogVisible="ewalletIframe"
			:invoiceUrl="ewalletIframeUrl"
			@close="iframeClose()"
		/>
	</div>
</template>

<script>
import PurchaseService from "@/services/PurchaseService"
import UserService from "@/services/UserService"
import IframePreview from "@/components/modal/IframePreview"
export default {
	middleware: "auth",
	name: "PurchasePage",
	layout: "payment",
	props: {
		dialogVisible: Boolean,
	},
	data() {
		return {
			appBarLabel: null,
			e1: 1,
			dialog: false,
			itemprice: null,
			itemname: null,
			sublabel: null,
			itemcode: null,
			itemvoucher: null,
			itemhari: null,
			buymethod: null,
			current: 0,
			indosatvoucherid: 13,
			purchasemenu: [
				{
					title: "Purchase Status via Banks / eWallets",
					to: "/member/status_transfer",
				},
				{
					title: "Purchase Status via SMS",
					to: "/member/status_transfer/sms",
				},
				{
					title: "Activate KEANGGOTAAN VIP - SMS Code",
					to: "/c/",
				},
			],
			indosatlabel:
				"<strong class='text-16'>6 Hari VIP</strong><br><span class='text-14 text-normal' style='font-weight:normal!important;'>3 SMS Per Minggu (Tidak Auto Renewal)<br>1 SMS untuk 2 Hari VIP<br>Rp. 2200/SMS termasuk PPN 10%",
			indosatprice: "Rp 2.200",
			xlregvoucher: 17,
			xlreglabel:
				"<strong class='text-16'>6 Hari VIP</strong><br><span class='text-14 text-normal' style='font-weight:normal!important;'>3 SMS Per Minggu (Tidak Auto Renewal)<br>1 SMS untuk 2 Hari VIP<br>Rp. 2200/SMS termasuk PPN 10%",
			xlregprice: "Rp 2.200",
			tab: null,
			userdata: [],
			valid: true,
			recaptchaToken: null,
			numberRules: [(v) => !!v || "Input Valid Number"],
			formdata: {
				voucher_id: null,
				nomorhandphone: "",
			},
			snackbar: false,
			timeout: 3000,
			responsemessage: "",
			wap: null,
			useWap: null,
			lazy:
				"https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png",
			logo: "/pl-logo.png",
			indosatviplogo:
				"https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip-s.svg",

			/**
			//// XL sms only
			3: 2 hari
			5: 5 hari

			//// bank & transfer
			12: 11 hari
			9: 30 hari

			//// subs, indosat & XL only
			17: xl sub - 6 hari
			13: isat sub - 6 hari
		 */
			vipItems: [
				{
					voucher_id: 3,
					label: "1 Hari KEANGGOTAAN VIP",
					price: "Rp 2.000",
					code: "PW0",
					payment: ["xl"],
				},
				{
					voucher_id: 5,
					label: "3 Hari KEANGGOTAAN VIP",
					price: "Rp 5.000",
					code: "PW0",
					payment: ["xl"],
				},
				{
					voucher_id: 12,
					label: "6 Hari KEANGGOTAAN VIP",
					price: "Rp 10.000",
					code: "PW0",
					payment: ["bank", "ewallets"],
				},
				{
					voucher_id: 9,
					label: "15 Hari KEANGGOTAAN VIP",
					price: "Rp 25.000",
					code: "PW0",
					payment: ["bank", "ewallets"],
				},
			],
			subsitems: [
				{
					label: "6 Hari KEANGGOTAAN VIP",
					price: "Rp 2.000",
					desc: "3 SMS/Minggu - 1 SMS untuk 2 Hari VIP",
					code: "PW0",
					payment: ["xl", "indosat"],
				},
			],
			prechoice: {
				label: null,
				price: null,
				desc: null,
				payment: null,
			},
			smspayment: [
				{
					key: "xl",
					label: "XL",
					desc: "(Anda harus memiki nomor ponsel XL)",
				},
				{
					key: "indosat",
					label: "Indosat",
					desc: "(Anda harus memiki nomor ponsel Indosat)",
				},
			],
			transferpayment: [
				{
					label: "Bank BRI / BNI / MANDIRI / PERMATA",
					desc: "Menggunakan XENDIT payment gateway",
					value: "xendit",
				},
				{
					label: "Bank BCA",
					desc: "Menggunakan MIDTRANS payment gateway",
					value: "midtrans",
				},
			],
			ewalletspayment: [
				{
					label: "DANA",
					desc: "Menggunakan XENDIT payment gateway",
					key: "dana",
				},
				{
					label: "LINKAJA",
					desc: "Menggunakan XENDIT payment gateway",
					key: "linkaja",
				},
			],
			paymentmethod: null,
			iframeDialogVisible: false,
			invoiceUrl: "",
			finalbuttondisabled: true,
			success: false,
			ewalletOverlay: false,
			getWapType: null,
			ewalletIframe: false,
			ewalletIframeUrl: null,
		}
	},
	components: {
		IframePreview,
	},
	watch: {
		"formdata.nomorhandphone": function (baru, lama) {
			////console.log(baru)
			setTimeout(() => {
				let phonenumber = this.formdata.nomorhandphone
				var zero = phonenumber.substring(0, 1)
				var namdua = phonenumber.substring(0, 2)
				if (zero == 0 || namdua == 62) {
					if (phonenumber != "" && phonenumber != null) {
						this.finalbuttondisabled = false
					} else {
						this.finalbuttondisabled = true
					}
				} else {
					this.finalbuttondisabled = true
				}
			}, 200)
		},
	},
	computed: {
		/* Init Modal */
		intDialogVisible: {
			get: function () {
				if (this.dialogVisible) {
					// Some dialog initialization code could be placed here
					// because it is called only when this.dialogVisible changes
					this.$emit("open")
				}

				return this.dialogVisible
			},
			set: function (value) {
				if (!value) {
					this.$emit("close")
				}
			},
		},
	},
	methods: {
		setPrechoices(item) {
			this.prechoice.voucher_id = item.voucher_id ? item.voucher_id : null
			this.prechoice.label = item.label ? item.label : null
			this.prechoice.price = item.price ? item.price : null
			this.prechoice.desc = item.desc ? item.desc : null
			this.prechoice.payment = item.payment ? item.payment : null
		},
		guessVoucher(item) {
			if (this.prechoice.voucher_id == null) {
				return (this.prechoice.voucher_id = item.key == "xl" ? 17 : 13)
			}
		},
		async guessBank(provider) {
			this.ewalletOverlay = true
			if (provider == "midtrans") {
				const sendvoucher = {
					voucher_id: this.prechoice.voucher_id,
				}

				try {
					const res = await PurchaseService.midtrans(sendvoucher)
					if (res.status == 200) {
						// //console.log(res.data)
						var url = res.data.snap_url
						window.location.href = url
						this.ewalletOverlay = false
					}
				} catch (error) {
					console.log(error)
					this.ewalletOverlay = false
				}
			} else {
				const sendvoucher = {
					voucher_id: this.prechoice.voucher_id,
					email: this.userdata.email,
				}

				try {
					const res = await PurchaseService.xendit(sendvoucher)
					if (res.status == 200) {
						//console.log(res.data);
						this.invoiceUrl = res.data.invoice_url
						this.iframeDialogVisible = true
						this.ewalletOverlay = false
					}
				} catch (error) {
					console.log(error)
					this.ewalletOverlay = false
				}
			}
		},
		async eWalletPurchase(provider) {
			this.ewalletOverlay = true
			let data = {
				provider: provider,
				voucher_id: this.prechoice.voucher_id,
			}
			try {
				const res = await UserService.eWalletBuy(data)
				this.ewalletOverlay = false
				window.location.href = res.data.invoice_url
			} catch (error) {
				console.log(error)
				this.ewalletOverlay = false
			}
		},
		onError(error) {
			//console.log("Error happened:", error);
			this.recaptchaToken = null
		},
		onSuccess(token) {
			this.recaptchaToken = "success"
			this.finalbuttondisabled = false
		},
		onExpired() {
			//console.log("Expired");
			this.recaptchaToken = null
		},

		/* Change Icon Arrow Prev Step */
		prev() {
			if (this.e1 == 1) {
				this.$router.push("/?tab=4")
				//console.log(this.e1);
			}
			if (this.e1 != 0) {
				this.e1--
			}
		},

		/* Set Data Order */
		async setOrder(
			voucherId,
			email,
			label,
			price,
			currentstep,
			sublabel = null
		) {
			if (currentstep == "xendit") {
				const sendvoucher = {
					voucher_id: voucherId,
					email: email,
				}

				try {
					const res = await PurchaseService.xendit(sendvoucher)
					if (res.status == 200) {
						//console.log(res.data);
						this.invoiceUrl = res.data.invoice_url
						this.iframeDialogVisible = true
					}
				} catch (error) {
					console.log(error)
				}
			} else if (currentstep == "midtrans") {
				const sendvoucher = {
					voucher_id: voucherId,
				}

				try {
					const res = await PurchaseService.midtrans(sendvoucher)
					if (res.status == 200) {
						// //console.log(res.data)
						var url = res.data.snap_url
						window.open(url, "_blank")
					}
				} catch (error) {
					console.log(error)
				}
			} else {
				this.itemname = label
				this.sublabel = sublabel
				this.itemprice = price
				// //console.log(this.wap)

				var hari = ""
				if (price == "Rp 2.200") {
					hari = "2"
				} else if (price == "Rp 3.300") {
					hari = "3"
				} else if (price == "Rp 5.500") {
					hari = "5"
				} else if (price == "Rp 8.800") {
					hari = "8"
				} else if (price == "Rp 11.000") {
					hari = "11"
				} else if (price == "Rp 16.500") {
					hari = "17"
				} else {
					hari = "0"
				}

				this.itemhari = hari
				this.itemvoucher = voucherId
				this.current = currentstep
				this.e1 = 3
			}
		},

		filterKey(e) {
			const key = e.key

			// If is '.' key, stop it
			if (key === ".") return e.preventDefault()

			// OPTIONAL
			// If is 'e' key, stop it
			if (key === "e") return e.preventDefault()
		},

		// This can also prevent copy + paste invalid character
		filterInput(e) {
			e.target.value = e.target.value.replace(/[^0-9]+/g, "")
		},

		/* Validasi Form */
		validate(voucher) {
			var vm = this
			if (this.formdata.nomorhandphone.includes("0")) {
				vm.formdata.voucher_id = voucher
			}
			if (vm.recaptchaToken == "success") {
				this.submit()
			} else {
				this.snackbar = true
				this.responsemessage = "Mohon Centang Recaptha"
			}
		},

		/* Submit Form */
		async submit() {
			let vm = this
			//console.log(this.prechoice.voucher_id);
			if (this.useWap) {
				var wapchosen = null
				wapchosen = this.getWapType
				if (wapchosen == "xl") {
					// XL non langganan
					if (this.prechoice.voucher_id != 17) {
						var urltoOpen =
							"http://www.gudangapp.com/Wap_action.jsp?content=PW" +
							this.prechoice.voucher_id +
							"+WPW&dest=97789&&success=http://m.pewefeed.com/rand"
					} else {
						// LANGGANAN
						var urltoOpen =
							"http://150.107.148.9/app/wap/playworld/jayadata/xl/pw"
					}
				} else if (wapchosen == "indosat") {
					var urltoOpen =
						"http://150.107.148.9/app/wap/playworld/jayadata/isat/pw"
				}

				//console.log(wapchosen);
				//console.log(urltoOpen);

				setTimeout(() => {
					window.open(urltoOpen)
				}, 2000)

				// let vm = this
				this.$auth.fetchUser().then(() => {
					localStorage.setItem(
						"userdata",
						JSON.stringify(vm.$auth.user)
					)

					this.fetchUser()
				})
			} else {
				// send the form
				let vm = this
				const sendform = {
					nomorhandphone: vm.formdata.nomorhandphone,
					voucher_id: vm.prechoice.voucher_id,
				}

				try {
					const res = await PurchaseService.BuyVip(sendform)
					vm.responsemessage = res.data.message
					if (res.status == 200) {
						this.e1 = 1
						this.success = true
						this.recaptchaToken = null
					}
				} catch (error) {
					console.log(error)
				}

				this.recaptchaToken = null

				this.$auth.fetchUser().then(() => {
					localStorage.setItem(
						"userdata",
						JSON.stringify(vm.$auth.user)
					)

					this.fetchUser()
				})
			}
		},

		fetchUser() {
			let vm = this
			this.$auth.fetchUser().then(() => {
				localStorage.setItem("userdata", JSON.stringify(vm.$auth.user))
			})
			var res = []
			if (this.$auth.user) {
				// this.$auth.fetchUser()
				// res.data = this.$auth.user
				res.data = JSON.parse(localStorage.getItem("userdata"))
				this.userdata = res.data.data
			}
		},

		closeDialog() {
			this.e1 = 1
			this.intDialogVisible = false
		},

		iframeClose() {
			// vm.fetchUser()

			// if (this.userdata.vip) {
			// 	localStorage.setItem("onpurchasevip", true)
			// 	this.$router.push("/?tab=4")
			// 	// other code
			// } else {
			// 	localStorage.setItem("onpurchasevip", true)
			// }

			this.$router.push("/member/status_transfer")

			this.iframeDialogVisible = false
		},
		iframePreview() {
			this.iframeDialogVisible = true
		},
	},
	mounted() {
		/* Init Data User to Customer Detail */
		this.fetchUser()
	},
}
</script>

<style scoped lang="scss">
.v-stepper {
	background: transparent !important;
	border-radius: 0 !important;
	overflow: none !important;
	-webkit-box-shadow: none !important;
	box-shadow: none !important;
	&.v-stepper--is-booted {
		background: transparent !important;
	}
}
.stickykit {
	position: sticky;
	top: 0;
}
.processthis {
	position: fixed;
	bottom: 0;
	padding: 10px;
	background: #fff;
	width: 100%;
	left: 0;
	right: 0;
	margin: 0 auto;
}
.jumpup {
	position: relative;
	padding-top: 0 !important;
}
.hmmm {
	& > div:first-of-type {
		font-weight: bold;
		font-size: 16px;
		span {
			font-weight: normal;
		}
	}
	& > div:last-of-type {
		font-weight: normal;
		font-size: 14px;
		span {
			font-weight: normal !important;
		}
	}
}
</style>

<style lang="scss">
.paymentpage {
	.v-list-item--disabled {
		.v-list-item__icon {
			display: none;
		}
		// &:after {
		// 	content: "not available" !important;
		// 	position: relative;
		// 	display: block;
		// 	background: #7d7d7d;
		// 	color: #fff;
		// 	border-radius: 90px;
		// 	line-height: 1;
		// 	text-align: center;
		// 	padding: 8px 12px;
		// 	font-size: 10px;
		// 	font-style: italic;
		// 	min-height: unset;
		// }
	}
}

.v-list-item--disabled {
	.text-thirdary {
		opacity: 0.4;
	}
}

.card-trans {
	.v-tabs-bar {
		height: 64px !important;
	}
	.hohoho {
		background: #000 !important;
		border-top: 1px solid rgba(255, 236, 236, 0.5);
		border-bottom: 1px solid rgba(255, 236, 236, 0.5) !important;
		height: auto !important;
		.subtitle-1 {
			background: #000 !important;
		}
	}
}
.iconnumer {
	width: 30px;
	height: 30px;
	background: #fff;
	line-height: 30px;
	text-align: center;
	color: #000;
	border-radius: 90px;
}
</style>

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
        @click="$router.push('/'); drawer = false"
        class="px-0"
      >{{appBarLabel ? appBarLabel : 'VIP Membership'}}</v-toolbar-title>
      <div class="flex-grow-1"></div>

      <div @click="$router.push('/')" v-if="$route.name != 'index'">
        <v-img src="/img/icons/icon-home-white.png" width="20"></v-img>
      </div>
    </v-app-bar>

    <v-card :elevation="0">
      <!-- Step -->
      <v-stepper v-model="e1">
        <v-stepper-header style="display: none !important">
          <v-stepper-step :complete="e1 > 1" step="1"></v-stepper-step>

          <div class="devider-small"></div>

          <v-stepper-step :complete="e1 > 2" step="2"></v-stepper-step>

          <div class="devider-small"></div>

          <v-stepper-step step="3"></v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1" class="px-0 pt-0">
            <div
              v-if="userdata.status_expired == 1"
              style="background: #4DAE50;color:#fff"
              class="text-center px-5 py-10"
            >
              <strong>VIP Active Until {{userdata.expire}}</strong>
            </div>
            <div v-else style="background: #EA3E3E;color:#fff" class="text-center px-5 py-10">
              <strong>VIP Inactive Until {{userdata.expire}}</strong>
            </div>

            <v-list-item-group color="dark">
              <v-list-item class="py-3" @click="e1 = 2">
                <v-list-item-content>
                  <v-list-item-title>
                    <span>Purchase VIP Membership</span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <div class="devider-small"></div>

              <template v-for="(item, i) in purchasemenu">
                <v-list-item class="py-3" :key="'purchase-menu'+i" :to="item.to">
                  <v-list-item-content>
                    <v-list-item-title>
                      <span>{{item.title}}</span>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <div class="devider-small" :key="'purchase-menu-devider'+i"></div>
              </template>
            </v-list-item-group>
          </v-stepper-content>

          <v-stepper-content step="2" class="px-0">
            <!-- NON LANGGANAN  -->
            <v-container class="mb-3">
              <strong class="deep-orange--text text-18">Non Subscription - Package</strong>
            </v-container>
            <v-list-item-group>
              <template v-for="(item, i) in vipItems">
                <div v-if="i==0" class="devider-small" :key="'purchase-menu-devider-1'+i"></div>
                <v-list-item
                  class="py-3"
                  :key="'purchase-menu'+i"
                  @click="e1 = 3; setPrechoices(item);"
                >
                  <v-list-item-content>
                    <v-list-item-title style="line-height:23px">
                      <strong class="d-block text-18">{{item.label}}</strong>
                      <span class="d-block">{{item.price}} (exclude PPN 10%)</span>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon size="30">mdi-chevron-right</v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <div class="devider-small" :key="'purchase-menu-devider'+i"></div>
              </template>
            </v-list-item-group>

            <!-- LANGGANAN  -->
            <v-container class="mb-3 mt-5">
              <strong class="deep-orange--text text-18">Subscription - Package</strong>
            </v-container>
            <v-list-item-group>
              <template v-for="(item, i) in subsitems">
                <div v-if="i==0" class="devider-small" :key="'purchase-menu-devider-xx'+i"></div>
                <v-list-item
                  class="py-3"
                  :key="'purchase-menu-asdfd'+i"
                  @click="e1 = 3; setPrechoices(item);"
                >
                  <v-list-item-content>
                    <v-list-item-title style="line-height:23px">
                      <strong class="d-block text-18">{{item.label}}</strong>
                      <span class="d-block">{{item.price}} (exclude PPN 10%)</span>
                      <div class="d-block">{{item.desc}}</div>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon size="30">mdi-chevron-right</v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <div class="devider-small" :key="'purchase-menu-deviderxxas'+i"></div>
              </template>
            </v-list-item-group>
          </v-stepper-content>

          <v-stepper-content step="3" class="px-0 pt-0">
            <div
              v-if="userdata.status_expired == 1"
              style="background: #757575;color:#fff"
              class="text-center px-5 py-10 mb-4"
            >
              <strong class="text-18" v-if="prechoice.label">{{ prechoice.label }}</strong>
              <div class="text-16" v-if="prechoice.price">{{ prechoice.price }} (exclude PPN 10%)</div>
              <div class="text-16" v-if="prechoice.desc">{{ prechoice.desc }}</div>
            </div>

            <!-- SMS  -->
            <template
              v-if="prechoice.payment != null"
            >
              <v-container class="mb-3">
                <strong class="deep-orange--text text-18">SMS Method</strong>
              </v-container>
              <v-list-item-group>
                <template v-for="(item, i) in smspayment">
                  <div v-if="i==0" class="devider-small" :key="'purchase-menu-devider-1'+i"></div>
                  <v-list-item
                    class="py-3"
                    :key="'purchase-menu'+i"
                    @click="e1 = 4; guessVoucher(item); getWapType = item.key"
                    :disabled="!prechoice.payment.includes(item.key)"
                  >
                    <v-list-item-content>
                      <v-list-item-title style="line-height:23px">
                        <strong class="d-block text-18">{{item.label}}</strong>
                        <span class="d-block text-14">{{item.desc}}</span>
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon size="30">mdi-chevron-right</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                  <div class="devider-small" :key="'purchase-menu-devider'+i"></div>
                </template>
              </v-list-item-group>
            </template>

            <!-- Bank Transfer / Credit Card  -->
            <v-container class="mb-3 mt-4">
              <strong class="deep-orange--text text-18">Bank Transfer / Credit Card</strong>
            </v-container>
            <v-list-item-group v-if="prechoice.payment != null">
              <template v-for="(item, i) in transferpayment">
                <div v-if="i==0" class="devider-small" :key="'purchase-menu-devider-1'+i"></div>
                <v-list-item
                  class="py-3"
                  :key="'purchase-menu'+i"
                  @click="guessBank(item.label)"
                  :disabled="!prechoice.payment.includes('bank')"
                >
                  <v-list-item-content>
                    <v-list-item-title style="line-height:23px">
                      <strong class="d-block text-18">{{item.label}}</strong>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon size="30">mdi-chevron-right</v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <div class="devider-small" :key="'purchase-menu-devider'+i"></div>
              </template>
            </v-list-item-group>

            <!-- EWALLETS  -->
            <v-container class="mb-3 mt-4">
              <strong class="deep-orange--text text-18">eWallets</strong>
            </v-container>
            <v-list-item-group v-if="prechoice.payment != null">
              <template v-for="(item, i) in ewalletspayment">
                <div v-if="i==0" class="devider-small" :key="'purchase-menu-devider-1'+i"></div>
                <v-list-item
                  class="py-3"
                  :key="'purchase-menu'+i"
                  @click="eWalletPurchase(item.key)"
                  :disabled="!prechoice.payment.includes('ewallets')"
                >
                  <v-list-item-content>
                    <v-list-item-title style="line-height:23px">
                      <strong class="d-block text-18">{{item.label}}</strong>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon size="30">mdi-chevron-right</v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <div class="devider-small" :key="'purchase-menu-devider'+i"></div>
              </template>
            </v-list-item-group>
          </v-stepper-content>

          <!-- SMS CHECKPOINT -->
          <v-stepper-content step="4" class="px-0 pt-0">
			  <div
              v-if="userdata.status_expired == 1"
              style="background: #757575;color:#fff"
              class="text-center px-5 py-10 mb-1"
            >
              <strong class="text-18" v-if="prechoice.label">{{ prechoice.label }}</strong>
              <div class="text-16" v-if="prechoice.price">{{ prechoice.price }} (exclude PPN 10%)</div>
              <div class="text-16" v-if="prechoice.desc">{{ prechoice.desc }}</div>
            </div>

            <template v-if="prechoice.payment != null && (!prechoice.payment.includes('bank') || !prechoice.payment.includes('ewallets'))">

				<v-container class="pb-0">
					<v-alert color="#0057FF" class="mb-1" prominent>
						<template v-slot:prepend>
							<v-img src="/img/icons/info.svg" width="35" max-width="35" class="mr-3 infoarticleicon"></v-img>
						</template>
						Pilih salah satu metode pembelian, bisa dengan SMS atau WAP (Instan)
					</v-alert>
				</v-container>

              <v-container class="mt-0 card-trans px-0">
                <v-row>
                  <v-col cols="12" class="pb-0 pt-0">
                    <v-card
                      class="mx-auto mb-0"
                      style="background: #000!important;border-radius:0!important"
                    >
                      <v-tabs grow v-model="buymethod" color="deep-orange" background="#000000">
                        <v-tab href="#sms" class="hohoho text-18">SMS</v-tab>
                        <v-tab href="#wap" class="hohoho text-18" @click="useWap=true">WAP</v-tab>
                        <!-- <v-tab href="#ussd" class="hohoho">USSD</v-tab> -->
                      </v-tabs>

                      <v-tabs-items v-model="buymethod" class="mt-4">
                        <v-tab-item value="sms" style="background: #000!important;">
                          <v-form ref="form" v-model="valid" lazy-validation>
                            <v-container class="pb-0">
                              <v-text-field
								outlined
								single-line
								prepend-inner-icon
								maxlength="12"
								v-model="formdata.nomorhandphone"
								type="number"
								required
								hide-details
								placeholder="Masukan nomor ponsel anda"
								@keydown="filterKey"
								:rules="numberRules"
								></v-text-field>
                            </v-container>
                          </v-form>
                        </v-tab-item>
                        <v-tab-item value="wap" style="background: #000!important;">
                          <v-container class="text-center pt-4" style="padding-bottom: 40px">
                            <strong
                              class="body-2"
                            >Pastikan anda tidak menggunakan WiFi, kemudian beri centang pada Google ReCaptcha dan tekan tombol "Process", dan anda akan diarahkan ke halaman pembayaran</strong>
                          </v-container>
                        </v-tab-item>
                        <v-tab-item value="ussd" style="background: #000!important;">
                          <v-container class="text-center pt-4" style="padding-bottom: 40px">
                            <strong class="body-2">Pilihan Tidak Tersedia</strong>
                          </v-container>
                        </v-tab-item>
                      </v-tabs-items>
                    </v-card>
                  </v-col>
                </v-row>

                <v-snackbar v-model="snackbar" :timeout="timeout" top fixed>
                  {{ responsemessage }}
                  <v-btn color="primary" text icon @click="snackbar = false">
                    <v-icon color="white">mdi-close-circle-outline</v-icon>
                  </v-btn>
                </v-snackbar>

                <div
                  class="mt-0"
                  style="text-align:center;padding: 20px 10px 10px;border-radius:3px;background: #000!important;"
                >
                  <recaptcha
                    style="display:inline-block"
                    @error="onError()"
                    @success="onSuccess()"
                    @expired="onExpired()"
                  />
                  <v-btn
                    @click="validate(prechoice.voucher_id)"
					:disabled="finalbuttondisabled"
                    color="deep-orange"
					large
                    block
                    class="white--text mt-2"
                  >PROCESS</v-btn>
                </div>
                <br />
                <br />
                <br />
              </v-container>
            </template>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>

    <!-- SUKSES -->
    <v-bottom-sheet v-model="success">
      <v-sheet height="100%">
        <v-toolbar :elevation="1" style="border-top: 2px solid #fff;">
          <v-row class="pa-0" align="center">
            <v-col cols="2">
              <v-btn
                dark
                icon
                tile
                style="border-right: 0px solid #717171"
                light
                @click="success = false;"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="8" class="deep-orange--text text-center">SUCCESS</v-col>
          </v-row>
        </v-toolbar>

        <div class="mx-2">
          <div class="pb-10">
            <v-row align="center" justify="center">
              <v-icon color="green" class="display-3">mdi-check-circle</v-icon>
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
                >CLOSE</v-btn>
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

	<v-overlay
		:opacity="1"
		:value="ewalletOverlay"
	>
		<div class="text-center">
			<v-progress-circular indeterminate size="64" color="deep-orange"></v-progress-circular>
			<div class="mt-4">
				Connecting Provider...
			</div>
		</div>
	</v-overlay>
  </div>
</template>

<script>
import PurchaseService from "@/services/PurchaseService";
import UserService from "@/services/UserService";
import IframePreview from "@/components/modal/IframePreview";
export default {
  middleware: "auth",
  name: "PurchasePage",
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
          title: "Activate VIP Membership - SMS Code",
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
          label: "2 Hari VIP Membership",
          price: "Rp 2.000",
          code: "PW0",
          payment: ["xl"],
        },
        {
          voucher_id: 5,
          label: "5 Hari VIP Membership",
          price: "Rp 5.000",
          code: "PW0",
          payment: ["xl"],
        },
        {
          voucher_id: 12,
          label: "11 Hari VIP Membership",
          price: "Rp 10.000",
          code: "PW0",
          payment: ["bank", "ewallets"],
        },
        {
          voucher_id: 9,
          label: "30 Hari VIP Membership",
          price: "Rp 25.000",
          code: "PW0",
          payment: ["bank", "ewallets"],
        },
      ],
      subsitems: [
        {
          label: "6 Hari VIP Membership",
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
          label: "BCA",
        },
        {
          label: "BRI",
        },
        {
          label: "BNI",
        },
        {
          label: "MANDIRI",
        },
        {
          label: "PERMATA",
        },
      ],
      ewalletspayment: [
        {
		  label: "DANA",
		  key: 'dana'
        },
        {
		  label: "LINKAJA",
		  key: 'linkaja'
        },
      ],
      paymentmethod: null,
      iframeDialogVisible: false,
      invoiceUrl: "",
      finalbuttondisabled: true,
	  success: false,
	  ewalletOverlay: false,
	  getWapType: null,
    };
  },
  components: {
    IframePreview,
  },
  watch: {
    "formdata.nomorhandphone": function (baru, lama) {
      //console.log(baru)
      setTimeout(() => {
        let phonenumber = this.formdata.nomorhandphone;
        var zero = phonenumber.substring(0, 1);
        var namdua = phonenumber.substring(0, 2);
        if (zero == 0 || namdua == 62) {
          if (phonenumber != "" && phonenumber != null) {
            this.finalbuttondisabled = false;
          } else {
            this.finalbuttondisabled = true;
          }
        } else {
          this.finalbuttondisabled = true;
        }
      }, 200);
    },
  },
  computed: {
    /* Init Modal */
    intDialogVisible: {
      get: function () {
        if (this.dialogVisible) {
          // Some dialog initialization code could be placed here
          // because it is called only when this.dialogVisible changes
          this.$emit("open");
        }

        return this.dialogVisible;
      },
      set: function (value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
  methods: {
    setPrechoices(item) {
      this.prechoice.voucher_id = item.voucher_id ? item.voucher_id : null;
      this.prechoice.label = item.label ? item.label : null;
      this.prechoice.price = item.price ? item.price : null;
      this.prechoice.desc = item.desc ? item.desc : null;
      this.prechoice.payment = item.payment ? item.payment : null;
	},
	guessVoucher(item) {
		if( this.prechoice.voucher_id == null ) {
			return this.prechoice.voucher_id = item.key == 'xl' ? 17 : 13;
		}
	},
	async guessBank(bank){
		this.ewalletOverlay = true
		if( bank == 'BCA' ) {
			const sendvoucher = {
				voucher_id: this.prechoice.voucher_id,
			};

			try {
				const res = await PurchaseService.midtrans(sendvoucher);
				if (res.status == 200) {
					// console.log(res.data)
					var url = res.data.snap_url;
					window.open(url, "_blank");
					this.ewalletOverlay = false
				}
			} catch (error) {
				console.log(error);
				this.ewalletOverlay = false
			}
		} else {
			const sendvoucher = {
				voucher_id: this.prechoice.voucher_id,
				email: this.userdata.email,
			};

			try {
				const res = await PurchaseService.xendit(sendvoucher);
				if (res.status == 200) {
					console.log(res.data);
					this.invoiceUrl = res.data.invoice_url;
					this.iframeDialogVisible = true;
					this.ewalletOverlay = false
				}
			} catch (error) {
				console.log(error);
				this.ewalletOverlay = false
			}
		}
	},
	async eWalletPurchase(provider) {
		this.ewalletOverlay = true
		let data = {
			provider: provider,
			voucher_id: this.prechoice.voucher_id
		}
		try {
			const res = await UserService.eWalletBuy(data);
			console.log(res.data.invoice_url);
			window.open(res.data.invoice_url, '_blank');
			this.ewalletOverlay = false
		} catch (error) {
			console.log(error);
			this.ewalletOverlay = false
		}
	},
    onError(error) {
      console.log("Error happened:", error);
      this.recaptchaToken = null;
    },
    onSuccess(token) {
      this.recaptchaToken = "success";
      this.finalbuttondisabled = false;
    },
    onExpired() {
      console.log("Expired");
      this.recaptchaToken = null;
    },

    /* Change Icon Arrow Prev Step */
    prev() {
      if (this.e1 == 1) {
        this.$router.push("/");
        console.log(this.e1);
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
        };

        try {
          const res = await PurchaseService.xendit(sendvoucher);
          if (res.status == 200) {
            console.log(res.data);
            this.invoiceUrl = res.data.invoice_url;
            this.iframeDialogVisible = true;
          }
        } catch (error) {
          console.log(error);
        }
      } else if (currentstep == "midtrans") {
        const sendvoucher = {
          voucher_id: voucherId,
        };

        try {
          const res = await PurchaseService.midtrans(sendvoucher);
          if (res.status == 200) {
            // console.log(res.data)
            var url = res.data.snap_url;
            window.open(url, "_blank");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.itemname = label;
        this.sublabel = sublabel;
        this.itemprice = price;
        // console.log(this.wap)

        var hari = "";
        if (price == "Rp 2.200") {
          hari = "2";
        } else if (price == "Rp 3.300") {
          hari = "3";
        } else if (price == "Rp 5.500") {
          hari = "5";
        } else if (price == "Rp 8.800") {
          hari = "8";
        } else if (price == "Rp 11.000") {
          hari = "11";
        } else if (price == "Rp 16.500") {
          hari = "17";
        } else {
          hari = "0";
        }

        this.itemhari = hari;
        this.itemvoucher = voucherId;
        this.current = currentstep;
        this.e1 = 4;
      }
    },

    filterKey(e) {
      const key = e.key;

      // If is '.' key, stop it
      if (key === ".") return e.preventDefault();

      // OPTIONAL
      // If is 'e' key, stop it
      if (key === "e") return e.preventDefault();
    },

    // This can also prevent copy + paste invalid character
    filterInput(e) {
      e.target.value = e.target.value.replace(/[^0-9]+/g, "");
    },

    /* Validasi Form */
    validate(voucher) {
      var vm = this;
      if (this.formdata.nomorhandphone.includes("0")) {
        vm.formdata.voucher_id = voucher;
      }
      if (vm.recaptchaToken == "success") {
        this.submit();
      } else {
        this.snackbar = true;
        this.responsemessage = "Mohon Centang Recaptha";
      }
	},

    /* Submit Form */
    async submit() {
      let vm = this;
      console.log(this.prechoice.voucher_id);
      if (this.useWap) {
		var wapchosen = null;
		wapchosen = this.getWapType;
        if (wapchosen == "xl") {
			// XL non langganan
			if( this.prechoice.voucher_id != 17 ) {
				var urltoOpen = "http://www.gudangapp.com/Wap_action.jsp?content=PW"+this.prechoice.voucher_id+"+WPW&dest=97789&&success=http://m.pewefeed.com/rand";
			} else {
				// LANGGANAN
				var urltoOpen = "http://150.107.148.9/app/wap/playworld/jayadata/xl/pw";
			}
        } else if (wapchosen == "indosat") {
			var urltoOpen = "http://150.107.148.9/app/wap/playworld/jayadata/isat/pw";
        }

		console.log(wapchosen);
		console.log(urltoOpen);

		setTimeout(() => {
			window.open(urltoOpen);
		}, 2000);

        // let vm = this
        this.$auth.fetchUser().then(() => {
          localStorage.setItem("userdata", JSON.stringify(vm.$auth.user));

          this.fetchUser();
        });
      } else {
        // send the form
        let vm = this;
        const sendform = {
			nomorhandphone: vm.formdata.nomorhandphone,
			voucher_id: vm.prechoice.voucher_id
		}

        try {
          const res = await PurchaseService.BuyVip(sendform);
          vm.responsemessage = res.data.message;
          if (res.status == 200) {
            this.e1 = 1;
			this.success = true;
			this.recaptchaToken = null
          }
        } catch (error) {
          console.log(error);
        }

        this.recaptchaToken = null;

        this.$auth.fetchUser().then(() => {
          localStorage.setItem("userdata", JSON.stringify(vm.$auth.user));

          this.fetchUser();
        });
      }
    },

    fetchUser() {
      var res = [];
      if (this.$auth.user) {
        // this.$auth.fetchUser()
        // res.data = this.$auth.user
        res.data = JSON.parse(localStorage.getItem("userdata"));
        this.userdata = res.data.data;
      }
    },

    closeDialog() {
      this.e1 = 1;
      this.intDialogVisible = false;
    },

    iframeClose() {
      this.iframeDialogVisible = false;
      this.$router.push("/member/status_transfer");
      // other code
    },
    iframePreview() {
      this.iframeDialogVisible = true;
    },
  },
  mounted() {
    /* Init Data User to Customer Detail */
    this.fetchUser();
  },
};
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
    &:after {
      content: "not available" !important;
      display: inline-block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 15px;
      background: #7d7d7d;
      color: #fff;
      border-radius: 90px;
      line-height: 1;
      text-align: center;
      padding: 8px 12px;
      font-size: 10px;
      font-style: italic;
    }
  }
}
.card-trans {
	.v-tabs-bar {
		height: 64px!important;
	}
	.hohoho {
		background: #000!important;
		border-top: 1px solid rgba(255, 236, 236, 0.5);
		border-bottom: 1px solid rgba(255, 236, 236, 0.5)!important;
		height: auto!important;
		.subtitle-1 {
			background: #000 !important;
		}
	}
}
</style>

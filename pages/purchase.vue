<template>
  <div>
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

        <v-toolbar-title @click="$router.push('/'); drawer = false" class="px-0">
			{{appBarLabel ? appBarLabel : 'Purchase VIP Membership'}}
        </v-toolbar-title>
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
          <!-- Step 1 -->
          <v-stepper-content step="1" class="px-0">
            <v-card :elevation="0" class="hohoho mx-auto text-18" tile>
              <v-card-title class="subtitle-1 font-weight-bold" style="background: #1c1c1d">Pembelian Dengan Pulsa</v-card-title>
              <div class="devider-small"></div>

              <div class="px-4 py-0" @click="e1 = 2; appBarLabel = 'XL & Axis'">
                <v-row align="center">
                  <v-col cols="10" class="py-5">XL & AXIS</v-col>
                  <v-col cols="2" class="text-right">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-col>
                </v-row>
              </div>
              <div class="devider-small"></div>
              <div class="px-4 py-0" @click="e1 = 3; appBarLabel = 'Indosat'">
                <v-row align="center">
                  <v-col cols="10" class="py-5">Indosat</v-col>
                  <v-col cols="2" class="text-right">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-col>
                </v-row>
              </div>
			   <div class="devider-small"></div>
            </v-card>

            <!-- Content -->
            <v-card class="mx-auto hohoho mt-4 mb-2 text-18">
              <v-card-title class="subtitle-1 font-weight-bold" style="background: #1c1c1d">Pembelian Dengan Bank Transfer / Credit Card</v-card-title>
              <div class="devider-small"></div>
              <div class="px-4 py-0" @click="e1 = 5; appBarLabel = 'BCA'">
                <v-row align="center">
                  <v-col cols="10" class="py-5">BCA</v-col>
                  <v-col cols="2" class="text-right">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-col>
                </v-row>
              </div>
              <div class="devider-small"></div>
              <div class="px-4 py-0" @click="e1 = 6; appBarLabel = 'BRI'">
                <v-row align="center">
                  <v-col cols="10" class="py-5">BRI</v-col>
                  <v-col cols="2" class="text-right">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-col>
                </v-row>
              </div>
              <div class="devider-small"></div>
              <div class="px-4 py-0" @click="e1 = 7; appBarLabel = 'BNI'">
                <v-row align="center">
                  <v-col cols="10" class="py-5">BNI</v-col>
                  <v-col cols="2" class="text-right">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-col>
                </v-row>
              </div>
              <div class="devider-small"></div>
              <div class="px-4 py-0" @click="e1 = 9; appBarLabel = 'MANDIRI'">
                <v-row align="center">
                  <v-col cols="10" class="py-5">MANDIRI</v-col>
                  <v-col cols="2" class="text-right">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-col>
                </v-row>
              </div>
              <div class="devider-small"></div>
              <div class="px-4 py-0" @click="e1 = 10; appBarLabel = 'PERMATA'">
                <v-row align="center">
                  <v-col cols="10" class="py-5">PERMATA</v-col>
                  <v-col cols="2" class="text-right">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-col>
                </v-row>
              </div>
			   <div class="devider-small"></div>
            </v-card>
          </v-stepper-content>
          <!-- END OF STEP 1 -->

          <!-- Step 2 : XL -->
          <v-stepper-content step="2" class="mb-3 px-0 jumpup">
            <!-- <v-row align="center">
              <v-col cols="2">
                <v-btn v-if="e1 > 1 && e1 < 11 && e1 != 8" icon tile dark @click="prev()">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="8" class="text-center">
                <div class="font-weight-bold text-center">XL &amp; AXIS</div>
              </v-col>
            </v-row> -->

            <v-card class="hohoho mb-3 mt-4">
              <v-card-title class="subtitle-1  font-weight-bold text-16">Berlangganan</v-card-title>
              <div
                @click="wap='xllangganan';setOrder(xlregvoucher, userdata.email, xlreglabel,xlregprice, current = 'xl')"
                v-for="vip in vipItems.slice(0,1)"
                :key="vip.id"
              >
                <v-row class="py-0 mx-0" align="center">
                  <v-col cols="9">
                    <strong>{{ vip.label }}</strong>
                    <br />
                    <div class="text-12" v-html="vip.desc"></div>
                  </v-col>
                  <v-col cols="3" class="text-right">
                    <v-btn
                      icon
                      tile
                      light
                      dark
                      @click="setOrder(vip.voucher_id, userdata.email, vip.label,vip.price, current = 'xl')"
                    >
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-card>
            <v-card class="hohoho mx-auto mb-3">
              <v-card-title class="subtitle-1  font-weight-bold">Non Berlangganan</v-card-title>
              <div class="devider-small"></div>
			  <template v-for="(vip, i) in vipItems">
              	<div
				  	v-if="i!=0"
					@click="wap='PW'+(i+3);setOrder(vip.voucher_id, userdata.email, vip.label,vip.price, current = 'xl')"
					:key="vip.id+'-'+i"
				>
					<v-row class="py-0 mx-0" align="center">
					<v-col cols="9">
						<strong>{{ vip.label }}</strong>
						<br />
					<div class="text-12" v-html="vip.desc"></div>
					</v-col>
					<v-col cols="3" class="text-right">
						<v-btn
						icon
						tile
						light
						dark
						@click="setOrder(vip.voucher_id, userdata.email, vip.label,vip.price, current = 'xl')"
						>
						<v-icon>mdi-chevron-right</v-icon>
						</v-btn>
					</v-col>
					</v-row>
					<div class="devider-small"></div>
				</div>
			  </template>
            </v-card>
          </v-stepper-content>
          <!-- END OF STEP 2 : XL -->

          <!-- Step 2 : Indosat -->
          <v-stepper-content step="3" class="px-0 text-14 jumpup">
            <!-- <v-row align="center">
              <v-col cols="2">
                <v-btn v-if="e1 > 1 && e1 < 11 && e1 != 8" icon tile dark @click="prev()">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="8" class="text-center">
                <div class="font-weight-bold text-center">INDOSAT</div>
              </v-col>
            </v-row> -->
            <v-card class="hohoho mb-3">
              <v-card-title class=" font-weight-bold subtitle-2">Berlangganan</v-card-title>
              <div class="devider-small"></div>
              <div
                @click="wap='indosatlangganan';setOrder(indosatvoucherid, userdata.email, indosatlabel, indosatprice, current = 'indosat')"
                v-for="vip in vipItems.slice(0,1)"
                :key="vip.id"
              >
                <v-row class="py-0 mx-0" align="center">
                  <v-col cols="9">
                    <strong>{{ vip.label }}</strong>
                    <br />
                    <div class="text-12" v-html="vip.desc"></div>
                  </v-col>
                  <v-col cols="3" class="text-right">
                    <v-btn
                      icon
                      text
                      light
                      dark
                      @click="setOrder(vip.voucher_id, userdata.email, vip.label,vip.price, current = 'xl')"
                    >
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-stepper-content>
          <!-- END OF STEP 3 : Indosat -->

          <!-- Step 4 : Order Detail -->
          <v-stepper-content step="4" class="px-0 jumpup">
            <div class="px-3">
				<br>
				<br>
              <strong>Nilai Transaksi</strong>
            </div>
            <v-card class="hohoho mb-3 mt-4">
              <v-row class="px-4">
                <v-col cols="12">{{itemprice}}</v-col>
              </v-row>
            </v-card>

            <div class="px-3 mt-10">
              <strong>Rincian Transaksi</strong>
            </div>
            <v-card class="hohoho mb-3 mt-4">
              <v-row class="px-4">
                <v-col cols="12"><div v-html="itemname"></div></v-col>
              </v-row>
            </v-card>

            <v-container class="mt-4 card-trans">
              <v-row style="margin-top: -10px">
                <v-col cols="12">
                  <div class="text-14 mb-2">Channel Pembayaran (Pilih Salah Satu)</div>
                  <v-card class="hohoho mx-auto mb-2">
                    <v-tabs grow v-model="buymethod" color="deep-orange">
                      <v-tab href="#sms" class="hohoho">SMS</v-tab>
                      <v-tab href="#wap" class="hohoho" @click="useWap=true">WAP</v-tab>
                      <!-- <v-tab href="#ussd" class="hohoho">USSD</v-tab> -->
                    </v-tabs>

                    <v-tabs-items v-model="buymethod">
                      <v-tab-item value="sms" class="hohoho">
                        <v-form ref="form" v-model="valid" lazy-validation>
                          <v-container>
                            <v-row no-gutters>
                              <v-col cols="2" class="text-right pr-2 pt-2">+62</v-col>
                              <v-col cols="10">
                                <v-text-field
                                  dense
                                  single-line
                                  outlined
                                  label="+62"
                                  prepend-inner-icon
                                  counter
                                  maxlength="12"
                                  v-model="formdata.nomorhandphone"
                                  type="number"
                                  required
                                  placeholder="Enter your mobile phone number"
                                  :rules="numberRules"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-form>

                        <v-snackbar v-model="snackbar" :timeout="timeout" top>
                          {{ responsemessage }}
                          <v-btn color="primary" text icon @click="snackbar = false">
                            <v-icon color="white">mdi-close-circle-outline</v-icon>
                          </v-btn>
                        </v-snackbar>
                      </v-tab-item>
                      <v-tab-item value="wap" class="hohoho">
                        <v-container class="text-center pt-4" style="padding-bottom: 40px">
                          <strong
                            class="body-2"
                          >Setelah mencentang Google Recaptcha dan klik tombol "Process" di bawah, anda akan diarahkan ke halaman Pembayaran</strong>
						  <br>
						  <strong class="body-2">Pastikan anda tidak menggunakan WiFi, kemudian beri centang pada Google ReCaptcha dan tekan tombol "Process", dan anda akan diarahkan ke halaman pembayaran</strong>
                        </v-container>
                      </v-tab-item>
                      <v-tab-item value="ussd" class="hohoho">
                        <v-container class="text-center pt-4" style="padding-bottom: 40px">
                          <strong class="body-2">Pilihan Tidak Tersedia</strong>
                        </v-container>
                      </v-tab-item>
                    </v-tabs-items>
                  </v-card>
                </v-col>
              </v-row>

              <div
                class="hohoho"
                style="text-align:center;padding: 20px 10px 10px;border-radius:3px"
              >
                <recaptcha
                  style="display:inline-block"
                  @error="onError()"
                  @success="onSuccess()"
                  @expired="onExpired()"
                />
              </div>

              <v-btn
                @click="validate(itemvoucher)"
                color="deep-orange"
                block
                class="white--text mt-2 deep-orange"
              >PROCESS</v-btn>
              <br />
              <br />
              <br />
            </v-container>
          </v-stepper-content>
          <!-- END OF STEP 4 : Order Detail -->

          <!-- Step 5 : Midtrans : BCA-->
          <v-stepper-content step="5" class="mb-3 px-0 jumpup">
            <!-- <v-row align="center">
              <v-col cols="2">
                <v-btn v-if="e1 > 1 && e1 < 11 && e1 != 8" icon tile dark @click="prev()">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="8" class="text-center">
                <div class="font-weight-bold text-center">BCA</div>
              </v-col>
            </v-row> -->
            <v-card class="hohoho">
              <v-card-title class="subtitle-1  font-weight-bold">Non Berlangganan</v-card-title>
              <div class="devider-small"></div>
              <div v-for="trans in vipTrans" :key="trans.id">
                <v-row
                  class="mx-0"
                  align="center"
                  @click="setOrder(trans.voucher_id, userdata.email, trans.label, trans.price, current = 'midtrans')"
                >
                  <v-col cols="9">
                    <strong>{{ trans.label }}</strong>
                    <br />
                    <strong>{{ trans.price }}</strong>
                  </v-col>
                  <v-col cols="3" class="mt-4 text-right">
                    <v-btn
                      icon
                      tile
                      light
                      dark
                      @click="setOrder(trans.voucher_id, userdata.email, trans.label, trans.price, current = 'midtrans')"
                    >
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <div class="devider-small"></div>
              </div>
            </v-card>
          </v-stepper-content>
          <!-- END OF Step 5 : Midtrans : BCA -->

          <!-- Step 6 : Xendit : BRI -->
          <v-stepper-content step="6" class="mb-3 px-0 jumpup">
            <!-- <v-row align="center">
              <v-col cols="2">
                <v-btn v-if="e1 > 1 && e1 < 11 && e1 != 8" icon tile dark @click="prev()">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="8" class="text-center">
                <div class="font-weight-bold text-center">BRI</div>
              </v-col>
            </v-row> -->
            <v-card class="hohoho">
              <v-card-title class="subtitle-1  font-weight-bold">Non Berlangganan</v-card-title>
              <div class="devider-small"></div>
              <div v-for="trans in vipTrans" :key="trans.id">
                <v-row
                  class="mx-0"
                  align="center"
                  @click="setOrder(trans.voucher_id, userdata.email, trans.label, trans.price, current = 'xendit')"
                >
                  <v-col cols="9">
                    <strong>{{ trans.label }}</strong>
                    <br />
                    <strong>{{ trans.price }}</strong>
                  </v-col>
                  <v-col cols="3" class="text-right">
                    <v-btn icon tile light dark>
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <div class="devider-small"></div>
              </div>
            </v-card>
          </v-stepper-content>
          <!-- END OF Step 6 : Xendit BRI -->

          <!-- Step 7 : Xendit : BNI -->
          <v-stepper-content step="7" class="mb-3 px-0 jumpup">
            <!-- <v-row align="center">
              <v-col cols="2">
                <v-btn v-if="e1 > 1 && e1 < 11 && e1 != 8" icon tile dark @click="prev()">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="8" class="text-center">
                <div class="font-weight-bold text-center">BNI</div>
              </v-col>
            </v-row> -->
            <v-card class="hohoho mt-4">
              <v-card-title class="subtitle-1  font-weight-bold">Non Berlangganan</v-card-title>
              <div class="devider-small"></div>
              <div v-for="trans in vipTrans" :key="trans.id">
                <v-row
                  class="mx-0"
                  align="center"
                  @click="setOrder(trans.voucher_id, userdata.email, trans.label, trans.price, current = 'xendit')"
                >
                  <v-col cols="9">
                    <strong>{{ trans.label }}</strong>
                    <br />
                    <strong>{{ trans.price }}</strong>
                  </v-col>
                  <v-col cols="3" class="text-right">
                    <v-btn icon tile light dark>
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <div class="devider-small"></div>
              </div>
            </v-card>
          </v-stepper-content>
          <!-- END OF Step 7 : Xendit BNI -->

          <!-- Step 8 : Transaction Success -->
          <v-stepper-content step="8">
            <v-row align="center" justify="center">
              <v-icon color="green" class="display-3" style="margin-top: 60px">mdi-check-circle</v-icon>
            </v-row>
            <v-row align="center" justify="center">
              <p class="heading mt-4 text-center">
                PERIKSA HANDPHONE ANDA
                <br />UNTUK PROSES SELANJUTNYA
              </p>
            </v-row>
            <v-row align="center" justify="center" class="mx-4">
              <div>
                <v-btn @click="closeDialog()" dark color="deep-orange" class="text-capitalize">CLOSE</v-btn>
              </div>
            </v-row>
          </v-stepper-content>
          <!-- END OF STEP 8 : Transaction Success -->

          <!-- Step 9 : Xendit : MANDIRI -->
          <v-stepper-content step="9" class="mb-3 px-0">
            <!-- <v-row align="center">
              <v-col cols="2">
                <v-btn v-if="e1 > 1 && e1 < 11 && e1 != 8" icon tile dark @click="prev()">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="8" class="text-center">
                <div class="font-weight-bold text-center">MANDIRI</div>
              </v-col>
            </v-row> -->
            <v-card class="hohoho">
              <v-card-title class="subtitle-1  font-weight-bold">Non Berlangganan</v-card-title>
              <div class="devider-small"></div>
              <div v-for="trans in vipTrans" :key="trans.id">
                <v-row
                  class="mx-0"
                  align="center"
                  @click="setOrder(trans.voucher_id, userdata.email, trans.label, trans.price, current = 'xendit')"
                >
                  <v-col cols="9">
                    <strong>{{ trans.label }}</strong>
                    <br />
                    <strong>{{ trans.price }}</strong>
                  </v-col>
                  <v-col cols="3" class="text-right">
                    <v-btn icon tile light dark>
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <div class="devider-small"></div>
              </div>
            </v-card>
          </v-stepper-content>
          <!-- END OF Step 9 : Xendit MANDIRI -->

          <!-- Step 10 : Xendit : PERMATA -->
          <v-stepper-content step="10" class="mb-3 px-0">
            <!-- <v-row align="center">
              <v-col cols="2">
                <v-btn v-if="e1 > 1 && e1 < 11 && e1 != 8" icon tile dark @click="prev()">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="8" class="text-center">
                <div class="font-weight-bold text-center">PERMATA</div>
              </v-col>
            </v-row> -->
            <v-card class="hohoho">
              <v-card-title class="subtitle-1  font-weight-bold">Non Berlangganan</v-card-title>
              <div class="devider-small"></div>
              <div v-for="trans in vipTrans" :key="trans.id">
                <v-row
                  class="mx-0"
                  align="center"
                  @click="setOrder(trans.voucher_id, userdata.email, trans.label, trans.price, current = 'xendit')"
                >
                  <v-col cols="9">
                    <strong>{{ trans.label }}</strong>
                    <br />
                    <strong>{{ trans.price }}</strong>
                  </v-col>
                  <v-col cols="3" class="text-right">
                    <v-btn icon tile light dark>
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <div class="devider-small"></div>
              </div>
            </v-card>
          </v-stepper-content>
          <!-- END OF Step 10 : Xendit PERMATA -->
        </v-stepper-items>
      </v-stepper>
    </v-card>

    <IframePreview
      :dialogVisible="iframeDialogVisible"
      :invoiceUrl="invoiceUrl"
      @close="iframeClose()"
    />
  </div>
</template>

<script>
import PurchaseService from "@/services/PurchaseService";
import UserService from "@/services/UserService";
import IframePreview from "@/components/modal/IframePreview";
export default {
  middleware: 'auth',
  name: "PurchasePage",
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
		appBarLabel: null,
      e1: 1,
      dialog: false,
      itemprice: null,
      itemname: null,
      itemcode: null,
      itemvoucher: null,
      itemhari: null,
      buymethod: null,
      current: 0,
      indosatvoucherid: 13,
      indosatlabel: "3 SMS Per Minggu (Tidak Auto Renewal)<br>1 SMS untuk 2 Hari VIP<br>Rp. 2200/SMS termasuk PPN 10%",
      indosatprice: "Rp 2.200",
      xlregvoucher: 17,
      xlreglabel: "BERLANGGANAN VIP",
      xlregprice: "Rp 2.200",
      tab: null,
      userdata: [],
      valid: true,
      recaptchaToken: null,
      numberRules: [v => !!v || "Input Valid Number"],
      formdata: {
        voucher_id: null,
        nomorhandphone: ""
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
      vipItems: [
        {
          id: 0,
          voucher_id: 0,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip.svg",
		  label: "6 Hari VIP",
		  desc: '3 SMS Per Minggu (Tidak Auto Renewal)<br>1 SMS untuk 2 Hari VIP<br>Rp. 2200/SMS termasuk PPN 10%',
          price: "Rp 2.200",
          code: "PW0"
		},
		{
          id: 1,
          voucher_id: 3,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip.svg",
		  label: "2 Hari VIP",
		  desc: 'Rp 2.200/SMS termasuk PPN 10%',
          price: "Rp 2.200",
          code: "PW3"
        },
        {
          id: 2,
          voucher_id: 4,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip.svg",
		  label: "3 Hari VIP",
		  desc: 'Rp 3.300/SMS termasuk PPN 10%',
          price: "Rp 3.300",
          code: "PW4"
        },
        {
          id: 3,
          voucher_id: 5,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip.svg",
		  label: "5 Hari VIP",
		  desc: 'Rp 5.500/SMS termasuk PPN 10%',
          price: "Rp 5.500",
          code: "PW5"
        },
        {
          id: 4,
          voucher_id: 6,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip.svg",
		  label: "8 Hari VIP",
		  desc: 'Rp 8.800/SMS termasuk PPN 10%',
          price: "Rp 8.800",
          code: "REG"
        },
        {
          id: 5,
          voucher_id: 7,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip-3.svg",
		  label: "12 Hari VIP",
		  desc: 'Rp 11.000/SMS termasuk PPN 10%',
          price: "Rp 11.000",
          code: "PW7"
        },
        {
          id: 6,
          voucher_id: 8,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip-3.svg",
		  label: "17 Hari VIP",
		  desc: 'Rp 16.500/SMS termasuk PPN 10%',
          price: "Rp 16.500",
          code: "PW8"
        }
      ],
      vipTrans: [
        {
          id: 7,
          voucher_id: 12,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip.svg",
          label: "16 Hari VIP",
          price: "Rp 10.000",
          code: "PW"
        },
        {
          id: 8,
          voucher_id: 9,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip.svg",
          label: "40 Hari VIP",
          price: "Rp 25.000",
          code: "PW"
        },
        {
          id: 9,
          voucher_id: 10,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip.svg",
          label: "80 Hari VIP",
          price: "Rp 50.000",
          code: "PW"
        },
        {
          id: 10,
          voucher_id: 11,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip.svg",
          label: "160 Hari VIP",
          price: "Rp 100.000",
          code: "PW"
        }
      ],
      iframeDialogVisible: false,
      invoiceUrl: ""
    };
  },
  components: {
    IframePreview
  },
  watch: {
		e1: function (baru, lama) {
			if( baru == 1 ) {
				this.appBarLabel = 'Purchase VIP Membership'
			}
		}
  },
  computed: {
    /* Init Modal */
    intDialogVisible: {
      get: function() {
        if (this.dialogVisible) {
          // Some dialog initialization code could be placed here
          // because it is called only when this.dialogVisible changes
          this.$emit("open");
        }

        return this.dialogVisible;
      },
      set: function(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },
  methods: {
    onError(error) {
      console.log("Error happened:", error);
      this.recaptchaToken = null;
    },
    onSuccess(token) {
      this.recaptchaToken = "success";
    },
    onExpired() {
      console.log("Expired");
      this.recaptchaToken = null;
    },

    /* Change Icon Arrow Prev Step */
    prev() {
		if(this.e1 == 1) {
		  this.$router.push('/');
		  console.log(this.e1)
	  }
      if (this.e1 != 0) {
        if (this.e1 == 3) {
          this.e1 = this.e1 - 2;
        } else if (this.e1 == 5) {
          this.e1 = this.e1 - 4;
        } else {
          if (this.e1 == 4) {
            if (this.current == "xl") {
              this.e1 = this.e1 - 2;
              this.current = 0;
              //console.log(this.e1);
            } else if (this.current == "indosat") {
              this.e1 = 3;
              this.current = 0;
            } else {
              //console.log(this.current);
            }
          } else {
            this.e1 = 1;
            //console.log(this.current);
          }
        }
	  }
    },

    /* Set Data Order */
    async setOrder(voucherId, email, label, price, currentstep) {
      if (currentstep == "xendit") {
        const sendvoucher = {
          voucher_id: voucherId,
          email: email
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
          voucher_id: voucherId
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
        this.itemprice = price;

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

    /* Validasi Form */
    validate(voucher) {
      var vm = this;
      vm.formdata.voucher_id = voucher;
      if (this.$refs.form.validate()) {
        if (vm.recaptchaToken != null) {
          this.submit();
        } else {
          this.snackbar = true;
          this.responsemessage = "Mohon Centang Recaptha";
        }
      }
    },

    /* Submit Form */
    async submit() {
      if (this.useWap) {
        let vm = this;
        if (this.wap == "xllangganan") {
          //   window.open(
          //     "https://150.107.148.9/app/wap/playworld/jayadata/isat/pw"
          //   );
          window.location.href =
            "http://150.107.148.9/app/wap/playworld/jayadata/xl/pw";
        } else if (this.wap == "indosatlangganan") {
          //window.open("https://150.107.148.9/app/wap/playworld/jayadata/xl/pw");
          window.location.href =
            "http://150.107.148.9/app/wap/playworld/jayadata/isat/pw";
        } else {
          window.location.href =
            "http://www.gudangapp.com/Wap_action.jsp?content=" +
            this.wap +
            "+WPW&dest=97789&&success=http://pewefeed.com/rand";
          //   window.open(
          //     "http://www.gudangapp.com/Wap_action.jsp?content=" +
          //       this.wap +
          //       "+WPW&dest=97789&&success=http://playworld.id/rand"
          //   );
        }

        // let vm = this
        this.$auth.fetchUser().then(() => {
          localStorage.setItem('userdata', JSON.stringify(vm.$auth.user))

          this.fetchUser()
        })
      } else {
        // send the form
        let vm = this
        const sendform = vm.formdata;

        try {
          const res = await PurchaseService.BuyVip(sendform);
          vm.responsemessage = res.data.message;
          if (res.status == 200) {
            this.e1 = 8;
          }
        } catch (error) {
          console.log(error);
        }

        this.recaptchaToken = null;

        this.$auth.fetchUser().then(() => {
          localStorage.setItem('userdata', JSON.stringify(vm.$auth.user))

          this.fetchUser()
        })
      }
    },

    fetchUser() {
      var res = []
      if (this.$auth.user) {
        // this.$auth.fetchUser()
        // res.data = this.$auth.user
        res.data = JSON.parse(localStorage.getItem('userdata'));
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
    }
  },
  mounted() {
    /* Init Data User to Customer Detail */
    this.fetchUser();
  }
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
.hohoho {
	background: rgba(255,255,255,.07)!important;
	.subtitle-1 {
		background: #1c1c1d!important;
	}
}
.jumpup {
	position: relative;
	padding-top:0!important;
}
</style>

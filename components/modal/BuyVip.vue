<template>
  <div>
    <v-dialog
      v-model="intDialogVisible"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <!-- Header -->
        <v-toolbar light color="white" class="stickykit">
          <!-- Arrow -->
          <v-btn
            v-if="e1 == 1 || e1 == 8"
            icon
            tile
            style="border-right: 1px solid #e1e1e1"
            light
            @click="intDialogVisible = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-btn
            v-if="e1 > 1 && e1 < 11 && e1 != 8"
            icon
            tile
            style="border-right: 1px solid #e1e1e1"
            light
            @click="prev()"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>

          <!-- Logo -->
          <v-toolbar-title>
            <v-img :src="logo" :lazy-src="logo" max-width="130" max-height="130"></v-img>
          </v-toolbar-title>

          <!-- Title -->
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn light text>Payment Option</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <!-- Step -->
        <v-stepper v-model="e1">
          <v-stepper-header style="display: none !important">
            <v-stepper-step :complete="e1 > 1" step="1"></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2"></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3"></v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <!-- Step 1 -->
            <v-stepper-content step="1" class="px-0">
              <v-card class="grey darken-2 mx-auto" tile>
                <v-card-title class="subtitle-1 grey darken-3 font-weight-bold">Dengan Pulsa</v-card-title>
                <v-divider></v-divider>

                <div class="px-4 py-0" @click="e1 = 2">
                  <v-row align="center">
                    <v-col cols="10" class="py-0">XL & AXIS</v-col>
                    <v-col cols="2">
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-col>
                  </v-row>
                </div>
                <v-divider></v-divider>
                <div class="px-4 py-0" @click="e1 = 3">
                  <v-row align="center">
                    <v-col cols="10" class="py-0">Indosat</v-col>
                    <v-col cols="2">
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-col>
                  </v-row>
                </div>
              </v-card>

              <!-- Content -->
              <v-card class="mx-auto grey darken-2 mt-4 mb-2">
                <v-card-title class="subtitle-1 grey darken-3 font-weight-bold">Tanpa Pulsa</v-card-title>
                <v-divider></v-divider>
                <div class="px-4 py-0" @click="e1 = 5">
                  <v-row align="center">
                    <v-col cols="10" class="py-0">BCA</v-col>
                    <v-col cols="2">
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-col>
                  </v-row>
                </div>
                <v-divider></v-divider>
                <div class="px-4 py-0" @click="e1 = 6">
                  <v-row align="center">
                    <v-col cols="10" class="py-0">BRI</v-col>
                    <v-col cols="2">
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-col>
                  </v-row>
                </div>
                <v-divider></v-divider>
                <div class="px-4 py-0" @click="e1 = 7">
                  <v-row align="center">
                    <v-col cols="10" class="py-0">BNI</v-col>
                    <v-col cols="2">
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-col>
                  </v-row>
                </div>
                <v-divider></v-divider>
                <div class="px-4 py-0" @click="e1 = 9">
                  <v-row align="center">
                    <v-col cols="10" class="py-0">MANDIRI</v-col>
                    <v-col cols="2">
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-col>
                  </v-row>
                </div>
                <v-divider></v-divider>
                <div class="px-4 py-0" @click="e1 = 10">
                  <v-row align="center">
                    <v-col cols="10" class="py-0">PERMATA</v-col>
                    <v-col cols="2">
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-col>
                  </v-row>
                </div>
              </v-card>
            </v-stepper-content>
            <!-- END OF STEP 1 -->

            <!-- Step 2 XL -->
            <v-stepper-content step="2" class="mb-3 px-0">
              <div class="font-weight-bold text-center">XL &amp; AXIS</div>
              <v-card class="grey darken-2 mb-3 mt-4">
                <v-card-title class="subtitle-1 grey darken-3 font-weight-bold text-16">Berlangganan</v-card-title>
                <div
                  @click="wap='xllangganan';setOrder(xlregvoucher, userdata.email, xlreglabel,xlregprice, current = 'xl')"
                  v-for="vip in vipItems.slice(0,1)"
                  :key="vip.id"
                >
                  <v-row class="py-0 mx-0" align="center">
                    <v-col cols="9">
                      <strong>{{ vip.label }}</strong>
                      <br />
                      <strong>{{ vip.price }}</strong>
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
              <v-card class="grey darken-2 mx-auto mb-3">
                <v-card-title class="subtitle-1 grey darken-3 font-weight-bold">Non Berlangganan</v-card-title>
                <v-divider></v-divider>
                <div
                  v-for="(vip, i) in vipItems"
                  @click="wap='PW'+(i+3);setOrder(vip.voucher_id, userdata.email, vip.label,vip.price, current = 'xl')"
                  :key="vip.id+'-'+i"
                >
                  <v-row class="py-0 mx-0" align="center">
                    <v-col cols="9">
                      <strong>{{ vip.label }}</strong>
                      <br />
                      <strong>{{ vip.price }}</strong>
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
                  <v-divider></v-divider>
                </div>
              </v-card>
            </v-stepper-content>
            <!-- END OF STEP 2 : XL -->

            <!-- Step 3 : Indosat -->
            <v-stepper-content step="3" class="px-0 text-14">
              <div class="font-weight-bold text-center">INDOSAT</div>
              <v-card class="grey darken-2 mb-3 mt-4">
                <v-card-title class="grey darken-3 font-weight-bold subtitle-2">Berlangganan</v-card-title>
                <v-divider></v-divider>
                <div
                  @click="wap='indosatlangganan';setOrder(indosatvoucherid, userdata.email, indosatlabel, indosatprice, current = 'indosat')"
                  v-for="vip in vipItems.slice(0,1)"
                  :key="vip.id"
                >
                  <v-row class="py-0 mx-0" align="center">
                    <v-col cols="9">
                      <strong>{{ vip.label }}</strong>
                      <br />
                      <strong>{{ vip.price }}</strong>
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
            <v-stepper-content step="4" class="px-0">
              <div class="px-3">
                <strong>Nilai Transaksi</strong>
              </div>
              <v-card class="grey darken-2 mb-3 mt-4">
                <v-row class="px-4">
                  <v-col cols="12">{{itemprice}}</v-col>
                </v-row>
              </v-card>

              <div class="px-3 mt-10">
                <strong>Rincian Transaksi</strong>
              </div>
              <v-card class="grey darken-2 mb-3 mt-4">
                <v-row class="px-4">
                  <v-col cols="12">{{itemname}}</v-col>
                </v-row>
              </v-card>

              <v-container class="mt-4 card-trans">
                <v-row style="margin-top: -10px">
                  <v-col cols="12">
                    <div class="text-14 mb-2">Channel Pembayaran (Pilih Salah Satu)</div>
                    <v-card class="grey darken-2 mx-auto mb-2">
                      <v-tabs grow v-model="buymethod" color="deep-orange">
                        <v-tab href="#sms" class="grey darken-2">SMS</v-tab>
                        <v-tab href="#wap" class="grey darken-2" @click="useWap=true">WAP</v-tab>
                        <!-- <v-tab href="#ussd" class="grey darken-2">USSD</v-tab> -->
                      </v-tabs>

                      <v-tabs-items v-model="buymethod">
                        <v-tab-item value="sms" class="grey darken-2">
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
                        <v-tab-item value="wap" class="grey darken-2">
                          <v-container class="text-center pt-4" style="padding-bottom: 40px">
                            <strong
                              class="body-2"
                            >Setelah mencentang Google Recaptcha dan klik tombol "Process" di bawah, anda akan diarahkan ke halaman Pembayaran</strong>
                          </v-container>
                        </v-tab-item>
                        <v-tab-item value="ussd" class="grey darken-2">
                          <v-container class="text-center pt-4" style="padding-bottom: 40px">
                            <strong class="body-2">Pilihan Tidak Tersedia</strong>
                          </v-container>
                        </v-tab-item>
                      </v-tabs-items>
                    </v-card>
                  </v-col>
                </v-row>

                <div
                  class="grey darken-2"
                  style="text-align:center;padding: 20px 10px 10px;border-radius:3px"
                >
                  <recaptcha
                    style="display:inline-block"
                    @error="onError()"
                    @success="onSuccess()"
                    @expired="onExpired()"
                  />
                </div>
                <br />
                <br />
                <br />

                <div class="processthis">
                  <v-btn
                    @click="validate(itemvoucher)"
                    color="deep-orange"
                    block
                    class="white--text mt-2"
                  >PROCESS</v-btn>
                </div>
              </v-container>
            </v-stepper-content>
            <!-- END OF STEP 4 : Order Detail -->

            <!-- Step 5 : Midtrans : BCA-->
            <v-stepper-content step="5" class="mb-3 px-0">
              <v-container class="py-0">
                <div class="font-weight-bold text-center">BCA</div>
              </v-container>
              <v-card class="grey darken-2 mt-4">
                <v-card-title class="subtitle-1 grey darken-3 font-weight-bold">Non Berlangganan</v-card-title>
                <v-divider></v-divider>
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
                  <v-divider></v-divider>
                </div>
              </v-card>
            </v-stepper-content>
            <!-- END OF Step 5 : Midtrans : BCA -->

            <!-- Step 6 : Xendit : BRI -->
            <v-stepper-content step="6" class="mb-3 px-0">
              <v-container class="py-0">
                <div class="text-center">BRI</div>
              </v-container>
              <v-card class="grey darken-2 mt-4">
                <v-card-title class="subtitle-1 grey darken-3 font-weight-bold">Non Berlangganan</v-card-title>
                <v-divider></v-divider>
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
                  <v-divider></v-divider>
                </div>
              </v-card>
            </v-stepper-content>
            <!-- END OF Step 6 : Xendit BRI -->

            <!-- Step 7 : Xendit : BNI -->
            <v-stepper-content step="7" class="mb-3 px-0">
              <v-container class="py-0">
                <div class="text-center font-weight-bold">BNI</div>
              </v-container>
              <v-card class="grey darken-2 mt-4">
                <v-card-title class="subtitle-1 grey darken-3 font-weight-bold">Non Berlangganan</v-card-title>
                <v-divider></v-divider>
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
                  <v-divider></v-divider>
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
                  <v-btn
                    @click="closeDialog()"
                    dark
                    color="deep-orange"
                    class="text-capitalize"
                  >CLOSE</v-btn>
                </div>
              </v-row>
            </v-stepper-content>
            <!-- END OF STEP 8 : Transaction Success -->

            <!-- Step 9 : Xendit : MANDIRI -->
            <v-stepper-content step="9" class="mb-3 px-0">
              <v-container class="py-0">
                <div class="text-center font-weight-bold">MANDIRI</div>
              </v-container>
              <v-card class="grey darken-2 mt-4">
                <v-card-title class="subtitle-1 grey darken-3 font-weight-bold">Non Berlangganan</v-card-title>
                <v-divider></v-divider>
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
                  <v-divider></v-divider>
                </div>
              </v-card>
            </v-stepper-content>
            <!-- END OF Step 9 : Xendit MANDIRI -->

            <!-- Step 10 : Xendit : PERMATA -->
            <v-stepper-content step="10" class="mb-3 px-0">
              <v-container class="py-0">
                <div class="text-center font-weight-bold">PERMATA</div>
              </v-container>
              <v-card class="grey darken-2 mt-4">
                <v-card-title class="subtitle-1 grey darken-3 font-weight-bold">Non Berlangganan</v-card-title>
                <v-divider></v-divider>
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
                  <v-divider></v-divider>
                </div>
              </v-card>
            </v-stepper-content>
            <!-- END OF Step 10 : Xendit PERMATA -->
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-dialog>

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
  name: "BuyVip",
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
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
      indosatlabel: "VIP BERLANGGANAN",
      indosatprice: "Rp 2.200",
      xlregvoucher: 17,
      xlreglabel: "VIP BERLANGGANAN",
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
          id: 1,
          voucher_id: 3,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip.svg",
          label: "VIP 2 Hari",
          price: "Rp 2.200",
          code: "PW3"
        },
        {
          id: 2,
          voucher_id: 4,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip.svg",
          label: "VIP 3 Hari",
          price: "Rp 3.300",
          code: "PW4"
        },
        {
          id: 3,
          voucher_id: 5,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip.svg",
          label: "VIP 5 Hari",
          price: "Rp 5.500",
          code: "PW5"
        },
        {
          id: 4,
          voucher_id: 6,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip.svg",
          label: "VIP 8 Hari",
          price: "Rp 8.800",
          code: "REG"
        },
        {
          id: 5,
          voucher_id: 7,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip-3.svg",
          label: "VIP 12",
          price: "Rp 11.000",
          code: "PW7"
        },
        {
          id: 6,
          voucher_id: 8,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip-3.svg",
          label: "VIP 17",
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
          label: "VIP 16 Hari",
          price: "Rp 10.000",
          code: "PW"
        },
        {
          id: 8,
          voucher_id: 9,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip.svg",
          label: "VIP 40 Hari",
          price: "Rp 25.000",
          code: "PW"
        },
        {
          id: 9,
          voucher_id: 10,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip.svg",
          label: "VIP 80 Hari",
          price: "Rp 50.000",
          code: "PW"
        },
        {
          id: 10,
          voucher_id: 11,
          image:
            "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/koin/vip.svg",
          label: "VIP 160 Hari",
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
              console.log(this.e1);
            } else if (this.current == "indosat") {
              this.e1 = 3;
              this.current = 0;
            } else {
              console.log(this.current);
            }
          } else {
            this.e1 = 1;
            console.log(this.current);
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
      this.submit();
      if (this.$refs.form.validate()) {
        if (this.recaptchaToken != null) {
          //this.submit();
          // console.log('nggak');
        } else {
          this.snackbar = true;
          this.responsemessage = "Mohon Centang Recaptha";
        }
      }
    },

    /* Submit Form */
    async submit() {
      let vm = this;

      if (this.useWap) {
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
      } else {
        // send the form
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
      }
    },

    fetchUser() {
      var res = []
      if (this.$auth.user) {
        this.$auth.fetchUser()

        res.data = this.$auth.user
        this.userdata = res.data.data;
      } else {
        this.$route.push('/')
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
    this.onError();
    this.onExpired();
    this.onSuccess();
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
.card-trans {
  *.theme--dark,
  *.v-tab-items {
    background-color: transparent !important;
  }
}
</style>

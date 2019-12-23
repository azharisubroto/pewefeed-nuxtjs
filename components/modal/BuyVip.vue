<template>
  <v-row justify="center">
    <v-dialog
      v-model="intDialogVisible"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <!-- Header -->
        <v-toolbar light color="white">
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
            v-if="e1 > 1 && e1 < 8"
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
            <v-img :src="logo" :lazy-src="lazy" max-width="40" max-height="40"></v-img>
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
              <v-container>
                <v-card class="mx-auto">
                  <v-card-title class="subtitle-1 grey lighten-4 font-weight-bold">Dengan Pulsa</v-card-title>
                  <v-divider></v-divider>

                  <div class="px-4 py-1" @click="e1 = 2">
                    <v-row align="center">
                      <v-col cols="2" class="py-0">
                        <img src="/img/xl.png" width="40" alt />
                      </v-col>
                      <v-col cols="8" class="py-0">XL & AXIS</v-col>
                      <v-col cols="2">
                        <v-icon>mdi-chevron-right</v-icon>
                      </v-col>
                    </v-row>
                  </div>
                  <v-divider></v-divider>
                  <div class="pa-4" @click="e1 = 3">
                    <v-row align="center">
                      <v-col cols="2" class="py-0">
                        <img src="/img/indosat.png" width="40" alt />
                      </v-col>
                      <v-col cols="8" class="py-0">Indosat</v-col>
                      <v-col cols="2">
                        <v-icon>mdi-chevron-right</v-icon>
                      </v-col>
                    </v-row>
                  </div>
                </v-card>

                <!-- Content -->
                <v-card class="mx-auto mt-4 mb-2">
                  <v-card-title class="subtitle-1 grey lighten-4 font-weight-bold">Tanpa Pulsa</v-card-title>
                  <v-divider></v-divider>
                  <div class="px-4 py-3" @click="e1 = 5">
                    <v-row align="center">
                      <v-col cols="2" class="py-0">
                        <img src="/img/bca.png" class="pt-2" width="40" alt />
                      </v-col>
                      <v-col cols="8" class="py-0">BCA</v-col>
                      <v-col cols="2">
                        <v-icon>mdi-chevron-right</v-icon>
                      </v-col>
                    </v-row>
                  </div>
                </v-card>
              </v-container>
            </v-stepper-content>
            <!-- END OF STEP 1 -->

            <!-- Step 2 XL -->
            <v-stepper-content step="2" class="mb-3 px-0">
              <v-container>
                <img
                  src="/img/xl.png"
                  width="25"
                  class="mr-2"
                  style="vertical-align:middle;position:relative;top:-3px"
                  alt
                /> <span class="font-weight-bold">XL &amp; AXIS</span>
                <br />
                <v-card class="mx-auto mb-3 mt-2">
                  <v-card-title class="subtitle-1 grey lighten-4 font-weight-bold">Berlangganan</v-card-title>
                  <div
                    @click="setOrder(xlregvoucher,xlreglabel,xlregprice, current = 'xl')"
                    v-for="vip in vipItems.slice(0,1)"
                    :key="vip.id"
                  >
                    <v-row>
                      <v-col cols="9">
                        <v-row>
                          <v-col cols="3" class="text-center">
                            <img class="ml-3" width="30" :src="indosatviplogo" :alt="vip.label" />
                          </v-col>
                          <v-col cols="9">
                            <strong>{{ vip.label }}</strong>
                            <br />
                            <strong>{{ vip.price }}</strong>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="3" class="mt-4">
                        <v-btn
                          icon
                          tile
                          light
                          @click="setOrder(vip.voucher_id,vip.label,vip.price, current = 'xl')"
                        >
                          <v-icon>mdi-arrow-right</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                  <!-- <v-card-text>
                    <v-btn
                      @click="setOrder(xlregvoucher,xlreglabel,xlregprice, current = 'xl')"
                      block
                      color="success"
                      dark
                    >Beli</v-btn>
                  </v-card-text>-->
                </v-card>
                <v-card class="mx-auto mb-3">
                  <v-card-title class="subtitle-1 grey lighten-4 font-weight-bold">Non Berlangganan</v-card-title>
                  <v-divider></v-divider>
                  <div
                    @click="setOrder(vip.voucher_id,vip.label,vip.price, current = 'xl')"
                    v-for="vip in vipItems"
                    :key="vip.id"
                  >
                    <v-row>
                      <v-col cols="9">
                        <v-row>
                          <v-col cols="3">
                            <img class="ml-2" width="50" :src="vip.image" :alt="vip.label" />
                          </v-col>
                          <v-col cols="9">
                            <strong>{{ vip.label }}</strong>
                            <br />
                            <strong>{{ vip.price }}</strong>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="3" class="mt-4">
                        <v-btn
                          icon
                          tile
                          light
                          @click="setOrder(vip.voucher_id,vip.label,vip.price, current = 'xl')"
                        >
                          <v-icon>mdi-arrow-right</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                  </div>
                </v-card>
              </v-container>
            </v-stepper-content>
            <!-- END OF STEP 2 : XL -->

            <!-- Step 3 : Indosat -->
            <v-stepper-content step="3" class="px-0">
              <v-container>
				  <img src="/img/indosat.png" width="30" style="position:relative;top:2px" class="mr-2" alt /> <span class="font-weight-bold">INDOSAT</span>
				  <br><br>
                <v-card class="mx-auto">
                  <v-card-title color="grey lighten-4 font-weight-bold" class="grey lighten-4 font-weight-bold subtitle-2">
					Berlangganan
                  </v-card-title>
                  <v-divider></v-divider>
				  <div
                     @click="setOrder(indosatvoucherid, indosatlabel, indosatprice, current = 'indosat')"
                    v-for="vip in vipItems.slice(0,1)"
                    :key="vip.id"
                  >
                    <v-row>
                      <v-col cols="9">
                        <v-row>
                          <v-col cols="3" class="text-center">
                            <img class="ml-4" width="30" :src="indosatviplogo" :alt="vip.label" />
                          </v-col>
                          <v-col cols="9">
                            <strong>{{ vip.label }}</strong>
                            <br />
                            <strong>{{ vip.price }}</strong>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="3" class="mt-4">
                        <v-btn
                          icon
                          tile
                          light
                          @click="setOrder(vip.voucher_id,vip.label,vip.price, current = 'xl')"
                        >
                          <v-icon>mdi-arrow-right</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </v-card>
              </v-container>
            </v-stepper-content>
            <!-- END OF STEP 3 : Indosat -->

            <!-- Step 4 : Order Detail -->
            <v-stepper-content step="4" class="px-0">
              <v-container>
                <v-row style="margin-top: -10px">
                  <v-col cols="12">
                    <v-card class="mx-auto mb-2">
                      <v-container>
                        <v-row>
                          <v-col cols="4" style="margin-top: -10px;">
                            <strong>Amount</strong>
                          </v-col>
                          <v-col cols="8" class="text-right">
                            <strong class="headline deep-orange--text">{{itemprice}}</strong>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-col>
                  <v-col cols="12" style="margin-top: -20px;">
                    <v-card>
                      <v-tabs grow v-model="tab" background-color="#eee" color="deep-orange">
                        <v-tab href="#order">Order Details</v-tab>
                        <v-tab href="#info">Info</v-tab>
                        <v-tab href="#customer">Customer</v-tab>
                      </v-tabs>

                      <v-tabs-items v-model="tab">
                        <v-tab-item value="order">
                          <v-container>
                            <v-row>
                              <v-col cols="6" class="text-left bold">
                                <strong class="caption">Item(s)</strong>
                              </v-col>
                              <v-col cols="6" class="text-right">
                                <strong class="caption">Price (+ppn 10%)</strong>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="6" class="text-left">
                                <strong class="body-2">{{itemname}}</strong>
                              </v-col>
                              <v-col cols="6" class="text-right">
                                <strong class="body-2">{{itemprice}}</strong>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-tab-item>
                        <v-tab-item value="info">
                          <v-container>
                            <ul v-if="itemname && itemname.includes('BERLANGGANAN')">
                              <li>Selanjutnya akan dikirimkan 1 SMS Per 3 hari</li>
                              <li>SMS akan memotong pulsa senilai Rp. 2200 (harga sudah termasuk PPN10%)</li>
                              <li>Keanggotaan VIP akan bertambah selama 3 hari sejak SMS diterima</li>
                            </ul>

                            <ul v-else>
                              <li>Pulsa akan terpotong satu kali senilai {{itemprice}} (harga sudah termasuk PPN 10%)</li>
                              <li>Keanggotaan VIP akan bertambah selama {{itemhari}} hari sejak SMS diterima atau Pulsa terpotong</li>
                            </ul>
                          </v-container>
                        </v-tab-item>
                        <v-tab-item value="customer">
                          <v-container>
                            <p>
                              <strong class="caption">Name</strong>
                              <br />
                              <strong
                                class="body-2"
                              >{{userdata.first_name ? userdata.first_name : '-'}}</strong>
                            </p>
                            <p>
                              <strong class="caption">Phone Number</strong>
                              <br />
                              <strong class="body-2">{{userdata.no_tlp ? userdata.no_tlp : '-'}}</strong>
                            </p>
                            <p>
                              <strong class="caption">Email</strong>
                              <br />
                              <strong class="body-2">{{userdata.email ? userdata.email : '-'}}</strong>
                            </p>
                          </v-container>
                        </v-tab-item>
                      </v-tabs-items>
                    </v-card>
                  </v-col>
                  <v-col cols="12">
                    <strong class="caption">Choose one of Payment Method</strong>
                    <br />
                    <br />
                    <v-card class="mx-auto mb-2">
                      <v-tabs grow v-model="buymethod" background-color="#eee" color="deep-orange">
                        <v-tab href="#sms">SMS</v-tab>
                        <v-tab href="#ussd">USSD</v-tab>
                        <v-tab href="#instant">Instant</v-tab>
                      </v-tabs>

                      <v-tabs-items v-model="buymethod">
                        <v-tab-item value="sms">
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
                        <v-tab-item value="ussd">
                          <v-container class="text-center mt-4" style="padding-bottom: 40px">
                            <strong class="body-2">Pilihan Tidak Tersedia</strong>
                          </v-container>
                        </v-tab-item>
                        <v-tab-item value="instant">
                          <v-container class="text-center mt-4" style="padding-bottom: 40px">
                            <strong class="body-2">Pilihan Tidak Tersedia</strong>
                          </v-container>
                        </v-tab-item>
                      </v-tabs-items>
                    </v-card>
                  </v-col>
                  <v-col cols="12">
                    <strong class="caption">Choose one of Payment Method</strong>
                    <br />
                    <br />
                    <v-card class="mx-auto mb-2">
                      <v-tabs grow v-model="buymethod" background-color="#eee" color="deep-orange">
                        <v-tab href="#sms">SMS</v-tab>
                        <v-tab href="#ussd">USSD</v-tab>
                        <v-tab href="#instant">Instant</v-tab>
                      </v-tabs>

                      <v-tabs-items v-model="buymethod">
                        <v-tab-item value="sms">
                          <v-form ref="form" v-model="valid" lazy-validation>
                            <v-container>
                              <v-btn style="margin-left: -10px" icon tile color="green">
                                <v-icon>mdi-check-circle</v-icon>
                              </v-btn>
                              <strong class="caption">Masukkan nomor handphone kamu</strong>
                              <v-text-field
                                label="+62"
                                prepend-inner-icon
                                counter
                                maxlength="12"
                                v-model="formdata.nomorhandphone"
                                type="number"
                                required
                                :rules="numberRules"
                              ></v-text-field>

                              <v-btn style="margin-left: -10px" icon tile color="green">
                                <v-icon>mdi-check-circle</v-icon>
                              </v-btn>
                              <strong
                                class="caption"
                              >Cetang kotak dibawah ini untuk melanjutkan proses</strong>
                              <recaptcha
                                @error="onError()"
                                @success="onSuccess()"
                                @expired="onExpired()"
                              />
                              <v-btn
                                @click="validate(itemvoucher)"
                                color="deep-orange"
                                width="300"
                                class="white--text mt-2"
                              >PROCESS</v-btn>
                            </v-container>
                          </v-form>

                          <v-snackbar v-model="snackbar" :timeout="timeout" top>
                            {{ responsemessage }}
                            <v-btn color="primary" text icon @click="snackbar = false">
                              <v-icon color="white">mdi-close-circle-outline</v-icon>
                            </v-btn>
                          </v-snackbar>
                        </v-tab-item>
                        <v-tab-item value="ussd">
                          <v-container class="text-center mt-4" style="padding-bottom: 40px">
                            <strong class="body-2">Pilihan Tidak Tersedia</strong>
                          </v-container>
                        </v-tab-item>
                        <v-tab-item value="instant">
                          <v-container class="text-center mt-4" style="padding-bottom: 40px">
                            <strong class="body-2">Pilihan Tidak Tersedia</strong>
                          </v-container>
                        </v-tab-item>
                      </v-tabs-items>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-stepper-content>
            <!-- END OF STEP 4 : Order Detail -->

            <!-- Step 5 : Midtrans-->
            <v-stepper-content step="5" class="mb-3 px-0">
              <v-container>
                <img
                  src="/img/bca.png"
                  class="mr-2"
                  width="35"
                  style="position:relative;top: 5px"
                  alt
                /> <span class="font-weight-bold">BCA</span>
              </v-container>
              <v-card class="mx-4">
                <v-card-title class="subtitle-1 grey lighten-4 font-weight-bold">Non Berlangganan</v-card-title>
                <v-divider></v-divider>
                <div v-for="trans in vipTrans" :key="trans.id">
                  <v-row
                    @click="setOrder(trans.voucher_id, trans.label, trans.price, current = 'midtrans')"
                  >
                    <v-col cols="9">
                      <v-row>
                        <v-col cols="3">
                          <img class="ml-2" width="50" :src="trans.image" :alt="trans.label" />
                        </v-col>
                        <v-col cols="9">
                          <strong>{{ trans.label }}</strong>
                          <br />
                          <strong>{{ trans.price }}</strong>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="3" class="mt-4">
                      <v-btn
                        icon
                        tile
                        light
                        @click="setOrder(trans.voucher_id, trans.label, trans.price, current = 'midtrans')"
                      >
                        <v-icon>mdi-arrow-right</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                </div>
              </v-card>
            </v-stepper-content>
            <!-- END OF STEP 5 : Midtrans -->

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
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import PurchaseService from "@/services/PurchaseService";
import UserService from "@/services/UserService";
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
      lazy:
        "https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png",
      logo:
        "https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png",
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
          price: "Rp 40.000",
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
      ]
    };
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
            } else if (this.current == "indosat") {
              this.e1 = 3;
              this.current = 0;
            }
          } else {
            this.e1 = this.e1 - 1;
          }
        }
      }
    },

    /* Set Data Order */
    async setOrder(voucherId, label, price, currentstep) {
      if (currentstep == "midtrans") {
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
        if (this.recaptchaToken != null) {
          this.submit();
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
    },

    async fetchUser() {
      try {
        const res = await UserService.getSingleUser();
        // console.log(res.data.status);
        this.userdata = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    closeDialog() {
      this.e1 = 1;
      this.intDialogVisible = false;
    }
  },
  mounted() {
    /* Init Data User to Customer Detail */
    this.isLoggedIn = localStorage.getItem("loggedin");
    if (this.isLoggedIn == "true") {
      this.fetchUser();
    }
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
</style>

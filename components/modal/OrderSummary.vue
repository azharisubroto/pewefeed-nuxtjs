<template>
  <v-row style="margin-top: -10px">
    <v-col cols="12">
      <v-card class="mx-auto mb-2">
        <v-container>
          <v-row>
            <v-col cols="4" style="margin-top: -10px;">
              <strong>Amount</strong>
            </v-col>
            <v-col cols="8" class="text-right" style="margin-bottom: -15px; margin-top: 15px;">
              <strong class="headline deep-orange--text">{{item}}</strong>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12" style="margin-top: -20px;">
      <v-tabs grow v-model="tab" background-color="white" color="deep-orange">
        <v-tab href="#order">Order Details</v-tab>
        <v-tab href="#customer">Customer Details</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="order">
          <v-container>
            <v-row>
              <v-col cols="6" class="text-center bold">
                <strong class="caption">Item(s)</strong>
              </v-col>
              <v-col cols="6" class="text-center">
                <strong class="caption">Harga</strong>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="6" class="text-center">
                <strong class="body-2">{{item}}</strong>
              </v-col>
              <v-col cols="6" class="text-center">
                <strong class="body-2">{{price}}</strong>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item value="customer">
          <v-container>
            <p>
              <strong class="caption">Name</strong>
              <br />
              <strong class="body-2">{{userdata.first_name ? userdata.first_name : '-'}}</strong>
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
    </v-col>
    <v-col cols="12">
      <v-card class="mx-auto mb-2">
        <v-btn icon tile color="blue">
          <v-icon>mdi-information</v-icon>
        </v-btn>
        <strong class="caption">Pilih salah satu metode pembelian berikut</strong>
        <v-divider></v-divider>

        <v-tabs grow v-model="buymethod" background-color="white" color="deep-orange">
          <v-tab href="#sms">SMS</v-tab>
          <v-tab href="#instant">WAP</v-tab>
          <v-tab href="#ussd">USSD</v-tab>
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
                  required
                  :rules="numberRules"
                ></v-text-field>

                <v-btn style="margin-left: -10px" icon tile color="green">
                  <v-icon>mdi-check-circle</v-icon>
                </v-btn>
                <strong class="caption">Cetang kotak dibawah ini untuk melanjutkan proses</strong>
                <vue-recaptcha
                  class="mt-2"
                  sitekey="6Ld8FDgUAAAAADGSSZayN8W2cTlJTmIGcv0NEPln"
                  ref="recaptcha"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
                ></vue-recaptcha>
                <v-btn
                  :disabled="valid"
                  @click="validate()"
                  color="green"
                  width="300"
                  class="white--text mt-2"
                >Lanjutkan</v-btn>
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
</template>

<script>
import PurchaseService from "@/services/PurchaseService";
import VueRecaptcha from "vue-recaptcha";
export default {
  name: "OrderSummary",
  props: ["price", "item", "voucherId"],
  components: {
    VueRecaptcha
  },
  data() {
    return {
      buymethod: null,
      tab: null,
      userdata: [],
      valid: false,
      recaptchaToken: null,
      numberRules: [v => !!v || "Input Valid Number"],
      formdata: {
        voucher_id: null,
        nomorhandphone: null
      },
      snackbar: false,
      timeout: 3000,
      responsemessage: ""
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        if (this.recaptchaToken != null) {
          this.submit();
          this.valid = false;
        } else {
          this.valid = true;
          this.snackbar = true;
          this.responsemessage = "Mohon Centang Recaptha";
        }
      }
    },
    onCaptchaVerified: function(res) {
      this.recaptchaToken = res;
    },
    onCaptchaExpired: function() {
      this.$refs.recaptcha.reset();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    async submit() {
      let vm = this;

      // send the form
      const sendform = vm.formdata;

      try {
        const res = await PurchaseService.xlMedia(sendform);
        vm.responsemessage = res.data.message;
        console.log(res);
      } catch (error) {
        console.log(error);
      }

      this.recaptchaToken = null;
    },
    fetchProgram() {
      let vm = this;
      console.log(vm);
      // StarxIzinService.checkIzin()
      // .then( response => {
      //     console.log(response.data.data);
      //     var data = response.data.data;
      //     vm.participant = data.participant;
      //     localStorage.setItem('participant', JSON.stringify(data.participant));
      // })
      // .catch(error => {
      //     console.log(error)
      // });
    },

    async fetchUser() {
      try {
        const res = await UserService.getSingleUser();
        // console.log(res.data.status);
        this.userdata = res.data.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    /* Init Data User to Customer Detail */
    this.isLoggedIn = localStorage.getItem("loggedin");
    if (this.isLoggedIn == "true") {
      this.fetchUser();
    }
  }
};
</script>

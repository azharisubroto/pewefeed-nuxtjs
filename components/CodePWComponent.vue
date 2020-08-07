<template>
  <v-container class="CodePW">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <div v-if="formsignin">
	  	<v-alert class="mt-4" color="#0057FF" prominent>
			<template v-slot:prepend>
			<v-img src="/img/icons/info.svg" width="35" max-width="35" class="mr-3 infoarticleicon"></v-img>
			</template>
			Masukan 32 Digit Kode yang kamu terima dari SMS untuk menambah VIP Membership
		</v-alert>
      <Login />
    </div>

    <div v-else>
      <div v-if="newuser">
        <v-alert color="#0057FF" prominent>
			<template v-slot:prepend>
			<v-img src="/img/icons/info.svg" width="35" max-width="35" class="mr-3 infoarticleicon"></v-img>
			</template>
			Selamat! ambil reward kamu dengan klik tombol Claim di bawah ini, gratis!
		</v-alert>

        <v-row v-if="reward">
          <v-col cols="5">
            <img :src="reward.image" style="width:100%" alt />
          </v-col>
          <v-col cols="7">
            <h4 class="text-20">{{ reward.title }}</h4>
          </v-col>
          <v-col cols="12">
            <v-btn color="orange" dark depressed block to="/member/barang_yang_didapat/">CLAIM</v-btn>
          </v-col>
        </v-row>
      </div>

      <div v-if="newuser" class="devider-big stretchout my-5"></div>

      <v-card class="pa-0" @makeloading="setloading" @notloading="notloading">
        <v-card-text class="pa-0">
          <v-alert color="#0057FF" prominent>
			<template v-slot:prepend>
			<v-img src="/img/icons/info.svg" width="35" max-width="35" class="mr-3 infoarticleicon"></v-img>
			</template>Masukan 32 Digit Kode yang kamu terima dari SMS untuk menambah VIP Membership
		  </v-alert>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row no-gutters>
              <v-col cols="12" class="d-none">
                <v-text-field label="PW ID" v-model="formdata.msisdn" :rules="pwIdRules"></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
				<v-text-field
					class="mb-0"
					outlined
					v-model="formdata.code" required :rules="pwCodeRules"
				></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-0 pt-0 mb-5">
                <recaptcha @error="onError()" @success="onSuccess()" @expired="onExpired()" />
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-btn @click="validate()" color="deep-orange" depressed dark large width="100%">PROCESS</v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-snackbar v-model="snackbar" :timeout="timeout" top>
            {{ responsemessage }}
            <v-btn color="primary" text icon @click="snackbar = false">
              <v-icon color="white">mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-snackbar>
        </v-card-text>
      </v-card>
    </div>

    <!-- Dialog Success -->
	<v-bottom-sheet v-model="dialog">
      <v-sheet height="100%">
        <v-toolbar :elevation="1" style="border-top: 2px solid #fff;">
          <!-- Arrow -->
          <v-btn
            dark
            icon
            tile
            style="border-right: 0px solid #717171"
            light
            @click="dialog = false;"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <!-- Title -->
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn dark text class="deep-orange--text pl-0" style="margin-left:-10px;">Information</v-btn>
          </v-toolbar-items>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <div class="mx-2">
          <v-container class="text-center">
            <v-row align="center" justify="center">
			<v-icon color="green" class="display-3">mdi-check-circle</v-icon>
			</v-row>
			<v-row align="center" justify="center">
			<p class="title mt-4">{{responsemessage}}</p>
			</v-row>
			<v-row align="center" justify="center" class="mx-4">
			<p class="subtitle-1 text-center">Silahkan klik tombol dibawah ini untuk melanjutkan</p>
			</v-row>
			<v-row align="center" justify="center" class="mx-4">
			<div>
				<v-btn @click="lanjutkan()" dark color="deep-orange">Lanjutkan</v-btn>
			</div>
			</v-row>
		            <br />
          </v-container>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import VoucherService from "@/services/VoucherService";
import Login from "@/components/Login";
import UserService from "@/services/UserService";
export default {
  middleware: 'auth',
  name: "CodePWComponent",
  components: {
    Login
  },
  data: () => ({
    newuser: false,
    reward: null,
    snackbar: false,
    overlay: false,
    timeout: 3000,
    msisdn: "",
    status_code: false,
    formsignin: false,
    message_code: "",
    responsemessage: "",
    responselink: "",
    dialog: false,
    valid: true,
    lazy:
      "https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png",
    logo: "/pl-logo.png",
    formdata: {
      msisdn: null,
      code: null
    },
    recaptchaToken: null,
    pwIdRules: [v => !!v || "Input Valid Code"],
    pwCodeRules: [v => !!v || "Input Valid Code"]
  }),
  methods: {
    /* Fetch Content */
    async fetchContent() {
      /* Init Data User to Customer Detail */

      if (this.$auth.user) {

        // this.$auth.fetchUser()
        var res = []
        // res.data = this.$auth.user
        res.data = JSON.parse(localStorage.getItem('userdata'));
        this.formdata.msisdn = res.data.data.msisdn;

        try {
          const user = await UserService.getReward();
          console.log("User data");
          // console.log(user);

          if (user.data.data != null) {
            this.reward = user.data.data;
            this.newuser = true;
          } else {
            // this.reward = {
            // 	"id": 333,
            // 	"title": "Pulsa All Operator Rp 5000",
            // 	"point": 399,
            // 	"image": "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/news/1551879841.1851.jpg"
            // }
            // this.newuser = true
          }

          if (res.data.data.email_confirmed == 1) {
            this.newuser = true;
          }
        } catch (err) {
          console.log(err.response.data);
        }
      } else {
        this.formsignin = true;
      }
      this.getCode();
    },

    /* Recaptcha */
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

    /* Loader */
    setloading() {
      this.overlay = true;
    },
    notloading() {
      this.overlay = false;
    },

    /* Get Code PW */
    async getCode() {
      this.setloading();
      if (this.$route.params.codepw == "fail") {
        this.notloading();
        this.status_code = true;
        this.message_code = "Kode Tidak Valid";
      } else {
        try {
          const res = await VoucherService.getCodePw(this.$route.params.codepw);
          console.log(res.data.code);
          this.notloading();
          this.recaptchaToken = null;
          this.status_code = true;
          this.message_code = "Ini Kode PW Anda " + res.data.code.trx;
          this.formdata.code = res.data.code.trx;
        } catch (err) {
          console.log(err.response.data);
          this.notloading();
          this.status_code = true;
          this.message_code = err.response.data.message;
        }
      }
    },

    /* Validasi Form */
    validate() {
      if (this.$refs.form.validate()) {
        if (this.recaptchaToken != null) {
          this.submit();
        } else {
          this.snackbar = true;
          this.responsemessage = "Mohon Centang Recaptha";
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    /* Submit Form */
    async submit() {
      // send the form
      let vm = this;
      const sendform = this.formdata;
      this.setloading();
      vm.responsemessage = "";
      try {
        const res = await VoucherService.submitVoucher(sendform);
        this.$auth.fetchUser().then(() => {
            localStorage.removeItem('userdata')
            localStorage.setItem('userdata', JSON.stringify(vm.$auth.user))
          })

        this.notloading();
        this.recaptchaToken = null;
        // console.log(res);
        this.status_code = false;
        vm.snackbar = false;
        vm.dialog = true;
        vm.responsemessage = res.data.message;
        vm.responselink = res.data.link;
      } catch (err) {
        console.log(err);
        this.notloading();
        vm.snackbar = true;
        vm.responsemessage = "Kode PW tidak ditemukan atau sudah expired";
      }
    },
    lanjutkan() {
      window.location.href = this.responselink;
    }
  },
  mounted() {
    this.fetchContent();
  }
};
</script>

<style lang="scss" scoped>
.CodePW {
  margin-top: 0;

  .stretchout {
    margin-left: -15px;
    margin-right: -15px;
  }
}
</style>

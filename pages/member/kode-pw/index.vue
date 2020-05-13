<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems" :key="item">
        <template v-if="item == 'ADD CODE'">
          <v-container>
            <!-- === CONTENT === -->
            <v-row>
              <v-col cols="12" class="mt-3" v-if="!isPurchased && !isNotValid">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-alert
                    border="left"
                    dense
                    colored-border
                    type="info"
                    style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
                  >Masukkan 32 digit kode VIP yang anda terima dari SMS dengan sender "{{ titleEnv }}"</v-alert>
                  <v-text-field
                    label="VIP CODE"
                    placeholder
                    outlined
                    v-model="formData.code"
                    :rules="pwCodeRules"
                  ></v-text-field>
                  <recaptcha @error="onError()" @success="onSuccess()" @expired="onExpired()" />
                  <v-btn
                    @click="submit()"
                    color="deep-orange"
                    class="mt-4"
                    dark
                    depressed
                    small
                  >PROCESS</v-btn>
                </v-form>
              </v-col>
              <v-col cols="12" class="mt-3" v-if="isPurchased">
                <v-alert
                  border="left"
                  dense
                  outlined
                  type="success"
                  icon="mdi-check-circle"
                >Keanggotaan VIP sukses ditambahkan</v-alert>
                <v-btn
                  @click="isHistory = false; isPurchased = false"
                  color="deep-orange"
                  dark
                  depressed
                  small
                  block
                >BACK</v-btn>
              </v-col>
              <v-col cols="12" class="mt-3" v-if="isNotValid">
                <v-alert border="left" dense outlined type="error">Maaf, kode VIP tidak valid.</v-alert>
                <v-btn
                  @click="isHistory = false; isPurchased = false; isNotValid = false"
                  color="deep-orange"
                  dark
                  depressed
                  small
                  block
                >BACK</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template v-if="item == 'HISTORY'">
          <v-container>
            <v-row>
              <v-col cols="12">
                <div v-if="kodepw">
                  <v-expansion-panels v-if="kodepw">
                    <v-expansion-panel v-for="(item, i) in kodepw" :key="i" class="mb-3">
                      <v-expansion-panel-header style="border-bottom: 1px solid #d1d1d1">
                        <v-row class="text-14 lh-a" align="center">
                          <v-col cols="4">{{item.created_at}}</v-col>
                          <v-col
                            cols="4"
                          >Rp. {{item.amount ? Number(item.amount).toLocaleString() : 0}}</v-col>
                          <v-col cols="4">{{item.detail}}</v-col>
                        </v-row>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row>
                          <v-col cols="5">Chanel</v-col>
                          <v-col cols="5">{{item.channel}}</v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="5">Type</v-col>
                          <v-col cols="5">{{item.type}}</v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="5">Bank</v-col>
                          <v-col cols="5">{{item.bank ? item.bank : '-'}}</v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                  <div v-for="(item, i) in kodepw" :key="i"></div>
                </div>
                <div v-if="notFound" class="my-5">
                  <v-alert prominent text type="info" success>Tidak ada data yang tersedia</v-alert>
                </div>
                <v-pagination
                  class="my-4"
                  v-if="!notFound"
                  v-model="page"
                  :length="totalPage"
				  color="orange"
                  :total-visible="7"
                  @input="next"
                ></v-pagination>
              </v-col>
            </v-row>
          </v-container>
        </template>
      </v-tab-item>
    </v-tabs-items>
    <!-- PROFIL MENU -->
    <v-bottom-navigation fixed dark grow color="white" background-color="black" v-model="tab">
      <v-btn v-for="item in tabItems" :key="item">
        <span>{{item}}</span>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
<script>
import UserService from "@/services/UserService";
import VoucherService from "@/services/VoucherService";
import CodePWList from "@/components/member/CodePWList";
export default {
  middleware: 'auth',
  name: "kode-pw",
  components: {
    CodePWList
  },
  data: () => ({
    titleEnv: process.env.title,
    tab: null,
    tabItems: ["ADD CODE", "HISTORY"],
    mypoint: null,
    userdata: [],
    userdetail: [],
    snackbar: false,
    timeout: 3000,
    responsemessage: "",
    isLoggedIn: true,
    setActive: 0,
    overlay: false,
    notFound: false,
    isHistory: false,
    isPurchased: false,
    isNotValid: false,
    code: null,
    kodepw: [],
    valid: true,
    page: 1,
    totalPage: 0,
    totalVisible: 7,
    onFilter: null,
    recaptchaToken: null,
    items: [
      { name: "ADD CODE", type: "code" },
      { name: "HISTORY", type: "history" }
    ],
    formData: {
      msisdn: null,
      code: null
    },
    pwCodeRules: [v => !!v || "Input Valid Code"]
  }),
  watch: {
    tab: function(oldval, val) {
      if (val == 0) {
        this.fetchData(1);
      }
    }
  },
  methods: {
    fetchUser() {
      this.$auth.fetchUser()
      var res = []

      res.data = this.$auth.user

      this.userdetail = res.data;
      this.userdata = res.data.data;
      this.mypoint = res.data.point_total;
      this.formData.msisdn = this.userdata.msisdn;
    },
    async fetchData(page) {
      this.overlay = true;
      try {
        const res = await UserService.getCodePW(page);
        console.log(res);

        if (res.data.data.length > 0) {
          this.notFound = false;
        } else {
          this.notFound = true;
        }

        this.kodepw = res.data.data;
        this.page = res.data.pagination.current_page;
        this.totalPage = res.data.pagination.last_page;
        this.overlay = false;
      } catch (error) {
        console.log(error);
        this.overlay = false;
      }
    },
    next(num) {
      this.fetchData(num, this.status);
    },

    whatMenu(type) {
      if (type == "history") {
        this.isHistory = true;
        this.fetchData(1);
      } else {
        this.isHistory = false;
      }
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

    /* Validasi Form */
    validate() {
      if (this.recaptchaToken != null) {
        this.submit();
      } else {
        this.snackbar = true;
        this.responsemessage = "Mohon Centang Recaptha";
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
      const sendform = this.formData;
      this.overlay = true;
      vm.responsemessage = "";
      try {
        const res = await VoucherService.submitVoucher(sendform);
        this.overlay = false;
        this.recaptchaToken = null;
        this.isPurchased = true;
        this.isHistory = false;
      } catch (err) {
        this.isNotValid = true;
        console.log(err);
        this.overlay = false;
        this.isHistory = false;
        this.isPurchased = false;
      }
    }
  },
  mounted() {
    this.fetchUser();
  }
};
</script>

<style>
.bordered {
  height: 200px;
  width: 200px;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
}
.button {
  width: 200px;
}
.myimg {
  /* position: absolute;
        left: 26%;
        top: 70%; */
  margin-top: 25%;
}
</style>

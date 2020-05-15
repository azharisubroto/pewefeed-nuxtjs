<template>
  <span class="d-block px-3 v-btn">
    <v-btn @click="recaptchaDialogVisible = true">
      <span>Share</span>
      <img
        src="/img/icons/icon-transfer-2.png"
        style="transform: rotate(-90deg)"
        class="mb-1 d-block"
        width="20"
        height="20"
      />
    </v-btn>
    <v-bottom-sheet v-model="recaptchaDialogVisible">
      <v-sheet height="100%">
        <v-toolbar :elevation="1">
          <!-- Arrow -->
          <v-btn
            dark
            icon
            tile
            style="border-right: 1px solid #717171"
            light
            @click="recaptchaDialogVisible = false;"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <!-- Title -->
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn dark text class="deep-orange--text">SHARE (+1 POIN)</v-btn>
          </v-toolbar-items>
          <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-divider></v-divider>

        <div class="mx-2">
          <div class="py-10" v-if="recaptcha">
            <recaptcha
              :key="recaptchaKey"
              class="mx-5 my-5"
              @error="onError()"
              @success="onSuccess()"
              @expired="onExpired()"
            />
          </div>
          <v-container v-if="sheet">
            <v-row>
              <v-col v-if="sharingImage" cols="8">
                <strong class="subtitle-1 font-weight-bold" style="color: #fff">{{ sharingTitle }}</strong>
                <br />
                <strong class="caption grey--text">{{ sharingTime }}</strong>
              </v-col>
              <v-col v-else cols="8">
                <strong class="subtitle-1">{{ sharingTitle }}</strong>
                <br />
                <strong class="caption grey--text">{{ domainTitle }}</strong>
              </v-col>
              <v-col v-if="sharingImage" cols="4">
                <img width="100%" :src="sharingImage" alt />
              </v-col>
              <v-col v-else cols="4">
                <img width="100%" src="/img/pw-icon.png" alt />
              </v-col>
              <v-col cols="12">
                <v-row align="center" no-gutters>
                  <v-col cols="9">
                    <socialSharing
                      :url="sharingUrl"
                      :title="sharingTitle"
                      :description="sharingDescription"
                      :twitter-user="twitterEnv"
                      inline-template
                    >
                      <div>
                        <network network="facebook">
                          <i
                            style="font-size:40px"
                            aria-hidden="true"
                            class="v-icon notranslate mdi mdi-facebook theme--light white--text"
                          ></i>
                        </network>
                        <network network="twitter">
                          <i
                            style="font-size:40px"
                            aria-hidden="true"
                            class="v-icon notranslate mdi mdi-twitter theme--light white--text"
                          ></i>
                        </network>
                        <network network="whatsapp">
                          <i
                            style="font-size:40px"
                            aria-hidden="true"
                            class="v-icon notranslate mdi mdi-whatsapp theme--light white--text"
                          ></i>
                        </network>
                        <network network="telegram">
                          <i
                            style="font-size:40px"
                            aria-hidden="true"
                            class="v-icon notranslate mdi mdi-telegram theme--light white--text"
                          ></i>
                        </network>
                        <network network="skype">
                          <i
                            style="font-size:40px"
                            aria-hidden="true"
                            class="v-icon notranslate mdi mdi-skype theme--light white--text"
                          ></i>
                        </network>
                      </div>
                    </socialSharing>
                  </v-col>
                  <v-col cols="3">
                    <v-icon
                      @click="copyToClipBoard()"
                      size="30"
                      style="margin-left: 3px;"
                    >mdi-content-copy</v-icon>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-sheet>
    </v-bottom-sheet>
    <v-snackbar v-model="snackbar" :timeout="timeout" top>
      {{ responsemessage }}
      <v-btn color="primary" text icon @click="snackbar = false">
        <v-icon color="white">mdi-close-circle-outline</v-icon>
      </v-btn>
    </v-snackbar>

    <SharePoin :dialogVisible="SharePoinVisible" @close="myDialogClose" />
  </span>
</template>

<script>
import * as socialSharing from "vue-social-sharing";
import UserService from "@/services/UserService";
import SharePoin from "@/components/modal/SharePoin";

export default {
  name: "ShareButton2",
  props: ["share"],
  //props: ["sharingUrl","sharingTitle","sharingDescription","sharingImage","sharingTime"],
  components: {
    socialSharing,
    SharePoin
  },
  data: () => ({
    recaptchaDialogVisible: false,
    recaptchaToken: null,
    recaptchaKey: 1,
    recaptcha: true,
    domainTitle: process.env.domainTitle,
    twitterEnv: process.env.twitter,
    sheet: false,
    timeout: 2000,
    snackbar: false,
    responsemessage: "Copied to clipboard",
    sharingUrl: "",
    sharingTitle: "",
    sharingDescription: "",
    sharingImage: "",
    sharingTime: "",
    SharePoinVisible: false,
    isSaved: false
  }),
  methods: {
    /* Recaptcha */
    onError(error) {
      console.log("Error happened:", error);
      this.recaptchaToken = null;
      this.recaptchaDialogVisible = true;
      this.sheet = false;
    },
    onSuccess() {
      this.$recaptcha.getResponse().then(token => {
        // console.log(token)
        this.recaptchaToken = token;
        this.recaptcha = false;
        //this.recaptchaDialogVisible = false;
        this.sheet = true;
      });
    },
    onExpired() {
      console.log("Expired");
      this.recaptchaDialogVisible = true;
      this.recaptchaToken = null;
      this.sheet = false;
    },

    myDialogClose() {
      this.SharePoinVisible = false;
    },
    async saveShare(data) {
      try {
        const res = await UserService.share(data);
        // console.log(res)
        if (res.data.point == 1) {
          console.log("dapat poin");
          this.SharePoinVisible = true;
        }
        this.recaptchaToken = null;
        this.$recaptcha.reset();
      } catch (error) {
        console.log(error);
        this.recaptchaToken = null;
        this.$recaptcha.reset();
      }
    },
    copyToClipBoard() {
      const copy = require("clipboard-copy");
      copy(this.sharingCopy);
      this.snackbar = true;
    },
    refetchMeta() {
      this.sharingUrl = window.location.href;
      this.sharingCopy = window.location.href;
      let data = this.$store.state.item;
      if (data) {
        this.sharingTitle =
          data && data.article
            ? data.article.title
            : "Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya! - Playworld";
        this.sharingImage =
          data && data.article && data.article.image
            ? data.article.image.medium
            : null;
        this.dataDescription =
          data && data.article && data.article.short_title
            ? data.article.short_title
            : "Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya!";
      }

      let vm = this;
      var bcrypt = require("bcryptjs");
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(vm.sharingUrl, salt);
      this.$root.$on("social_shares_close", function(network, url) {
        if (vm.isSaved) return false;
        let data = {
          provider: network,
          key: hash,
          url: vm.sharingUrl,
          token: vm.recaptchaToken
        };
        vm.saveShare(data);
      });
    }
  },
  mounted() {
    let vm = this;
    this.refetchMeta();
  },
  updated() {
    this.refetchMeta();
  },
  watch: {
    $route(to, from) {
      this.refetchMeta();
    }
  }
};
</script>

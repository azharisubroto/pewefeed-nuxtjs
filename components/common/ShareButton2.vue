<template>
  <div>
    <v-bottom-sheet v-model="sheet">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon>
          <v-icon class="mr-1">mdi-share-variant</v-icon>+1 POIN &nbsp;&nbsp;&nbsp;&nbsp;
        </v-btn>
      </template>
      <v-sheet height="100%" color="transparent">
        <div class="mx-2" style="background-color: #fff !important">
          <div>
            <v-container class="text-center deep-orange--text">
              <strong class="text-16">SHARE (+1 POIN)</strong>
            </v-container>
          </div>
          <v-divider></v-divider>
          <v-container>
            <v-row>
              <v-col v-if="sharingImage" cols="8">
                <strong class="subtitle-1 font-weight-bold">{{ sharingTitle }}</strong>
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
                      :url="sharingTitle + ' ' + sharingUrl"
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
                            class="v-icon notranslate mdi mdi-facebook theme--light primary--text"
                          ></i>
                        </network>
                        <network network="twitter">
                          <i
                            style="font-size:40px"
                            aria-hidden="true"
                            class="v-icon notranslate mdi mdi-twitter theme--light blue--text"
                          ></i>
                        </network>
                        <network network="whatsapp">
                          <i
                            style="font-size:40px"
                            aria-hidden="true"
                            class="v-icon notranslate mdi mdi-whatsapp theme--light green--text"
                          ></i>
                        </network>
                        <network network="telegram">
                          <i
                            style="font-size:40px"
                            aria-hidden="true"
                            class="v-icon notranslate mdi mdi-telegram theme--light blue--text"
                          ></i>
                        </network>
                        <network network="skype">
                          <i
                            style="font-size:40px"
                            aria-hidden="true"
                            class="v-icon notranslate mdi mdi-skype theme--light blue--text"
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
        <div class="mx-2 py-3">
          <v-btn
            @click="sheet = !sheet"
            tile
            light
            depressed
            block
            style="background-color: #fff !important"
          >Batal</v-btn>
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
  </div>
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
    myDialogClose() {
      this.SharePoinVisible = false;
    },
    async saveShare(data) {
      if (this.isSaved == true) return false;
      try {
        const res = await UserService.share(data);
        // console.log(res)
        if (res.data.point == 1) {
          console.log("dapat poin");
          this.SharePoinVisible = true;
        } else {
          console.log("tidak dapat poin");
          this.SharePoinVisible = false;
        }
        this.isSaved = true;
      } catch (error) {
        console.log(error);
        this.SharePoinVisible = false;
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
    }
  },
  mounted() {
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(window.location.href, salt);
    let vm = this;
    this.refetchMeta();

    this.$root.$on("social_shares_close", function(network, url) {
      if (vm.isSaved) return false;
      let data = {
        provider: network,
        key: hash,
        url: window.location.href
      };
      vm.saveShare(data);
    });
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

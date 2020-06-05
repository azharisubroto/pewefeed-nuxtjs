<template>
  <div class="bg-dark fill-height">
    <client-only>
      <!-- BANTUAN -->
      <v-container>
        <h4 class="deep-orange--text text-20 mb-4">Help</h4>
        <v-row v-if="bantuanMenu">
          <v-col cols="12" class="py-0" v-for="(bantuan, i) in bantuanMenu" :key="'bantuan-'+i">
            <a
              class="pl-0"
              text
              dark
              @click="$router.push('/bantuan/?tab='+bantuan.id)"
            >{{bantuan.title}}</a>
            <div class="devider-small my-3"></div>
          </v-col>
        </v-row>
      </v-container>

      <!-- CONTACT -->
      <v-container class="contaclist">
        <h4 class="deep-orange--text text-20">Contact</h4>
        <v-row class="pt-0">
          <v-col cols="12">
            <v-list two-line color="#232323" dark class="pt-0">
              <v-list-item-group v-model="contact">
                <v-list-item class="pl-0" v-for="(con, i) in contacts" :key="'consdf-'+i">
                  <v-list-item-content class="pt-0 menu">
                    <v-list-item-title>
                      <a
                        v-if="con.isWhatsapp"
                        style="text-decoration: none; color: #fff;font-size:18px"
                        target="blank"
                        :href="'https://api.whatsapp.com/send?phone=' + con.phone"
                      >{{ con.title }}</a>
                      <a
                        v-else
                        style="text-decoration: none; color: #fff;font-size:18px"
                        :href="'tel:' + con.phone"
                      >{{ con.title }}</a>
                    </v-list-item-title>
                    <v-list-item-subtitle v-html="con.subtitle" class="caption"></v-list-item-subtitle>
                    <div class="devider-small mt-3"></div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-list two-line color="#232323" dark class="pt-0 pb-0">
              <v-list-item-group v-model="contacttwo">
                <v-list-item class="pl-0" v-for="(con, i) in contactstwo" :key="'cons-'+i">
                  <v-list-item-content class="pt-0 menu">
                    <v-list-item-title>
                      <a
                        v-if="con.isPhone"
                        style="text-decoration: none; color: #fff;font-size:18px"
                        target="blank"
                        :href="'https://api.whatsapp.com/send?phone=' + con.phone"
                      >{{ con.title }}</a>
                    </v-list-item-title>
                    <v-list-item-subtitle v-html="con.subtitle" class="caption"></v-list-item-subtitle>
                    <div class="devider-small mt-3"></div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-list two-line color="#232323" dark class="pt-0">
              <v-list-item-group v-model="contactmail">
                <v-list-item class="pl-0" v-for="(con, i) in contactsmail" :key="'email-'+i">
                  <v-list-item-content class="pt-0 menu">
                    <v-list-item-title>
                      <a
                        v-if="!con.isPhone"
                        style="text-decoration: none; color: #fff;font-size:18px"
                        :href="'mailto:' + con.mail"
                      >{{ con.title }}</a>
                    </v-list-item-title>
                    <v-list-item-subtitle v-html="con.subtitle" class="caption"></v-list-item-subtitle>
                  </v-list-item-content>
                  <div class="devider-small mt-3"></div>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-container>

      <!-- SOCIAL -->
      <v-container class="justify-space-between">
        <h4 class="deep-orange--text text-20 mb-4">Social Media</h4>
        <a
          class="d-block py-4"
          text
          target="blank"
          style="text-decoration: none;"
          :href="'https://www.facebook.com/' + facebook"
        >
          <img
            src="/img/icons/icon-facebook.png"
            width="20"
            class="mr-2"
            style="vertical-align:middle"
            alt
          /> pewefeeds
        </a>
        <div class="devider-small"></div>
        <a
          class="d-block py-4"
          text
          target="blank"
          style="text-decoration: none;"
          :href="'https://twitter.com/' + twitter"
        >
          <img
            src="/img/icons/icon-twitter.png"
            width="20"
            class="mr-2"
            style="vertical-align:middle"
            alt
          /> pewefeeds
        </a>
        <div class="devider-small"></div>
        <a
          class="d-block py-4"
          text
          target="blank"
          style="text-decoration: none;"
          :href="'https://www.instagram.com/' + instagram"
        >
          <img
            src="/img/icons/icon-instagram.png"
            width="20"
            class="mr-2"
            style="vertical-align:middle"
            alt
          /> pewefeeds
        </a>
        <div class="devider-small"></div>
        <a
          class="d-block py-4"
          text
          target="blank"
          style="text-decoration: none;"
          :href="youtubeUrl"
        >
          <img
            src="/img/icons/icon-youtube.png"
            width="20"
            class="mr-2"
            style="vertical-align:middle"
            alt
          /> pewefeeds
        </a>
        <div class="devider-small"></div>
      </v-container>
    </client-only>
  </div>
</template>

<script>
import MenuService from "@/services/MenuService";
import ArticleService from "@/services/ArticleService";
export default {
  name: "categories",
  data() {
    return {
      facebook: process.env.facebook,
      instagram: process.env.instagram,
      twitter: process.env.twitter,
      youtube: process.env.youtube,
      youtubeUrl: process.env.youtubeUrl,
      bantuanMenu: null,
      contact: 2,
      contacts: [
        {
          title: "(021) 293 85 381",
          phone: "02129385381",
          isWhatsapp: false,
          subtitle: "(Business Hour)"
        },
        {
          title: "0815 1906 0929",
          phone: "6281519060929",
          isWhatsapp: true,
          subtitle: "(24 Hour)"
        }
      ],
      contacttwo: 2,
      contactmail: 2,
      contactstwo: [
        {
          title: "0817 1717 3029",
          phone: "6281717173029",
          isPhone: true,
          subtitle: "(24 Hour)"
        }
      ],
      contactsmail: [
        {
          title: "halo@pewefeed.com",
          mail: "halo@pewefeed.com",
          isSubtitle: false,
          subtitle: "(Official Email Address)"
        }
        // {
        //   title: process.env.email,
        //   mail: process.env.email,
        //   isSubtitle: true,
        //   subtitle: "(Official Email Address)"
        // }
      ]
    };
  },
  methods: {
    async fetchBantuan() {
      try {
        const res = await ArticleService.getBantuan();
        const data = res.data.data;
        // console.log(JSON.parse(JSON.stringify(data)));
        this.bantuanMenu = data;
        //this.loading = false
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.fetchBantuan();
  }
};
</script>
<style lang="scss">
.fill-height {
  min-height: 100vh;
}
.bg-dark {
  .devider-small {
    opacity: 0.3;
  }
}
.contaclist {
  .v-list-item__title {
    font-size: 18px !important;
  }
  .v-list-item--link:before {
    display: none !important;
  }
  .v-ripple__container {
    display: none !important;
  }
}
</style>

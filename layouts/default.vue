<template>
  <v-app :class="[drawer ? 'open' : 'closed']">
    <v-sheet>
      <v-app-bar dark color="dark" flat fixed tile class="main-app-bar">
        <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
        <template v-if="$route.name != 'index'">
          <v-btn @click="historyBack()" small icon>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <div class="flex-grow-1"></div>
        </template>
        <v-toolbar-title @click="$router.push('/'); drawer = false" class="pl-0">
          <v-img :src="mainlogo" width="130"></v-img>
          <!-- {{$route.name}} -->
        </v-toolbar-title>

        <div class="flex-grow-1"></div>

        <v-btn to="/" small icon v-if="$route.name != 'index'">
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <div class="headsearch" v-if="$route.name == 'index'">
          <v-text-field
            flat
            filled
            rounded
            single-line
            dense
            hide-details
            prepend-inner-icon="mdi-magnify"
            background-color="#000"
            v-model="searchModel"
            @keyup.enter="validate()"
            label="Tulis Judul Artikel . . ."
          ></v-text-field>
        </div>
      </v-app-bar>

      <!-- MEMBER MENU -->
      <v-tabs
        v-if="$nuxt.$route.name.includes('member') && !$nuxt.$route.name.includes('program')"
        grow
        color="deep-orange"
        center-active
        class="pw-tab"
      >
        <v-tab v-for="menu in memberMenu" :key="menu.loc" :to="menu.loc">{{menu.name}}</v-tab>
      </v-tabs>

      <!-- PROFIL MENU -->
      <v-bottom-navigation
        v-if="$nuxt.$route.name.includes('member') && !$nuxt.$route.name.includes('program') &&!$nuxt.$route.name.includes('barang_yang_didapat') && !$nuxt.$route.name.includes('kode-pw')"
        fixed
        dark
        grow
        color="white"
        background-color="black"
      >
        <v-btn v-for="menu in profileMenu" :key="menu.loc" :to="menu.loc">
          <span>{{menu.name}}</span>
        </v-btn>
      </v-bottom-navigation>

      <!-- CONTENT -->
      <v-content class="maincontent">
        <a
          v-if="!$nuxt.$route.name.includes('categories') && !$nuxt.$route.name.includes('purchase')"
          style="line-height:1;display:block;margin-bottom:-4px"
          href="https://www.instagram.com/tv/B_vLd92JPmv/?igshid=bqnq34q1fikx"
        >
          <img
            src="http://b16e2bab9e94a9d05089-aa7428b954372836cd8898750ce2dd71.r41.cf6.rackcdn.com/RB-WEB-MOBILE.png"
            alt="promo banner"
          />
        </a>
        <nuxt />
        <div class="mb-5 pb-5"></div>

        <!-- oooooooooooooooooooooooooooooooooooo
		BOTTOM NAVIGATION
        ooooooooooooooooooooooooooooooooooooo-->
        <v-bottom-navigation
          fixed
          dark
          grow
          color="white"
          background-color="#2C2C2D"
          v-model="wowtab"
          class="pwmenubottom"
          v-if="$route.name != 'purchase' && $route.name != 'cat-subcat-articleslug'"
        >
          <v-btn to="/">
            <span>Trending</span>
            <img src="/img/icons/icon-trending-2.png" class="mb-1 d-block" width="20" height="20" />
          </v-btn>
          <v-btn to="/categories/">
            <span>Categories</span>
            <img src="/img/icons/icon-category-2.png" class="mb-1 d-block" width="20" height="20" />
          </v-btn>
          <ShareButton2 />
          <v-btn to="/member/profil">
            <span>Me</span>
            <img src="/img/icons/icon-profile-2.png" class="mb-1 d-block" width="20" height="20" />
          </v-btn>
        </v-bottom-navigation>
      </v-content>
      <!-- CONTENT -->

      <!-- DRAWER -->
      <!-- <v-navigation-drawer v-model="drawer" app fixed width="100%" @click="drawer = false">
        <v-card tile>
          <v-app-bar absolute color="white" elevation="1">
            <v-icon @click="drawer=false" class="mr-3">mdi mdi-close</v-icon>

            <v-toolbar-title class="pl-0" @click="$router.push('/')">
              <v-img :src="mainlogo" width="130"></v-img>
            </v-toolbar-title>
          </v-app-bar>
        </v-card>


        <v-container>
          <v-row v-if="!isLogin()">
            <v-col class="mt-6" cols="12">
              <Login />
            </v-col>
          </v-row>

          <v-row class="mt-12" v-else align="center">
            <v-col cols="2" @click="$router.push('/member/pengaturan/profil');drawer = false">
              <v-avatar
                @click="$router.push('/member/pengaturan/profil');drawer = false"
                size="50"
                color="grey"
              >
                <v-img
                  :src="userdata.avatar ? userdata.avatar : '/img/user.jpeg'"
                  :aspect-ratio="1/1"
                ></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="10">
              <v-row>
                <v-col cols="6" @click="$router.push('/member/pengaturan/profil'); drawer = false">
                  <strong class="subheading">{{ userdata.first_name }}</strong>
                </v-col>
                <v-col cols="6" class="text-right">
                  <v-btn
                    @click="logout(); drawer = false"
                    color="deep-orange"
                    dark
                    depressed
                    small
                  >SIGN OUT</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div class="devider-small full"></div>

          <v-row v-if="isLogin()" no-gutters class="mt-5 m-4">
            <v-col cols="6">
              <v-row no-gutters>
                <v-col cols="2" @click="$router.push('/member/pengaturan/profil'); drawer = false">
                  <img
                    width="22"
                    src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/m-menu2/v.png"
                    alt
                  />
                </v-col>
                <v-col cols="10" class="pl-1">
                  <strong class="font-weight-bold orange--text text-14">VIP Expiry Date</strong>
                  <br />
                  <strong class="mr-2 dark--text font-weight-bold text-14">
                    {{(userdata.status_expired == 1) ? 'ACTIVE' : 'EXPIRED'}}
                    ({{userdata.expire}})
                  </strong>
                  <v-btn
                    @click="buyVip()"
                    small
                    class="mt-3"
                    color="deep-orange"
                    dark
                    depressed
                  >Purchase VIP</v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="5">
              <v-row no-gutters>
                <v-col cols="2">
                  <img
                    width="22"
                    src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/m-menu2/p.png"
                    alt
                  />
                </v-col>
                <v-col cols="10" class="pl-2">
                  <strong class="font-weight-bold orange--text text-14">Total Poin</strong>
                  <br />
                  <strong class="text-14 ont-weight-bold">{{ mypoint ? mypoint : '0'}}</strong>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="1" class="right-right">
              <div @click="$router.push('/member/pengaturan/profil'); drawer = false">
                <v-icon>mdi-arrow-right</v-icon>
              </div>
            </v-col>
          </v-row>

          <v-row class="d-none">
            <v-col cols="12">
              <v-btn
                @click="$router.push('/member'); drawer = false"
                block
                color="orange accent-14"
                depressed
                dark
              >
                <v-icon class="mr-2">mdi-settings</v-icon>SETTINGS
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <div class="devider-big"></div>


        <v-container>

          <v-row>
            <v-col cols="6">
              <v-list>
                <v-subheader class="black--text text-16 font-weight-bold">CATEGORY</v-subheader>
                <v-list-item-group color="dark" v-model="category">
                  <v-list-item
                    v-for="(cat, i) in categories"
                    :key="i"
                    @click="$router.push(cat.link); drawer = false"
                  >
                    <v-list-item-content class="menu">
                      <v-list-item-title v-html="cat.title"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col cols="6" v-if="highlights">
              <v-list>
                <v-subheader class="black--text text-16 font-weight-bold">HIGHLIGHT</v-subheader>
                <v-list-item-group v-model="premium">
                  <v-list-item
                    v-for="(highlight, i) in highlights"
                    :key="i"
                    @click="$router.push('/highlight/'+highlight.title); drawer = false"
                  >
                    <v-list-item-content class="menu">
                      <v-list-item-title v-html="highlight.title"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-list>
                <v-subheader class="black--text text-16 font-weight-bold">PREMIUM</v-subheader>
                <v-list-item-group v-model="premium">
                  <v-list-item
                    v-for="(prem, i) in premiums"
                    :key="i"
                    @click="$router.push(prem.link); drawer = false"
                  >
                    <v-list-item-content class="menu">
                      <v-list-item-title v-html="prem.title"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-container>
                <div class="devider-small full"></div>
              </v-container>
              <v-list>
                <v-subheader class="black--text text-16 font-weight-bold">PROGRAM</v-subheader>
                <v-list-item-group v-model="program">
                  <v-list-item
                    v-for="(prog, i) in programs"
                    :key="i"
                    @click="$router.push(prog.link); drawer = false"
                  >
                    <v-list-item-content class="menu">
                      <v-list-item-title v-html="prog.title"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
          <v-container>
            <div class="devider-small full"></div>
          </v-container>

          <v-row>
            <v-col cols="12" style="margin-bottom: -30px !important">
              <v-subheader class="black--text text-16 font-weight-bold">CONTACT</v-subheader>
            </v-col>
            <v-col cols="6">
              <v-list two-line>
                <v-list-item-group v-model="contact">
                  <v-list-item v-for="(con, i) in contacts" :key="i">
                    <v-list-item-content class="menu">
                      <v-list-item-title>
                        <a
                          v-if="con.isWhatsapp"
                          style="text-decoration: none; color: #000"
                          target="blank"
                          :href="'https://api.whatsapp.com/send?phone=' + con.phone"
                        >{{ con.title }}</a>
                        <a
                          v-else
                          style="text-decoration: none; color: #000"
                          :href="'tel:' + con.phone"
                        >{{ con.title }}</a>
                      </v-list-item-title>
                      <v-list-item-subtitle v-html="con.subtitle" class="caption"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col cols="6">
              <v-list two-line>
                <v-list-item-group v-model="contacttwo">
                  <v-list-item v-for="(con, i) in contactstwo" :key="i">
                    <v-list-item-content class="menu">
                      <v-list-item-title>
                        <a
                          v-if="con.isPhone"
                          style="text-decoration: none; color: #000"
                          target="blank"
                          :href="'https://api.whatsapp.com/send?phone=' + con.phone"
                        >{{ con.title }}</a>
                      </v-list-item-title>
                      <v-list-item-subtitle v-html="con.subtitle" class="caption"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col cols="12">
              <v-list two-line>
                <v-list-item-group v-model="contactmail">
                  <v-list-item v-for="(con, i) in contactsmail" :key="i">
                    <v-list-item-content class="menu">
                      <v-list-item-title>
                        <a
                          v-if="!con.isPhone"
                          style="text-decoration: none; color: #000"
                          :href="'mailto:' + con.mail"
                        >{{ con.title }}</a>
                      </v-list-item-title>
                      <v-list-item-subtitle v-html="con.subtitle" class="caption"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
          <v-container>
            <div class="devider-small full"></div>
          </v-container>


          <v-row>
            <v-col cols="12">
              <v-container>
                <a
                  target="blank"
                  style="text-decoration: none;"
                  :href="'https://www.facebook.com/' + facebook"
                >
                  <img src="/img/001-facebook.png" width="40" alt />
                </a>
                <a
                  target="blank"
                  style="text-decoration: none;"
                  :href="'https://twitter.com/' + twitter"
                >
                  <img src="/img/003-twitter.png" width="40" alt />
                </a>
                <a
                  target="blank"
                  style="text-decoration: none;"
                  :href="'https://www.instagram.com/' + instagram"
                >
                  <img src="/img/002-instagram.png" width="40" alt />
                </a>
                <a target="blank" style="text-decoration: none;" :href="youtubeUrl">
                  <img src="/img/004-youtube.png" width="40" alt />
                </a>
              </v-container>
            </v-col>
          </v-row>
          <v-container>
            <div class="devider-small full"></div>
          </v-container>

          <v-container class="pb-0">
            <v-row align="center" @click="$router.push('/bantuan'); drawer = false">
              <v-col cols="9" class="text-16 py-0">
                <strong>BANTUAN</strong>
              </v-col>
              <v-col cols="3" class="text-right py-0">
                <v-icon>mdi-chevron-right</v-icon>
              </v-col>
            </v-row>
            <v-row class="text-left mt-4">
              <v-col
                v-for="(bantuan, i) in bantuanMenu"
                :key="i"
                @click="$router.push('/bantuan/?tab='+bantuan.id);drawer = false"
                cols="6"
              >
                <span class="text-uppercase">{{bantuan.title}}</span>
              </v-col>
            </v-row>
          </v-container>


          <v-container>
            <div class="devider-small full"></div>
          </v-container>
          <v-container class="mb-5 pb-5">
            <strong class="caption">{{years}} &copy; PT Jayadata Indonesia</strong>
            <br />
            <br />
            <br />
            <br />
          </v-container>
        </v-container>
      </v-navigation-drawer>-->
      <!-- END DRAWER -->
    </v-sheet>

    <!-- OVERLAY -->
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <!--
			Modal Search
    -->
    <div class="text-center">
      <!--
			SEARCH
      -->
      <div class="text-center">
        <v-dialog v-model="searchDialog" persistent width="500">
          <v-card>
            <v-toolbar>
              <!-- Arrow -->
              <v-btn icon tile style="border-right: 1px solid #d1d1d1" @click="closeSearch()">
                <v-icon>mdi-close</v-icon>
              </v-btn>

              <!-- Logo -->
              <v-toolbar-title>
                <v-img
                  @click="$router.push('/'); drawer = false"
                  :src="mainlogo"
                  lazy-:src="mainlogo"
                  max-width="100"
                  max-height="100"
                ></v-img>
              </v-toolbar-title>

              <!-- Title -->
              <div class="flex-grow-1"></div>
              <strong class="subtitle-2">PENCARIAN</strong>
            </v-toolbar>

            <v-card-text>
              <v-row class="mt-12">
                <v-col cols="10">
                  <v-text-field
                    v-model="searchModel"
                    @keyup.enter="validate()"
                    dense
                    label="Tulis Judul Artikel . . ."
                    autofocus
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-btn @click="validate()" icon>
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <!-- === DAILY POINT MODAL === -->
    <DrawerWelcome :dialogVisible="dailyPointModalVisible" @close="myDialogClose" />

    <v-snackbar v-model="snackbar" :timeout="timeout" top>
      {{ responsemessage }}
      <v-btn color="primary" text icon @click="snackbar = false">
        <v-icon color="white">mdi-close-circle-outline</v-icon>
      </v-btn>
    </v-snackbar>
    <BuyVip :dialogVisible="buyVipDialogVisible" @close="myDialogClose" />
  </v-app>
</template>

<script>
if (process.browser) {
  // import AddThis from 'vue-simple-addthis-share'
  // require('vue-simple-addthis-share')
}
import UserService from "@/services/UserService";
import * as mobile from "is-mobile";
import Login from "@/components/Login";
import NewsLoop from "@/components/common/NewsLoop";
import NewLogin from "@/components//NewLogin";
import ArticleService from "../services/ArticleService";
import MenuService from "../services/MenuService";
import ShareButton2 from "@/components/common/ShareButton2";
import BuyVip from "@/components/modal/BuyVip";
import DrawerWelcome from "@/components/common/DrawerWelcome";

export default {
  name: "App",
  components: {
    Login,
    NewsLoop,
    NewLogin,
    ShareButton2,
    BuyVip,
    DrawerWelcome
  },
  data() {
    return {
      wowtab: "/",
      facebook: process.env.facebook,
      instagram: process.env.instagram,
      twitter: process.env.twitter,
      youtube: process.env.youtube,
      youtubeUrl: process.env.youtubeUrl,
      mainlogo: "/pl-logo.png",
      drawer: null,
      searchDialog: null,
      isLoggedIn: false,
      dialog: false,
      searchModel: null,
      overlay: false,
      articles: [],
      totalArticles: 0,
      userdata: [],
      mypoint: null,
      next: 2,
      snackbar: false,
      timeout: 3000,
      responsemessage: null,
      isMore: true,
      years: null,
      menus: [
        {
          id: 1,
          label: "Home",
          path: "/",
          icon: "mdi-home"
        },
        {
          id: 2,
          label: "Starx",
          path: "/starx",
          icon: "mdi-account-star"
        }
      ],
      toolbarMenu: [
        { name: "Trending", loc: "/" },
        // {name: 'Fakta', loc: '/fakta'},
        // { name: "Komik", loc: "/komik" },
        { name: "Tukar Poin", loc: "/tukarpoin" },
        { name: "Entertaiment", loc: "/viral" },
        { name: "Musik", loc: "/lagu" },
        { name: "Nonton", loc: "/nonton" },
        { name: "Piknik", loc: "/piknik" },
        { name: "Tekno", loc: "/tekno" },
        { name: "Sport", loc: "/sport" },
        { name: "Video", loc: "/video" }
      ],
      memberMenu: [
        { name: "Profile", loc: "/member/pengaturan/profil" },
        { name: "Poin History", loc: "/member/histori_penggunaan_poin" },
        { name: "Rewards", loc: "/member/barang_yang_didapat" },
        { name: "Transfer Status", loc: "/member/status_transfer" },
        { name: "VIP Code", loc: "/member/kode-pw" }
        //{name: 'VIP', loc: '/member/beli_dengan_pulsa'},
      ],
      starxMenu: [
        { name: "Starx Band", loc: "/starx/band" }
        //{name: 'Notifikasi', loc: '/member/pengaturan/notifikasi'},
      ],
      profileMenu: [
        { name: "Profil Akun", loc: "/member/pengaturan/profil" },
        { name: "Daftar Alamat", loc: "/member/pengaturan/daftar-alamat" },
        { name: "Daftar Nomor", loc: "/member/pengaturan/daftar-nomor" }
        //{name: 'Notifikasi', loc: '/member/pengaturan/notifikasi'},
      ],
      category: 5,
      categories: [
        {
          title: "TRENDING",
          link: "/"
        },
        {
          title: "Entertaiment",
          link: "/viral"
        },
        {
          title: "MUSIK",
          link: "/lagu"
        },
        {
          title: "NONTON",
          link: "/nonton"
        },
        {
          title: "PIKNIK",
          link: "/piknik"
        },
        {
          title: "TEKNO",
          link: "/tekno"
        },
        {
          title: "SPORT",
          link: "/sport"
        },
        {
          title: "VIDEO",
          link: "/video"
        }
      ],
      premium: 2,
      highlights: null,
      premiums: [
        // {
        // 	title: 'FAKTA',
        // 	link: '/fakta'
        // },
        {
          title: "KOMIK",
          link: "/komik"
        }
      ],
      program: 3,
      programs: [
        {
          title: "TUKAR POIN",
          link: "/tukarpoin"
        }
        // {
        // 	title: 'TOP POIN',
        // 	link: '/toppoin'
        // },
        // {
        //   title: "KOMPETISI",
        //   link: "/kompetisi"
        // }
      ],
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
          title: "halo@playworld.id",
          mail: "halo@playworld.id",
          isSubtitle: false,
          subtitle: "(Official Email Address)"
        },
        {
          title: process.env.email,
          mail: process.env.email,
          isSubtitle: true,
          subtitle: "(Official Email Address)"
        }
      ],
      bantuanMenu: null,
      share: {
        dataUrl: "",
        dataTitle: "",
        dataDescription: ""
      },
      singularDetail: null,
      dialog: false,
      buyVipDialogVisible: false,
      dailyPointModalVisible: false
    };
  },
  computed: {
    notVipVisible: {
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
    historyBack() {
      this.$router.back();
    },
    logout() {
      let vm = this;
      this.$auth.logout()
      this.isLoggedIn = false;
      this.isLogin();
      // if (window.location.pathname == '/member/login') {
      // 	window.location.href = '/'
      // } else {
      // 	window.location.href = window.location.pathname
      // }
      this.$router.push("/");
    },
    isLogin() {
      return this.isLoggedIn;
    },
    isUserdata() {
      return this.$auth.user;
    },
    fetchUser() {
      if (this.$auth.user) {
        this.$auth.fetchUser()
        let userdata = this.$auth.user;
        let mypoint = userdata.data.point_total

        if (userdata.data.daily_point) {
          if ( window.location.pathname != "/member/histori_penggunaan_poin" ) {
            this.dailyPointModalVisible = true;
          }
        }
      } else {
        this.isLoggedIn = false
        this.isLogin()
      }
    },
    /* Validasi Form */
    validate() {
      if (this.searchModel) {
        this.search();
      } else {
        this.snackbar = true;
        this.responsemessage = "Mohon Isi Kolom Pencarian";
      }
    },
    search() {
      const keywords = this.slugify(this.searchModel);
      this.searchDialog = false;
      this.searchModel = null;
      this.$router.push("/search/" + keywords);
    },
    slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
    },
    closeSearch() {
      this.searchDialog = false;
      this.searchModel = null;
    },
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
    },
    async fetchHighlight() {
      try {
        const res = await MenuService.getHighlight();
        const data = res.data.data;
        // console.log("Highlights", JSON.parse(JSON.stringify(data)));
        this.highlights = data;
      } catch (error) {
        console.log(error);
      }
    },
    myDialogClose() {
      this.buyVipDialogVisible = false;
      this.dailyPointModalVisible = false;
      // other code
    },
    buyVip() {
      // if not vip, show dialog
      this.notVipVisible = false;
      this.buyVipDialogVisible = true;
    }
  },
  mounted() {
    this.isLogin();
    this.fetchUser();
    this.fetchBantuan();
    //this.fetchHighlight();
    this.years = new Date().getFullYear();
    var isMobile = mobile();
    if (!isMobile) {
      var mobileUrl = window.location.href;
      var desktopUrl = mobileUrl.replace("://m.", "://");
      if (location.host == "m." + process.env.domainTitle.toLowerCase()) {
        window.location.href = desktopUrl;
      } else {
        console.log("desktop version");
      }
    } else {
      console.log("mobile version");
    }
  },
  watch: {
    $route(to, from) {
      this.fetchUser();
    }
  }
};
</script>

<style lang="scss">
body {
  --primary: #ff4200;
  --VIRAL: #46c0ef;
  --SPORT: #68a457;
  --PIKNIK: #803bdc;
  --LAGU: #d54444;
  --NONTON: #fff;
  --TEKNO: #8d8988;
}
body,
html {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

img {
  max-width: 100%;
}
.theme--dark.v-application,
.theme--dark.v-sheet {
  background: #1c1c1d;
}
.main-app-bar.theme--dark {
  background: #2c2c2d;
}
.text-primary {
  color: var(--primary);
}
a,
.v-application a {
  text-decoration: none;
  color: #fff;
}

.v-application .main-app-bar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}
/* font-size by number */
@for $i from 5 through 90 {
  .text-#{$i},
  *.text-#{$i} {
    font-size: #{$i}px !important;
  }
}
.headsearch {
  width: 200px;
}
.maincontent p {
  font-size: 18px;
  margin: 30px 0;
  color: #fff;
}
.v-application {
  &.open {
    overflow-y: hidden;
    height: 100vh;
  }
}
.theme--light.v-application {
  background: #fff;
}
.v-toolbar {
  flex: initial;
}

.starx-banner {
  border-radius: 10px;
}

.fixed-tabs-bar {
  position: -webkit-sticky;
  position: sticky;
  top: 3.5rem;
  z-index: 2;
}

.v-content__wrap {
  padding-top: 56px;
}

.scroller {
  display: flex;
  overflow-x: auto;
  .carousel-cell {
    width: 200px;
    margin: 0 10px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
}

.theme--light.v-navigation-drawer {
  z-index: 100;
}
.pw-tab {
  position: fixed;
  top: 55px;
  z-index: 10;
  border-bottom: 1px solid #e5e5e5;
}

.v-slide-group__prev {
  display: none !important;
}

.topview-item {
  h2 {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.3;
  }
  .playbutton {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    border-radius: 90px;
  }
  .VIRAL {
    color: var(--VIRAL);
  }
  .SPORT {
    color: var(--SPORT);
  }
  .PIKNIK {
    color: var(--PIKNIK);
  }
  .LAGU {
    color: var(--LAGU);
  }
  .NONTON {
    color: var(--NONTON);
  }
  .TEKNO {
    color: var(--TEKNO);
  }
}

.menu {
  color: #000;
}
// INDEX ARTICLE
.v-slide-group.v-item-group > .v-slide-group__next,
.v-slide-group.v-item-group > .v-slide-group__prev {
  display: none;
}
.promo_news .promo_caption {
  position: absolute;
  bottom: 0;
  margin: 10px;
}
.juara {
  font-size: 20px;
}
.featured-item {
  width: 100%;
  text-align: center;
  height: 40vh;
  background: #000;
  color: #fff;
  position: relative;
  .caption {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(2, 1, 1, 0.7);
    .caption-inner {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      right: 0;
      margin: 0 auto;
      padding: 30px;
      h2 {
        font-weight: 900;
        font-size: 24px;
        line-height: 1.3;
      }
    }
  }
}
.flickity-page-dots {
  bottom: 20px !important;
  .dot {
    background: #fff !important;
    opacity: 0.5 !important;
    width: 7px !important;
    height: 7px !important;
    &.is-selected {
      background-color: var(--primary) !important;
      opacity: 1 !important;
    }
  }
}
.devider-big {
  height: 8px;
  background: #2b2b2b;
}
.devider-small {
  height: 1px;
  border-bottom: 1px solid #2b2b2b;

  &.full {
    margin-left: -10px;
    margin-right: -10px;
  }
}
.cta-links {
  .v-list-item {
    line-height: 1;
    min-height: 30px;
  }
}
.v-autocomplete__content {
  z-index: 9999 !important;
}
.pw-tab a.v-tab {
  //   color: #000 !important;
  font-weight: bold !important;
  &.v-tab--active {
    color: var(--primary) !important;
  }
}
.pwhead {
  position: relative;
  z-index: 0;
  margin-bottom: 20px;
  overflow: hidden;
  span {
    line-height: 1;
    display: inline-block;
    padding: 0 10px 0 0;
    position: relative;
    &:before {
      content: "";
      width: 2000px;
      height: 1px;
      background: #111;
      position: absolute;
      right: 0;
      left: 100%;
      top: 0;
      bottom: 0;
      margin: auto 0;
      z-index: -1;
    }
  }
}
.v-dialog__content
  .v-dialog
  > .v-card:not(.v-sheet--tile):not(.v-card--shaped) {
  border-radius: 0 !important;
  margin: 0 !important;
}

.no-content {
  background: #f0f0f0;
  height: 250px;
  line-height: 250px;
  width: 100%;
  border: #d1d1d1;
  text-align: center;
}

.v-item-group.v-bottom-navigation--fixed {
  height: 68px !important;
  .v-btn__content {
    font-size: 0.875rem !important;
  }
}

.v-item-group.v-bottom-navigation .v-btn.v-btn--active .v-btn__content {
  color: var(--primary) !important;
}
.v-alert__border:not(.v-alert__border--has-color) {
  opacity: 1 !important;
}
.lh-a {
  line-height: 1.7;
}
.v-dialog {
  header {
    position: sticky !important;
    top: 0;
    z-index: 11;
  }
}
.makefull {
  position: relative;
  &:before {
    content: "";
    width: calc(100% + 25px);
    height: 100%;
    position: absolute;
    left: -15px;
    right: -15px;
    top: 0;
    background: #d1d1d1;
  }
}
.pwmenubottom {
  .v-btn {
    img {
      filter: brightness(0) invert(1);
    }
    &.v-btn--active {
      img {
        filter: none;
      }
    }
  }
}
.bg-dark {
  background: #232323;
}
</style>

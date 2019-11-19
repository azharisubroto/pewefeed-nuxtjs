<template>
  <v-app :class="[drawer ? 'open' : 'closed']">
    <v-sheet
    >
      <v-app-bar
        color="orange accent-14"
        dark
        flat
        fixed
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title @click="$router.push('/')">
          <v-img
          src="/img/playworld-logo.png"
          width="130"
          ></v-img>
        </v-toolbar-title>

        <div class="flex-grow-1"></div>

        <v-btn icon @click="searchDialog = true">
          <v-icon> mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>
      <v-tabs v-if="!$nuxt.$route.name.includes('member')" grow color="deep-orange" center-active class="pw-tab">
        <v-tab
          v-for="menu in toolbarMenu"
          :key="menu.loc"
          :to="menu.loc"
        >
          {{menu.name}}
        </v-tab>
      </v-tabs>

      <!-- MEMBER MENU -->
      <v-tabs v-if="$nuxt.$route.name.includes('member') && !$nuxt.$route.name.includes('program')" grow color="deep-orange" center-active class="pw-tab">
        <v-tab
          v-for="menu in memberMenu"
          :key="menu.loc"
          :to="menu.loc"
        >
          {{menu.name}}
        </v-tab>
      </v-tabs>

      <!-- PROFIL MENU -->
      <v-bottom-navigation
        v-if="$nuxt.$route.name.includes('member') && !$nuxt.$route.name.includes('program')"
        grow
        dark
        fixed
        color="dark"
      >
        <v-btn
        v-for="menu in profileMenu"
        :key="menu.loc"
        :to="menu.loc"
        >
          <span>{{menu.name}}</span>
        </v-btn>
      </v-bottom-navigation>

      <!-- CONTENT -->
      <v-content class="maincontent">
        <nuxt />
        <div
        v-if="$nuxt.$route.name.includes('member') && !$nuxt.$route.name.includes('program')"
        class="mb-5 pb-5"
        ></div>
      </v-content>
      <!-- CONTENT -->


      <!-- DRAWER -->
      <v-navigation-drawer
        v-model="drawer"
        app
        fixed
		    width="100%"
      >
        <v-card tile>
          <v-app-bar
            absolute
            color="orange accent-14"
            elevation="0"
            dark
          >
            <v-icon @click="drawer=false" class="mr-3">mdi mdi-close</v-icon>

            <v-toolbar-title class="pl-5" @click="$router.push('/')">
              <v-img
              src="/img/playworld-logo.png"
              width="130"
              ></v-img>
            </v-toolbar-title>
          </v-app-bar>
        </v-card>

        <!--
          LOGIN / ACCOUNT
        -->
        <v-container>
          <v-row v-if="!isLogin()">
            <v-col class="mt-6" cols="12">
              <Login />
            </v-col>
          </v-row>

          <v-row class="mt-12" v-else>
            <v-col cols="3">
              <v-avatar
                size="60"
                color="grey"
              >
                <img :src="userdata.avatar ? userdata.avatar : '/img/user.jpeg'" alt="alt">
              </v-avatar>
            </v-col>
            <v-col cols="9" style="margin-top: -10px">
              <v-row>
                <v-col cols="6">
                  <strong class="subheading">{{ userdata.first_name }}</strong>
                </v-col>
                <v-col cols="6" class="text-right">
                  <v-btn @click="logout()" rounded color="error" depressed small>SIGN OUT</v-btn>
                </v-col>
              </v-row>
              <div class="devider-small full"></div>
              <v-row no-gutters class="mt-5">
                <v-col cols="7">
                  <v-row no-gutters>
                    <v-col cols="2">
                      <img width="22" src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/m-menu2/v.png" alt="">
                    </v-col>
                    <v-col cols="10" :class="['pl-1', (userdata.status_expired == 1) ? 'green--text' : 'red--text']">
                      <strong class="body-2 font-weight-bold">({{(userdata.status_expired == 1) ? 'ACTIVE' : 'EXPIRED'}})</strong><br>
                      <strong class="body-2 mr-2 font-weight-bold">({{userdata.expire}})</strong>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="3">
                  <img width="22" src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/m-menu2/p.png" alt="">
                  <strong class="font-weight-bold" style="position:relative;top:-5px">{{ mypoint ? mypoint : '0'}}</strong>
                </v-col>
                <v-col cols="1">
                  <v-btn
                  text
                  to="/member/pengaturan/profil"
                  >
                    <v-icon>mdi-arrow-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="d-none">
            <v-col cols="12">
              <v-btn @click="$router.push('/member')" block color="orange accent-14" depressed dark>
                <v-icon class="mr-2">mdi-settings</v-icon> SETTINGS
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <div class="devider-big"></div>

        <!-- DRAWER CONTENT -->
        <v-container>
          <!--
            CATEGORY MENU
          -->
          <v-row>
            <v-col cols="6">
              <v-list>
                <v-subheader class="black--text text-16 font-weight-bold">CATEGORY</v-subheader>
                <v-list-item-group color="dark" v-model="category">
                  <v-list-item
                    v-for="(cat, i) in categories"
                    :key="i"
                    :to="cat.link"
                  >
                    <v-list-item-content class="menu">
                      <v-list-item-title v-html="cat.title"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col cols="6">
              <v-list>
                <v-subheader class="black--text text-16 font-weight-bold">PREMIUM</v-subheader>
                <v-list-item-group v-model="premium">
                  <v-list-item
                    v-for="(prem, i) in premiums"
                    :key="i"
                    @click="$router.push(prem.link)"
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
                    @click="$router.push(prog.link)"
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
          <!--
            CONTACT
          -->
          <v-row>
            <v-col cols="12" style="margin-bottom: -30px !important">
              <v-subheader class="black--text text-16 font-weight-bold">CONTACT</v-subheader>
            </v-col>
            <v-col cols="6">
              <v-list two-line>
                <v-list-item-group v-model="contact">
                  <v-list-item
                    v-for="(con, i) in contacts"
                    :key="i"
                  >
                    <v-list-item-content class="menu">
                      <v-list-item-title v-html="con.title"></v-list-item-title>
                      <v-list-item-subtitle v-html="con.subtitle" class="caption"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col cols="6">
              <v-list two-line>
                <v-list-item-group v-model="contacttwo">
                  <v-list-item
                    v-for="(con, i) in contactstwo"
                    :key="i"
                  >
                    <v-list-item-content class="menu">
                      <v-list-item-title v-html="con.title"></v-list-item-title>
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
          <!--
            SOCIAL MEDIA
          -->
          <v-row>
            <v-col cols="12">
              <v-container>
                <!-- <div class="addthis_inline_follow_toolbox">
                  <AddThis publicId="ra-56726fb53e3222fa" />
                </div> -->
              </v-container>
            </v-col>
          </v-row>
          <v-container>
            <div class="devider-small full"></div>
          </v-container>
          <!--
            ABOUT
          -->
          <v-row class="caption cta-links">
            <v-col cols="6">
              <v-list>
                <v-list-item>Tentang Playworld</v-list-item>
                <v-list-item>Dewan Pers</v-list-item>
                <v-list-item>Tim Redaksi</v-list-item>
                <v-list-item>Bantuan</v-list-item>
              </v-list>
            </v-col>
            <v-col cols="6">
              <v-list>
                <v-list-item>Kebiajakan & Privasi</v-list-item>
                <v-list-item>Keamanan Transaksi</v-list-item>
                <v-list-item>Metode Pembayaran</v-list-item>
                <v-list-item>Jasa Pengiriman</v-list-item>
              </v-list>
            </v-col>
          </v-row>
          <v-container>
            <div class="devider-small full"></div>
          </v-container>
          <v-container class="mb-5 pb-5">
            <strong class="caption">{{years}} &copy; PT Jayadata Indonesia</strong>
            <br>
            <br>
            <br>
            <br>
          </v-container>
		    </v-container>
        <!-- END DRAWER CONTENT -->
      </v-navigation-drawer>
      <!-- END DRAWER -->
    </v-sheet>

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
        <v-dialog
        v-model="searchDialog"
        persistent
        width="500"
        >
        <v-card>
          <v-toolbar dark color="orange accent-14">
            <!-- Arrow -->
            <v-btn icon tile style="border-right: 1px solid #fff" dark @click="closeSearch()">
              <v-icon>mdi-close</v-icon>
            </v-btn>

            <!-- Logo -->
            <v-toolbar-title>
              <v-img
              @click="$router.push('/')"
              src="/img/playworld-logo.png"
              lazy-src="/img/playworld-logo.png"
              max-width="100"
              max-height="100"
              >
              </v-img>
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
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
    >
      {{ responsemessage }}
      <v-btn
          color="primary"
          text
          icon
          @click="snackbar = false"
      >
      <v-icon color="white">mdi-close-circle-outline</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
if (process.browser) {
  // import AddThis from 'vue-simple-addthis-share'
  // require('vue-simple-addthis-share')
}
import UserService from '@/services/UserService'
import Login from '@/components/Login'
import NewsLoop from '@/components/common/NewsLoop'
import NewLogin from '@/components//NewLogin'
import ArticleService from '../services/ArticleService';
export default {
	name: 'App',
	components: {
		Login,
		NewsLoop,
    NewLogin
	},
	data () {
		return {
			drawer: null,
			searchDialog: null,
			isLoggedIn: false,
			dialog: false,
			searchModel: null,
			overlay: false,
			articles: [],
			totalArticles: 0,
			userdata:[],
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
					label: 'Home',
					path: '/',
					icon: 'mdi-home'
				},
				{
					id: 2,
					label: 'Starx',
					path: '/starx',
					icon: 'mdi-account-star'
				},
      ],
      toolbarMenu: [
        {name: 'Trending', loc: '/'},
        {name: 'Fakta', loc: '/fakta'},
        {name: 'Komik', loc: '/komik'},
        {name: 'Video', loc: '/video'},
        {name: 'Tukar Poin', loc: '/toko'},
        {name: 'Viral', loc: '/viral'},
        {name: 'Lagu', loc: '/lagu'},
        {name: 'Nonton', loc: '/nonton'},
        {name: 'Piknik', loc: '/piknik'},
        {name: 'Tekno', loc: '/tekno'},
        {name: 'Sport', loc: '/sport'},
      ],
      memberMenu: [
        {name: 'Data Diri', loc: '/member/pengaturan/profil'},
        {name: 'Histori Poin', loc: '/member/histori_penggunaan_poin'},
        {name: 'Rewards', loc: '/member/new_design/barang_yang_didapat'},
        {name: 'VIP', loc: '/member/beli_dengan_pulsa'},
      ],
      profileMenu: [
        {name: 'Profil Akun', loc: '/member/pengaturan/profil'},
        {name: 'Daftar Alamat', loc: '/member/pengaturan/daftar-alamat'},
        {name: 'Daftar Nomor', loc: '/member/pengaturan/daftar-nomor'},
        //{name: 'Notifikasi', loc: '/member/pengaturan/notifikasi'},
      ],
			category: 5,
			categories: [
				{
					title: 'TRENDING',
					link: '/'
				},
				{
					title: 'VIRAL',
					link: '/viral'
				},
				{
					title: 'LAGU',
					link: '/lagu'
				},
				{
					title: 'NONTON',
					link: '/nonton'
				},
				{
					title: 'PIKNIK',
					link: '/piknik'
				},
				{
					title: 'TEKNO',
					link: '/tekno'
				},
				{
					title: 'SPORT',
					link: '/sport'
				},
				{
					title: 'SIXTY',
					link: '/video'
				},
			],
			premium: 2,
			premiums: [
				{
					title: 'FAKTA',
					link: '/fakta'
				},
				{
					title: 'KOMIK',
					link: '/komik'
				}
			],
			program: 3,
			programs: [
				{
					title: 'TUKAR POIN',
					link: '/toko'
				},
				{
					title: 'TOP POIN',
					link: '/toppoin'
				},
				{
					title: 'KOMPETISI',
					link: '/kompetisi'
				}
			],
			contact: 2,
			contacts: [
				{
					title: '(021) 293 85 381',
					subtitle: '(Business Hour)'
				},
				{
					title: '0815 1906 0929',
					subtitle: '(24 Hour)'
				}
			],
			contacttwo: 2,
			contactstwo: [
				{
					title: '0817 1717 3029',
					subtitle: '(24 Hour)'
				},
				{
					title: 'halo@playworld.id',
					subtitle: '(Official Email Address)'
				}
      ],
		}
	},
	methods: {
		logout() {
			let vm = this;
			localStorage.removeItem('loggedin');
			localStorage.removeItem('access-token');
			this.isLoggedIn = false;
			this.isLogin();
			// if (window.location.pathname == '/member/login') {
			// 	window.location.href = '/'
			// } else {
			// 	window.location.href = window.location.pathname
      // }
      this.$router.push('/')
		},
		isLogin() {
			return this.isLoggedIn
		},
		isUserdata() {
			return localStorage.getItem('loggedin');
		},
		async fetchUser() {
			this.isLoggedIn = localStorage.getItem('loggedin');
			if( this.isLoggedIn == 'true') {
				try {
					const res = await UserService.getSingleUser()
					this.userdata = res.data.data;
          this.mypoint = res.data.point_total;

				} catch (err) {
					this.isLoggedIn = false;
					localStorage.removeItem('loggedin');
					window.location.reload
				}
			} else {
				localStorage.removeItem('loggedin');
				this.isLoggedIn = false;
				this.isLogin();
				window.location.reload
			}
    },
    /* Validasi Form */
    validate () {
        if (this.searchModel) {
          this.search();
        } else {
          this.snackbar = true;
          this.responsemessage = 'Mohon Isi Kolom Pencarian';
        }
    },
    search() {
      const keywords = this.slugify(this.searchModel)
      this.searchDialog = false
      this.searchModel = null
      this.$router.push('/search/' + keywords)
    },
    slugify(text){
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    },
    closeSearch() {
      this.searchDialog = false
      this.searchModel = null
    }
  },
	mounted() {
		this.isLogin()
		this.fetchUser()
		this.years = new Date().getFullYear()
	}
}
</script>

<style lang="scss">
  body {
    --primary: #fb9702;
    --VIRAL: #46c0ef;
    --SPORT: #68a457;
    --PIKNIK: #803bdc;
    --LAGU: #d54444;
    --NONTON: #000;
    --TEKNO: #8d8988
  }
  /* font-size by number */
  @for $i from 5 through 90 {
      .text-#{$i},
      *.text-#{$i} {
          font-size: #{$i}px!important;
      }
  }
  .v-application {
    &.open {
      overflow-y: hidden;
      height: 100vh;
    }
  }
  .theme--light.v-application{
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
		padding-top: 100px;
	}

  .scroller {
    display: flex;
    overflow-x: auto;
    .carousel-cell {
      width: 200px;
      margin: 0 10px;
    }
    &::-webkit-scrollbar {
      display: none
    }
  }

  .theme--light.v-navigation-drawer {
    z-index:100;
  }
  .pw-tab {
    position: fixed;
    top: 55px;
    z-index:10;
    border-bottom: 1px solid #e5e5e5;
  }

  .v-slide-group__prev {
    display:none!important;
  }

  .topview-item {
    h2 {
      font-size: 16px;
      font-weight: 500;
      line-height: 1.3
    }
    .playbutton {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      background: rgba(0,0,0,.5);
      border-radius: 90px;
    }
    .VIRAL{color:var(--VIRAL)}
    .SPORT{color:var(--SPORT)}
    .PIKNIK{color:var(--PIKNIK)}
    .LAGU{color:var(--LAGU)}
    .NONTON{color:var(--NONTON)}
    .TEKNO{color:var(--TEKNO)}
  }

  .menu {
	  color: #000;
  }
  // INDEX ARTICLE
  .v-slide-group.v-item-group > .v-slide-group__next, .v-slide-group.v-item-group > .v-slide-group__prev {
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
      text-align:center;
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
            line-height: 1.3
          }
        }
      }
    }
    .flickity-page-dots {
      bottom: 20px!important;
      .dot {
        background: #fff!important;
        opacity: .5!important;
        width: 7px!important;
        height: 7px!important;
        &.is-selected {
          background-color: var(--primary)!important;
          opacity:1!important;
        }
      }
    }
    .devider-big {
      height:8px;
      background: #d1d1d1
    }
    .devider-small {
      height: 1px;
      border-bottom: 1px solid #d1d1d1;

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

</style>

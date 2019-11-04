<template>
  <v-app>
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

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>

      <v-tabs grow color="deep-orange" class="pw-tab">
        <v-tab to="/">Trending</v-tab>
        <v-tab to="/sixty">Video</v-tab>
        <v-tab to="/toko">Tukar Poin</v-tab>
        <v-tab to="/viral">Viral</v-tab>
        <v-tab to="/lagu">Lagu</v-tab>
        <v-tab to="/nonton">Nonton</v-tab>
        <v-tab to="/piknik">Piknik</v-tab>
        <v-tab to="/tekno">Tekno</v-tab>
        <v-tab to="/sport">Sport</v-tab>
      </v-tabs>

      <!-- CONTENT -->
      <v-content class="maincontent">
        <nuxt />
      </v-content>
      <!-- CONTENT -->


      <!-- DRAWER -->
      <v-navigation-drawer
        v-model="drawer"
        fixed
		width="100%"
        app
      >
		<v-card tile>
			<v-app-bar
				absolute
				color="#9F7712"
				elevation="0"
				dark
			>
				<v-icon @click="drawer=false" class="mr-3">mdi mdi-close</v-icon>

				<v-toolbar-title @click="$router.push('/')">
					<v-img
					src="/img/playworld-logo.png"
					width="130"
					></v-img>
				</v-toolbar-title>

				<v-spacer></v-spacer>

				<v-btn icon @click="hidden = !hidden">
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</v-app-bar>
		</v-card>
		
		<!-- 
			SEARCH
		 -->
		<v-row>
			<v-col cols="12">
				<v-expand-transition>
					<v-card tile dark color="#9F7712" depressed elevation="0" v-if="!hidden" style="padding-top: 50px; margin-bottom: -50px">
						<v-card-text>
							<v-autocomplete
							label="Cari Artikel"
							:items="articles"
							autofocus
							></v-autocomplete>
						</v-card-text>
					</v-card>
				</v-expand-transition>
			</v-col>
		</v-row>

		<!-- 
			LOGIN / ACCOUNT
		 -->
		<v-container>
			<v-row>
				<v-col class="mt-6" v-if="!isLogin()" cols="10">
					<Login />
				</v-col>
				<v-col style="margin-bottom: -20px" class="mt-6" v-else cols="10">
					<v-row>
						<v-col cols="3">
							<v-avatar
								size="50"
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
									<v-btn @click="logout()" rounded color="error" small>SIGN OUT</v-btn>
								</v-col>
							</v-row>
							<v-divider></v-divider>
							<v-row>
								<v-col cols="9">
									<v-avatar color="orange" size="20">
										<span class="white--text caption font-italic">V</span>
									</v-avatar>
									<strong class="body-2 green--text mr-2 font-weight-bold">(ACTIVE)</strong>
									<v-avatar color="orange" size="20">
										<span class="white--text caption font-italic">P</span>
									</v-avatar>
									<strong class="body-2 green--text font-weight-bold">500</strong>
								</v-col>
								<v-col cols="3" class="text-right">
									<v-icon @click="$router.push('/member')">mdi mdi-arrow-right</v-icon>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
		<v-container style="margin-bottom: -20px">
			<v-divider color="grey"></v-divider>	
		</v-container>
		<v-container>
			<!-- 
				MENU
			-->
			<v-row>
				<v-col cols="6">
					<v-list>
						<v-subheader class="black--text">CATEGORY</v-subheader>
						<v-list-item-group v-model="category">
							<v-list-item
								v-for="(cat, i) in categories"
								:key="i"
								@click="$router.push(cat.link)"
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
						<v-subheader class="black--text">PREMIUM</v-subheader>
						<v-list-item-group v-model="premium">
							<v-list-item
								v-for="(prem, i) in premiums"
								:key="i"
								@click="$router.push(rem.link)"
							>
								<v-list-item-content class="menu">
									<v-list-item-title v-html="prem.title"></v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
					<v-container>
						<v-divider ></v-divider>
					</v-container>
					<v-list>
						<v-subheader class="black--text">PROGRAM</v-subheader>
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
			<v-divider></v-divider>
			<!-- 
				CONTACT
			 -->
			<v-row>
				<v-col cols="12" style="margin-bottom: -30px !important">
					<v-subheader class="black--text">CONTACT</v-subheader>					
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
									<v-list-item-subtitle v-html="con.subtitle"></v-list-item-subtitle>
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
									<v-list-item-subtitle v-html="con.subtitle"></v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<!-- 
				SOCIAL MEDIA
			 -->
			<v-row>
				<v-col cols="12">
					<v-container>
						<div class="addthis_inline_follow_toolbox">
							<AddThis publicId="ra-56726fb53e3222fa" />
						</div>
					</v-container>
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<!-- 
				ABOUT
			 -->
			<v-row>
				<v-col cols="6">
					<v-list>
						<v-subheader class="black--text">Tentang Playworld ID</v-subheader>
						<v-list-item-group>
							<v-list-item @click="$router.push('/bantuan')">
								<v-list-item-content class="menu">
									<v-list-item-title>Dewan Pers</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item @click="$router.push('/bantuan')">
								<v-list-item-content class="menu">
									<v-list-item-title>Tim Redaksi</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item>
								<v-list-item-content class="menu" @click="$router.push('/bantuan')">
									<v-list-item-title>Bantuan</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-col>
				<v-col cols="6">
					<v-list>
						<v-subheader class="black--text">Kebijakan & Privasi</v-subheader>
						<v-list-item-group>
							<v-list-item @click="$router.push('/bantuan')">
								<v-list-item-content class="menu">
									<v-list-item-title>Keamanan Transaksi</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item @click="$router.push('/bantuan')">
								<v-list-item-content class="menu">
									<v-list-item-title>Metode Pembayaran</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item @click="$router.push('/bantuan')">
								<v-list-item-content class="menu">
									<v-list-item-title>Jasa Pengiriman</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-col>
			</v-row>
		</v-container>
      </v-navigation-drawer>
      <!-- END DRAWER -->
    </v-sheet>
  </v-app>
</template>

<script>
import UserService from '@/services/UserService'
import Login from '@/components/Login'
export default {
	name: 'App',
	components: {
		Login
	},
		data () {
			return {
				drawer: null,
				isLoggedIn: false,
				hidden: true,
				articles: [
					'Testing Article 1',
					'Testing Article 2',
					'Testing Article 3',
					'Testing Article 4',
					'Testing Article 5',
				],
				userdata:[],
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
						link: '/sixty'
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
						link: '/kontenreceh'
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
				]
		  }
	  },
	methods: {
		logout() {
			let vm = this;
			localStorage.removeItem('loggedin');
			localStorage.removeItem('access-token');
			this.isLoggedIn = false;
			this.isLogin();
			vm.$router.push("/");
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
		}
	},
	mounted() {
		this.isLogin();
		this.fetchUser()
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
    z-index:10
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
	  color: #757575;
  }

</style>

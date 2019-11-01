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

        <!-- <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="menu in menus" :key="menu.id"
              @click="$router.push( menu.path )"
            >
              <v-list-item-title>{{ menu.label }}</v-list-item-title>
            </v-list-item>

          </v-list>
        </v-menu> -->
      </v-app-bar>

      <v-tabs grow color="deep-orange" class="pw-tab">
        <v-tab @click="$router.push('/')">Trending</v-tab>
        <v-tab @click="$router.push('/tukarpoin')">Tukar Poin</v-tab>
        <v-tab>Viral</v-tab>
        <v-tab>Lagu</v-tab>
        <v-tab>Nonton</v-tab>
        <v-tab>Piknik</v-tab>
        <v-tab>Tekno</v-tab>
        <v-tab>Sport</v-tab>
        <v-tab>Video</v-tab>
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
        temporary
        app
      >
        <v-list-item v-if="!isLogin()">
			<v-list-item-avatar>
				<v-img src="/img/user.jpeg"></v-img>
			</v-list-item-avatar>

			<v-list-item-content>
				<v-list-item-title>Please Login</v-list-item-title>
			</v-list-item-content>
        </v-list-item>

		<v-list-item v-if="isLogin()">
			<v-list-item-avatar>
				<v-img :src="userdata.avatar ? userdata.avatar : '/img/user.jpeg'"></v-img>
			</v-list-item-avatar>

			<v-list-item-content>
				<v-list-item-title>{{ userdata.first_name }}</v-list-item-title>
			</v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>

			<v-list-item
				v-for="menu in menus" :key="menu.id"
				@click="$router.push( menu.path )"
				link
			>
				<v-list-item-icon>
					<v-icon>{{ menu.icon }}</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
				<v-list-item-title>{{ menu.label }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<!-- oooooooooooooooooooooo
			AUTH MENU
			ooooooooooooooooooooooooooo -->
			<v-list-item
				@click="$router.push('/member/program/starx')"
				link
				v-if="isLogin()"
			>
				<v-list-item-icon>
					<v-icon>mdi-upload</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>Upload Video Band</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-list-item
				@click="$router.push( '/member/login' )"
				link
				v-if="!isLogin()"
			>
				<v-list-item-icon>
					<v-icon>mdi-login-variant</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>Login</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-list-item
				@click="logout"
				link
				v-if="isLogin()"
			>
				<v-list-item-icon>
					<v-icon>mdi-logout-variant</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>Logout</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

        </v-list>
      </v-navigation-drawer>
      <!-- END DRAWER -->
    </v-sheet>
  </v-app>
</template>

<script>
import UserService from '@/services/UserService'
export default {
	name: 'App',
	components: {
	},
		data () {
			return {
				drawer: null,
				isLoggedIn: false,
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
			vm.$router.push("/member/login");
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

</style>

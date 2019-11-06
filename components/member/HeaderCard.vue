<template>
    <div>
        <v-card
            class="mx-auto"
            max-width="434"
            tile
        >
            <v-img
                height="100%"
                src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
            >
                <v-row
                    align="end"
                    class="fill-height"
                >
                    <v-col
                        align-self="start"
                        class="pa-0"
                        cols="12"
                    >
                        <v-avatar
                            class="profile"
                            color="grey"
                            size="164"
                            tile
                        >
                            <v-img :src="userdata.avatar ? userdata.avatar : '/img/user.jpeg'"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col class="py-0">
                        <v-list-item
                            color="rgba(0, 0, 0, .4)"
                            dark
                        >
                            <v-list-item-content>
                            <v-list-item-title class="title">{{userdata.first_name}}</v-list-item-title>
                            <v-list-item-subtitle>{{userdata.msisdn}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                </v-row>
            </v-img>
        </v-card>
        <v-bottom-navigation
          fixed
          dark
          grow
          color="white"
          background-color="black"
        >
            <v-tabs
                fixed-tabs
                background-color="black"
                dark
            >
                <v-tab to="/member">Profile</v-tab>
                <v-tab to="/member/pwcode">Kode PW</v-tab>
                <v-tab to="/member/history">Mutasi Poin</v-tab>
                <v-tab to="/member/content">Daftar Konten</v-tab>
                <v-tab to="/member/transactions">Daftar Transaksi</v-tab>
            </v-tabs>
        </v-bottom-navigation>
    </div>
</template>

<script>
import UserService from '../../services/UserService';
export default {
    name: "HeaderCard",
    data: () => ({
        userdata: [],
        mypoint: null,
        isLoggedIn: false
    }),
    methods: {
        async fetchUser() {
            this.isLoggedIn = localStorage.getItem('loggedin');
			if( this.isLoggedIn == 'true' || this.isLoggedIn) {
				try {
                    const res = await UserService.getSingleUser()
                    console.log(JSON.parse(JSON.stringify(res.data.data)))
					this.userdata = res.data.data;
					this.mypoint = res.data.point_total;
				} catch (err) {
					this.isLoggedIn = false;
					localStorage.removeItem('loggedin');
					window.location.reload
				}
			} else {
				this.$router.push('/')
			}
        },
        isLogin() {
			return this.isLoggedIn
		},
    },
    mounted() {
        this.fetchUser()
    }
}
</script>
<template>
    <div class="grey lighten-5 container">
        <h3 class="my-3" id="loginhead">LOGIN / SIGNUP</h3>
        <v-row no-gutters>
            <v-col cols="12">
                <facebook-login
                    class="button"
                    appId="107188393464738"
                    @login="onLogin"
                    @logout="onLogout"
                    @sdk-loaded="sdkLoaded">
                ></facebook-login>
            </v-col>
            <v-col cols="12">
                <GoogleLogin
                    @click="loadingGoogle()"
                    :params="params"
                    :onSuccess="onSuccess"
                    :onFailure="onFailure"
                >
                    <v-btn style="margin-left: 12px; background-color: red !important; color: white !important" >
                        <v-icon class="mr-2">mdi-google</v-icon> Sign In With Google
                    </v-btn>
                </GoogleLogin>
            </v-col>
        </v-row>

        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "NewLogin",
    data: () => ({
        provider: null,
        personalID: null,
        email: null,
        name: null,
        loading: false,
        params: {
            client_id: "590886654309-f0ljqk5trshnliro3k2b143r8crskagp.apps.googleusercontent.com"
        },
    }),
    methods: {
        async loginProcess() {
            try {
                const response = await axios.post('https://s1.playworld.id/api/auth/signin', {
                    email : this.email,
                    provider : this.provider,
                    provider_id : this.personalID
                })
                //console.log(response.data);
                var data = response.data.data;
                console.log(data);

                // if( data.username ) {
                var token = response.data.access_token;
                // var userdata = JSON.stringify(response.data.data);
                //console.log(userdata);
                localStorage.setItem('access-token', token);
                localStorage.setItem('loggedin', true);
                this.loading = false
                if (window.location.pathname == '/member/login') {
                    window.location.href = '/'
                } else {
                    window.location.href = window.location.pathname
                }
                // } else {
                //     vm.notloading();
                // }
            } catch (error) {
                console.log(error)
                this.loading = false
                localStorage.setItem('loggedin', false);
            }
        },
		sdkLoaded(payload) {
            this.FB = payload.FB
            this.FB.logout(function(response) {
                console.log('logout')
                this.isConnected = false
                if (window.location.pathname == '/member/login') {
                    window.location.href = '/'
                } else {
                    window.location.href = window.location.pathname
                }
            });
		},
		onLogin() {
            this.loading = true
            this.FB.api('/me', 'GET', { fields: 'id,name,email' },
                userInformation => {
                    console.warn("data api",userInformation)
                    this.personalID = userInformation.id;
                    this.email = userInformation.email;
                    this.name = userInformation.name;
                    this.provider = 'facebook';
                    this.loginProcess()
                }
            )
		},
		onLogout() {
			this.isConnected = false;
        },
        
        /* Google */
        onSuccess(googleUser) {
            this.loading = false
            console.log(googleUser);
    
            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());
        },
        onFailure() {
            this.loading = false
            console.log('error')
        },
        loadingGoogle() {
            this.loading = true
        }
    }
}
</script>
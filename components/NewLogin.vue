<template>
    <div class="grey lighten-5 container">
        <h3 class="my-3" id="loginhead">LOGIN / SIGNUP</h3>
        <facebook-login
            class="button"
            appId="107188393464738"
            @login="onLogin"
            @logout="onLogout"
            @sdk-loaded="sdkLoaded">
        ></facebook-login>
        <GoogleLogin
            @click="loadingGoogle()"
            :params="params"
            :onSuccess="onSuccess"
            :onFailure="onFailure"
        >Login</GoogleLogin>

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
            client_id: "324736293217-t2renso347n54180el43385p3bkj2c5b.apps.googleusercontent.com"
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
            payload.isConnected = false
            this.isConnected = false
            this.FB = payload.FB
		},
		onLogin() {
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
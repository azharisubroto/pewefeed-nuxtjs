<template>
    <!-- @click="Auth(provider);" -->
    <v-btn 
        @click="Auth(provider);"
        block 
        large 
        depressed 
        dark
        style="justify-content: left"
        tile
        :color="btnclass" 
        :class="class2 + ' my-3'"
    >
        <v-icon left dark>mdi-{{ provider }}</v-icon>
        <span :class="class1"></span> Sign in with {{ provider }}
    </v-btn>
</template>

<script>
import axios from 'axios'
export default {
    props: ["provider", "btnclass"],
    data() {
        return {
            class1: this.provider,
            class2: this.provider,
            isloading: false,
        };
    },
    mounted() {
        const isloggedin = localStorage.getItem('isloggedin')
        if( isloggedin == true ) {
            this.$router.push('/')
        } else {
            this.init();
        }
    },
    methods: {
        init(){
            OAuth.initialize("Gy8rkJh5U3KS0ps1txSLyo-mMHU");
        },
        makeloading() {
            this.$emit("makeloading", this.isloading);
        },
        notloading() {
            this.$emit("notloading", false);
        },
        Auth( provider ) {
            var vm = this;
            vm.makeloading();
            OAuth.popup(this.provider)
            .done(res => {
                res.me().done(function(data) {
                    // console.log(data);
                    vm.PWLogin( data, provider );
                });
            });

            setTimeout(() => {
                vm.notloading();
            }, 60000);
        },
        async PWLogin( data, provider ) {
            let vm = this;

            try {
                var photo = null,
                    email = null,
                    firstname = null,
                    lastname = null,
                    id = null;

                if (provider == 'facebook') {
                    photo = data.avatar
                    email = data.email
                    firstname = data.firstname
                    lastname = data.lastname
                    id = data.id
                } else {
                    photo = data.avatar
                    email = data.email
                    firstname = data.raw.names[0].givenName
                    lastname = data.raw.names[0].familyName
                    id = data.raw.resourceName.replace('people/', '')
                }

                var datasend = {
                    avatar : photo,
                    email : email,
                    firstname : firstname,
                    lastname : lastname,
                    id : id
                }

                const response = await axios.post('https://s1.playworld.id/api/auth/signin', datasend)
                //console.log(response.data);
                var data = response.data.data;
                // console.log(data);

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
                localStorage.setItem('loggedin', false);
            }
        }
    },

};
</script>
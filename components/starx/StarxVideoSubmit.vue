<template>
    <v-container class="grey lighten-5">
        <v-row>
            <v-col
                cols="12"
                md="12"
            >
                <h4>SUBMIT VIDEO</h4>
                <p class="caption">BACA SYARAT &amp; KETENTUAN. SETIAP BAND BISA MENGIRIM MAKSIMAL 3 VIDEO.</p>
                
                <v-form 
                ref="form"
                v-model="valid"
                lazy-validation
                >
                    <v-text-field
                        label="Judul Lagu"
                        color="deep-orange"
                        prepend-inner-icon="mdi-music-note-eighth"
                        counter
                        maxlength="100"
                        v-model="formdata.description"
                        required
                        :rules="judulRules"
                    ></v-text-field>

                    <v-text-field
                        label="Youtube URL"
                        color="deep-orange"
                        prepend-inner-icon="mdi-youtube"
                        v-model="formdata.url"
                        required
                        :rules="urlRules"
                    ></v-text-field>
                    
                    <v-btn
                        :disabled="!valid"
                        color="green accent-6"
                        x-large
                        block
                        depressed
                        tile
                        @click="validate()"
                    >
                        <span class="text--white" style="color:#fff">KIRIM VIDEO</span>
                    </v-btn>
                </v-form>
                
                <v-snackbar
                    v-model="snackbar"
                    :timeout="timeout"
                    top
                >
                    {{ responsemessage }}
                    <v-btn
                        color="blue"
                        text
                        icon
                        @click="snackbar = false"
                    >
                    <v-icon color="white">mdi-close-circle-outline</v-icon>
                    </v-btn>
                </v-snackbar>
            </v-col>
        </v-row>

        <v-row>
            <v-col
                cols="12"
                md="3"
            >
                <hr class="my-6 grey lighten-5">
                <h4>LIST VIDEO KAMU</h4>
                <p class="caption">Ini adalah daftar video yang telah kamu kirim</p>

                <v-card
                    v-for="latest in orderedParticipants" :key="latest.id"
                    class="mx-auto my-5"
                    outlined
                >
                    <a target="blank" :href="'https://www.youtube.com/watch?v='+youtubelink(latest.video)">
                        <v-img :src="vidimg(latest.video)" ></v-img>
                    </a>
                    <v-card-title @click="$router.push( '/starx/band/video/'+latest.slug )" class="align-end fill-height">
                        {{ latest.description }}
                    </v-card-title>


                    <v-card-text>
                        <span>{{ latest.updated_at }}</span>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            depressed
                            dark
                            color="green accent-5"
                            @click="$router.push( '/starx/band/video/'+latest.slug )"
                        >
                            Lihat Detail
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import StarxIzinService from '@/services/StarxIzinService';
import UserService from '@/services/UserService';
import _ from 'lodash';

export default {
    name: "StarxVideoSubmit",
    components:{},
    data(){
        return{
            valid: false,
            judulRules: [
                v => !!v || 'Name is required'
            ],
            urlRules: [
                v => !!v || 'Video URL is required'
            ],
            formdata : {
                description : "",
                url : "",
                program_id : 13,
                customer_id : null
            },
            snackbar: false,
            timeout: 5000,
            responsemessage: '',
            participant: [],
            isLoggedIn: false
        }
    },
    computed: {
        orderedParticipants: function () {
            return _.orderBy(this.participant, 'updated_at', 'desc')
        }
    },
    methods: {
        vidimg(iframe) {
            if( iframe.includes('iframe') ) {
                var url = iframe,
                    /* eslint-disable */
                    regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
                    videoId = url.match(regExp);

                if (videoId && videoId[1].length === 11) {
                    //console.log(videoId[1]);
                    //return videoId[1];
                    return 'https://img.youtube.com/vi/'+ videoId[1] +'/mqdefault.jpg';
                }
            } else {
                return 'https://img.youtube.com/vi/'+ iframe +'/mqdefault.jpg';
            }
            
        },
        youtubelink(iframe) {
            if( iframe.includes('iframe') ) {
                var url = iframe,
                    /* eslint-disable */
                    regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
                    videoId = url.match(regExp);

                if (videoId && videoId[1].length === 11) {
                    return videoId[1];
                }
            } else {
                return iframe;
            }
        },
        validate () {
            if (this.$refs.form.validate()) {
                this.submit();
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
        async submit() {
            let vm = this

            // send the form
            const sendform = vm.formdata
            try {
                const res = await StarxIzinService.submitVideo(sendform)
                console.log(res.data.message)
                vm.responsemessage = res.data.message
                if( res.data.message == 'Video Already Exist' ) {
                    vm.snackbar = true
                } else if( res.data.message == 'Video Uploaded' ) {
                    vm.snackbar = true
                    vm.resetValidation
                    vm.reset
                    vm.fetchProgram();
                }
            } catch (error) {
                console.log(error)
            }
        },
        async fetchProgram() {
            let vm = this
            try {
                const response = await StarxIzinService.checkIzin()
                // console.log(response.data.data);
                var data = response.data.data;
                vm.participant = data.participant;
                localStorage.setItem('participant', JSON.stringify(data.participant));
            } catch (error) {
                console.log(error)
            }
        },
        async fetchUser() {
            this.isLoggedIn = localStorage.getIt
			if( this.isLoggedIn == 'true') {
                try {
                    const res = await UserService.getSingleUser()
                    vm.formdata.customer_id = res.data.data.id
                } catch (error) {
                    console.log(error)
                }
            }
            var participant = JSON.parse(localStorage.getItem('participant'));
            console.log(participant);
            vm.participant = participant;
        }
    },
    mounted() {
        this.fetchUser()
    }
}
</script>
<template>
    <v-container>
        <v-row>
            <v-col
                cols="12"
                md="12"
            >
                <h4 class="pwhead"><span>VIDEO UPLOAD</span></h4>

                <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                >
                    <v-text-field
						outlined
                        label="Judul Lagu"
                        color="deep-orange"
                        counter
                        maxlength="100"
                        v-model="formdata.description"
                        required
                        :rules="judulRules"
                    ></v-text-field>

                    <v-text-field
						outlined
                        label="Youtube URL"
                        color="deep-orange"
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
                <h4 class="pwhead"><span>STAGE: AUDITION</span></h4>

				<!-- <VideoLoop
				@makeloading="setloading" @notloading="notloading"
				v-for="latest in orderedParticipants"
				:latest="latest"
				:key="latest.id"
				activeBtn="1"
				/> -->

                <v-card
                    v-for="latest in orderedParticipants" :key="latest.id"
                    class="mx-auto my-5 py-0"
                    outlined
                >
					<v-row>
						<v-col cols="4" class="py-0">
							<a target="blank" :href="'https://www.youtube.com/watch?v='+youtubelink(latest.video)">
								<v-img :src="vidimg(latest.video)" :aspect-ratio="1" @click="$router.push( '/starx/band/video/'+latest.slug )">
									<v-row class="fill-height ma-0" align="center" justify="center">
										<v-icon
										dark
										size="35"
										class="playbutton">
											mdi-play-circle-outline
										</v-icon>
									</v-row>
								</v-img>
							</a>
						</v-col>
						<v-col cols="8" class="py-3">
							<div @click="$router.push( '/starx/band/video/'+latest.slug )">
								<span class="caption">{{ latest.updated_at }}</span>
								<div></div>
								<strong>{{ latest.description }}</strong>
							</div>
							<v-btn
								depressed
								dark
								small
								color="green accent-5"
								@click="$router.push( '/starx/band/video/'+latest.slug )"
							>
								Lihat Detail
							</v-btn>
						</v-col>
					</v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import StarxIzinService from '@/services/StarxIzinService';
import VideoLoop from '@/components/starx/VideoLoop'
import UserService from '@/services/UserService';
import _ from 'lodash';

export default {
    name: "StarxVideoSubmit",
    components:{
		VideoLoop
	},
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
            isLoggedIn: false,
        }
    },
    computed: {
        orderedParticipants: function () {
            return _.orderBy(this.participant, 'updated_at', 'desc')
        }
    },
    methods: {
		/* Loader */
        setloading () {
            this.overlay = true
        },
        notloading() {
            this.overlay = false
        },
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
			console.log('fetchProgram')
            let vm = this
            try {
                const response = await StarxIzinService.checkIzin()
				//console.log(JSON.parse(JSON.stringify(response)))
				vm.participant = response.data.data.participant
                // participantarr.forEach(el => {
                //     var obj = {
				// 		id: el.id,
                //         video: el.video,
                //         slug: el.slug,
                //         created_at: el.created_at,
                //         band: el.band ? el.band : 'No data',
				// 		school: el.band ? el.band : 'No data',
				// 		star: el.total_like ? el.total_like : 0
				// 	}
				// 	vm.participant.push(obj)
				// });

            } catch (error) {
                console.log(error)
            }
        },
        async fetchUser() {
			let vm = this
			try {
				const res = await UserService.getSingleUser()
				vm.formdata.customer_id = res.data.data.id
				//console.log(vm.formdata.customer_id)
			} catch (error) {
				console.log(error)
			}
            //var participant = JSON.parse(localStorage.getItem('participant'));
            //console.log(participant);
            //vm.participant = participant;
        }
    },
    mounted() {
		this.fetchUser();
		this.fetchProgram();
    }
}
</script>

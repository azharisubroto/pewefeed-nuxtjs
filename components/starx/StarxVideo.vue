
<template>
    <v-container class="StarxVideo grey lighten-5" ma-0 pa-0>
        <!-- =====================================================================================
        TAB MENU
        ===================================================================================== -->
        <v-tabs
            v-model="tab"
            background-color="grey lighten-2"
            center-active
            light
            grow
			color="dark"
            class="fixed-tabs-bar"
            >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1">
                TIMELINE
            </v-tab>

            <v-tab href="#tab-2">
                UPLOAD
            </v-tab>

            <v-tab href="#tab-3">
                REWARDS
            </v-tab>

            <v-tab href="#tab-4">
                SYARAT
            </v-tab>
        </v-tabs>
        <!-- =====================================================================================
        TAB ITEMS
        ===================================================================================== -->
        <v-tabs-items v-model="tab" class="grey lighten-5 adjusted-tab-items pb-5">
            <v-container>
                <!-- oooooooooooooooooooooooooooooooooooooo
                VIDEO
                oooooooooooooooooooooooooooooooooooooo -->
                <v-tab-item
                    value="tab-1"
                >
					<v-alert
					border="left"
					dense
					colored-border
					type="info"
					elevation="2"
					>
					STAR hanya bisa dikirimkan 1 kali per hari pada masing-masing konten yang diupload oleh peserta
					</v-alert>

					<ShareButton
						v-if="latest"
						class="myshare"
						:sharingUrl="dataUrl"
						:sharingTitle="latest.description"
						:sharingDescription="latest.description+' by '+ (latest.band ? latest.band.name : '')"
						:sharingTime="latest.created_at"
						:sharingImage="vidimg(latest.video)"
					/>
					<br>

					<v-card>
						<v-card-text class="caption">
							<v-icon small size="12" class="mr-1">
								mdi-calendar-blank
							</v-icon>
							{{latest.created_at}}

							<v-icon small size="12" class="mr-1 ml-2">
								mdi-eye-outline
							</v-icon>
							{{randomNUm()}}

							<v-icon small size="12" class="mr-1 ml-2">
								mdi-message-text-outline
							</v-icon>
							{{comments.length}}

							<h2 class="mt-3">{{ latest.description }}</h2>
							<div class="devider-small my-2"></div>
							<v-row class="sm">
								<v-col cols="1">
									<img src="/img/musicicon.png" alt="">
								</v-col>
								<v-col cols="11">
									<strong>{{ latest.band ? latest.band.name : '' }}</strong>
									<div>{{ latest.school }}</div>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>

                    <template v-if="video_latest">
						<!-- <pre>{{latest}}</pre> -->

						<v-card v-if="latest">
							<div v-html="latest.video"></div>

							<v-row class="sm px-3" align="center">
								<v-col cols="2" class="caption">
									<span :id="'starcount-' + latest.id">{{latest.star}}</span>/<span style="color: blue">100</span>
								</v-col>
								<v-col cols="5">
									<v-progress-linear
									:value="latest.star"
									color="light-blue"
									height="30"
									reactive
									rounded
									></v-progress-linear>
								</v-col>
								<v-col cols="5">
									<v-btn
                                        @click="checkVIP(latest.id, latest.band.id)"
										class="px-4"
										dark
										depressed
										color="orange accent-4"
									>
										<v-icon left dark>mdi-star</v-icon>
										Kirim Star<br>
										(+5 Poin)
									</v-btn>
								</v-col>
							</v-row>

                            <!-- =====================================================================================
                            ALERT
                            ===================================================================================== -->
                            <v-snackbar
                                v-model="snackbar"
                                :timeout="timeout"
                                top
                            >
                                <img width="30" class="mr-2" :src="snacksrc" alt="">
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

                            <!-- =====================================================================================
                            MODAL
                            ===================================================================================== -->
                            <BuyVip :dialogVisible="buyVipDialogVisible" @close="myDialogClose"/>
                            <PleaseLogin :dialogVisible="pleaseLoginDialogVisible" @close="myDialogClose"/>
                            <NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose"/>
						</v-card>

                        <div v-if="latest == null" class="grey lighten-5 p-7 text-center p-8">
                            No Video available :(
                        </div>

                        <!-- <VideoLoop
                        v-else
                        :latest="latest"
                        :activeBtn="1"
                        :hiddendetail="true"
                        /> -->
                    </template>
                    <template v-if="komentar">
                        <v-tabs color="deep-orange" v-model="tabCom" class="mt-4">
							<v-tab href="#kasihkomen">Berikan Komentar</v-tab>
							<v-tab href="#ketentuankom">Ketentuan</v-tab>
						</v-tabs>

						<v-tabs-items v-model="tabCom">
							<v-tab-item
								value="kasihkomen"
								>
								<h4 class="mb-4 mt-5">{{comments.length}} Comments</h4>

								<!-- TEXT AREA -->
								<v-textarea
									outlined
									color="deep-orange"
									label="Komentar"
									value=""
									counter
									rows="3"
									auto-grow
									v-model="comment_message"
								></v-textarea>

								<v-btn block dark depressed color="deep-orange" @click="postComment()">
									<template v-if="!commentIsPosting">Kirim Komentar</template>
									<template v-else>Mengirim Komentar...</template>
								</v-btn>

								<!-- KOMEN LIST -->
								<CommentList :items="reverseComment"/>

								<div class="mb-5"></div>
							</v-tab-item>

							<v-tab-item
							value="ketentuankom"
							>
								<h4 class="mt-5 mb-3">KETENTUAN KOMENTAR </h4>
								<ol class="mb-5 pb-5">
									<li>Pastikan sudah login</li>
									<li>Tulis komentar dengan minimal terdiri dari 50 kata</li>
									<li>Poin hanya diberikan 1 kali untuk 1 User per 1 Artikel</li>
									<li>Seluruh komentar dimoderasi oleh tim Playworld ID dan bisa dihapus dan akan mengurangi total POIN jika komentar mengandung konten SARA, atau tidak sesuai dengan artikel yang dibaca</li>
									<li>Hanya user dengan keanggotaan VIP yang bisa memberikan komentar.</li>
								</ol>
							</v-tab-item>
						</v-tabs-items>
                    </template>
                    <br> <br>
                    <!-- =====================================================================================
                    BOTTOM NAVIGATION
                    ===================================================================================== -->
                    <v-bottom-navigation
                    :value="activeBtn"
                    fixed
					dark
					grow
					color="white"
					background-color="black"
                    >
                        <v-btn text color="deep-orange accent-4" @click="$router.go(-1)">
                            <span>Kembali</span>
                        </v-btn>

                        <v-btn text color="deep-orange accent-4" @click="video_latest=true;komentar=false;video_winners=false">
                            <span>Details</span>
                        </v-btn>

                        <v-btn text color="deep-orange accent-4" @click="komentar=true;video_latest=false;video_winners=false">
                            <span>Komentar</span>
                        </v-btn>
                    </v-bottom-navigation>
                </v-tab-item>

                <!-- oooooooooooooooooooooooooooooooooooooo
                UPLOAD
                oooooooooooooooooooooooooooooooooooooo -->
                <v-tab-item
                    value="tab-2"
                >
                    <StarxDesc/>
                </v-tab-item>

                <!-- oooooooooooooooooooooooooooooooooooooo
                WINNER
                oooooooooooooooooooooooooooooooooooooo -->
                <v-tab-item
                    value="tab-3"
                >
                    <v-carousel
                        height="300"
                        :aspect-ratio="16/9"
                        hide-delimiters
                    >
                        <v-carousel-item
                        v-for="(prize, i) in prizes"
                        :key="prize.id"
                        >
                            <v-img :aspect-ratio="16/9" :src="prize.redeem.image"></v-img>
                            <v-card-actions>
                                <v-list-item class="grow">
                                    <v-list-item-avatar>
                                        <v-img
                                            class="elevation-6"
                                            :src='aws + "BADGE-PW-WINNER-0"+ [i+1] +".png"'
                                        ></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <div style="color:#000!important;font-size:14px">
                                                <div class="mb-2">
                                                    <div style="font-size:16px">
                                                        <strong>{{ prize.redeem.title }}</strong>
                                                    </div>
                                                </div>
                                                <v-icon color="orange accent-3" small class="mr-2"> mdi-star</v-icon>{{ prize.minimun_star }} | Juara ke - {{ i }}
                                            </div>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card-actions>
                        </v-carousel-item>
                    </v-carousel>
                </v-tab-item>

                <!-- oooooooooooooooooooooooooooooooooooooo
                SYARAT
                oooooooooooooooooooooooooooooooooooooo -->
                <v-tab-item
                    value="tab-4"
                >
                    <v-card flat>
                    <v-card-text>
                        <div v-html="program"></div>
                    </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-container>
        </v-tabs-items>

		<KomentarPoin :dialogVisible="KomentarPoinVisible" @close="myDialogClose"/>
		<NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose"/>
    </v-container>
</template>

<script>
import StarxService from '@/services/StarxService'
import VideoLoop from '@/components/starx/VideoLoop'
import StarxDesc from '@/components/starx/StarxDesc'
import ShareButton from '@/components/common/ShareButton'
import KomentarPoin from '@/components/modal/KomentarPoin'
import CommentList from '@/components/common/CommentList'
import NotVip from '@/components/modal/NotVip'
import BuyVip from '@/components/modal/BuyVip'
import PleaseLogin from '@/components/modal/PleaseLogin'
import LoginModal from '@/components/modal/LoginModal'
import UserService from '@/services/UserService'

export default {
    name: "StarxBandVideo",
    data(){
        return{
			id: '',
			tabCom: null,
            prizes: [],
            activeBtn: 1,
            wholeResponse: [],
            program: '',
            band: [],
            tab: null,
            aws: 'https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/redeemicon/',
			video_latest: true,
			komentar: false,
            latest: [],
            finalist: [],
			winner: [],
			dataUrl: "https://m.playworld.id/starx/band/video/" + this.$route.params.detail,
			commentIsPosting: false,
			comments: [],
			comment_message: null,
			user_id:null,
			pleaseLoginDialogVisible: false,
			loginModalVisible: false,
			notVipDialogVisible: false,
            KomentarPoinVisible: false,
            buyVipDialogVisible: false,
            is_star: 'grey',
            userdata: [],
            snackbar: false,
            snacksrc : 'https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/redeemicon/poinekstra222.png',
            timeout: 3000,
            responsemessage: '',
            isLoggedIn: false
        }
    },
    components: {
        VideoLoop,
		StarxDesc,
		ShareButton,
		CommentList,
		NotVip,
		KomentarPoin,
        LoginModal,
        BuyVip,
        PleaseLogin,
	},
	computed: {
		reverseComment: function(){
		var commentArr = this.comments
		var finalArr = commentArr.reverse()
			return finalArr
		}
	},
    methods: {
        propername(name) {
            var propername = name.replace("-", " ")
            return propername;
        },
        removeat(name) {
            var propername = name.replace("@", "")
            return propername;
        },
        async StarxVideo () {
            try {
                const response = await StarxService.VideoDetail( this.$route.params.detail )
                this.wholeResponse = response.data.data;
				this.latest = this.wholeResponse.latests;
				this.id = this.latest.id;
                this.finalist = this.wholeResponse.finalist;
                console.log(this.finalist)
                this.winner = this.wholeResponse.winners;
                this.program = this.wholeResponse.program.term;
                this.band = this.latest.band;
                this.prizes = this.wholeResponse.prizes;
            } catch (error) {
                console.log(error)
            }
		},
		randomNUm() {
			return Math.floor(Math.random() * 200) + 5;
		},
		vidimg(iframe) {
            if( typeof iframe == 'undefined' ) {
                return 'https://img.youtube.com/vi/'+ iframe +'/mqdefault.jpg';
            } else {
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
            }
		},
		async fetchUserdata() {
			try {
				const res = await UserService.getSingleUser()
				this.user_id = res.data.data.id
				this.profile = res.data.data
				console.log(JSON.parse(JSON.stringify(res.data.data)))
			} catch (error) {
				console.log(error)
			}
		},
		async fetchComment() {
			try {
				let res = await await StarxService.fetchComment( this.$route.params.detail )
				this.comments = res.data.data
			} catch (error) {
				console.log(error)
			}
		},
		async postComment() {
			this.commentIsPosting = true;
			const params = {
				id: this.id,
				msg: this.comment_message,
				type: 'program'
			}

			try {
				const res = await UserService.postComment(params)
				console.log(res.data.poin)
				this.fetchComment()
				this.commentIsPosting = false;
				this.comment_message = null;
				if( res.data.poin > 0 ) {
					this.KomentarPoinVisible = true
				}
			} catch (error) {
				//console.log(error.response.status)
				this.commentIsPosting = false;
				if( error.response && error.response.status == 422 ) {
					alert('Mohon tulis komentar minimal 50 karakter')
				} else if( error.response && error.response.status == 500 ) {
					alert('an error occured')
				} else if( error.response && error.response.status == 401 ) {
					//alert('Mohon Maaf :(, Anda harus login')
					this.openModalLogin();
				} else {
					alert('error! ' + error.message)
				}
			}
		},
		openModalLogin() {
			this.loginModalVisible = true
		},
		myDialogClose () {
			this.dialog = false
			this.loginModalVisible = false
			this.buyVipDialogVisible = false
			this.pleaseLoginDialogVisible = false
			this.notVipDialogVisible = false
            this.KomentarPoinVisible = false
			// other code
        },
        async makeStar(id, bandid) {
            this.isLoggedIn = localStorage.getItem('loggedin');
			if( this.isLoggedIn == 'true') {
                const sendstar = {
                    participant_id : id,
                    band_id : bandid,
                    phase : this.activeBtn
                };

                try {
                    const res = await StarxService.makeStar(sendstar)
                    if (res.data.status == 200) {
                        this.snackbar = true;
                        
                        this.responsemessage = 'Selamat! anda mendapat extra poin 20 poin';
                        var current = document.getElementById('starcount-'+id).textContent;
                        var total = parseInt(current) + 1;
                        document.getElementById('starcount-'+id).innerHTML = total;
                    } else {
                        this.snackbar = true;
                        this.snacksrc = '';
                        this.responsemessage = 'Anda sudah memberi star video ini';
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        },
        async checkVIP(id, bandid) {
            this.isLoggedIn = localStorage.getItem('loggedin');
			if( this.isLoggedIn == 'true') {
                try {
                    const res = await UserService.getSingleUser()
                    // console.log(res.data.status);
                    if (new Date(res.data.data.expire) > new Date() ) {
                        this.makeStar(id, bandid);
                    } else {
                        // if not vip, show dialog
                        this.notVipDialogVisible = true
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                this.pleaseLoginDialogVisible = true
            }
        }
    },
    mounted () {
		this.StarxVideo();
		this.fetchUserdata();
		this.fetchComment();
    }
}
</script>

<style lang="scss" scoped>
	.StarxVideo .v-btn.v-size--default {
		font-size:12px!important;


	}
</style>

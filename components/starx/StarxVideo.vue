
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
							{{randomNUm()}}

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
									{{latest.star}}/<span style="color: blue">100</span>
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
                    <template v-if="video_finalist">
                        <v-row>
                            <v-col class="text-center" v-if="finalist == null" cols='12' md='12'>
                                No Video available :(
                            </v-col>
                            <v-col v-else cols='12' md='12'>
                                <v-row>
                                    <v-col cols="12" md="4">
                                        <h2 class="">Pilihan Juri</h2>
                                        <div>
                                            <VideoLoop
                                            v-if="finalist.finalist_detail.category_choice == 'pilihan-juri'"
                                            :latest="latest"
                                            :activeBtn="2"
                                            :hiddendetail="true"
                                            />
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row class="mt-4">
                                    <v-col cols="12" md="4">
                                        <h2 class="">Calon Top Star</h2>
                                        <div>
                                            <VideoLoop
                                            v-if="finalist.finalist_detail.category_choice == 'top-star'"
                                            :latest="latest"
                                            activeBtn="2"
                                            :hiddendetail="true"
                                            />
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
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
								<h4 class="mb-4 mt-5">0 Comments</h4>

								<!-- TEXT AREA -->
								<v-textarea
									outlined
									color="deep-orange"
									label="Komentar"
									value=""
									counter
									rows="3"
									auto-grow
								></v-textarea>

								<v-btn block dark depressed color="deep-orange">
									Kirim Komentar
								</v-btn>

								<!-- KOMEN LIST -->
								<!-- <CommentList :items="reverseComment"/> -->
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

    </v-container>
</template>

<script>
import StarxService from '@/services/StarxService'
import VideoLoop from '@/components/starx/VideoLoop'
import StarxDesc from '@/components/starx/StarxDesc'
import ShareButton from '@/components/common/ShareButton'
export default {
    name: "StarxBandVideo",
    data(){
        return{
			tabCom: null,
            prizes: [],
            activeBtn: 1,
            wholeResponse: [],
            program: '',
            band: [],
            tab: null,
            aws: 'https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/redeemicon/',
            video_latest: true,
            video_finalist: false,
            video_winners: false,
            latest: [],
            finalist: [],
			winner: [],
			dataUrl: "https://m.playworld.id/starx/band/video/" + this.$route.params.detail
        }
    },
    components: {
        VideoLoop,
		StarxDesc,
		ShareButton
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
    },
    mounted () {
        this.StarxVideo();
    }
}
</script>

<style lang="scss" scoped>
	.StarxVideo .v-btn.v-size--default {
		font-size:12px!important;


	}
</style>

<template>
    <div>
        <!-- =====================================================================================
        TAB MENU
        ===================================================================================== -->
        <v-tabs
            v-model="tab"
            background-color="deep-orange accent-6"
            center-active
            dark
            grow
            class="fixed-tabs-bar"
            >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1">
                VIDEOS
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
        <v-tabs-items v-model="tab" class="adjusted-tab-items pb-5">
			<!-- oooooooooooooooooooooooooooooooooooooo
			VIDEO
			oooooooooooooooooooooooooooooooooooooo -->
			<v-tab-item
				value="tab-1"
			>
				<template v-if="video_latest">
					<v-container>
						<v-alert
						border="left"
						dense
						colored-border
						type="info"
						style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
						>
						Star hanya dapat dikirimkan 1 kali per hari pada masing-masing konten yang diupload peserta
						</v-alert>

						<v-row align="center" class="sm" v-if="band" @click="$router.push('/starx/band/detail/'+band.slug)">
							<v-col cols="2">
								<v-avatar
									size="50"
								>
									<img v-if="band.avatar != ''" :src="band.avatar" alt="alt">
									<img v-else src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/member/avatar-fallback.png" alt="alt">
								</v-avatar>
							</v-col>
							<v-col cols="10" class="pb-0" style="margin-top: -14px">
								<strong style="font-size:14px;">{{ band ? band.band_name : '' }}</strong>
								<div>{{ band.school ? band.school.name : '' }}</div>
							</v-col>
						</v-row>

						<h4 class="pwhead mt-4"><span>AUDITION</span></h4>

						<div
							v-for="latest in latests"
							:key="latest.id"
						>
							<!-- <pre>{{latest}}</pre> -->
							<VideoLoopBig :obj="latest" :band="band"/>
						</div>
						<div v-if="latests.length == 0" class="py-3 caption">No Video</div>

						<h4 class="pwhead mt-4"><span>FINAL</span></h4>

						<div
							v-for="latest in finalists"
							:key="'finalist-'+latest.id"
						>
							<!-- <pre>{{latest}}</pre> -->
							<VideoLoopBig :obj="latest" :band="band"/>
						</div>
						<div v-if="finalists.length == 0" class="py-3 caption">No Video</div>

						<h4 class="pwhead mt-4"><span>WINNER</span></h4>

						<div
							v-for="latest in winners.slice(0,1)"
							:key="'winner-'+latest.id"
						>
							<!-- <pre>{{latest}}</pre> -->
							<VideoLoopBig :obj="latest" :band="band"/>
						</div>
						<div v-if="winners.length == 0" class="py-3 caption">No Video</div>
					</v-container>

					<template v-if="band">
						<v-container>
							<h4 class="pwhead"><span>BAND PROFILE</span></h4>
						</v-container>
						<v-img v-if="avatar" :src="avatar" :alt="band.band_name" :aspect-ratio="16/9"></v-img>

						<!-- TEAM -->
						<v-container>
							<div class="mt-4">
								<v-row justify="space-between" class="mt-3" v-if="band" no-gutters>
									<v-col cols="6">
										<v-row class="pa-0">
											<template v-for="(person, i) in band.band_detail">
												<v-col
													:key="i"
													cols="1"
													class="py-0"
													v-if="person.personnel_name != null"
												>
													<v-avatar size="30">
														<v-img :src="person.avatar ? person.avatar : '/img/user.jpeg'"></v-img>
													</v-avatar>
												</v-col>
											</template>
										</v-row>
									</v-col>
									<v-col cols="6" class="text-right">
										<v-btn
											text
											@click="[ expandTeam ? expandTeam = false : expandTeam = true]"
										>
											Personnel
											<template v-if="!expandTeam"><v-icon>mdi-menu-down</v-icon></template>
											<template v-else><v-icon>mdi-menu-up</v-icon></template>
										</v-btn>
									</v-col>
								</v-row>

								<div v-if="expandTeam" class="mt-4">
									<v-row
										align="center"
										v-for="(person, i) in band.band_detail"
										:key="i"
									>
										<v-col cols="2" v-if="person.personnel_name != null">
											<v-avatar size="45">
												<v-img :src="person.avatar ? person.avatar : '/img/user.jpeg'"></v-img>
											</v-avatar>
										</v-col>
										<v-col cols="8" v-if="person.personnel_name != null">
											<strong>{{person.personnel_name}}</strong><br>
											<div class="caption grey--text ">{{person.position ? person.position.name : '...'}}</div>
										</v-col>
										<v-col cols="2" class="text-right">
											<v-btn
											v-if="person.instagram"
											:href="'https://instagram.com/'+person.instagram"
											icon>
												<v-icon>
													mdi-instagram
												</v-icon>
											</v-btn>
										</v-col>
									</v-row>
								</div>
							</div>
						</v-container>
					</template>

					<!-- <v-row>
						<v-col cols="12" md="12">



							<v-card
								max-width="375"
								class="mx-auto mt-5"
							>
								<v-img
									:src="avatar"
									lazy-src="https://via.placeholder.com/10"
									height="300px"
									dark
									>
									<v-row class="fill-height">
										<v-card-title class="white--text mb-12 pl-12">
											<div class="display-1 pl-12">{{ band.band_name }}</div>
										</v-card-title>
									</v-row>
								</v-img>

								<v-list two-line>
									<v-list-item>
										<v-list-item-icon>
											<v-icon color="orange">mdi-account</v-icon>
										</v-list-item-icon>

										<v-list-item-content>
											<v-list-item-title><strong>{{ band.band_name }}</strong></v-list-item-title>
											<v-list-item-subtitle>Nama Band</v-list-item-subtitle>
										</v-list-item-content>

									</v-list-item>

									<v-divider inset></v-divider>

									<v-list-item>
										<v-list-item-icon>
											<v-icon color="orange">mdi-school-outline</v-icon>
										</v-list-item-icon>

										<v-list-item-content>
											<v-list-item-title><strong>{{ school.name }}</strong></v-list-item-title>
											<v-list-item-subtitle>Asal Sekolah</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>

									<v-divider inset></v-divider>

									<v-list-item>
										<v-list-item-icon>
											<v-icon color="orange">mdi-calendar-account</v-icon>
										</v-list-item-icon>

										<v-list-item-content>
											<v-list-item-title><strong>{{ band.created_at }}</strong></v-list-item-title>
											<v-list-item-subtitle>Tanggal Join</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-list>
							</v-card>
						</v-col>
					</v-row>
					<v-row>
						<v-col v-if="latests.length == 0" cols='12' md='12'>
							<v-timeline dense>
								<v-timeline-item
									color="white"
									small
									fill-dot
								>
									No Video available :(
								</v-timeline-item>
							</v-timeline>
						</v-col>
						<v-col v-else cols='12' md='12'>
							<v-timeline dense>
								<v-timeline-item
									v-for="latest in latests"
									:key="latest.id"
									color="white"
									small
									fill-dot
								>
									<VideoLoop
									:latest="latest"
									:activeBtn="1"
									/>
								</v-timeline-item>
							</v-timeline>
						</v-col>
					</v-row> -->
				</template>
				<template v-if="video_finalist">
					<v-row>
						<v-col cols="12" md="12">


							<v-card
								max-width="375"
								class="mx-auto mt-5"
							>
								<v-img
									:src="avatar"
									lazy-src="https://via.placeholder.com/10"
									height="300px"
									dark
									>
									<v-row class="fill-height">
										<v-card-title class="white--text mb-12 pl-12">
											<div class="display-1 pl-12">{{ band.band_name }}</div>
										</v-card-title>
									</v-row>
								</v-img>

								<v-list two-line>
									<v-list-item>
										<v-list-item-icon>
											<v-icon color="orange">mdi-account</v-icon>
										</v-list-item-icon>

										<v-list-item-content>
											<v-list-item-title><strong>{{ band.band_name }}</strong></v-list-item-title>
											<v-list-item-subtitle>Nama Band</v-list-item-subtitle>
										</v-list-item-content>

									</v-list-item>

									<v-divider inset></v-divider>

									<v-list-item>
										<v-list-item-icon>
											<v-icon color="orange">mdi-school-outline</v-icon>
										</v-list-item-icon>

										<v-list-item-content>
											<v-list-item-title><strong>{{ school.name }}</strong></v-list-item-title>
											<v-list-item-subtitle>Asal Sekolah</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>

									<v-divider inset></v-divider>

									<v-list-item>
										<v-list-item-icon>
											<v-icon color="orange">mdi-calendar-account</v-icon>
										</v-list-item-icon>

										<v-list-item-content>
											<v-list-item-title><strong>{{ band.created_at }}</strong></v-list-item-title>
											<v-list-item-subtitle>Tanggal Join</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-list>
							</v-card>
						</v-col>
					</v-row>
					<v-row>
						<v-col v-if="finalists.length == 0" cols='12' md='12'>
							No Video available :(
						</v-col>
						<v-col v-else cols='12' md='12'>
							<v-row>
								<v-col cols="12" md="4">
									<h2 class="">Pilihan Juri</h2>
									<div
									v-for="latest in finalists"
									:key="'finalist-'+latest.id"
									>
										<VideoLoop
										v-if="latest.finalist_detail.category_choice == 'pilihan-juri'"
										:latest="latest"
										activeBtn="2"
										/>
									</div>
								</v-col>
							</v-row>
							<v-row class="mt-4">
								<v-col cols="12" md="4">
									<h2 class="">Calon Top Star</h2>
									<div
									v-for="latest in finalists"
									:key="'finalist-'+latest.id"
									>
										<VideoLoop
										v-if="latest.finalist_detail.category_choice == 'top-star'"
										:latest="latest"
										activeBtn="2"
										/>
										<div v-else class="mt-2">
											Tidak Ada Top Star
										</div>
									</div>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</template>
				<template v-if="video_winners">
					<v-row>
						<v-col cols="12" md="12">
							<v-card
								max-width="375"
								class="mx-auto mt-5"
							>
								<v-img
									:src="avatar"
									lazy-src="https://via.placeholder.com/10"
									height="300px"
									dark
									>
									<v-row class="fill-height">
										<v-card-title class="white--text mb-12 pl-12">
											<div class="display-1 pl-12">{{ band.band_name }}</div>
										</v-card-title>
									</v-row>
								</v-img>

								<v-list two-line>
									<v-list-item>
										<v-list-item-icon>
											<v-icon color="orange">mdi-account</v-icon>
										</v-list-item-icon>

										<v-list-item-content>
											<v-list-item-title><strong>{{ band.band_name }}</strong></v-list-item-title>
											<v-list-item-subtitle>Nama Band</v-list-item-subtitle>
										</v-list-item-content>

									</v-list-item>

									<v-divider inset></v-divider>

									<v-list-item>
										<v-list-item-icon>
											<v-icon color="orange">mdi-school-outline</v-icon>
										</v-list-item-icon>

										<v-list-item-content>
											<v-list-item-title><strong>{{ school.name }}</strong></v-list-item-title>
											<v-list-item-subtitle>Asal Sekolah</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>

									<v-divider inset></v-divider>

									<v-list-item>
										<v-list-item-icon>
											<v-icon color="orange">mdi-calendar-account</v-icon>
										</v-list-item-icon>

										<v-list-item-content>
											<v-list-item-title><strong>{{ band.created_at }}</strong></v-list-item-title>
											<v-list-item-subtitle>Tanggal Join</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-list>
							</v-card>
						</v-col>
					</v-row>
					<v-row>
						<v-col v-if="winners.length == 0" cols='12' md='12'>
							No Video available :(
						</v-col>
						<v-col v-else cols='12' md='12'>
							<v-row>
								<v-col cols="12" md="4">
									<div
									v-for="latest in juara.slice(0,1)"
									:key="'winner-'+latest.id"
									>
										<h2 class=" text-capitalize">{{ propername(latest.winners_detail.winner_name) }}</h2>
										<VideoLoop
										:latest="latest"
										activeBtn="3"
										/>
									</div>

									<div
									v-for="latest in juara.slice(1)"
									class="my-4"
									:key="'winner-'+latest.id+'phase3'"
									>
										<h2 class=" text-capitalize mb-2">{{ propername(latest.winners_detail.winner_name) }}</h2>
										<v-card
											class="mx-auto "
											outlined
										>
											<v-list-item four-line>
											<v-list-item-content>
												<div class="overline mb-4">{{latest.personnel_winner.asal_band}}</div>
												<v-list-item-title class="headline mb-1">{{latest.personnel_winner.personnel_name}}</v-list-item-title>
												<v-list-item-subtitle>{{latest.personnel_winner.asal_sekolah}}</v-list-item-subtitle>
												<v-list-item-subtitle>@{{ removeat(latest.personnel_winner.instagram) }}</v-list-item-subtitle>
											</v-list-item-content>

												<v-list-item-avatar
													tile
													size="80"
													color="grey"
												>
												<v-img :src="latest.personnel_winner.avatar"></v-img>
												</v-list-item-avatar>
											</v-list-item>
										</v-card>
									</div>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
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

					<v-btn text color="deep-orange accent-4" @click="video_latest=true;video_finalist=false;video_winners=false">
						<span>Detail</span>
					</v-btn>

					<!-- <v-btn text color="deep-orange accent-4" @click="video_finalist=true;video_latest=false;video_winners=false">
						<span>Komentar</span>
					</v-btn> -->
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
        </v-tabs-items>

		<!-- =====================================================================================
        MODAL
        ===================================================================================== -->
        <BuyVip :dialogVisible="buyVipDialogVisible" @close="myDialogClose"/>
        <LoginModal :dialogVisible="pleaseLoginDialogVisible" @close="myDialogClose"/>
        <NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose"/>
		<NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose"/>
    </div>
</template>

<script>
import StarxService from '@/services/StarxService'
import VideoLoop from '@/components/starx/VideoLoop'
import StarxDesc from '@/components/starx/StarxDesc'
import VideoLoopBig from '@/components/starx/VideoLoopBig'
import NotVip from '@/components/modal/NotVip'
import BuyVip from '@/components/modal/BuyVip'
import LoginModal from '@/components/modal/LoginModal'
import UserService from '@/services/UserService'


import _ from 'lodash';
export default {
    name:"StarxSingleBand",
    components:{
		VideoLoop,
		VideoLoopBig,
		StarxDesc,
		NotVip,
		LoginModal,
		BuyVip,
		LoginModal,
    },
    data() {
        return {
            prizes: [],
            activeBtn: 1,
            wholeResponse: [],
            program: '',
            tab: null,
            aws: 'https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/redeemicon/',
            band:[],
            video_latest: true,
            video_finalist: false,
            video_winners: false,
            latests: [],
            finalists: [],
            winners: [],
            avatar: '',
			school: [],
			pleaseLoginDialogVisible: false,
			loginModalVisible: false,
			notVipDialogVisible: false,
            KomentarPoinVisible: false,
			buyVipDialogVisible: false,
			expandTeam: false
        }
    },
    computed: {
        juara: function() {
            return _.reverse(this.winners)
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
        async getBandDetail () {
            try {
                const response = await StarxService.BandDetail( this.$route.params.bandslug )
                console.log(JSON.parse(JSON.stringify(response)));
                this.band = response.data.data.band
                if (response.data.data.band.avatar) {
                    this.avatar = response.data.data.band.avatar
                } else {
                    this.avatar = 'https://be3ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/program/placeholder-big.jpg'
                }
                this.wholeResponse = response.data.data;
                this.latests = this.wholeResponse.latests;
                this.finalists = this.wholeResponse.finalist;
                this.winners = this.wholeResponse.winners;
                this.program = this.wholeResponse.program.term;
                this.band = this.wholeResponse.band;
                this.prizes = this.wholeResponse.prizes;
                this.school = this.wholeResponse.band.school;
                // console.log(JSON.parse(JSON.stringify(response.data)))
            } catch (error) {
                console.log(error)
            }
		},
		renderVideo(code){
			return '<iframe height="180" src="https://www.youtube.com/embed/'+code+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" style="width:100%;height:180px" allowfullscreen></iframe>';
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
			if( this.$auth.user) {
                const sendstar = {
                    participant_id : id,
                    band_id : bandid,
                    phase : this.activeBtn
                };

                try {
                    const res = await StarxService.makeStar(sendstar)
                    if (res.data.status == 200) {
                        this.snackbar = true;

                        this.responsemessage = 'Selamat! anda mendapat extra poin ' + res.data.static_point + ' poin';
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
        checkVIP(id, bandid) {
			var res = []
			if( this.$auth.user ) {
				// this.$auth.fetchUser()
				// res.data = this.$auth.user
				res.data = JSON.parse(localStorage.getItem('userdata'));

				if (new Date(res.data.data.expire) > new Date() ) {
					this.makeStar(id, bandid);
				} else {
					// if not vip, show dialog
					this.notVipDialogVisible = true
				}
            } else {
                this.pleaseLoginDialogVisible = true
            }
        }
    },
    mounted() {
        this.getBandDetail();
    }
}
</script>

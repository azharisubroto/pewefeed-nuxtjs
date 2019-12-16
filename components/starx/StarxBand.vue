
<template class="pb-5">
    <v-container v-if="loading">
        <div class="text-xs-center" align="center">
        <v-progress-circular
            indeterminate
            :size="80"
            :width="8"
            color="deep-orange">
        </v-progress-circular>
        </div>
    </v-container>

    <v-container v-else class="pb-5" ma-0 pa-0>
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
                JOIN
            </v-tab>

            <v-tab href="#tab-3">
                REWARDS &amp; SYARAT
            </v-tab>

            <v-tab href="#tab-4">
                SYARAT
            </v-tab>
        </v-tabs>

		<v-container v-if="tab != 'tab-2'" style="margin-top: 10px">
			<v-alert
			border="left"
			dense
			colored-border
			type="info"
            style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
			>
			Untuk bisa masuk ke tahap semifinal, peserta harus mendapatkan minimal 100 Star
			</v-alert>

			<v-row>
				<v-col cols="6" class="py-0">
					<ShareButton
					:sharingUrl="dataUrl"
					:sharingTitle="dataTitle"
					:sharingDescription="dataDescription"
					class="myshare"
					/>
				</v-col>
				<v-col cols="6" class="py-0">
					<!-- FILTER -->
					<v-menu offset-y>
						<template v-slot:activator="{ on }">
							<v-btn
								v-show="!hidden"
								color="orange accent-4"
								dark
								block
								depressed
								v-on="on"
							>
								<v-icon>mdi-sort</v-icon>
								Urutkan
							</v-btn>
						</template>
						<v-list>
							<v-list-item @click="filter = 'new'; StarxBandHome(1, 'newest')">
								<v-list-item-title>New to Old Post</v-list-item-title>
							</v-list-item>
                            <v-list-item @click="filter = 'old'; StarxBandHome(1, 'oldest')">
								<v-list-item-title>Old to New Post</v-list-item-title>
							</v-list-item>
							<v-list-item @click="filter = 'hi-lo'; StarxBandHome(1, 'hi-lo')">
								<v-list-item-title>Hi to Low Stars</v-list-item-title>
							</v-list-item>
							<v-list-item @click="filter = 'lo-hi'; StarxBandHome(1, 'lo-hi')">
								<v-list-item-title>Low to Hi Stars</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
					<!-- / END FILTER -->
				</v-col>
			</v-row>
		</v-container>

        <!-- =====================================================================================
        TAB ITEMS
        ===================================================================================== -->
        <v-tabs-items v-model="tab" class="djusted-tab-items pb-5">
            <!-- oooooooooooooooooooooooooooooooooooooo
            VIDEO
            oooooooooooooooooooooooooooooooooooooo -->
            <v-tab-item
                value="tab-1"
            >

                <template v-if="video_latest">
                    <v-container>
                        <v-row>
                            <v-col class="text-center" v-if="latests.length == 0" cols='12' md='12'>
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
                            <v-col v-else cols="12" md="4">
                                <v-overlay :value="overlay">
                                    <v-progress-circular indeterminate size="64"></v-progress-circular>
                                </v-overlay>
                                <VideoLoop
                                @makeloading="setloading" @notloading="notloading"
                                v-for="latest in latests"
                                :latest="latest"
                                :key="latest.id"
                                activeBtn="1"
                                />
                                <div class="text-center">
                                    <v-pagination
                                    v-model="page"
                                    :length="total"
                                    @input="next"
                                    ></v-pagination>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </template>
                <template v-if="video_finalist">
                    <v-container v-if="finalists.length == 0">
                        <v-row>
                            <v-col class="text-center" cols='12' md='12'>
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
                        </v-row>
                    </v-container>
                    <v-container v-else>
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
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </template>
                <template v-if="video_winners">
                    <v-container v-if="winners.length == 0">
                        <v-row>
                            <v-col class="text-center" cols='12' md='12'>
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
                        </v-row>
                    </v-container>
                    <v-container v-else>
                        <v-row>
                            <v-col cols="12" md="4">
                                <div
                                v-for="latest in juara.slice(0,3)"
                                :key="'winner-'+latest.id"
                                >
                                    <h2 class=" text-capitalize">{{ propername(latest.winners_detail.winner_name) }}</h2>
                                    <VideoLoop
                                    :latest="latest"
                                    activeBtn="3"
                                    />
                                </div>

                                <div
                                v-for="latest in juara.slice(4)"
                                class="my-4"
                                :key="'winner-'+latest.id"
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
                    </v-container>
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
                    <v-btn text color="orange ancent-4" @click="video_latest=true;video_finalist=false;video_winners=false">
                        <span>Auditions</span>
                    </v-btn>

                    <v-btn text color="orange ancent-4" @click="video_finalist=true;video_latest=false;video_winners=false">
                        <span>Final</span>
                    </v-btn>

                    <v-btn text color="orange ancent-4" @click="video_finalist=false;video_latest=false;video_winners=true">
                        <span>Winners</span>
                    </v-btn>
                </v-bottom-navigation>
            </v-tab-item>

            <!-- oooooooooooooooooooooooooooooooooooooo
            UPLOAD
            oooooooooooooooooooooooooooooooooooooo -->
            <v-tab-item
                value="tab-2"
            >
                <StarxUpload/>
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
                    <div v-html="wholeResponse.program.term"></div>
                </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>

    </v-container>
</template>

<script type="text/javascript" src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="VT-client-6SCMz_XPOiSANWuc"></script>
<script>
import StarxService from '@/services/StarxService'
import StarxDesc from '@/components/starx/StarxDesc'
import StarxUpload from '@/components/starx/StarxUpload'
import VideoLoop from '@/components/starx/VideoLoop'
import _ from 'lodash';
import ShareButton from '@/components/common/ShareButton'

export default {
    name: "StarxBand",
    components: {
        StarxDesc,
        StarxUpload,
		VideoLoop,
		ShareButton
    },
    data(){
        return{
			page: 1,
			filter: 'newest',
            overlay: false,
            timeout: 3000,
            total: null,
            activeBtn: 0,
            wholeResponse: [],
            latests: [],
            finalists: [],
            winners: [],
            prizes: [],
            loading: true,
            tab: null,
            aws: 'https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/redeemicon/',
            hidden: false,
            sorter: '',
            video_latest: true,
            video_finalist: false,
			video_winners: false,
			dataUrl: "https://m.playworld.id/starx/band",
            dataTitle: "STARX BAND - Playworld",
            // dataDescription: "Sumber konten VIRAL dari beragam informasi seperti Film, Musik, Olahraga, Travel, Teknologi. Tidak hanya itu, PLAYWORLD.ID memberikan insentif dengan pengunjungnya dalam bentuk POIN. POIN bisa dikumpulkan atas interaksi memberikan Komentar, menjawab Quiz dan memberikan Star (Voting). Jumlah POIN yang cukup kemudian bisa ditukar dengan Reward",
            dataDescription: "Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya!",
        }
    },
    computed: {
        filtered: function () {
            if( this.sorter == 'hilow' ) {
                return _.orderBy(this.latests, 'star', 'desc')
            } else if( this.sorter == 'lowhi' ) {
                return _.orderBy(this.latests, 'star', 'asc')
            } else if( this.sorter == 'new' ) {
                return _.orderBy(this.latests, 'created_at', 'desc')
            } else {
                return _.orderBy(this.latests, 'created_at', 'asc')
            }
        },
        topstar: function() {
            var posts = _.keyBy(this.finalists, "finalist_detail['category_choice']");
            return posts["top-star"];
        },
        juara: function() {
            return _.reverse(this.winners)
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

        propername(name) {
            var propername = name.replace("-", " ")
            return propername;
        },
        removeat(name) {
            var propername = name.replace("@", "")
            return propername;
        },
        async StarxBandHome(code, sortype) {
			this.loading = true
			var params = {
				phase: code,
				key: sortype
			}
            try {
                const response = await StarxService.getBand(1, params)
                this.wholeResponse = response.data.data;
                this.latests = response.data.data.latests.data;
                this.prizes = this.wholeResponse.prizes;
                this.loading = false;
                this.total = response.data.data.latests.last_page;
                this.page = response.data.data.latests.current_page;
                console.log(JSON.parse(JSON.stringify(response.data)));
            } catch (error) {
				console.log(error)
				this.loading = false
            }

            try {
                const response = await StarxService.finalist()
                // console.log(response)
                this.finalists = response.data.data.finalist;
                //console.log(JSON.parse(JSON.stringify(this.finalists)))
            } catch (error) {
                console.log(error)
            }

            try {
                const response = await StarxService.finalist()
                this.winners = response.data.data.winners;
                // console.log(JSON.parse(JSON.stringify(this.winners)))
            } catch (error) {
                console.log(error)
            }
        },
        async next(page) {
            this.setloading()
			var params = {
				phase: 1,
				key: this.filter
			}
            try {
                const response = await StarxService.getBand(page, params)
                this.wholeResponse = response.data.data;
                this.latests = response.data.data.latests.data;
                this.prizes = this.wholeResponse.prizes;
                this.loading = false;
                this.total = response.data.data.latests.last_page;
                this.page = response.data.data.latests.current_page;
				console.log(JSON.parse(JSON.stringify(response.data)));
				this.notloading()
            } catch (error) {
				console.log(error)
				this.loading = false
            }
        }
    },
    mounted () {
        this.StarxBandHome(1, 'newest');
    }
}
</script>
<style lang="scss">
    .v-application .primary {
        background-color: #FF5722 !important;
        border-color: #FF5722 !important;
    }
	.myshare {
		&.mt-5{
			margin-top: 0!important;
		}
		.v-btn {
			margin: 0;
			display: block;
			width: 100%;
		}
	}
    // div:not(.v-bottom-navigation) .fixed-tabs-bar {
	// 	// position: fixed;
	// 	// margin-top: 45px;
	// 	// z-index: 2;
	// }
</style>

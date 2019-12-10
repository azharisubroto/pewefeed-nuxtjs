<template>
<v-container ma-0 pa-0>
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
            <v-container>
                <!-- oooooooooooooooooooooooooooooooooooooo
                VIDEO
                oooooooooooooooooooooooooooooooooooooo -->
                <v-tab-item
                    value="tab-1"
                >
                    <template v-if="video_latest">
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-card
                                    max-width="375"
                                    class="mx-auto mt-5"
                                >
                                    <v-img
                                        src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/program/PIP-09.png"
                                        lazy-src="https://via.placeholder.com/10"
                                        height="300px"
                                        dark
                                        >
                                    </v-img>
                                    <v-list two-line>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon color="orange">mdi-account</v-icon>
                                            </v-list-item-icon>

                                            <v-list-item-content>
                                                <v-list-item-title><strong>{{ school.name }}</strong></v-list-item-title>
                                                <v-list-item-subtitle>Nama Sekolah</v-list-item-subtitle>
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
                        </v-row>
                    </template>
                    <template v-if="video_finalist">
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-card
                                    max-width="375"
                                    class="mx-auto mt-5"
                                >
                                    <v-img
                                        src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/program/PIP-09.png"
                                        lazy-src="https://via.placeholder.com/10"
                                        height="300px"
                                        dark
                                        >
                                    </v-img>
                                    <v-list two-line>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon color="orange">mdi-account</v-icon>
                                            </v-list-item-icon>

                                            <v-list-item-content>
                                                <v-list-item-title><strong>{{ school.name }}</strong></v-list-item-title>
                                                <v-list-item-subtitle>Nama Sekolah</v-list-item-subtitle>
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
                                        src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/program/PIP-09.png"
                                        lazy-src="https://via.placeholder.com/10"
                                        height="300px"
                                        dark
                                        >
                                    </v-img>
                                    <v-list two-line>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon color="orange">mdi-account</v-icon>
                                            </v-list-item-icon>

                                            <v-list-item-content>
                                                <v-list-item-title><strong>{{ school.name }}</strong></v-list-item-title>
                                                <v-list-item-subtitle>Nama Sekolah</v-list-item-subtitle>
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
                    >
                        <v-btn text color="deep-orange accent-4" @click="$router.go(-1)">
                            <span>Kembali</span>
                            <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>

                        <v-btn text color="deep-orange accent-4" @click="video_latest=true;video_finalist=false;video_winners=false">
                            <span>Auditions</span>
                            <v-icon>mdi-history</v-icon>
                        </v-btn>

                        <v-btn text color="deep-orange accent-4" @click="video_finalist=true;video_latest=false;video_winners=false">
                            <span>Finalist</span>
                            <v-icon>mdi-star</v-icon>
                        </v-btn>

                        <v-btn text color="deep-orange accent-4" @click="video_finalist=false;video_latest=false;video_winners=true">
                            <span>Winners</span>
                            <v-icon>mdi-trophy</v-icon>
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
import _ from 'lodash';
export default {
    name:"StarxSingleBand",
    components:{
        VideoLoop,
        StarxDesc
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
            school: []
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
        async getSchoolDetail () {
            try {
                const response = await StarxService.SchoolDetail( this.$route.params.schoolslug )
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
                this.school = this.wholeResponse.school
                console.log(JSON.parse(JSON.stringify(response.data)))
            } catch (error) {
                console.log(error)
            }
        }
    }, 
    mounted() {
        this.getSchoolDetail();
    }
}
</script>
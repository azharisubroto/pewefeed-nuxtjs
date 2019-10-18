
<template class="pb-5">
    <v-container v-if="loading" class="grey lighten-5">
        <div class="text-xs-center" align="center">
        <v-progress-circular
            indeterminate
            :size="80"
            :width="8"
            color="deep-orange">
        </v-progress-circular>
        </div>
    </v-container>
    
    <v-container v-else class="grey lighten-5 pb-5" ma-0 pa-0>
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
        <v-tabs-items v-model="tab" class="grey lighten-5 adjusted-tab-items pb-5">
            <!-- oooooooooooooooooooooooooooooooooooooo
            VIDEO
            oooooooooooooooooooooooooooooooooooooo -->
            <v-tab-item
                value="tab-1"
            >
                <!-- FILTER -->
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            v-show="!hidden"
                            color="deep-orange lighten-1"
                            dark
                            fixed
                            top
                            right
                            fab
                            small
                            depressed
                            v-on="on"
                            style="z-index:100;top:9px"
                        >
                            <v-icon>mdi-sort</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="sorter = 'new'">
                            <v-list-item-title>Terbaru</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="sorter = 'hilow'">
                            <v-list-item-title>Hi to Low Stars</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="sorter = 'lowhi'">
                            <v-list-item-title>Low to Hi Stars</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <!-- / END FILTER -->
                
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
                                v-for="latest in filtered" 
                                :latest="latest"
                                :key="latest.id"
                                activeBtn="1"
                                />
                                <div class="text-center">
                                    <v-pagination
                                    v-model="page"
                                    :length="length"
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
                >
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
import VideoLoop from '@/components/starx/VideoLoop'
import _ from 'lodash';

export default {
    name: "StarxBand",
    components: {
        StarxDesc,
        VideoLoop
    },
    data(){
        return{
            page: 1,
            overlay: false,
            timeout: 3000,
            length: null,
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
            video_winners: false
        }
    },
    computed: {
        filtered: function () {
            if( this.sorter == 'hilow' ) {
                return _.orderBy(this.latests, 'star', 'desc')
            } else if( this.sorter == 'hilow' ) {
                return _.orderBy(this.latests, 'star', 'asc')
            } else {
                return _.orderBy(this.latests, 'created_at', 'desc')
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
        async StarxBandHome () {
            await StarxService.getBand()
            .then(response => {
                this.wholeResponse = response.data.data;
                this.latests = this.wholeResponse.latests;
                this.prizes = this.wholeResponse.prizes;
                this.loading = false;
                this.length = response.data.last_page;
                this.page = response.data.current_page;
                // console.log(JSON.parse(JSON.stringify(this.latests)));
            })
            .catch(error => {
                console.log(error.response.data)
            });

            await StarxService.finalist()
            .then(response => {
                // console.log(response)
                this.finalists = response.data.data.finalist;
                //console.log(JSON.parse(JSON.stringify(this.finalists)))
            })
            .catch(error => {
                console.log(error.response.data)
            });

            await StarxService.winners()
            .then(response => {
                this.winners = response.data.data.winners;
                console.log(JSON.parse(JSON.stringify(this.winners)))
            })
            .catch(error => {
                console.log(error.response.data)
            });
        },
        next (page) {
            this.setloading()
            StarxService.getBandByPage(page)
            .then(response => {
                this.notloading()
                this.wholeResponse = response.data.data;
                this.latests = this.wholeResponse.latests;
                this.prizes = this.wholeResponse.prizes;
                this.loading = false;
                this.length = response.data.last_page;
                this.page = response.data.current_page;
                // console.log(JSON.parse(JSON.stringify(this.latests)));
            })
            .catch(error => {
                console.log(error.response.data)
            });
        }
    },
    mounted () {
        this.StarxBandHome();
    }
}
</script>
<style>
    .v-application .primary {
        background-color: #FF5722 !important;
        border-color: #FF5722 !important;
    }
</style>

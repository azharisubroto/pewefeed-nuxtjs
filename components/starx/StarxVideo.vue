
<template>
    <v-container class="grey lighten-5" ma-0 pa-0>
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
            <v-container>
                <!-- oooooooooooooooooooooooooooooooooooooo
                VIDEO
                oooooooooooooooooooooooooooooooooooooo -->
                <v-tab-item
                    value="tab-1"
                >
                    <template v-if="video_latest">
                        <div v-if="latest == null" class="grey lighten-5 p-7 text-center p-8">
                            No Video available :( 
                        </div>
                        <VideoLoop
                        v-else
                        :latest="latest"
                        :activeBtn="1"
                        :hiddendetail="true"
                        />
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
                                            v-if="latest.finalist_detail.category_choice == 'pilihan-juri'"
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
                                            v-if="latest.finalist_detail.category_choice == 'top-star'"
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
                    <template v-if="video_winners">
                        <v-row>
                            <v-col class="text-center" v-if="winner == null" cols='12' md='12'>
                                No Video available :( 
                            </v-col>
                            <v-col v-else cols='12' md='12'>
                                <v-row>
                                    <v-col cols="12" md="4">
                                        <div>
                                            <h2 class=" text-capitalize">{{ propername(latest.winners_detail.winner_name) }}</h2>
                                            <VideoLoop 
                                            :latest="latest"
                                            :activeBtn="3"
                                            :hiddendetail="true"
                                            />
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
export default {
    name: "StarxBandVideo",
    data(){
        return{
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
        }
    },
    components: {
        VideoLoop,
        StarxDesc
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
            await StarxService.VideoDetail( this.$route.params.slug )
            .then(response => {
                this.wholeResponse = response.data.data;
                this.latest = this.wholeResponse.latests;
                this.finalist = this.wholeResponse.finalist;
                this.winner = this.wholeResponse.winners;
                this.program = this.wholeResponse.program.term;
                this.band = this.latest.band;
                this.prizes = this.wholeResponse.prizes;
                console.log(JSON.parse(JSON.stringify(this.latest)))
            })
            .catch(error => {
                console.log(error.response.data)
            });
        }
    },
    mounted () {
        this.StarxVideo();
    }
}
</script>

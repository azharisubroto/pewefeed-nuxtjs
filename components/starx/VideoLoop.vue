<template>
    <v-card
        class="StarxVideoLoop mx-auto mb-3 py-2 px-2"
        :elevation="isWinner == 1 ? 0 : 1"
        :class="isWinner == 1 ? 'manual-border' : ''"
    >
		<v-row no-gutters align="center">
			<v-col cols="3" :class="isWinner == 1 ? 'pr-2 mr-5' : 'pr-2'">
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
			</v-col>
			<v-col :cols="isWinner == 1 ? 7 : 9">
				<span class="caption" v-if="isWinner != 1">{{ latest.created_at }}</span>
				<h4 :class="isWinner == 1 ? 'mb-2' : ''" @click="$router.push( '/starx/band/video/'+latest.slug )">{{ latest.description }}</h4>

				<v-row v-if="latest.band" class="sm">
					<v-col v-if="latest.band.image != ''" cols="2" class="py-0">
                        <v-avatar
                            size="25"
                        >
                            <img :src="latest.band.image" alt="alt">
                        </v-avatar>
					</v-col>
                    <v-col v-else cols="2" class="py-0">
                        <v-avatar
                            size="25"
                        >
                            <img src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/member/avatar-fallback.png" alt="alt">
                        </v-avatar>
					</v-col>
					<v-col cols="10" class="py-0">
						<strong style="font-size:14px;">{{ latest.band ? latest.band.name : '' }}</strong>
						<div class="caption" v-if="latest.school">{{ latest.school }}</div>
					</v-col>
				</v-row>
			</v-col>
            <v-col class="text-center" v-if="isWinner == 1" cols="1">
                <v-icon>mdi-chevron-right</v-icon>
            </v-col>
		</v-row>

		<div v-if="action!='nope'" class="devider-small my-2"></div>

		<v-row v-if="action!='nope'" class="sm" align="center">
			<v-col cols="2" class="caption py-0 pr-0">
				<span :id="'starcount-' + latest.id">{{latest.star}}</span>/<span style="color: blue">100</span>
			</v-col>
			<v-col cols="5" class="py-0">
				<v-progress-linear
				:value="latest.star"
				color="light-blue"
				height="10"
				reactive
				rounded
				></v-progress-linear>
			</v-col>
			<v-col cols="5" class="py-0">
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
        <LoginModal :dialogVisible="pleaseLoginDialogVisible" @close="myDialogClose"/>
        <NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose"/>
    </v-card>
</template>

<script>
import StarxService from '@/services/StarxService'
import UserService from '@/services/UserService'
import BuyVip from '@/components/modal/BuyVip'
import LoginModal from '@/components/modal/LoginModal'
import NotVip from '@/components/modal/NotVip'
export default {
    name:"VideoLoop",
    // props: {
    //     latest: Array,
    //     filtering: [],
    //     activeBtn: Number,
    //     hiddendetail: Boolean
    // },
    props: [
        "latest",
        "filtering",
        "activeBtn",
		"hiddendetail",
        "action",
        "isWinner"
    ],
    components: {
        BuyVip,
        LoginModal,
        NotVip,
    },
    data: () => ({
        buyVipDialogVisible: false,
        pleaseLoginDialogVisible: false,
        notVipDialogVisible: false,
        is_star: 'grey',
        userdata: [],
        snackbar: false,
        snacksrc : 'https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/redeemicon/poinekstra222.png',
        timeout: 3000,
        responsemessage: '',
        isLoggedIn: false
    }),
    methods: {
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
        youtubelink(iframe) {
            if( typeof iframe == 'undefined' ) {
                return iframe;
            } else {
                if( iframe.includes('iframe') ) {
                    var url = iframe;
                    /* eslint-disable-next-line */
                    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
                        videoId = url.match(regExp);

                    if (videoId && videoId[1].length === 11) {
                        return videoId[1];
                    }
                } else {
                    return iframe;
                }
            }
        },
        async makeStar(id, bandid) {
			if( this.$auth.user ) {
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
        myDialogClose () {
            this.buyVipDialogVisible = false
            this.pleaseLoginDialogVisible = false
            this.notVipDialogVisible = false
            // other code
        },
        checkVIP(id, bandid) {
            var res = []

			if( this.$auth.user ) {
                this.$auth.fetchUser()
                res.data = this.$auth.user

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
}
</script>

<style lang="scss" scoped>
	.StarxVideoLoop .v-btn.v-size--default {
		font-size:12px!important;
	}
    .playbutton {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        background: rgba(0,0,0,.5);
        border-radius: 90px;
    }
    .manual-border {
		border-top: 1px #C5C5C5 solid;
		border-right : 1px #C5C5C5 solid;
		border-left : 1px #C5C5C5 solid;
		border-bottom : 1px #C5C5C5 solid;
	}
</style>

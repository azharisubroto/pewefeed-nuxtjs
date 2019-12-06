<template>
    <v-card
        class="StarxVideoLoop mx-auto mb-3 py-2 px-2"
        elevation="1"
    >
		<v-row no-gutters>
			<v-col cols="3" class="pr-2">
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
			<v-col cols="9">
				<span class="caption">{{ latest.created_at }}</span>
				<h4 @click="$router.push( '/starx/band/video/'+latest.slug )">{{ latest.description }}</h4>

				<v-row class="sm">
					<v-col cols="1" class="py-0">
						<img src="/img/musicicon.png" alt="">
					</v-col>
					<v-col cols="11" class="py-0">
						<strong style="font-size:14px;">{{ latest.band ? latest.band.name : '' }}</strong>
						<div class="caption">{{ latest.school }}</div>
					</v-col>
				</v-row>
			</v-col>
		</v-row>

		<div class="devider-small my-2"></div>

		<v-row class="sm" align="center">
			<v-col cols="2" class="caption py-0 pr-0">
				{{latest.star}}/<span style="color: blue">100</span>
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
        <PleaseLogin :dialogVisible="pleaseLoginDialogVisible" @close="myDialogClose"/>
        <NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose"/>
    </v-card>
</template>

<script>
import StarxService from '@/services/StarxService'
import UserService from '@/services/UserService'
import BuyVip from '@/components/modal/BuyVip'
import PleaseLogin from '@/components/modal/PleaseLogin'
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
    ],
    components: {
        BuyVip,
        PleaseLogin,
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
        myDialogClose () {
            this.buyVipDialogVisible = false
            this.pleaseLoginDialogVisible = false
            this.notVipDialogVisible = false
            // other code
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
}
</script>

<style lang="scss" scoped>
	.StarxVideoLoop .v-btn.v-size--default {
		font-size:12px!important;
	}
</style>

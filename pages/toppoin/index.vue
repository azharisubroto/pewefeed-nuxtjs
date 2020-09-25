<template>
  <section>
	<template v-if="periode == null && isloading == true">
		<div class="text-center pa-10">
			<v-progress-circular :width="3" color="deep-orange" indeterminate></v-progress-circular>
		</div>
	</template>
	<template v-if="periode != null && isloading == false">
		<!-- BANNER -->
		<template v-if="tptab == 0 || tptab == 2">
			<v-img :src="periode.banner.desktop" class="mb-10"></v-img>
			<div class="d-none py-3 text-center">
				Periode:
				{{ [periode.periode.start_at, 'YYYY-MM-DD HH:mm:ss'] | moment('DD MMM') }} -
				{{ [periode.periode.end_at, 'YYYY-MM-DD HH:mm:ss'] | moment('DD MMM YYYY') }}
				<div></div>

				<!-- <v-container v-if="tptab == 0">
					<v-btn :to="'/toppoin/active/'+periode.slug" color="deep-orange" block class="mt-4">
						Read More
					</v-btn>
				</v-container> -->
			</div>
		</template>

		<!-- PRIZES TAB -->
		<template v-if="tptab == 0">
			<!-- PERINGKAT SAYYAAA -->
			<h4 v-if="topthree" class="tp-head">Peringkat Saya</h4>

			<v-row v-if="topthree" no-gutters align="center" justify="center" class="mt-10">
				<template v-for="(item, i) in topthree">
					<v-col :cols="i !=1 ? '3' : '4'" :class="'item-'+ parseInt(i+1) " :key="'topthree-'+i">
						<div :class="['rankbox', i ==  1 ? 'is_me' : 'notme']">
							<div class="rb-head text-center" :ref="item.active == true ? 'ismeloh' : 'bukan'">
								{{ item.customer.ranked }}
							</div>
							<div class="rb-body">
								<v-avatar width="23" color="#000">
									<v-img :src="item.customer.avatar"></v-img>
								</v-avatar>
								<div class="mt-3 text-10">
									{{capitalize(item.customer.username)}}
								</div>
								<div class="mt-1 text-10">
									<img src="/img/icons/poin-p.svg" style="vertical-align:middle;line-height:1" class="mr-1" width="13"/> {{item.poin.grand_total}}
								</div>
							</div>
						</div>
					</v-col>
				</template>
			</v-row>

			<!-- TOP 10 -->

			<h4 class="tp-head mt-5">Peringkat Top 10 Sementara</h4>
			<div></div>

			<v-container>
				<v-row v-if="prizeswithpemenang != null">
					<v-col 
					v-for="(item, i) in prizeswithpemenang" 
					cols="6" 
					:key="'winner-'+i"
					class="pa-1"
					>
						<v-card class="top10" color="#404040">
							<div class="top10-head">
								<img src="/img/icons/rank-b.svg" width="15" class="mr-1" style="vertical-align: center;"/>
								<strong>Calon Juara {{i+1}}</strong>
							</div>

							<div class="top10-body">
								<v-row class="pb-0">
									<v-col cols="4" class="py-0">
										<v-img :src="item.redeem.image" contain></v-img>
									</v-col>
									<v-col cols="8" class="pl-0 py-0 text-12">
										<h4 class="text-12 mb-1">{{item.redeem.name}}</h4>

										<v-row align="center" class="pa-0 py-0">
											<v-col cols="3" class="py-0">
												<v-avatar size="23">
													<v-img :src="item.customer.avatar ? item.customer.avatar : 'https://via.placeholder.com/48/?text=No+Data'" width="23"></v-img>
												</v-avatar>
											</v-col>
											<v-col cols="9" class="pl-2 py-0 text-13">
												{{item.customer.username ? item.customer.username : 'No Data'}}
											</v-col>
										</v-row>
									</v-col>
								</v-row>
							</div>
						</v-card>
					</v-col>
				</v-row>
			</v-container>

			<!-- MAIN PRIZES -->
			<h4 class="tp-head mt-5">Peringkat Lainnya ({{totalRanked}} Peserta)</h4>
			<div></div>
			<v-container v-if="lastRanked!=null">
				<v-row>
					<template v-for="(item, i) in lastRanked">
						<v-col cols="6" class="pa-1" :key="'ranks-'+i">
							<v-card class="pa-0" color="#404040" style="overflow:hidden">
								<v-row no-gutters align="center">
									<v-col cols="3" class="text-center py-3 px-2" style="background: #AFAFAF">
										<img src="/img/icons/rank-b.svg" width="10" class="mr-0" style="vertical-align: center;"/>
										<strong style="color:#000" class="text-12">{{item.ranked}}</strong>
									</v-col>
									<v-col cols="9" class="pl-2">
										<v-row no-gutters>
											<v-col cols="2">
												<v-avatar size="20">
													<v-img :src="item.customer.avatar"></v-img>
												</v-avatar>
											</v-col>
											<v-col cols="10" class="pl-1">
												<div class="text-13">
													{{item.customer.username}}
												</div>
												<div class="text-10">
													<img src="/img/icons/poin-p.svg" style="vertical-align:middle;line-height:1" class="mr-0" width="13"/> 
													{{item.poin.grand_total}}
												</div>
											</v-col>
										</v-row>
									</v-col>
								</v-row>
							</v-card>
						</v-col>
					</template>
				</v-row>
				<v-container>
					<div class="text-center">
						<v-btn
						color="deep-orange"
						class="px-4"
						@click="next"
						>
						Show More
						</v-btn>
					</div>
					<!-- <v-pagination
						class="mt-4"
						color="deep-orange"
						v-model="paged"
						:length="totalPage"
						:total-visible="totalVisible"
						@input="next"
					></v-pagination> -->
				</v-container>
				<v-overlay v-if="pagingload"></v-overlay>
			</v-container>
		</template>

		<!-- RANKING TAB -->
		<template v-if="tptab == 1">
			<v-container class="pb-0">
				<v-alert color="#0057FF" prominent>
					<template v-slot:prepend>
						<v-img src="/img/icons/info.svg" width="35" max-width="35" class="mr-3 infoarticleicon"></v-img>
					</template>
					Hadiah TOP POIN Periode 01 Oktober 2020 s/d 31 Desember 2020
				</v-alert>
			</v-container>

			<v-container class="pt-0" v-if="hadiahPeriode != null">

				<v-card
				v-for="(item, i) in hadiahPeriode"
				:key="'prizeperiode'+i"
				:class="[i <= 2 ? 'gold' : 'silver']"
				>
					<v-row
					no-gutters
					>
						<v-col cols="3">
							<v-img :src="item.redeem.image"></v-img>
						</v-col>
						<v-col cols="9" class="py-6 pl-4">
							<div class="mb-2">
								<img src="/img/icons/toppoin/piala.svg" style="vertical-align:middle;line-height:1" class="mr-1" alt="">
								<strong class="deep-orange--text">Juara {{ i+1 }}</strong>
							</div>
							<h4 class="text-18 mb-2">{{ item.redeem.name }}</h4>

							<div class="outinebtn">
								<img src="/img/icons/poin-black.svg" style="vertical-align:middle;line-height:1" class="mr-1" alt="">
								<strong>{{item.min_point}} Poin</strong>
								Syarat Minimal
							</div>
						</v-col>
					</v-row>
				</v-card>
				
			</v-container>
			<!-- <pre>{{hadiahPeriode}}</pre> -->
		</template>

		<!-- WINNERS TAB -->
		<template v-if="tptab == 2">
			<div v-if="winners!=null">
				<template v-for="(item, i) in winners">
					<template v-if="i > 0 || paged >= 2">
						<div v-if="i==2" class="devider-small" :key="'winners-deviderz-'+i"></div>
						<div :key="'winnersz-'+i" class="px-4">
							<v-row>
								<v-col cols="4">
									<div class="jeruk">
										<v-img :src="item.banner.desktop"></v-img>
									</div>
								</v-col>
								<v-col cols="8">
									{{ [item.periode.start_at, 'YYYY-MM-DD HH:mm:ss'] | moment('DD MMM') }} -
									{{ [item.periode.end_at, 'YYYY-MM-DD HH:mm:ss'] | moment('DD MMM YYYY') }}

									<v-btn :to="'/toppoin/'+item.slug" color="deep-orange" small class="mt-4">See Winner</v-btn>
								</v-col>
							</v-row>
						</div>
						<div class="devider-small" :key="'winners-devider-'+i"></div>
					</template>
				</template>
				<v-container>
					<v-pagination
						class="mt-4"
						color="deep-orange"
						v-model="paged"
						:length="winnertotalPage"
						:total-visible="totalVisible"
						@input="nextwinner"
					></v-pagination>
				</v-container>
				<v-overlay v-if="pagingload"></v-overlay>
			</div>
		</template>

		<!-- HOW TO TAB -->
		<template v-if="tptab == 3">
			<section class="toppoin-acc" v-if="periode.howto">
				<v-expansion-panels v-for="(item,index) in periode.howto" :key="index">
					<v-expansion-panel class="mb-0">
						<v-expansion-panel-header class="py-5 text-uppercase">{{item.title}}</v-expansion-panel-header>
						<v-expansion-panel-content class='caption'>
							<div v-html="item.content"></div>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</section>
		</template>
	</template>


	<div class="py-10 mb-10"></div>

	<!-- BOTTOM NAVIGATION -->
	<v-bottom-navigation
		fixed
		dark
		grow
		color="white"
		background-color="#2C2C2D"
		v-model="tptab"
		height="80"
		class="pwmenubottom"
	>
	<!-- v-if="$route.name != 'purchase' && $route.name != 'cat-subcat-articleslug' && $route.name != 'cat' && $route.name != 'tukarpoin'" -->
		<v-btn>
			<span class="text-10">Peringkat<br>Peserta</span>
			<img 
			:src="tptab == 0 ? '/img/icons/toppoin/rank-o.svg' : '/img/icons/toppoin/rank-w.svg'"
			class="mb-1 d-block" width="20" height="20" />
		</v-btn>
		<v-btn>
			<span class="text-10">Hadiah<br>Periode Ini</span>
			<img 
			:src="tptab == 1 ? '/img/icons/toppoin/prize-o.svg' : '/img/icons/toppoin/prize-w.svg'"
			class="mb-1 d-block" width="20" height="20" />
		</v-btn>
		<v-btn>
			<span class="text-10">Histori<br>Pemenang</span>
			<img 
			:src="tptab == 2 ? '/img/icons/toppoin/history-o.svg' : '/img/icons/toppoin/history-w.svg'"
			class="mb-1 d-block" width="20" height="20" />
		</v-btn>
		<v-btn>
			<span class="text-10">Info & Cara<br>Bermain</span>
			<img src="/img/tukarpoin/icon-winner-orange.png" class="mb-1 d-block" width="20" height="20" />
		</v-btn>
		<v-btn>
			<ShareButton2 
			class="text-center" 
			independent
			tipe="Sing"
			:shareSingTitle="shareText"
			>
				<img
				:src="tptab == 4 ? '/img/icons/articles/bagikan-o.svg' : '/img/icons/articles/bagikan-w.svg' "
				height="18"
				style="display:inline-block;position:relative;top:2px"
				alt
				/>
				<div></div>
				<span class="text-10">
					Bagikan
					<br />(+1 Poin)
				</span>
			</ShareButton2>
		</v-btn>
	</v-bottom-navigation>
  </section>
</template>

<script>
import TopPoin from "@/services/TopPoin";
import ShareButton2 from "@/components/common/ShareButton2";

export default {
  head() {
    return {
      title: "Tukar Poin",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Tukar Poinmu dengan Hadiah-hadiah menarik"
        }
      ]
    };
  },
  components: {
	  ShareButton2
  },
  watch:{
		tptab: function (newVal, oldVal) {
			localStorage.setItem('tptab', this.tptab);
		}
  },
  data() {
    return {
		tptab: null,
      isloading: true,
	  masterdata: null,
	  periode: null,
	  description: false,
	  prizeswithpemenang: null,
	  prizewithoutpemenang: null,
	  lastRanked: null,
	  totalRanked: 0,
	  paged: 1,
	  totalVisible: 7,
	  totalPage: 5,
	  pagingload: true,
	  winners: null,
	  winnertotalPage: 3,
	  winnersFeatured:null,
	  myrank: [],
	  topthree: null,
	  hadiahPeriode: null,
	  shareText: 'Yuk join di TOP POIN pewefeed.com kejar hadiah jutaan rupiah dengan klik pewefeed.com',
    };
  },
  methods: {
    async fetchAll() {
      try {
        const res = await TopPoin.topPoinAll();
		this.periode = res.data.data.periode
		this.prizeswithpemenang = res.data.data.ranking
		this.prizewithoutpemenang = res.data.data.reward
		this.isloading = false
      } catch (error) {
		console.log(error);
		this.isloading = false
      }
    },
    async fetchMyRank() {
      try {
        const res = await TopPoin.lastRankedMe();
		console.log('myrank',res.data.current);
		this.myrank.push(res.data.current);
      } catch (error) {
		console.log(error);
      }
	},
    async fetchLastRanked(n) {
      try {
        const res = await TopPoin.lastRanked(n);
		//console.log(res);
		this.lastRanked = res.data.data.ranked
		this.totalPage = res.data.pagination.last_page
		this.totalRanked = res.data.pagination.total
		this.pagingload = false
      } catch (error) {
		console.log(error);
		this.isloading = false
      }
	},
	async moreLastRanked(n) {
      try {
        const res = await TopPoin.lastRanked(parseInt(this.paged+1));
		//console.log(res);
		if( res.data.data.ranked != null && res.data.data.ranked && res.data.data.ranked.length > 0 ) {
			var loop = res.data.data.ranked 
			loop.forEach(el => {
				this.lastRanked.push(el);
			});
			this.pagingload = false
			this.paged++
		}
		
      } catch (error) {
		console.log(error);
		this.isloading = false
      }
	},
    async fetchWinners(n) {
      try {
        const res = await TopPoin.winners(n);
		this.winners = res.data.data.periode;
		if( this.paged == 1 ) {
			this.winnersFeatured = res.data.data.periode[0];
		}
		this.pagingload = false
		this.winnertotalPage = res.data.pagination.last_page
      } catch (error) {
		console.log(error);
		this.isloading = false
      }
	},
	async fetchTopThree() {
		try {
			const res = await TopPoin.getTopThree();
			this.topthree = res.data.current;
			if(res.data.current != null && res.data.current.length>0) {
				var loop = res.data.current
				loop.forEach(el => {
					if( el.active == true ) {
						var currentRank = el.customer.ranked
						this.shareText = 'Saya peringkat ke-'+currentRank+' di TOP POIN pewefeed.com untuk mengejar hadiah jutaan rupiah. Untuk ikutan klik pewefeed.com'
						return false;
					} 
				});
			}
		} catch (error) {
			console.log(error);
		}
	},
	async fetchHadiahPeriode() {
		try {
			const res = await TopPoin.hadiahPeriodeIni() 
			if( res.data.data.reward != null && res.data.data.reward.length > 0 ) {
				this.hadiahPeriode = res.data.data.reward
			}
		} catch (error) {
			console.log(error)
		}
	},
	capitalize(str) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    },
	next(num) {
		this.moreLastRanked(num);
		this.pagingload = true
	},
	nextwinner(num){
		this.fetchWinners(num);
		this.pagingload = true
	},
  },
  mounted() {
    this.fetchAll();
    this.fetchLastRanked(1);
	this.fetchWinners(1);
	this.fetchMyRank();
	this.fetchTopThree();
	this.fetchHadiahPeriode();
	if( localStorage.getItem('tptab') ) {
		this.tptab = parseInt(localStorage.getItem('tptab'))
	}
  }
};
</script>

<style lang="scss">
	.mainprizes {
		.v-expansion-panel-content__wrap {
			padding:0!important;
		}
	}

	.winner-name {
		border-bottom: 1px dotted #d1d1d1;
		padding-bottom:10px;
		margin-bottom:10px;
	}

	.tp-head {
		padding-left: 15px;
		position:relative;
		line-height: 40px;
		margin: 0;
		font-size: 14px;
		&:before {
			content:"";
			width: 8px;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			border-radius: 0 5px 5px 0;
			background: #FF4200;
		}
	}
	.rankbox {
		background: #404040;
		color: #fff;
		border: 2px solid #AFAFAF;
		.rb-head {
			background: #AFAFAF;
			color: #000;
			font-size: 16px;
			height: 35px;
			line-height: 35px;
			padding: 0;
			text-align: center;
			font-weight: bold;
		}
		.rb-body {
			padding: 25px 10px 10px;
			text-align: center;
			opacity: .6
		}
	}
	.item-1 .rankbox {
		border-right: 0;
	}
	.item-2 .rankbox {
		border-color: #FF4200;
		.rb-head {
			background: #FF4200;
			color: #fff;
			font-size: 20px;
		}
		.rb-body {
			padding: 38px 10px;
			text-align: center;
			opacity: 1;
		}
	}
	.item-3 .rankbox {
		border-left: 0;
	}

	.top10-head {
		background: #AFAFAF;
		color: #000;
		font-size:12px;
		padding: 10px;
	}

	.top10-body {
		padding: 8px;
	}

	.gold {
		background: linear-gradient(180deg, #F3CD7E 0%, #C78345 100%)!important;
		color: #000!important;
		margin: 10px 0;
	}
	.silver {
		background: linear-gradient(180deg, #EFEFEF 0%, #939393 100%)!important;
		color: #000!important;
		margin: 10px 0;
	}
	.outinebtn {
		font-size: 10px;
		border: 1px solid #000;
		border-radius: 90px;
		display: inline-block;
		height: 23px;
		line-height: 21px;
		padding: 0 5px;
		img {
			width: 10px;
			display: inline-block;
			margin-right: 5px;
		}
	}
</style>

<template>
  <section>
	<template v-if="periode == null && isloading == true">
		<div class="text-center pa-10">
			<v-progress-circular :width="3" color="deep-orange" indeterminate></v-progress-circular>
		</div>
	</template>
	<template v-if="periode != null && isloading == false">
		<!-- BANNER -->
		<template v-if="tptab == 0 || tptab == 1">
			<v-img :src="periode.banner.desktop"></v-img>
			<div class="py-3 text-center">
				Periode:
				{{ [periode.periode.start_at, 'YYYY-MM-DD HH:mm:ss'] | moment('DD MMM') }} -
				{{ [periode.periode.end_at, 'YYYY-MM-DD HH:mm:ss'] | moment('DD MMM YYYY') }}
				<div></div>

				<v-container v-if="tptab == 0">
					<v-btn :to="'/toppoin/active/'+periode.slug" color="deep-orange" block class="mt-4">
						Read More
					</v-btn>
				</v-container>
			</div>
		</template>

		<!-- PRIZES TAB -->
		<template v-if="tptab == 0">

			<!-- MAIN PRIZES -->
			<section class="ranking" v-if="prizeswithpemenang != null">
				<v-container><h4>MAIN PRIZES</h4></v-container>

				<template v-for="(item, i) in prizeswithpemenang">
					<div v-if="i<3" class="px-4" :key="'winner-'+i" >
						<v-row>
							<v-col cols="1"><strong class="deep-orange--text">#{{i+1}}</strong></v-col>
							<v-col cols="2">
								<v-avatar>
									<v-img :src="item.customer.avatar ? item.customer.avatar : 'https://via.placeholder.com/48/?text=No+Data'"></v-img>
								</v-avatar>
							</v-col>
							<v-col cols="9">
								<div class="winner-name">
									{{item.customer.username ? item.customer.username : 'No Data'}}
									<div class="text-14 deep-orange--text">{{item.customer.point ? item.customer.point : 'No'}} Poin</div>
								</div>
								<div>
									{{item.redeem.name}}
								</div>
								<div class="text-14 green--text">
									Min. {{item.redeem.min_point}}
								</div>
							</v-col>
						</v-row>
					</div>
					<div v-if="i<3" class="devider-small" :key="'winner-dash-'+i"></div>
				</template>

				<v-container><h4>OTHER PRIZES</h4></v-container>

				<template v-for="(item, i) in prizeswithpemenang">
					<template v-if="i>=3">
						<div class="px-4" :key="'winner-'+i" >
							<v-row>
								<v-col cols="1"><strong class="deep-orange--text">#{{i+1}}</strong></v-col>
								<v-col cols="2">
									<v-avatar>
										<v-img :src="item.customer.avatar"></v-img>
									</v-avatar>
								</v-col>
								<v-col cols="9">
									<div class="winner-name">
										{{item.customer.username}}
										<div class="text-14 deep-orange--text">{{item.customer.point ? item.customer.point : 'No'}} Poin</div>
									</div>
									<div>
										{{item.redeem.name}}
									</div>
									<div class="text-14 green--text">
										Min. {{item.redeem.min_point}}
									</div>
								</v-col>
							</v-row>
						</div>
						<div class="devider-small" :key="'winner-dash-'+i"></div>
					</template>
				</template>
			</section>
		</template>

		<!-- RANKING TAB -->
		<template v-if="tptab == 1">
			<v-container  v-if="myrank.length > 0">
				<h4>PERINGKAT KAMU SAAT INI</h4>
			</v-container>
			<section v-if="myrank.length > 0" style="background: #fa5624">
				<template v-for="(item, i) in myrank">
					<div class="px-4" :key="'ranks-'+i">
						<v-row>
							<v-col cols="2">
								<v-avatar>
									<v-img :src="item.customer.avatar"></v-img>
								</v-avatar>
							</v-col>
							<v-col cols="10">
								<div class="text-16">
									{{item.customer.username}}
								</div>
								<div class="text-14">
									{{item.poin.grand_total}} Poin
								</div>
							</v-col>
						</v-row>
					</div>
				</template>
				<v-overlay v-if="pagingload"></v-overlay>
			</section>

			<v-container>
				<h4>PERINGKAT YANG LAIN</h4>
			</v-container>
			<section v-if="lastRanked!=null">
				<template v-for="(item, i) in lastRanked">
					<div class="px-4" :key="'ranks-'+i">
						<v-row>
							<v-col cols="2">
								<v-avatar>
									<v-img :src="item.customer.avatar"></v-img>
								</v-avatar>
							</v-col>
							<v-col cols="10">
								<div class="text-16">
									{{item.customer.username}}
								</div>
								<div class="text-14">
									{{item.poin.grand_total}} Poin
								</div>
							</v-col>
						</v-row>
					</div>
					<div class="devider-small" :key="'rankz-'+i"></div>
				</template>
				<v-container>
					<v-pagination
						class="mt-4"
						color="deep-orange"
						v-model="paged"
						:length="totalPage"
						:total-visible="totalVisible"
						@input="next"
					></v-pagination>
				</v-container>
				<v-overlay v-if="pagingload"></v-overlay>
			</section>

		</template>

		<!-- WINNERS TAB -->
		<template v-if="tptab == 2">
			<div v-if="winnersFeatured!=null">
				<v-img :src="winnersFeatured.banner.desktop"></v-img>
				<div class="py-3 text-center">
					Periode:
					{{ [winnersFeatured.periode.start_at, 'YYYY-MM-DD HH:mm:ss'] | moment('DD MMM') }} -
					{{ [winnersFeatured.periode.end_at, 'YYYY-MM-DD HH:mm:ss'] | moment('DD MMM YYYY') }}
					<div></div>

					<v-container>
						<v-btn :to="'/toppoin/'+winnersFeatured.slug" color="deep-orange" block class="mt-5">
							See Winner
						</v-btn>
					</v-container>
				</div>
			</div>

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
			<span>Prizes</span>
			<img src="/img/tukarpoin/tukarpoin-orange.png" class="mb-1 d-block" width="20" height="20" />
		</v-btn>
		<v-btn>
			<span>Ranking</span>
			<img src="/img/tukarpoin/icon-rank-orange.png" class="mb-1 d-block" width="20" height="20" />
		</v-btn>
		<v-btn>
			<span>Winners</span>
			<img src="/img/tukarpoin/icon-winner-orange.png" class="mb-1 d-block" width="20" height="20" />
		</v-btn>
		<v-btn>
			<span>How To</span>
			<img src="/img/tukarpoin/howto-orange.png" class="mb-1 d-block" width="20" height="20" />
		</v-btn>
	</v-bottom-navigation>
  </section>
</template>

<script>
import TopPoin from "@/services/TopPoin";
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
  components: {},
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
	  paged: 1,
	  totalVisible: 7,
	  totalPage: 5,
	  pagingload: true,
	  winners: null,
	  winnertotalPage: 3,
	  winnersFeatured:null,
	  myrank: []
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
		//console.log(res);
		this.myrank.push(res.data.current)
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
		this.pagingload = false
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
	next(num) {
		this.fetchLastRanked(num);
		this.pagingload = true
	},
	nextwinner(num){
		this.fetchWinners(num);
		this.pagingload = true
	}
  },
  mounted() {
    this.fetchAll();
    this.fetchLastRanked(1);
	this.fetchWinners(1);
	this.fetchMyRank();
	if( localStorage.getItem('tptab') ) {
		this.tptab = parseInt(localStorage.getItem('tptab'))
	}
  }
};
</script>

<style lang="scss">
	.toppoin-acc {
		.v-expansion-panels {
			.v-expansion-panel {
				background: #1c1c1f!important;
				border-top: 1px solid rgba(255, 255, 255, 0.5);
			}
			&:last-of-type {
				.v-expansion-panel {
					border-bottom: 1px solid rgba(255, 255, 255, 0.5);
				}
			}
			.v-expansion-panel-content__wrap {
				background: #000!important;
				padding-top:15px;
				font-size: 14px;
				border-top: 1px solid rgba(255, 255, 255, 0.5);
			}
		}
	}
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
</style>

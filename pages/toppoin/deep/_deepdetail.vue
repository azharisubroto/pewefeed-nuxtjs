<template>
	<section>
		<template v-if="detail == null && isloading == true">
			<div class="text-center pa-10">
				<v-progress-circular :width="3" color="green" indeterminate></v-progress-circular>
			</div>
		</template>
		<section v-if="detail!=null && isloading == false">
			<v-img :src="detail.banner.desktop"></v-img>
			<div class="py-3">
				<div class="text-center py-4">
					Periode:
					{{ [detail.periode.start_at, 'YYYY-MM-DD HH:mm:ss'] | moment('DD MMM') }} -
					{{ [detail.periode.end_at, 'YYYY-MM-DD HH:mm:ss'] | moment('DD MMM YYYY') }}
				</div>
				<div></div>

				<!-- TOP POIN FAQ -->
				<template>
					<section class="toppoin-acc" v-if="howto != null">
						<v-expansion-panels v-for="(item, i) in howto" :key="i">
							<v-expansion-panel class="mb-0">
								<v-expansion-panel-header class="text-uppercase">{{ howto.title }}</v-expansion-panel-header>
								<v-expansion-panel-content class='caption'>
									{{ howto.content }}
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
					</section>

					<!-- REWARD LIST, WITHOUT PEMENANG -->
					<section class="toppoin-acc mainprizes">
						<v-expansion-panels>
							<v-expansion-panel>
								<v-expansion-panel-header>MAIN PRIZES</v-expansion-panel-header>
								<v-expansion-panel-content class='caption px-0'>
									<template v-for="(item, i) in prizewithoutpemenang">
										<template v-if="i<3">
											<div class="py-0 px-4" :key="'rewards-'+i">
												<v-row>
													<v-col cols="1"><strong class="deep-orange--text">#{{i+1}}</strong></v-col>
													<v-col cols="11">
														{{item.redeem.name}}
														<br>
														<div class="text-14 green--text">
															Min. {{item.min_point}}
														</div>
													</v-col>
												</v-row>
											</div>
											<div class="devider-small" :key="'reward-'+i"></div>
										</template>
									</template>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
					</section>

					<section class="toppoin-acc mainprizes">
						<v-expansion-panels>
							<v-expansion-panel class='mb-6'>
								<v-expansion-panel-header>OTHER PRIZES</v-expansion-panel-header>
								<v-expansion-panel-content class='caption px-0'>
									<template v-for="(item, i) in prizewithoutpemenang">
										<template v-if="i>2">
											<div class="py-0" :key="'rewards-'+i">
												<v-row class="px-6">
													<v-col cols="1"><strong class="deep-orange--text">#{{i+1}}</strong></v-col>
													<v-col cols="11">
														{{item.redeem.name}}
														<br>
														<div class="text-14 green--text">
															Min. {{item.min_point}}
														</div>
													</v-col>
												</v-row>
											</div>
											<div class="devider-small" :key="'reward-'+i"></div>
										</template>
									</template>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
					</section>
				</template>
			</div>
		</section>
		<br>
		<br>
		<br>
		<br>
		<br>

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
			<v-btn @click="$router.push('/toppoin')">
				<span>Prizes</span>
				<img src="/img/tukarpoin/tukarpoin-orange.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<v-btn @click="$router.push('/toppoin')">
				<span>Ranking</span>
				<img src="/img/tukarpoin/icon-rank-orange.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<v-btn @click="$router.push('/toppoin')">
				<span>Winners</span>
				<img src="/img/tukarpoin/icon-winner-orange.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<v-btn @click="$router.push('/toppoin')">
				<span>How To</span>
				<img src="/img/tukarpoin/howto-orange.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
		</v-bottom-navigation>
	</section>
</template>

<script>
import TopPoin from '@/services/TopPoin'
export default {
	name:"topPoinDetail",
	data(){
		return {
			tptab: 0,
			detail: null,
			isloading: true,
			howto: null,
			description: false,
			prizeswithpemenang: null,
	 		prizewithoutpemenang: null,
		}
	},
	watch:{
		tptab: function (newVal, oldVal) {
			localStorage.setItem('tptab', this.tptab);
		}
  	},
	methods:{
		async fetchDetail(){
			try {
        		const res = await TopPoin.periodeDetail(this.$route.params.deepdetail);
				this.detail = res.data.data.periode
				this.howto = res.data.data.periode.howto
				this.prizewithoutpemenang = res.data.data.reward
				this.prizeswithpemenang = res.data.data.ranking
				this.isloading = false
			} catch (error) {
				console.log(error);
				this.isloading = false
			}
		}
	},
	mounted() {
		this.fetchDetail();
		if( localStorage.getItem('tptab') ) {
			this.tptab = parseInt(localStorage.getItem('tptab'))
		}
		////console.log(this.$route.params.detail)
	}
}
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

<template>
	<section>
		<template v-if="detail == null && isloading == true">
			<div class="text-center pa-10">
				<v-progress-circular :width="3" color="deep-orange" indeterminate></v-progress-circular>
			</div>
		</template>
		<section v-if="detail!=null && isloading == false">
			<v-img :src="detail.banner.desktop"></v-img>
			<div class="py-3">
				<div class="text-center">
					Periode:
					{{ [detail.periode.start_at, 'YYYY-MM-DD HH:mm:ss'] | moment('DD MMM') }} -
					{{ [detail.periode.end_at, 'YYYY-MM-DD HH:mm:ss'] | moment('DD MMM YYYY') }}
				</div>
				<div></div>

				<v-container>
					<v-btn v-if="description == false" @click="description = !description" color="deep-orange" block class="mt-4">
						Read More
					</v-btn>
				</v-container>

				<!-- TOP POIN FAQ -->
				<template v-if="description == true">
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

				<!-- MAIN PRIZES -->
				<section class="ranking" v-if="prizeswithpemenang != null">
					<v-container><h4>MAIN PRIZES</h4></v-container>

					<template v-for="(item, i) in prizeswithpemenang">
						<div v-if="i<3" class="px-4" :key="'winner-'+i" >
							<v-row>
								<v-col cols="1"><strong class="deep-orange--text">#{{i+1}}</strong></v-col>
								<v-col cols="2">
									<v-avatar>
										<v-img :src="item.customer.avatar ? item.customer.avatar : 'https://via.placeholder.com/80'"></v-img>
									</v-avatar>
								</v-col>
								<v-col cols="9">
									<div class="winner-name">
										{{item.customer.username}}
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
											<v-img :src="item.customer.avatar ? item.customer.avatar : 'https://via.placeholder.com/80'"></v-img>
										</v-avatar>
									</v-col>
									<v-col cols="9">
										<div class="winner-name">
											{{item.customer.username}}
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
			</div>
		</section>
	</section>
</template>

<script>
import TopPoin from '@/services/TopPoin'
export default {
	name:"topPoinDetail",
	data(){
		return {
			detail: null,
			isloading: true,
			howto: null,
			description: false,
			prizeswithpemenang: null,
	 		prizewithoutpemenang: null,
		}
	},
	methods:{
		async fetchDetail(){
			try {
        		const res = await TopPoin.periodeDetail(this.$route.params.detail);
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
		//console.log(this.$route.params.detail)
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

<template>
	<section>
		<SingAppBar title="WINNER" :back="true"/>

		<v-container class="sing-herowinners">
			<BannerStatic slug="sing-winner"/>
		</v-container>

		<v-container style="margin-top: -180px;">
			<h4 class="mb-4 text-18" style="color: #000">Juara Pilihan Juri</h4>
			<template v-for="(item, i) in prizeswithpemenang">
				<v-card color="#404040" class="mb-3" v-if="i<3" :key="'winner-'+i" @click="$store.commit('SET_JUDGE_NUMBER', parseFloat(i+1));$router.push('/sing/winner/'+item.winner_id)">
					<div class="px-4 pt-4">
						<img src="/img/trophy.svg" alt="" width="16">	<strong>Juara {{i+1}}</strong>
					</div>

					<div class="devider-small mt-3"></div>

					<div class="px-4">
						<v-row>
							<v-col cols="4" class="px-0 pb-0">
								<img v-if="item.prize.redeem.image" :src="item.prize.redeem.image" alt="">
							</v-col>
							<v-col cols="8" class="pb-0">
								<div class="d-flex align-center pt-3 mb-4">
									<div class="mr-2">
										<v-avatar size="30">
											<v-img :src="item.customer.avatar ? item.customer.avatar : 'https://via.placeholder.com/48/?text=No+Data'"></v-img>
										</v-avatar>
									</div>
									<div>
										<div>
											{{item.customer.name ? item.customer.name : 'No Data'}}
										</div>
									</div>
								</div>
								<div class="d-flex mt-3 align-center">
									<div class="mr-3 text-center">
										<v-img src="/img/icons/gift.svg" max-width="30"></v-img>
									</div>
									<div>
										<div>
											{{item.prize.redeem.title}}
										</div>
									</div>
								</div>
								<div class="mt-3">
									<v-btn small depressed color="deep-orange" @click="$store.commit('SET_JUDGE_NUMBER', '#'+parseFloat(i+1));$router.push('/sing/winner/'+item.winner_id)">Video</v-btn>
								</div>
							</v-col>
						</v-row>
					</div>
				</v-card>
			</template>

		</v-container>

		<v-container class="pt-7"><h4 class="text-18">Prizes for Judges Votes</h4></v-container>

		<template v-for="(item, i) in prizeswithpemenang">
			<template v-if="i>=3">
				<v-card color="#404040" class="px-4 py-4 mb-3" v-if="i<3" :key="'winner-'+i" @click="$store.commit('SET_JUDGE_NUMBER', '#'+parseFloat(i+1));$router.push('/sing/winner/'+item.winner_id)">
					<img src="/img/trophy.svg" alt="" width="16">	<strong>Juara {{i+1}}</strong>
					<v-row>
						<v-col cols="4" class="px-0 pb-0">
							<img v-if="item.prize.redeem.image" :src="item.prize.redeem.image" alt="">
						</v-col>
						<v-col cols="8" class="pb-9">
							<div class="d-flex align-center pt-3">
								<div class="mr-2">
									<v-avatar size="30">
										<v-img :src="item.customer.avatar ? item.customer.avatar : 'https://via.placeholder.com/48/?text=No+Data'"></v-img>
									</v-avatar>
								</div>
								<div>
									<div>
										{{item.customer.name ? item.customer.name : 'No Data'}}
									</div>
								</div>
							</div>
							<div class="d-flex mt-3 align-center">
								<div class="mr-3 text-center">
									<v-img src="/img/icons/gift.svg" max-width="30"></v-img>
								</div>
								<div>
									<div>
										{{item.prize.redeem.title}}
									</div>
								</div>
							</div>
							<div class="mt-3">
								<v-btn depressed color="deep-orange" @click="$store.commit('SET_JUDGE_NUMBER', '#'+parseFloat(i+1));$router.push('/sing/winner/'+item.winner_id)">Video</v-btn>
							</div>
						</v-col>
					</v-row>
				</v-card>
				<div v-if="i>3" class="devider-small" :key="'winner-dash-'+i"></div>
			</template>
		</template>

		<!-- <template v-for="(item, i) in prizeswithpemenang">
			<template v-if="i>=3">
				<div class="px-4" :key="'winner-'+i" @click="$router.push('/sing/winner/'+item.slug)">
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
								<div class="text-14 deep-orange--text">{{item.customer.point ? item.customer.point : 'No'}} Votes</div>
							</div>
							<div>
								{{item.redeem.name}}
							</div>
						</v-col>
					</v-row>
				</div>
				<div class="devider-small" :key="'winner-dash-'+i"></div>
			</template>
		</template> -->
	</section>
</template>

<script>
import ShareButton2 from "@/components/common/ShareButton2";
import Video from "@/components/sing/Video";
import SingAppBar from "@/components/sing/SingAppBar";
import SingService from "@/services/SingService";
import BannerStatic from '@/components/common/BannerStatic'
export default {
	name: "WinnersPage",
	components: {
		Video,
		SingAppBar,
		ShareButton2,
		BannerStatic
	},
	mounted(){
		this.getWinners()
	},
	methods:{
		async getWinners() {
			try {
				const res = await SingService.winnersHome()
				const data = res.data.winners
				this.prizeswithpemenang = data
				//console.log(JSON.parse(JSON.stringify(data)));
			} catch (error) {
				console.log(error)
			}
		}
	},
	data() {
		return {
			singtab: 0,
			prizeswithpemenang: [],
		}
	},
}
</script>

<style lang="scss">
	.winner-name {
		border-bottom: 1px dotted #d1d1d1;
		padding-bottom:10px;
		margin-bottom:10px;
	}
	.sing-herowinners {
		background: #C6C6C6;
		padding-bottom: 200px;
	}
</style>

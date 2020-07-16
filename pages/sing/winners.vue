<template>
	<section>
		<SingAppBar title="WINNER" :back="true"/>

		<Video />

		<v-container><h4>JUDGES WINNERS</h4></v-container>

		<template v-for="(item, i) in prizeswithpemenang">
			<div v-if="i<3" class="px-4" :key="'winner-'+i" @click="$router.push('/sing/winner/'+item.customer.id)">
				<v-row>
					<v-col cols="1"><strong class="deep-orange--text">#{{i+1}}</strong></v-col>
					<v-col cols="2">
						<v-avatar>
							<v-img :src="item.customer.avatar ? item.customer.avatar : 'https://via.placeholder.com/48/?text=No+Data'"></v-img>
						</v-avatar>
					</v-col>
					<v-col cols="9">
						<div class="winner-name">
							{{item.customer.name ? item.customer.name : 'No Data'}}
							<div class="text-14 deep-orange--text">{{item.total_vote ? item.total_vote : 'No'}} Votes</div>
						</div>
						<div>
							{{item.prize.redeem.title}}
						</div>
					</v-col>
				</v-row>
			</div>
			<div v-if="i<3" class="devider-small" :key="'winner-dash-'+i"></div>
		</template>

		<v-container class="pt-7"><h4>HIGHEST VOTES</h4></v-container>

		<template v-for="(item, i) in prizeswithpemenang">
			<template v-if="i>=3">
				<div class="px-4" :key="'winner-'+i" @click="$router.push('/sing/winner/'+item.customer.id)">
					<v-row>
						<v-col cols="1"><strong class="deep-orange--text">#{{i+1}}</strong></v-col>
						<v-col cols="2">
							<v-avatar>
								<v-img :src="item.customer.avatar ? item.customer.avatar : 'https://via.placeholder.com/48/?text=No+Data'"></v-img>
							</v-avatar>
						</v-col>
						<v-col cols="9">
							<div class="winner-name">
								{{item.customer.name ? item.customer.name : 'No Data'}}
								<div class="text-14 deep-orange--text">{{item.total_vote ? item.total_vote : 'No'}} Votes</div>
							</div>
							<div>
								{{item.prize.redeem.title}}
							</div>
						</v-col>
					</v-row>
				</div>
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

		<br>
		<br>
		<br>
		<br>
		<v-bottom-navigation
			fixed
			dark
			grow
			color="white"
			background-color="#2C2C2D"
			v-model="singtab"
			height="80"
			class="pwmenubottom"
		>
			<v-btn @click="$router.push('/sing/?tab=0'); ">
				<span>Join</span>
				<img src="/img/icons/icon-join-orange.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<v-btn @click="$router.push('/sing/?tab=1'); ">
				<span>Prizes</span>
				<img src="/img/tukarpoin/tukarpoin-orange.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<ShareButton2/>
		</v-bottom-navigation>
	</section>
</template>

<script>
import ShareButton2 from "@/components/common/ShareButton2";
import Video from "@/components/sing/Video";
import SingAppBar from "@/components/sing/SingAppBar";
import SingService from "@/services/SingService";
export default {
	name: "WinnersPage",
	components: {
		Video,
		SingAppBar,
		ShareButton2
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
				console.log(data);
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
</style>

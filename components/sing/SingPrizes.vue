<template>
	<div v-if="prizes!==null">
		<v-container class="py-3">
			<div class="text-18"><strong>Prizes for Judges Winner</strong></div>
		</v-container>
		<div class="devider-small"></div>
		<template v-for="(item, i) in prizes">
			<div v-if="i<3" style="border-bottom:1px solid #fff"  :key="'prize-'+i">
				<v-container>
					<v-row>
						<v-col cols="4">
							<v-img v-if="item.redeem" :src="item.redeem.image"></v-img>
						</v-col>
						<v-col cols="8">
							<div class="text-18">
								<img src="/img/trophy.svg" alt="" width="20" style="vertical-align:middle;"/> <strong>Juara {{i+1}}</strong>
							</div>
							<div class="text-18 mt-4" >
								{{item.redeem.title}}
							</div>
							<!-- <h3 class="text-18 mt-2" >
								{{item.total_winners}} Pemenang
							</h3> -->
						</v-col>
					</v-row>
				</v-container>
			</div>
		</template>

		<v-container class="py-3">
			<div class="text-18"><strong>Prizes for Judges Votes</strong></div>
		</v-container>
		<div class="devider-small"></div>
		<template v-for="(item, i) in prizes">
			<div v-if="i>=3" style="border-bottom:1px solid #fff"  :key="'prize2-'+i">
				<v-container>
					<v-row>
						<v-col cols="4">
							<v-img v-if="item.redeem" :src="item.redeem.image"></v-img>
						</v-col>
						<v-col cols="8">
							<div class="text-18">
								<img src="/img/trophy.svg" alt="" width="20" style="vertical-align:middle;"/> <strong>Juara {{i+1}}</strong>
							</div>
							<div class="text-18 mt-4" >
								{{item.redeem.title}}
							</div>
							<!-- <h3 class="text-18 mt-2" >
								{{item.total_winners}} Pemenang
							</h3> -->
						</v-col>
					</v-row>
				</v-container>
			</div>
		</template>
	</div>
</template>

<script>
import SingService from '@/services/SingService'
export default {
	name:"SingPrizes",
	data(){
		return {
			prizes: null
		}
	},
	methods: {
		async fetchPrizes() {
			try {
				const res = await SingService.getPrizes();
				this.prizes = await res.data.data;
			} catch (error) {
				console.log(error)
			}
		}
	},
	mounted(){
		this.fetchPrizes()
	}
}
</script>

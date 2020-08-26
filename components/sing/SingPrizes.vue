<template>
	<div v-if="prizes!==null">
		<v-container class="pt-3 pb-0">
			<div class="text-18" style="color: #000"><strong>Pemenang Pilihan Juri</strong></div>
		</v-container>
		<template v-for="(item, i) in prizes">
			<v-card color="#404040" class="px-2 my-4 mx-3" v-if="i<3"  :key="'prize-'+i">
				<v-row>
					<v-col cols="3">
						<v-img v-if="item.redeem" :src="item.redeem.image"></v-img>
					</v-col>
					<v-col cols="9" class="pt-3">
						<div class="text-16">
							<img src="/img/trophy.svg" alt="" width="16" style="vertical-align:middle;" class="mr-1"/> <strong>Juara {{i+1}}</strong>
						</div>
						<div class="text-14 mt-4" >
							{{item.redeem.title}}
						</div>
						<!-- <h3 class="text-18 mt-2" >
							{{item.total_winners}} Pemenang
						</h3> -->
					</v-col>
				</v-row>
			</v-card>
		</template>

		<v-container class="py-3">
			<div class="text-18"><strong>Pemenang Vote Terbanyak</strong></div>
		</v-container>
		<template v-for="(item, i) in prizes">
			<v-card color="#404040" v-if="i>=3" class="px-2 my-4 mx-4" :key="'prize2-'+i">
				<v-row>
					<v-col cols="3">
						<v-img v-if="item.redeem" :src="item.redeem.image"></v-img>
					</v-col>
					<v-col cols="9" class="pt-3">
						<div class="text-16">
							<img src="/img/trophy.svg" alt="" width="16" style="vertical-align:middle;" class="mr-1"/> <strong>Juara {{i+1}}</strong>
						</div>
						<div class="text-14 mt-4" >
							{{item.redeem.title}}
						</div>
						<!-- <h3 class="text-18 mt-2" >
							{{item.total_winners}} Pemenang
						</h3> -->
					</v-col>
				</v-row>
			</v-card>
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

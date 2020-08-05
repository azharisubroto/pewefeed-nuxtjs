<template>
	<div v-if="prizes!==null">
		<v-container class="py-3">
			<div class="text-20"><strong>JUDGES WINNER</strong></div>
		</v-container>
		<template v-for="(item, i) in prizes">
			<div v-if="i<3" class="px-4 pt-0 pb-5" style="background:#fca729;border-bottom:1px solid #fff"  :key="'prize-'+i">
				<div class="text-center mb-4">
					<div class="px-7 py-2 d-inline-block" style="border-radius:0 0 4px 4px;background:#fa3824;color:#fff">
						Juara {{i+1}}
					</div>
				</div>

				<v-container>
					<v-row>
						<v-col cols="5">
							<v-img v-if="item.redeem" :src="item.redeem.image"></v-img>
						</v-col>
						<v-col cols="7">
							<h4 class="text-22" style="color:#000">
								{{item.redeem.title}}
							</h4>
							<h3 class="text-18 mt-2" style="color:#000">
								{{item.total_winners}} Pemenang
							</h3>
						</v-col>
					</v-row>
				</v-container>
			</div>
		</template>

		<v-container class="py-3">
			<div class="text-20"><strong>HIGHEST VOTES WINNER</strong></div>
		</v-container>
		<template v-for="(item, i) in prizes">
			<div v-if="i>=3" class="px-4 pt-0 pb-5" style="background:#fca729;border-bottom:1px solid #fff"  :key="'prize2-'+i">
				<div class="text-center mb-4">
					<div class="px-7 py-2 d-inline-block" style="border-radius:0 0 4px 4px;background:#fa3824;color:#fff">
						Juara {{i+1}}
					</div>
				</div>

				<v-container>
					<v-row>
						<v-col cols="5">
							<v-img v-if="item.redeem" :src="item.redeem.image"></v-img>
						</v-col>
						<v-col cols="7">
							<h4 class="text-22" style="color:#000">
								{{item.redeem.title}}
							</h4>
							<h3 class="text-18 mt-2" style="color:#000">
								{{item.total_winners}} Pemenang
							</h3>
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

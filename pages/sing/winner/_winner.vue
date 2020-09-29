<template>
	<section>
		<SingAppBar :title="'Juara '+$store.state.judge_num " :back="true"/>
		<v-container class="sing-herowinners pt-5" style="color: #000" v-if="winners != null && winners.length > 0">
			<v-avatar class="mr-3">
				<v-img :src="winners[0].customer.avatar ? winners[0].customer.avatar : 'https://via.placeholder.com/350x150'"></v-img>
			</v-avatar>
			{{winners[0].customer.name}}

			<v-btn text :href="winners[0].video.author_url" color="#000">
				<v-icon class="mr-2">mdi-instagram</v-icon>
			</v-btn>
		</v-container>

		<client-only>
			<v-container style="margin-top:-100px">
				<template v-if="winners != null && winners.length > 0">
					<template v-for="(item, i) in winners">
						<v-card @click="$router.push('/sing/winner/detail/'+item.id)" :key="'videoasdas-'+i" color="#404040" class="px-4 pt-4 pb-2 mb-4">
							<div class="mb-3">
								<img v-if="item.stage == 'Final'" src="/img/icons/stage-2.svg" style="vertical-align:middle" width="20" class="mr-2 makewhite" alt="">
								<img v-if="item.stage == 'Semi Final'" src="/img/icons/stage-1.svg" style="vertical-align:middle" width="20" class="mr-2 makewhite" alt="">
								<img v-if="item.stage == 'Audition'" src="/img/icons/stage-0.svg" style="vertical-align:middle" width="20" class="mr-2 makewhite" alt="">

								<strong>Stage: {{item.stage}}</strong>
							</div>

							<v-img :src="item.video.thumbnail_url" :aspect-ratio="16/9"></v-img>

							<div class="d-flex justify-space-between">
								<div>
									<div style="background:#000;border-radius: 0 0 5px 5px;color:#fff" class="px-2 py-2">
										<v-icon :color="item.is_star ? '#FFC107': '#f6f6f6'">mdi-star</v-icon>
										Star
									</div>
								</div>

								<div class="singmetaicons text-14 d-flex align-center justify-content-end metasing pt-1">
									<div class="d-inline-block">
										<v-img src="/img/icons/rank.svg" width="14" max-width="14" class="mr-1 d-inline-block"></v-img>
										({{item.ranking ? item.ranking : 'n/a'}})
									</div>
									<div class="d-inline-block ml-3">
										<v-img src="/img/icons/thumb.svg" width="14" max-width="14" class="mr-1 d-inline-block"></v-img>
										({{item.total_vote ? item.total_vote : '0'}})
									</div>
									<div class="d-inline-block ml-3">
										<v-img src="/img/icons/comment-single.svg" width="14" max-width="14" class="mr-1 d-inline-block"></v-img>
										({{item.total_comments ? item.total_comments : '0'}})
									</div>
								</div>
							</div>
						</v-card>
					</template>
				</template>
			</v-container>
		</client-only>
	</section>
</template>

<script>
import ShareButton2 from "@/components/common/ShareButton2";
import Video from "@/components/sing/Video";
import SingAppBar from "@/components/sing/SingAppBar";
import SingService from "@/services/SingService"

export default {
	name: "WinnersPage",
	components: {
		Video,
		SingAppBar,
		ShareButton2
	},
	data() {
		return {
			finals: [
				3,2,1
			],
			content: {
				customer: {
					avatar: '//via.placeholder.com/80',
					name: this.$route.params.winner
				},
				star: false,
				votes: 100,
				voters: [
					{
						name: 'Fahli',
						avatar: '//via.placeholder.com/80',
						date: '10 Juni 2020, 11:00'
					},
					{
						name: 'Fahli',
						avatar: '//via.placeholder.com/80',
						date: '10 Juni 2020, 11:00'
					},
					{
						name: 'Fahli',
						avatar: '//via.placeholder.com/80',
						date: '10 Juni 2020, 11:00'
					},
					{
						name: 'Fahli',
						avatar: '//via.placeholder.com/80',
						date: '10 Juni 2020, 11:00'
					},
					{
						name: 'Fahli',
						avatar: '//via.placeholder.com/80',
						date: '10 Juni 2020, 11:00'
					},
				],
				comments: 234
			},
			singtab: 0,
			winners:null,
		}
	},
	methods:{
		async getWinnerDetail() {
			try {
				const res = await SingService.winnersDetail(this.$route.params.winner);
				this.winners = res.data.data
				//console.log(JSON.parse(JSON.stringify(res.data.data)));
			} catch (error) {
				console.log(error)
			}
		}
	},
	mounted() {
		this.getWinnerDetail();
	}
}
</script>

<style lang="scss" scoped>
	.sing-herowinners {
		background: #C6C6C6;
		padding-bottom: 110px;
	}
	.singmetaicons {
		.v-image {
			vertical-align: middle;
		}
	}
	.makewhite {
		filter: grayscale(1) invert(1) brightness(2)
	}
</style>

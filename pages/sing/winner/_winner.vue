<template>
	<section>
		<SingAppBar :title="$store.state.judge_num + ' Judges Winner'" :back="true"/>
		<v-container v-if="winners != null && winners.length > 0" class="py-5">
			<v-avatar class="mr-3">
				<v-img :src="winners[0].customer.avatar ? winners[0].customer.avatar : 'https://via.placeholder.com/350x150'"></v-img>
			</v-avatar>
			{{winners[0].customer.name}}

			<v-btn text :href="winners[0].video.author_url">
				<v-icon class="mr-2">mdi-instagram</v-icon>
				{{winners[0].video.author_name}}
			</v-btn>
		</v-container>

		<client-only>
			<template v-if="winners != null && winners.length > 0">
				<template v-for="(item, i) in winners">
					<v-list color="transparent" class="mb-0" :key="'videoasdas-'+i">
						<v-list-item-group color="dark">
							<div class="devider-small"></div>
							<v-list-item @click="$router.push('/sing/winner/detail/'+item.id)">
								<v-list-item-content>
									<v-list-item-title class="text-uppercase">
										Stage: {{item.stage}}
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									<v-icon>mdi-chevron-right</v-icon>
								</v-list-item-icon>
							</v-list-item>
							<div class="devider-small"></div>
						</v-list-item-group>
					</v-list>
					<div :key="'videodetail-'+i" @click="$router.push('/sing/winner/detail/'+item.id)">
						<v-img :src="item.video.thumbnail_url"></v-img>
						<div class="devider-small my-2"></div>
						<v-container>
							<v-row class="text-center">
								<v-col cols="4">
									<div @click="item.is_star=!item.is_star">
										<strong>STAR</strong><br>
										<v-icon v-if="item.is_star" color="yellow">mdi-star</v-icon>
										<v-icon v-else>mdi-star-outline</v-icon>
									</div>
								</v-col>
								<v-col cols="4">
									<strong>VOTE</strong><br>
									{{item.total_vote}}
								</v-col>
								<v-col cols="4">
									<strong>COMMENTS</strong><br>
									{{item.total_comments}}
								</v-col>
							</v-row>
						</v-container>
					</div>
				</template>
			</template>
		</client-only>

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
				console.log(JSON.parse(JSON.stringify(res.data.data)));
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

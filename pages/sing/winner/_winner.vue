<template>
	<section>
		<SingAppBar title="#1 Judges Winner" :back="true"/>
		<v-container class="py-5">
			<v-avatar class="mr-3">
				<v-img :src="content.customer.avatar ? content.customer.avatar : 'https://via.placeholder.com/350x150'"></v-img>
			</v-avatar>
			{{content.customer.name}}

			<v-btn text>
				<v-icon class="mr-2">mdi-instagram</v-icon>
				{{content.customer.name}}
			</v-btn>
		</v-container>

		<template v-for="item in finals">
			<v-list color="transparent" class="mb-0" :key="item">
				<v-list-item-group color="dark">
					<div class="devider-small"></div>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title class="text-uppercase">
								Stage {{item}}: FINAL
							</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon>
							<v-icon>mdi-chevron-right</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<div class="devider-small"></div>
				</v-list-item-group>
			</v-list>
			<Video :key="'video-'+item"/>
		</template>

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
		}
	}
}
</script>

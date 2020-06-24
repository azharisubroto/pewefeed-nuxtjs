<template>
	<section class="sing">
		<SingAppBar :back="false"/>

		<Video/>

		<template v-if="singtab == 0">
			<v-list color="transparent" class="mb-10">
				<v-list-item-group color="dark">
					<template v-for="(item, i) in singcontent">
					<div v-if="i==0" :key="'dvdri-'+i" class="devider-small"></div>
					<v-list-item :key="'persmenu-'+i" :to="item.to">
						<v-list-item-content>
							<v-list-item-title>
								{{item.title}}
							</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon>
							<v-icon>mdi-chevron-right</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<div :key="'dvdr-'+i" class="devider-small"></div>
					</template>
					<div class="devider-small"></div>
				</v-list-item-group>
			</v-list>
		</template>

		<template v-if="singtab == 1">
			<v-container class="text-center pa-10">
				HADIAH
			</v-container>
		</template>

		<!-- BOTTOM NAVIGATION -->
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
			<v-btn>
				<span>Join</span>
				<img src="/img/icons/icon-join-orange.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<v-btn>
				<span>Prizes</span>
				<img src="/img/tukarpoin/tukarpoin-orange.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<ShareButton2/>
		</v-bottom-navigation>
	</section>
</template>

<script>
import ShareButton2 from "@/components/common/ShareButton2";
import SingAppBar from "@/components/sing/SingAppBar";
import Video from "@/components/sing/Video";
export default {
	name:"Sing",
	components: {
		ShareButton2,
		SingAppBar,
		Video
	},
	data(){
		return {
			singtab: 0,
			singcontent: [
				{
					title: 'Cara Ikutan',
					to: '/sing/cara-ikutan',
				},
				{
					title: 'Cara Vote',
					to: '/sing/cara-vote',
				},
				{
					title: 'Download Video',
					to: '/sing/download-video',
				},
				{
					title: 'Stage 1: Audisi',
					to: '/sing/stage-1',
				},
				{
					title: 'Stage 2: Semifinal',
					to: '/sing/stage-2',
				},
				{
					title: 'Stage 3: Final',
					to: '/sing/stage-3',
				},
				{
					title: 'Winner',
					to: '/sing/winners',
				},
			]
		}
	},
	mounted() {
		if( this.$router.currentRoute.query['tab'] ) {
			this.singtab = parseInt(this.$router.currentRoute.query['tab'])
		}
	}
}
</script>

<style lang="scss">
	.sing {
		iframe {
			width: 100%;
			height: 300px;
		}
	}
</style>

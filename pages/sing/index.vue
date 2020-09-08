<template>
	<section class="sing">
		<div v-if="content != null && !loading" >

			<SingAppBar :back="false" :title="content ? content.title : 'Sing with Latinka'"/>

			<template v-if="maintab == 0">
				<v-container class="mb-2">
					<Video/>
				</v-container>

				<v-container class="pt-0">
					<v-card color="#404040">
						<div class="py-5 px-3 text-center">
							<v-row>
								<v-col @click="$router.push('/sing/help/tentang')" cols="4">
									<v-img src="/img/icons/lucu-info.svg" width="20" max-width="20" class="d-inline-block"></v-img>
									<div class="mt-2 text-12">
										Tentang
									</div>
								</v-col>
								<v-col @click="$router.push('/sing/help/cara-join')" cols="4">
									<v-img src="/img/icons/lucu-carajoin.svg" width="20" max-width="20" class="d-inline-block"></v-img>
									<div class="mt-2 text-12">
										Cara Join
									</div>
								</v-col>
								<v-col @click="$router.push('/sing/help/cara-vote')" cols="4">
									<v-img src="/img/icons/lucu-votes.svg" width="20" max-width="20" class="d-inline-block"></v-img>
									<div class="mt-2 text-12">
										Cara Vote
									</div>
								</v-col>
								<v-col @click="$router.push('/sing/download/')" cols="4">
									<v-img src="/img/icons/lucu-download.svg" width="20" max-width="20" class="d-inline-block"></v-img>
									<div class="mt-2 text-12">
										Download Video
									</div>
								</v-col>
								<v-col @click="$router.push('/sing/prizes/')" cols="4">
									<v-img src="/img/icons/lucu-prizes.svg" width="20" max-width="20" class="d-inline-block"></v-img>
									<div class="mt-2 text-12">
										Prizes
									</div>
								</v-col>
								<v-col cols="4">
									<ShareButton2 tipe="Sing" independent>
										<v-img src="/img/icons/lucu-share.svg" width="20" max-width="20" class="d-inline-block"></v-img>
										<div class="mt-2 text-12">
											Share
										</div>
									</ShareButton2>
								</v-col>
							</v-row>
						</div>
					</v-card>

					<template v-for="(item, i) in singcontent">
						<v-card :key="'persmenu-'+i" color="#404040" :disabled="!item.isactive" class="px-4 py-4 my-3" :to="i<3 ? item.to : '/sing/winners/'">
							<div class="d-flex align-center justify-space-between">
								<div>
									<div class="d-flex align-center">
										<div class="text-center mr-5">
											<v-img :src="'/img/icons/stage-'+i+'.svg'" width="30px" max-width="30px"></v-img>
										</div>
										<div>
											<strong class="text-12">
												<span v-if="i<3">Babak {{i+1}}:</span>
												{{item.title}}
											</strong>
											<div class="text-10">Periode : {{item.start_date}} - {{item.end_date}}</div>
										</div>
									</div>
								</div>
								<div style="width:20px">
									<v-icon size="30">mdi-chevron-right</v-icon>
								</div>
							</div>
						</v-card>
					</template>
				</v-container>

				<!-- <v-list color="transparent" class="mb-10">
					<v-list-item-group color="dark">
						<template v-for="(item, i) in help">
						<div v-if="i==0" :key="'dvdrxx-'+i" class="devider-small"></div>
						<v-list-item :key="'persmenuxxx-'+i" :to="'/sing/help/'+item.to">
							<v-list-item-content>
								<v-list-item-title>
									{{item.title}}
								</v-list-item-title>
							</v-list-item-content>
							<v-list-item-icon>
								<v-icon>mdi-chevron-right</v-icon>
							</v-list-item-icon>
						</v-list-item>
						<div :key="'dvdx-'+i" class="devider-small"></div>
						</template>

						<v-list-item :to="'/sing/download/'">
							<v-list-item-content>
								<v-list-item-title>
									Download Video
								</v-list-item-title>
							</v-list-item-content>
							<v-list-item-icon>
								<v-icon>mdi-chevron-right</v-icon>
							</v-list-item-icon>
						</v-list-item>

						<template v-for="(item, i) in singcontent">
						<div v-if="i==0" :key="'dvdri-'+i" class="devider-small"></div>
						<v-list-item :disabled="!item.isactive" :key="'persmenu-'+i" :to="item.to" :class="[item.isactive == 1 ? 'active' : 'inactive']">
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
					</v-list-item-group>
				</v-list> -->
			</template>

			<template v-if="maintab == 1">
				<SingPrizes/>
			</template>
		</div>

		<div v-else-if="content == null && loading" class="text-center pa-10">
			<v-progress-circular color="deep-orange" indeterminate size="64"></v-progress-circular>
			<div class="mt-4 white--text" style="color:#fff">
				Loading...
			</div>
		</div>

		<div v-else class="pa-10 text-center">
			Tidak Ada Data
		</div>
		<!-- <br>
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
			<v-btn @click="maintab = 0">
				<span>Contestant</span>
				<img src="/img/icons/contestant.svg" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<v-btn @click="maintab = 1">
				<span>Prizes</span>
				<img src="/img/tukarpoin/tukarpoin-orange.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<ShareButton2 tipe="Sing"/>
		</v-bottom-navigation> -->
	</section>
</template>

<script>
import ShareButton2 from "@/components/common/ShareButton2";
import SingAppBar from "@/components/sing/SingAppBar";
import SingPrizes from "@/components/sing/SingPrizes";
import Video from "@/components/sing/Video";
import SingService from '@/services/SingService'

export default {
	name:"Sing",
	components: {
		ShareButton2,
		SingAppBar,
		Video,
		SingPrizes
	},
	data(){
		return {
			singtab: 0,
			maintab: 0,
			content: null,
			singcontent: [],
			help: [],
			prizes: null,
			loading: true,
		}
	},
	methods: {
		async getPromotedVideo() {
			console.log('fetching promoted video...')
			try {
				const res = await SingService.getPromoted()
				const data = await res.data.data
				this.content = data
				this.$store.commit('SET_SING_VIDEO', data.full_video)
				localStorage.setItem('SING_VIDEO', data.full_video)
				this.$store.commit('SET_SING_PROMOTED', data.id)
				console.log(data)
			} catch (error) {
				console.log(error)
			}
		},
		async getStages() {
			console.log('getting stages');
			try {
				const res = await SingService.getStage();
				const data = await res.data.data
				data.forEach(el => {
					this.singcontent.push({
						title: el.stage,
						to: '/sing/stage/' + el.slug,
						isactive: el.is_active,
						start_date: el.start_date,
						end_date: el.end_date,
					})
				});
				this.loading = false
			} catch (error) {
				console.log(error);
				this.loading = false
			}
		},
		async getHelp() {
			try {
				const res = await SingService.getHelp();
				const help =  await res.data.data
				console.log(help)
				let tempHelp = []
				help.forEach(el => {
					tempHelp.push({
						title: el.label,
						to: el.slug
					});
				});
				this.help = tempHelp;
			} catch (error) {

			}
		},
		// async fetchPrizes() {
		// 	try {
		// 		const res = await SingService.getPrizes();
		// 		this.prizes = await res.data.data;
		// 	} catch (error) {
		// 		console.log(error)
		// 	}
		// }
	},
	mounted() {
		if( this.$router.currentRoute.query['tab'] ) {
			this.singtab = parseInt(this.$router.currentRoute.query['tab'])
		}
		this.getPromotedVideo();
		this.getStages();
		this.getHelp();

		let singredirect = localStorage.getItem('sing_to_login');
		if( singredirect != null && singredirect !== undefined ) {
			localStorage.removeItem('sing_to_login');
		} else {
			localStorage.removeItem('sing_to_login');
		}
	}
}
</script>

<style lang="scss">
	.sing {
		position:relative;
		z-index: 1;
		&:before{
			content:"";
			width: 100%;
			z-index: -1;
			height: 50vh;
			//background: #C6C6C6;
			position:absolute;
		}
		iframe {
			width: 100%;
			height: 300px;
		}
		.v-list-item__title {
			font-size: 18px;
		}
	}
	.inactive {
		.v-icon {
			opacity: .5;
		}
	}
	.v-card {
		&.v-card--disabled .v-image {
			filter: grayscale(1) invert(1) brightness(1.5)
		}
	}
</style>

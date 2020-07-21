<template>
	<section class="sing">
		<div v-if="content != null" >

			<SingAppBar :back="false" :title="content ? content.title : 'Sing with Latinka'"/>

			<Video/>

			<template v-if="singtab == 0">
				<v-list color="transparent" class="mb-10">
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

						<div class="devider-small"></div>
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
						<div class="devider-small"></div>

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
						<div class="devider-small"></div>
					</v-list-item-group>
				</v-list>
			</template>

			<template v-if="singtab == 1">
				<div v-if="prizes!==null">
					<v-container>
						<div class="text-20"><strong>JUDGES WINNER</strong></div>
					</v-container>
					<template v-for="(item, i) in prizes">
						<div v-if="i<3" class="px-4 pt-0 pb-5" style="background:#fca729;border-bottom:1px solid #fff"  :key="'prize-'+i">
							<div class="text-center mb-4">
								<div class="px-7 py-3 d-inline-block" style="border-radius:0 0 4px 4px;background:#fa3824;color:#fff">
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

					<v-container>
						<div class="text-20"><strong>HIGHEST VOTES WINNER</strong></div>
					</v-container>
					<template v-for="(item, i) in prizes">
						<div v-if="i>=3" class="px-4 pt-0 pb-5" style="background:#fca729;border-bottom:1px solid #fff"  :key="'prize2-'+i">
							<div class="text-center mb-4">
								<div class="px-7 py-3 d-inline-block" style="border-radius:0 0 4px 4px;background:#fa3824;color:#fff">
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
		</div>
		<br>
		<br>
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
import SingService from '@/services/SingService'

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
			content: null,
			singcontent: [],
			help: [],
			prizes: null
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
						isactive: el.is_active
					})
				});
				this.singcontent.push({
					title: 'Winners',
					to: '/sing/winners/',
					isactive: 1
				})
			} catch (error) {
				console.log(error);
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
		async fetchPrizes() {
			try {
				const res = await SingService.getPrizes();
				this.prizes = await res.data.data;
			} catch (error) {
				console.log(error)
			}
		}
	},
	mounted() {
		if( this.$router.currentRoute.query['tab'] ) {
			this.singtab = parseInt(this.$router.currentRoute.query['tab'])
		}
		this.getPromotedVideo();
		this.getStages();
		this.getHelp();
		this.fetchPrizes();
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
	.inactive {
		.v-icon {
			opacity: .5;
		}
	}
</style>

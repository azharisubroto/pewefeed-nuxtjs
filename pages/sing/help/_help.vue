<template>
	<section class="sing-helphero">
		<div v-if="label != null && !loading">
			<SingAppBar
				:back="true"
				:title="label ? label : 'Sing with Latinka'"
			/>

			<template v-if="maintab == 0">
				<v-container>
					<div class="text-center mb-4">
						<BannerStatic slug="sing" />
					</div>
					<section class="helpexpandable" v-if="help">
						<v-expansion-panels
							v-model="helppanel"
							:accordion="true"
							focusable
						>
							<v-expansion-panel
								v-for="(item, index) in help"
								:key="index"
								class="mb-3"
							>
								<v-expansion-panel-header
									class="py-3 text-16"
									style="line-height: 28px"
									>{{ item.title }}</v-expansion-panel-header
								>
								<v-expansion-panel-content>
									<div
										v-html="formatText(item.content)"
										class="text-14 py-4"
										style="line-height: 30px"
									></div>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
					</section>
				</v-container>
			</template>

			<template v-if="maintab == 1">
				<Video />
				<SingPrizes />
			</template>
		</div>
		<div v-else>
			<LoadingBar />
		</div>
	</section>
</template>

<script>
import SingAppBar from "@/components/sing/SingAppBar"
import SingPrizes from "@/components/sing/SingPrizes"
import Video from "@/components/sing/Video"
import LoadingBar from "@/components/sing/LoadingBar"
import SingService from "@/services/SingService"
import UserService from "~/services/UserService"
import BannerStatic from "@/components/common/BannerStatic"

export default {
	name: "Sing",
	components: {
		SingAppBar,
		SingPrizes,
		Video,
		BannerStatic,
		LoadingBar,
	},
	data() {
		return {
			singtab: 0,
			maintab: 0,
			helppanel: 0,
			label: null,
			singcontent: [],
			help: [],
			prizes: null,
			loading: true,
		}
	},
	methods: {
		async getHelp() {
			try {
				const res = await SingService.getHelpDetail(
					this.$route.params.help
				)
				const help = await res.data.data.subhelps
				this.label = res.data.data.label
				//console.log(help)
				let tempHelp = []
				help.forEach((el) => {
					tempHelp.push({
						title: el.label,
						content: el.description,
					})
				})
				this.help = tempHelp
				this.loading = false
			} catch (error) {
				this.loading = false
			}
		},
		formatText(text) {
			const doc = text
			return doc.replace(/(?:\r\n|\r|\n)/g, "<br>")
		},
		async fetchPrizes() {
			try {
				const res = await SingService.getPrizes()
				this.prizes = await res.data.data
			} catch (error) {
				console.log(error)
			}
		},
	},
	mounted() {
		this.getHelp()
		this.fetchPrizes()
	},
}
</script>

<style lang="scss">
.sing {
	iframe {
		width: 100%;
		height: 300px;
	}
}

.helpexpandable {
	.v-expansion-panels {
		.v-expansion-panel {
			border-radius: 6px;
			&:after {
				opacity: 0 !important;
			}
			.v-expansion-panel-content__wrap {
				border-top: 1px solid #000;
			}
			.v-expansion-panel-header::before {
				opacity: 0 !important;
			}
		}
	}
}

.singbanner {
	background: linear-gradient(102.55deg, #ed1cff 13.32%, #ff1c1c 78.48%);
	border-radius: 5px;
	height: 147px;
	line-height: 147px;
	text-align: center;
	font-weight: bold;
}
</style>

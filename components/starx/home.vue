<template>
	<v-container class="grey lighten-5">
		<v-row no-gutters>
			<v-col v-for="n in 1" :key="n" cols="sm" align="center">
				<a href="#">
					<v-img
						src="/img/starx-banner.png"
						lazy-src="/img/starx-banner.png"
						aspect-ratio="1"
						class="grey lighten-2 starx-banner"
						width="317"
						height="415"
					>
						<template v-slot:placeholder>
							<v-row
								class="fill-height ma-0"
								align="center"
								justify="center"
							>
								<v-progress-circular
									indeterminate
									color="green"
								></v-progress-circular>
							</v-row>
						</template>
					</v-img>
				</a>
			</v-col>
		</v-row>

		<v-card
			v-for="program in programs"
			:key="program.id"
			class="mx-auto my-5"
			max-width="344"
			outlined
			@click="$router.push(program.url)"
		>
			<v-list-item three-line>
				<v-list-item-content>
					<v-list-item-title class="mb-1">{{
						program.headline
					}}</v-list-item-title>
					<v-list-item-subtitle>{{
						program.desc
					}}</v-list-item-subtitle>
				</v-list-item-content>

				<v-list-item-avatar tile size="80" color="white">
					<img :src="program.img" :alt="program.headline" />
				</v-list-item-avatar>
			</v-list-item>

			<v-card-actions>
				<v-btn
					@click="$router.push(program.url)"
					color="deep-orange"
					dark
					depressed
					small
					>Lihat</v-btn
				>
			</v-card-actions>
		</v-card>

		<template v-for="(eskul, i) in eskuls">
			<v-card
				class="mx-auto my-5"
				max-width="344"
				outlined
				:key="eskul.id"
				v-if="i > 0"
			>
				<v-list-item three-line>
					<v-list-item-content>
						<v-list-item-title class="mb-1">{{
							eskul.eskul.name
						}}</v-list-item-title>
						<v-list-item-subtitle
							>Peserta:
							{{ eskul.participant }}</v-list-item-subtitle
						>
					</v-list-item-content>

					<v-list-item-avatar tile size="80" color="white">
						<img :src="icon" :alt="eskul.eskul.name" />
					</v-list-item-avatar>
				</v-list-item>

				<v-card-actions>
					<v-btn
						@click="$router.push('#')"
						color="deep-orange"
						dark
						depressed
						small
						>Lihat</v-btn
					>
				</v-card-actions>
			</v-card>
		</template>
	</v-container>
</template>

<script>
const $img =
	"https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/program/starx.png"
import StarxService from "@/services/StarxService"
export default {
	name: "Starx",
	data() {
		return {
			programs: [
				{
					id: 0,
					img: $img,
					headline: "BAND",
					desc: "Peserta: Siswa SMP & SMA",
					url: "/starx/band",
				},
			],
			eskuls: [],
			icon: $img,
		}
	},
	methods: {
		async StarxHome() {
			try {
				const response = await StarxService.getStarx()
				const results = response.data.data
				this.eskuls = results.eskuls
				// //console.log(JSON.parse(JSON.stringify(this.eskuls)))
			} catch (error) {
				console.log(error)
			}
		},
	},
	mounted() {
		this.StarxHome()
	},
}
</script>

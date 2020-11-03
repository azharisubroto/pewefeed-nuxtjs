<template>
	<v-card v-if="obj" :elevation="0" style="border: 1px solid #757575">
		<v-card-text class="caption">
			<v-icon small size="12" class="mr-1"> mdi-calendar-blank </v-icon>
			{{ obj.created_at }}

			<v-icon small size="12" class="mr-1 ml-2"> mdi-eye-outline </v-icon>
			123

			<v-icon small size="12" class="mr-1 ml-2">
				mdi-message-text-outline
			</v-icon>
			0

			<h2 class="mt-3">{{ obj.description }}</h2>
			<div class="devider-small my-2"></div>
			<!-- <v-row align="center" class="sm" v-if="obj.band" @click="$router.push('/starx/band/detail/'+obj.band.slug)">
				<v-col cols="1">
					<v-avatar
						size="25"
						@click="$router.push( '/starx/band/video/'+obj.slug )"
					>
						<img v-if="band.avatar != ''" :src="band.avatar" alt="alt">
						<img v-else src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/member/avatar-fallback.png" alt="alt">
					</v-avatar>
				</v-col>
				<v-col cols="10" class="pb-0" style="margin-top: -14px">
					<strong style="font-size:14px;">{{ obj.band ? obj.band.name : '' }}</strong>
					<div>{{ obj.school }}</div>
				</v-col>
			</v-row> -->
		</v-card-text>

		<div
			v-if="obj.video && obj.video.includes('iframe')"
			v-html="obj.video"
		></div>
		<div v-else>
			<div v-html="renderVideo(obj.video)"></div>
		</div>

		<v-row class="sm px-3" align="center">
			<v-col cols="2" class="caption">
				<span :id="'starcount-' + obj.id">{{ obj.star }}</span
				>/<span style="color: blue">100</span>
			</v-col>
			<v-col cols="5">
				<v-progress-linear
					:value="obj.star"
					color="light-blue"
					height="10"
					reactive
					rounded
				></v-progress-linear>
			</v-col>
			<v-col cols="5">
				<v-btn
					@click="checkVIP(obj.id, obj.band.id)"
					class="px-4"
					dark
					depressed
					color="orange accent-4"
				>
					<v-icon left dark>mdi-star</v-icon>
					Kirim Star<br />
					(+5 Poin)
				</v-btn>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
export default {
	name: "VideoLoopBig",
	props: ["obj", "band"],
	methods: {
		renderVideo(code) {
			return (
				'<iframe height="180" src="https://www.youtube.com/embed/' +
				code +
				'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" style="width:100%;height:180px" allowfullscreen></iframe>'
			)
		},
	},
}
</script>

<template>
	<div>
		<NuxtLink :to="makeSlug(article.link)">
			<v-row :class="['topview-item', custclass ? custclass : '']">
				<v-col cols="4">
					<v-img
						:src="article.image.small"
						aspect-ratio="1"
						class="grey lighten-2"
					>
						<v-icon
							dark
							size="35"
							class="playbutton"
							v-if="
								isSixty(article.title) ||
								isFakta(article.class ? article.class : null) ||
								article.isVideo == true
							"
							>mdi-play-circle-outline</v-icon
						>
					</v-img>
				</v-col>
				<v-col
					cols="8"
					class="d-flex align-content-space-between flex-wrap"
				>
					<h2 class="newslooptitle">{{ article.title }}</h2>

					<v-rating
						v-if="article.rating >= 0"
						background-color="orange"
						color="orange lighten-2"
						readonly
						size="20"
						class="mb-3"
						dense
						:value="getrating(article.rating)"
					></v-rating>

					<div class="meta text--gray" style="font-size: 12px">
						<span :class="article.type">{{
							isSixty(article.title) ? "SIXTY/" : ""
						}}</span>
						<span :class="article.type">{{ article.type }}</span>
						-
						{{
							article.published_at
								? article.published_at
								: article.publish_at
						}}
					</div>
				</v-col>
			</v-row>
		</NuxtLink>
	</div>
</template>

<script>
export default {
	name: "NewsLoop2",
	props: ["article", "ADSlayoutKey", "ADSclient", "ADSslot", "custclass"],
	methods: {
		isSixty(title) {
			if (title.indexOf("SIXTY") >= 0) {
				return true
			} else {
				return false
			}
		},
		isFakta(classname) {
			if (classname == "fakta") {
				return true
			}
			return false
		},
		getrating(num) {
			var rating = num / 20
			rating = rating.toFixed(0)
			return parseInt(rating)
		},
		makeSlug(link) {
			return link.replace("https://pewefeed.com/", "/")
		},
	},
}
</script>

<style lang="scss">
.fakta {
	background: purple;
	color: #fff;
}
</style>

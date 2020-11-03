<template>
	<section>
		<!-- LATEST -->
		<flickity
			v-if="items && items.length > 0"
			ref="heroslide"
			:id="id"
			:options="flickityOptions"
		>
			<div
				v-for="article in items"
				:key="article.id"
				@click="$router.push(article.link)"
				class="featured-item"
			>
				<v-img
					:src="article.image"
					aspect-ratio="1"
					class="grey lighten-2"
				></v-img>
				<div class="caption">
					<div class="caption-inner">
						<strong>{{ article.type }}</strong>
						<h2 class="mt-1">{{ article.title }}</h2>
					</div>
				</div>
			</div>
		</flickity>
	</section>
</template>

<script>
export default {
	name: "HeroSlide",
	props: ["id", "items"],
	data() {
		return {
			flickityOptions: {
				groupCells: 1,
				prevNextButtons: false,
				pageDots: true,
				wrapAround: true,
			},
		}
	},
}
</script>

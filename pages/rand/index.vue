<template>
	<section>
		<div class="text-xs-center" align="center">
			<v-progress-circular
				indeterminate
				:size="80"
				:width="8"
				color="deep-orange"
				class="mt-5">
			</v-progress-circular>
		</div>
	</section>
</template>
<script>
import ArticleService from '@/services/ArticleService'
export default {
	name:"RandPage",
	methods: {
		async doRand() {
			try {
				const res = await ArticleService.getRand()
				//console.log(res);
				if( res.data.data ) {
					var article = res.data.data.article
					var link = article.link
					var type = article.type.toLowerCase().replace(' ', '-')
					var reaction = article.reaction.toLowerCase().replace(' ', '-')
					var slug = article.slug
					var articlepath = '/'+ type +'/'+ reaction +'/'+ slug
					//console.log(articlepath)
					this.$router.push(articlepath)
				}
			} catch (error) {
				console.log(error)
			}

		}
	},
	mounted() {
		this.doRand();
	}
}
</script>

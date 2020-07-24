<template>
	<div>
		<v-container v-if="content!=null">
			<h4 class="deep-orange--text text-20 mb-4 mt-5">{{content.title}}</h4>
			<div v-html="content.content"></div>
		</v-container>
	</div>
</template>

<script>
import ArticleService from "@/services/ArticleService"
export default {
	name:"about-daily-limit",
	data(){
		return {
			content:null
		}
	},
	methods: {
		async fetchBantuan() {
		try {
			const res = await ArticleService.aboutDailyLimit();
			const data = res.data.data;
			// console.log(JSON.parse(JSON.stringify(data)));
			this.content = data;
			//this.loading = false
		} catch (error) {
			console.log(error);
		}
		}
	},
	mounted() {
		this.fetchBantuan();
	}
}
</script>

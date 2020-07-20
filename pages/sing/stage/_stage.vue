<template>
	<section class="sing">
		<SingAppBar :title="content ? content.stage.label : 'Stage'" :back="true"/>
		<StageContent v-if="content!=null && !isloading" :page="page" :content="content" :pesertaloop="peserta" :stage="content.stage.id" title="STAGE 1: Audisi ini berakhir tanggal 31 Mei 2020"/>
		<div v-else-if="peserta == null && isloading" class="pa-10 text-center">Memuat Data...</div>
		<div v-else-if="peserta == null && !isloading" class="pa-10 text-center">Tidak Ada Data</div>
	</section>
</template>

<script>

import SingAppBar from "@/components/sing/SingAppBar";
import StageContent from "@/components/sing/StageContent";
import SingService from "@/services/SingService";
export default {
	name:"Sing",
	components: {
		StageContent,
		SingAppBar
	},
	data() {
		return {
			content: null,
			peserta: null,
			isloading: true,
			filter: 'oldest',
			page: 1,
		}
	},
	methods: {
		async stageDetail(slug, filterkey, page) {
			this.isloading = true
			this.content = null
			this.peserta = null

			try {
				const res =  await SingService.getStageDetail(slug, filterkey, page)
				const data = await res.data
				this.content = data
				this.peserta = data.video_customer
				this.isloading = false
				console.log(JSON.parse(JSON.stringify(this.peserta)))
			} catch (error) {
				console.log(error)
				this.isloading = true
				this.content = null
				this.peserta = null
			}
		},
		next(num) {
			//this.fetchWait(num)
			this.loading = true
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		}
	},
	mounted() {
		this.stageDetail(this.$route.params.stage, this.filter, 1);

		this.$bus.$on('singprefetchItems', (filterkey) => {
			this.stageDetail(this.$route.params.stage, filterkey, 1);
			this.filter = filterkey
		})
		this.$bus.$on('paginate', (num) => {
			this.stageDetail(this.$route.params.stage, this.filter, num);
			this.page = num
		})
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
	.pesertalist {
		border-bottom: 3px solid #d1d1d1;
		padding: 30px 0;
		// &:first-of-type {
		// 	//padding-top: 0;
		// }
	}
</style>

<template>
	<section class="sing">
		<SingAppBar :title="content ? content.stage.label : 'Stage'" :back="true"/>
		<StageContent v-if="peserta!=null && !isloading" :type="type" :content="content" :pesertaloop="peserta" :stage="content.stage.id" title="STAGE 1: Audisi ini berakhir tanggal 31 Mei 2020"/>
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
			type: 'default'
		}
	},
	methods: {
		async stageDetail(slug, page) {
			try {
				const res =  await SingService.getStageDetail(slug, page)
				const data = await res.data
				this.content = data
				this.peserta = data.video_customer
				this.isloading = false
				console.log(JSON.parse(JSON.stringify(this.peserta)))
			} catch (error) {
				console.log(error)
			}
		},
	},
	mounted() {
		this.stageDetail(this.$route.params.stage);
		this.$bus.$on('singSearchLoading', () => {
			this.content = null
			this.peserta = null
			this.isloading = true
		});
		this.$bus.$on('singReplaceData', (data) => {
			this.content = data
			let vide = data.video_customer
			if( vide.length > 0 ) {
				this.peserta = data.video_customer;
			} else {
				this.peserta = null;
			}
			this.isloading = false
			this.type = 'search'
		});
		this.$bus.$on('refetchPaginate', (num) => {
			this.content = null
			this.peserta = null
			this.isloading = true
			this.stageDetail(this.$route.params.stage, num);
			this.type = 'default'
		});
		this.$bus.$on('singSortItem', (data) => {
			this.content = data
			this.peserta = data.video_customer
			this.isloading = false
			this.type = 'sort'
		});
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

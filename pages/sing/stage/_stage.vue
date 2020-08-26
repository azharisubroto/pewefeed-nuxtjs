<template>
	<section class="sing-stage">
		<StageContent v-if="!isloading && content != null" :type="type" :content="content" :pesertaloop="peserta" :stage="content.stage.id" title="STAGE 1: Audisi ini berakhir tanggal 30 Agustus 2020"/>
		<div v-else-if="isloading && content == null" class="text-center pa-10">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
			<div class="mt-4">
				Loading...
			</div>
		</div>
		<div v-else class="pa-10 text-center">
			Tidak Ada Data
		</div>
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
			type: 'default',
			isrunning: null,
		}
	},
	methods: {
		async stageDetail(slug, page) {
			try {
				const res =  await SingService.getStageDetail(slug, page)
				const data = await res.data
				if( data.video_customer.length > 0 ) {
					this.content = data
					this.peserta = data.video_customer;
				} else {
					this.peserta = null;
				}
				this.isloading = false
				//console.log(JSON.parse(JSON.stringify(this.peserta)))
			} catch (error) {
				console.log(error)
				this.isloading = false
			}
		},
	},
	mounted() {
		this.stageDetail(this.$route.params.stage, 1);
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
			let vide = data.video_customer
			if( vide.length > 0 ) {
				this.peserta = data.video_customer;
			} else {
				this.peserta = null;
			}
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
		margin: 0 0 15px 0;
		// &:first-of-type {
		// 	//padding-top: 0;
		// }
	}
</style>

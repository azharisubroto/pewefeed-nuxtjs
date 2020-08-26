<template>
	<div class="sing video-container">
		<iframe v-if="$store.state.sing_video" width="560" height="315" :src="'https://www.youtube.com/embed/'+$store.state.sing_video" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		<iframe v-else-if="!$store.state.sing_video && altvideo!=null" width="560" height="315" :src="'https://www.youtube.com/embed/'+altvideo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	</div>
</template>

<script>
export default {
	name:"SingVideo",
	props: ['video_id'],
	data(){
		return {
			altvideo: null,
		}
	},
	mounted() {
		let SING_VIDEO = localStorage.getItem('SING_VIDEO');
		if( SING_VIDEO != null ) {
			this.altvideo = SING_VIDEO
		}
	}
}
</script>

<style lang="scss">
	// .sing {
	// 	// iframe {
	// 	// 	width: 100%;
	// 	// 	height: 300px;
	// 	// 	z-index: 0;
	// 	// }
	// }
	.video-container {
		overflow: hidden;
		position: relative;
		width:100%;
		z-index: 0;
	}

	.video-container::after {
		//padding-top: 56.25%;// 75 if 4:3
		padding-top: 75%;// 75 if 4:3
		display: block;
		content: '';
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>

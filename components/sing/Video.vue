<template>
	<div class="sing video-container mb-4">
		<iframe width="560" height="315" src="https://www.youtube.com/embed/wJYUWuqFjgA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	</div>
</template>

<script>
export default {
	name:"SingVideo"
}
</script>

<style lang="scss">
	.sing {
		iframe {
			width: 100%;
			height: 300px;
		}
	}
	.video-container {
		overflow: hidden;
		position: relative;
		width:100%;
	}

	.video-container::after {
		padding-top: 56.25%;// 75 if 4:3
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

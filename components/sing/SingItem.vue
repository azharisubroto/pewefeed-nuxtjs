<template>
	<div>
		<v-row>
			<v-col cols="6">
				<v-img :src="item.video_thumb"></v-img>
			</v-col>
			<v-col cols="6">
				<div class="text-center pt-4">
					<v-avatar>
						<v-img :src="item.avatar"></v-img>
					</v-avatar>
					<div class="my-3"></div>
					{{item.name}}
				</div>
			</v-col>
		</v-row>
		<div class="devider-small my-2"></div>
		<v-row class="text-center">
			<v-col cols="4">
				<div @click="item.star=!item.star">
					<strong>STAR</strong><br>
					<v-icon v-if="item.star" color="yellow">mdi-star</v-icon>
					<v-icon v-else>mdi-star-outline</v-icon>
				</div>
			</v-col>
			<v-col cols="4">
				<strong>VOTE</strong><br>
				{{item.vote}}
			</v-col>
			<v-col cols="4">
				<strong>COMMENTS</strong><br>
				{{item.comments}}
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	name:"SingItem",
	props: ['item']
}
</script>

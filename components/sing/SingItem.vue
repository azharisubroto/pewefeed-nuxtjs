<template>
	<div>
		<v-row>
			<v-col cols="6">
				<a @click="$router.push('/sing/video/'+item.id)"><v-img :src="item.video.thumbnail_url" :aspect-ratio="1"></v-img></a>
				<!-- <div v-html="item.video.html"></div> -->
			</v-col>
			<v-col cols="6">
				<div class="text-center pt-4">
					<v-avatar @click="$router.push('/sing/video/'+item.id)">
						<v-img :src="item.customer.avatar"></v-img>
					</v-avatar>
					<div class="my-3"></div>
					{{item.customer.name}}
				</div>
			</v-col>
		</v-row>
		<div class="devider-small my-2"></div>
		<v-row class="text-center">
			<v-col cols="4">
				<div @click="item.is_star=!item.is_star">
					<strong>STAR</strong><br>
					<v-icon v-if="item.is_star" color="yellow">mdi-star</v-icon>
					<v-icon v-else>mdi-star-outline</v-icon>
				</div>
			</v-col>
			<v-col cols="4">
				<strong>VOTE</strong><br>
				{{item.total_vote}}
			</v-col>
			<v-col cols="4">
				<strong>COMMENTS</strong><br>
				{{item.total_comments}}
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

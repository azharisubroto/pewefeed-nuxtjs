<template>
	<div @click="$router.push('/sing/video/'+item.id)">
		<v-img :src="item.video.thumbnail_url" :aspect-ratio="16/9">
			<div class="singstarstatus">
				<img v-if="item.is_star" src="/img/icons/star-yellow.svg" alt="">
				<img v-else src="/img/icons/star-default.svg" alt="">
			</div>
		</v-img>

		<div class="d-flex justify-space-between align-center mt-3">
			<div>
				<v-avatar size="30" @click="$router.push('/sing/video/'+item.id)">
					<v-img cover :src="item.customer.avatar ? item.customer.avatar : 'https://via.placeholder.com/350x150'"></v-img>
				</v-avatar>
				<div class="d-inline-block ml-2 text-14">
					{{item.customer.name ? item.customer.name : 'n/a'}}
				</div>
			</div>

			<div class="text-14 d-flex align-center justify-content-end metasing">
				<div class="d-inline-block">
					<v-img src="/img/icons/rank.svg" width="14" max-width="14" class="mr-1 d-inline-block"></v-img>
					({{item.ranking ? item.ranking : 'n/a'}})
				</div>
				<div class="d-inline-block ml-3">
					<v-img src="/img/icons/thumb.svg" width="14" max-width="14" class="mr-1 d-inline-block"></v-img>
					({{item.total_vote ? item.total_vote : '0'}})
				</div>
				<div class="d-inline-block ml-3">
					<v-img src="/img/icons/comment-single.svg" width="14" max-width="14" class="mr-1 d-inline-block"></v-img>
					({{item.total_comments ? item.total_comments : '0'}})
				</div>
			</div>
		</div>

		<!-- <v-row>
			<v-col cols="6">
				<a @click="$router.push('/sing/video/'+item.id)"><v-img :src="item.video.thumbnail_url" :aspect-ratio="1"></v-img></a>
			</v-col>
			<v-col cols="6">
				<div class="text-center pt-4">
					<v-avatar @click="$router.push('/sing/video/'+item.id)">
						<v-img cover :src="item.customer.avatar"></v-img>
					</v-avatar>
					<div class="my-3"></div>
					{{item.customer.name}}
				</div>
			</v-col>
		</v-row>
		<div class="devider-small my-2"></div>
		<v-row class="text-center">
			<v-col cols="4">
				<div>
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
		</v-row> -->
	</div>
</template>

<script>
export default {
	name:"SingItem",
	props: ['item']
}
</script>
<style lang="scss">
	.v-avatar {
		overflow: hidden;
		position: relative;
		img {
			position: absolute;
			top: 0;
			bottom: 0;
			width: 100%;
			border-radius: 0!important;
		}
	}
	.metasing {
		.v-image {
			vertical-align: middle;
		}
	}
	.singstarstatus {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
</style>

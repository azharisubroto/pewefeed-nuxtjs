<template>
	<v-card
	:elevation="0"
	:color="what_type ? '#fff' : '#404040'"
	:class="what_type ? 'cardtype' : 'dark pt-5 px-0'">
		<div class="d-flex justify-space-between align-center mb-3 px-4">
			<div>
				<v-avatar size="30" @click="$router.push('/sing/video/'+item.id)">
					<v-img cover :src="item.customer.avatar ? item.customer.avatar : 'https://via.placeholder.com/350x150'"></v-img>
				</v-avatar>
				<div class="d-inline-block ml-2 text-14">
					{{item.customer.name ? item.customer.name : 'n/a'}}
				</div>
			</div>

			<div>
				<v-btn v-if="item.customer.instagram!=null" :href="'https://instagram.com/'+item.customer.instagram" target="_BLANK" class="ml-2" small color="deep-orange">
					<v-icon>mdi-instagram</v-icon>
				</v-btn>
				<v-btn v-if="what_type" color="deep-orange" small @click="$router.push('/sing/video/'+item.id)">Lihat</v-btn>
				<v-btn v-else color="deep-orange" small @click="$router.push('/sing/video/'+item.id)">
					<img src="" alt=""> {{ stillrunning ? 'Vote' : 'Lihat' }}
				</v-btn>
			</div>
		</div>

		<v-img 
		class="deep-orange lighten-3" 
		:src="item.video.thumbnail_url" 
		:aspect-ratio="16/9" 
		@click="$router.push('/sing/video/'+item.id)"
		></v-img>

		<div class="d-flex justify-space-between pr-4" @click="$router.push('/sing/video/'+item.id)">
			<div>
				<div class="text-20 float-left text-center px-4" style="line-height:40px">
					<strong>{{item.ranking}}</strong>
				</div>
				<div style="background:#000;border-radius: 0;color:#fff" class="px-3 py-2 float-left">
					<v-icon size="16" v-if="item.is_star" color="#FFC107">mdi-star</v-icon>
					<v-icon size="16" v-else color="#fff">mdi-star-outline</v-icon>
				</div>
			</div>

			<div class="singmetaicons text-12 d-flex align-center justify-content-end metasing pt-1">
				{{item.viewers}} Melihat &nbsp;&bull;&nbsp;
				{{item.total_vote ? item.total_vote : '0'}} Vote &nbsp;&bull;&nbsp;
				{{item.total_comments ? item.total_comments : '0'}} Komentar
			</div>
		</div>
	</v-card>
</template>

<script>
export default {
	name:"SingItem",
	props: {
		item: Object,
		cardtype: String,
		isrunning: Boolean
	},
	data() {
		return {
			what_type: this.cardtype,
			stillrunning: this.isrunning
		}
	}
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
	.cardtype {
		background: transparent!important;
		color: #000!important;

		.singmetaicons {
			.v-image {
				filter: invert(1)
			}
		}
	}
</style>

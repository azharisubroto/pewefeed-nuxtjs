<template>
	<section class="sing">
		<SingAppBar/>

		<Video/>

		<section class="toppoin-acc" v-if="content">
			<v-expansion-panels v-for="(item,index) in content" :key="index">
				<v-expansion-panel class="mb-0">
					<v-expansion-panel-header class="py-5 text-uppercase">{{item.title}}</v-expansion-panel-header>
					<v-expansion-panel-content class='caption'>
						<div v-html="item.content"></div>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</section>
	</section>
</template>


<script>
import ShareButton2 from "@/components/common/ShareButton2";
import SingAppBar from "@/components/sing/SingAppBar";
import Video from "@/components/sing/Video";
export default {
	name:"Sing Detail",
	components: {
		ShareButton2,
		SingAppBar,
		Video
	},
	data() {
		return {
			content: [
				{
					title: 'Register di PEWEFEED.COM',
					content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, accusantium assumenda doloribus earum cum dolorum aliquam sint quasi dolorem quibusdam, itaque suscipit hic porro. Aut commodi modi dolores dolorem delectus?"
				},
				{
					title: 'REKAM VIDEOMU DAN Nyanyikan liriknya',
					content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, accusantium assumenda doloribus earum cum dolorum aliquam sint quasi dolorem quibusdam, itaque suscipit hic porro. Aut commodi modi dolores dolorem delectus?"
				},
				{
					title: 'Dynamic Content',
					content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, accusantium assumenda doloribus earum cum dolorum aliquam sint quasi dolorem quibusdam, itaque suscipit hic porro. Aut commodi modi dolores dolorem delectus?"
				},
				{
					title: 'Dynamic Content',
					content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, accusantium assumenda doloribus earum cum dolorum aliquam sint quasi dolorem quibusdam, itaque suscipit hic porro. Aut commodi modi dolores dolorem delectus?"
				},
			]
		}
	}
}
</script>

<style lang="scss">
	.toppoin-acc {
		.v-expansion-panels {
			.v-expansion-panel {
				background: #1c1c1f!important;
				border-top: 1px solid rgba(255, 255, 255, 0.5);
			}
			&:last-of-type {
				.v-expansion-panel {
					border-bottom: 1px solid rgba(255, 255, 255, 0.5);
				}
			}
			.v-expansion-panel-content__wrap {
				background: #000!important;
				padding-top:15px;
				font-size: 14px;
				border-top: 1px solid rgba(255, 255, 255, 0.5);
			}
		}
	}
</style>

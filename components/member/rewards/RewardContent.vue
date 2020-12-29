<template>
	<div>
		<v-card-text class="py-1 px-3">
			<v-row>
				<v-col cols="2" class="pr-0">
					<div>
						<v-img
							:src="item.image ? item.image : '/img/user.jpeg'"
						></v-img>
					</div>
				</v-col>
				<v-col cols="10">
					<v-btn
						light
						small
						depressed
						color="#fff"
						rounded
						height="21"
						class="mb-1"
					>
						<span
							class="text-8 deep-orange--text"
							style="text-transform: initial !important"
							>{{ translateType(type) }}</span
						>
					</v-btn>

					<h4 class="reward-title text-uppercase">
						{{ item.title }}
					</h4>
					<div class="caption">
						{{ item.created_at }}
					</div>
				</v-col>
			</v-row>
		</v-card-text>
	</div>
</template>

<script>
export default {
	name: "RewardContent",
	props: ["item", "type"],
	methods: {
		translateType(type) {
			if (type == "wait") {
				return "Menunggu"
			} else if (type == "process") {
				return "Diproses"
			} else if (type == "confirmation") {
				return "Dikirim"
			} else if (type == "finish") {
				return "Diterima"
			}
		},
	},
}
</script>
<style lang="scss">
.reward-title {
	color: #fff;
	font-size: 12px;
	font-weight: normal;
}
</style>

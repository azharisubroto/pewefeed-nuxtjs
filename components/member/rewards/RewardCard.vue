<template>
	<div>
		<v-card v-for="item in list" :key="item.id" :elevation="2" class="mb-4">
			<v-card-text>
				<v-row>
					<v-col cols="4">
						<v-img :src="item.image ? item.image : '/img/user.jpeg'"></v-img>
					</v-col>
					<v-col cols="8">
						<div class="caption">{{item.created_at}}</div>
						<h4>{{item.title}}</h4>
						<div class="caption">
							on program - Tukar Poin
						</div>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</div>
</template>
<script>
export default {
	name:"RewardCard",
	props: ['list']
}
</script>
<style lang="sass">
	.v-card, .v-application .elevation-2
		box-shadow: 0 12px 14px rgba(0, 0, 0, 0.1) !important
</style>

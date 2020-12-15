<template>
	<div>
		<v-card-text>
			<v-row>
				<v-col cols="3" class="pr-0">
					<div>
						<v-img
							:src="item.image ? item.image : '/img/user.jpeg'"
						></v-img>
					</div>
				</v-col>
				<v-col cols="8">
					<h4 class="reward-title">
						{{ item.title }}
					</h4>
					<div class="caption">
						{{ item.created_at }}
					</div>

					<div
						class="green--text text-12 mt-3"
						v-if="type == 'finish'"
					>
						<v-row no-gutters>
							<v-col cols="2" class="pr-1">
								<div>
									<img
										src="/img/checklist.png"
										width="20"
										height="20"
										alt=""
									/>
								</div>
							</v-col>
							<v-col> DITERIMA : {{ item.created_at }} </v-col>
						</v-row>
					</div>

					<v-btn color="#ff4200" depressed small class="mt-4">
						<template v-if="type == 'wait'">
							Pilih Tujuan Penerima
						</template>
						<template
							v-if="type == 'process' || type == 'confirmation'"
						>
							Lacak
						</template>
						<template v-if="type == 'finish'"> Rincian </template>
					</v-btn>
				</v-col>
			</v-row>
		</v-card-text>
	</div>
</template>

<script>
export default {
	name: "RewardContent",
	props: ["item", "type"],
}
</script>
<style lang="scss">
.reward-title {
	color: #ffaa8c;
	font-size: 14px;
}
</style>

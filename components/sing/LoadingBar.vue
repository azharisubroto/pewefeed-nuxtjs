<template>
	<v-bottom-sheet v-model="loading" persistent>
		<v-sheet style="border-top: 2px solid #fff">
			<v-container>
				<v-row align="center">
					<v-col cols="12" class="text-center py-0">
						Loading
					</v-col>
				</v-row>
			</v-container>
			<div class="divider thin"></div>


			<div class="py-3">
				<div class="pt-5 pb-10 px-5 text-center">
					<v-progress-linear
						color="green accent-4"
						indeterminate
						rounded
						height="10"
					></v-progress-linear>
				</div>
			</div>
		</v-sheet>
	</v-bottom-sheet>
</template>

<script>
export default {
	name:"LoadingBar",
	data() {
		return {
			loading: true
		}
	}
}
</script>

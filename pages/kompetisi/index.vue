<template>
	<section>
		<v-container>
			<v-row>
				<!-- <v-col cols="12" v-if="isAvailable">
					<v-card v-for="(program, i) in programs" :key="i" class="px-4 mb-3" to="/starx/band">
						<v-row>
							<v-col cols="3">
								<v-img
								:src="program.logo"
								aspect-ratio="1"
								>
								</v-img>
							</v-col>
							<v-col cols="9" class="d-flex align-content-space-between flex-wrap">
								<h3>{{program.title}}</h3>

								<div class="caption">
									<strong>{{program.periode}}</strong>
									<div></div>
									<div v-html="program.short_description"></div>
								</div>
								<v-btn
									small
									outlined
									color="green"
									class="mt-2"
									v-if="program.active == 'true'"
								>
									Active
								</v-btn>
								<v-btn
									small
									outlined
									color="red"
									class="mt-2"
									v-else
								>
									Inactive
								</v-btn>
							</v-col>
						</v-row>
					</v-card>
				</v-col> -->
				<!-- <v-col cols="12" v-else> -->
				<v-col cols="12">
					<v-alert
						prominent
						text
						type="info"
						success>Belum ada kompetisi yang tersedia</v-alert>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script>
import ProgramService from "@/services/ProgramService";
export default {
	name: "kompetisi",
	data: () => ({
		programs: [],
		isAvailable: false
	}),
	methods: {
		async fetchProgram() {
			try {
				const res = await ProgramService.getProgram()
				this.programs = res.data.data
				// //console.log(this.programs)
				if (this.programs.length > 0) {
					this.isAvailable = true
				} else {
					this.isAvailable = false
				}
			} catch (error) {
				console.log(error)
			}
		}
	},
	// mounted() {
	// 	this.fetchProgram()
	// }
}
</script>

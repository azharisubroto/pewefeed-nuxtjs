<template>
	<section>
		<v-container v-if="izinexists">
			<!-- <pre>{{ $data }}</pre> -->
			<v-row>
				<v-col cols="12" md="12">
					<v-card class="mx-auto" max-width="400">
						<v-card-text>
							<span class="text--primary">
								<span><strong>Data Sekolah</strong></span
								><br />
								<br />
								<span>{{ schoolData.name }}</span
								><br />
								<span
									>SKP:
									<span v-if="isuploaded"
										><a :href="skp" target="_BLANK"
											>Download</a
										></span
									><span v-else>Belum Ada</span></span
								>
							</span>
						</v-card-text>

						<v-card-actions>
							<v-btn
								small
								depressed
								dark
								color="deep-orange accent-2"
								@click="izinexists = false"
							>
								Ubah Data
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
		<v-form v-else id="izin-form" v-on:submit.prevent="onSubmit">
			<v-container>
				<v-row>
					<v-col cols="12" md="4">
						<v-autocomplete
							:items="schools"
							:search-input.sync="searchInput"
							name="namasekolah"
							v-model="namasekolah"
							hide-no-data
							hide-selected
							item-text="name"
							item-value="id"
							label="Nama Sekolah"
							placeholder="Ketik untuk mencari..."
							prepend-icon="mdi-magnify"
							clearable
						>
						</v-autocomplete>
					</v-col>

					<v-col cols="12" md="4">
						<p>File SKP</p>
						<vue-dropzone
							ref="dropzone"
							id="drop1"
							color="deep-orange"
							:options="dropOptions"
							@vdropzone-success="afterComplete"
						></vue-dropzone>
						<br />
						<a @click="removeAllFiles">Remove File</a>
					</v-col>

					<v-col cols="12" md="12">
						<v-btn
							dark
							depressed
							form="izin-form"
							color="green accent-6"
							block
							large
							:loading="loading"
							@click="submitform"
						>
							SUBMIT
						</v-btn>

						<v-btn
							depressed
							large
							block
							class="mt-3"
							:loading="loading"
							@click="izinexists = true"
						>
							Batalkan
						</v-btn>
					</v-col>
				</v-row>
			</v-container>

			<!-- SNACEKBAR -->
			<v-snackbar v-model="snackbar" :timeout="timeout">
				Data Izin Tersimpan
				<v-btn color="blue" text icon @click="snackbar = false">
					<v-icon color="white">mdi-close-circle-outline</v-icon>
				</v-btn>
			</v-snackbar>
		</v-form>
	</section>
</template>

<script>
import SchoolsService from "@/services/SchoolsService"
import StarxIzinService from "@/services/StarxIzinService"
import pdficon from "@/assets/img/pdf.png"
export default {
	middleware: "auth",
	name: "StarxIzin",
	data() {
		return {
			valid: false,
			loading: false,
			snackbar: false,
			izinexists: false,
			timeout: 2000,
			isuploaded: false,
			schools: [],
			searchInput: "",
			namasekolah: "",
			suratizin: "",
			usertoken: "",
			pdfdownload: "",
			dropOptions: {
				url:
					"https://s1.playworld.id/api/member/program/starx/band/upload/document",
				headers: {
					Authorization: "Bearer " + this.$auth.user.data.token,
					"Cache-Control": "",
				},
				method: "POST",
				paramName: "file",
				withCredentials: false,
				thumbnailWidth: 100,
				thumbnailHeight: 100,
				accept: function (file, done) {
					switch (file.type) {
						case "application/pdf":
							this.emit("thumbnail", file, pdficon)
							break
					}
					//file.previewTemplate.querySelector(".dz-image img").style.width="120px";

					done()
				},
			},
			schoolData: [],
			skp: "",
		}
	},
	methods: {
		async getSchools() {
			try {
				const response = await SchoolsService.getSchools()
				////console.log(response.data.data);
				this.schools = response.data.data
			} catch (error) {
				console.log(error)
			}
		},
		removeAllFiles() {
			this.$refs.dropzone.removeAllFiles()
		},
		afterComplete(file, response) {
			// //console.log(response.link.replace(' ', '-'));
			this.pdfdownload = encodeURI(response.link)
		},
		async submitform() {
			let vm = this
			vm.loading = true // loading
			var formdata = {
				asal_sekolah: vm.namasekolah,
				skp: vm.pdfdownload,
			}
			// //console.log(formdata);

			try {
				// Send data
				const response = await StarxIzinService.submitIzin(formdata)
				//console.log(response.data.status);
				// var res = response;
				// //console.log(res);
				vm.loading = false
				vm.snackbar = true
				vm.izinexists = true
				vm.isuploaded = true
				vm.skp = vm.pdfdownload
			} catch (error) {
				console.log(error)
			}
		},
		async checkIzin() {
			let vm = this
			// school list, check local storage
			const school_storage = localStorage.getItem("schools")
			if (school_storage) {
				var schoooool = JSON.parse(school_storage)
				this.schools = schoooool
			} else {
				this.getSchools()
			}

			// check access token,
			const usertoken = this.$auth.user.data.token
			if (usertoken) {
				this.usertoken = usertoken
				// //console.log(this.usertoken);
			}

			try {
				const response = await StarxIzinService.checkIzin()
				// //console.log(response.data.data);
				var data = response.data.data
				var band = data.band.band
				if (band) {
					var skp = band.skp
					vm.izinexists = true
					vm.schoolData = band.school
					if (skp) {
						vm.isuploaded = true
						vm.skp = skp
					}
				}
				localStorage.setItem("syarat", data.program.term)
				localStorage.setItem(
					"participant",
					JSON.stringify(data.participant)
				)
			} catch (error) {
				console.log(error)
			}
		},
	},
	mounted() {
		this.checkIzin()
	},
}
</script>

<style lang="scss">
.dropzone .dz-preview {
	z-index: 0;
}
.dropzone .dz-preview .dz-image img {
	width: 100px;
}
.vue-dropzone > .dz-preview .dz-details {
	background: transparent !important;
}
</style>

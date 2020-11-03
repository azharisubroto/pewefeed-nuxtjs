<template>
	<v-card flat>
		<div id="m-banner" class="m-tabpane" style="display: block">
			<div class="d-md-none mb-4">
				<div class="merahpitihbanner">
					<v-row class="grey darken-4" light>
						<v-col cols="3">
							<div
								style="object-fit: cover; height: 100%"
								class="pl-3 py-3"
							>
								<img
									class="star-icon"
									:src="bannerurl"
									style="cover;width:95%;"
									alt=""
								/>
							</div>
						</v-col>
						<v-col cols="9" dark>
							<div style="padding: 18px 20px !important">
								<div class="text-20">
									<span style="color: white" id="starx-label"
										>S T A R X</span
									>
								</div>
								<p class="white--text">
									Kirimkan video BAND kamu <br />
									yang paling keren!
								</p>
							</div>
						</v-col>
					</v-row>
				</div>
				<div
					class="pt-4 pt-md-2 pb-3 px-4 position-relative brd-1 bg-white"
				>
					<div class="pw_widtle">
						<div class="row">
							<div class="col-md-12 col-12 mb-2">
								<strong class="text-18">Audition</strong>
							</div>
							<div
								class="col-md-12 col-12 text-warning text-16 text-bold"
							>
								20 Agustus 2019 - 06 September 2019
							</div>
						</div>
					</div>
					<hr class="my-3 my-md-2" />
					<div class="pw_widtle">
						<div class="row">
							<div class="col-md-12 col-12 mb-2">
								<strong class="text-18"
									>Off-Air Show &amp; Winner</strong
								>
							</div>
							<div
								class="col-md-12 col-12 text-warning text-16 text-bold"
							>
								07 September
							</div>
							<div class="pl-2 text-italic">
								<ul>
									<li>
										4 Juara Band (Juara 1,2,3 dan Top Star)
									</li>
									<li>
										5 Juara Best Personnel (Vocalist,
										Drummer, Guitaris, Keyboardist, Bassist)
									</li>
									<li>
										Hanya 5 Band Pilihan Juri yang akan naik
										pentas
									</li>
								</ul>
							</div>
						</div>
					</div>
					<hr class="my-3 my-md-2" />
					<v-btn
						@click="$router.push('/member/program/starx')"
						block
						large
						depressed
						dark
						class="orange accent-4"
						id="upload-text"
						>Upload Video Band Kamu</v-btn
					>
				</div>
			</div>
		</div>
	</v-card>
</template>

<script>
export default {
	name: "StarxDesc",
	data() {
		return {
			bannerurl:
				"https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/program/starx.png",
		}
	},
}
</script>

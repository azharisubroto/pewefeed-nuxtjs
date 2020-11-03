<template class="pb-5">
	<div class="StarxBandHome">
		<v-container v-if="loading">
			<div class="text-xs-center" align="center">
				<v-progress-circular
					indeterminate
					:size="80"
					:width="8"
					color="green"
				>
				</v-progress-circular>
			</div>
		</v-container>

		<v-container v-else class="pb-5" ma-0 pa-0>
			<!-- =====================================================================================
			TAB MENU
			===================================================================================== -->
			<v-tabs
				v-model="tab"
				background-color="light"
				center-active
				light
				grow
				color="orange"
				class="fixed-tabs-bar"
				style="
					position: fixed !important;
					top: 57px;
					border-bottom: 1px solid #d1d1d1;
				"
			>
				<v-tabs-slider></v-tabs-slider>

				<v-tab href="#tab-1"> TIMELINE </v-tab>

				<v-tab href="#tab-2"> JOIN </v-tab>

				<v-tab href="#tab-3"> REWARDS &amp; TERM </v-tab>

				<v-tab href="#tab-4"> INFO </v-tab>
			</v-tabs>

			<v-container
				v-if="tab != 'tab-2' && tab != 'tab-4' && tab != 'tab-3'"
				style="margin-top: 10px"
			>
				<v-alert
					border="left"
					dense
					colored-border
					type="info"
					style="
						border-top: 1px solid #2095f3;
						border-bottom: 1px solid #2095f3;
						border-right: 1px solid #2095f3;
					"
				>
					Untuk bisa masuk ke tahap semifinal, peserta harus
					mendapatkan minimal 100 Star
				</v-alert>

				<v-row>
					<v-col cols="6" class="py-0"> </v-col>
					<v-col cols="6" class="py-0">
						<!-- FILTER -->
						<v-menu offset-y>
							<template v-slot:activator="{ on }">
								<v-btn
									v-show="!hidden"
									color="orange accent-4"
									dark
									block
									depressed
									v-on="on"
								>
									<v-icon>mdi-sort</v-icon>
									Urutkan
								</v-btn>
							</template>
							<v-list>
								<v-list-item
									@click="
										filter = 'new'
										StarxBandHome(1, 'newest')
									"
								>
									<v-list-item-title
										>New to Old Post</v-list-item-title
									>
								</v-list-item>
								<v-list-item
									@click="
										filter = 'old'
										StarxBandHome(1, 'oldest')
									"
								>
									<v-list-item-title
										>Old to New Post</v-list-item-title
									>
								</v-list-item>
								<v-list-item
									@click="
										filter = 'hi-lo'
										StarxBandHome(1, 'hi-lo')
									"
								>
									<v-list-item-title
										>Hi to Low Stars</v-list-item-title
									>
								</v-list-item>
								<v-list-item
									@click="
										filter = 'lo-hi'
										StarxBandHome(1, 'lo-hi')
									"
								>
									<v-list-item-title
										>Low to Hi Stars</v-list-item-title
									>
								</v-list-item>
							</v-list>
						</v-menu>
						<!-- / END FILTER -->
					</v-col>
				</v-row>
			</v-container>

			<!-- =====================================================================================
			TAB ITEMS
			===================================================================================== -->
			<v-tabs-items v-model="tab" class="djusted-tab-items pb-5">
				<!-- oooooooooooooooooooooooooooooooooooooo
				VIDEO
				oooooooooooooooooooooooooooooooooooooo -->
				<v-tab-item value="tab-1">
					<template v-if="video_latest">
						<v-container>
							<v-row>
								<v-col
									class="text-center"
									v-if="latests.length == 0"
									cols="12"
									md="12"
								>
									<v-timeline dense>
										<v-timeline-item
											color="white"
											small
											fill-dot
										>
											No Video available :(
										</v-timeline-item>
									</v-timeline>
								</v-col>
								<v-col v-else cols="12" md="4">
									<v-overlay :value="overlay">
										<v-progress-circular
											indeterminate
											size="64"
										></v-progress-circular>
									</v-overlay>
									<VideoLoop
										@makeloading="setloading"
										@notloading="notloading"
										v-for="latest in latests"
										:latest="latest"
										:key="latest.id"
										activeBtn="1"
									/>
									<div class="text-center">
										<v-pagination
											v-model="page"
											:length="total"
											@input="next"
										></v-pagination>
									</div>
								</v-col>
							</v-row>
						</v-container>
					</template>
					<template v-if="video_finalist">
						<v-container v-if="finalists.length == 0">
							<v-row>
								<v-col class="text-center" cols="12" md="12">
									<v-timeline dense>
										<v-timeline-item
											color="white"
											small
											fill-dot
										>
											No Video available :(
										</v-timeline-item>
									</v-timeline>
								</v-col>
							</v-row>
						</v-container>
						<v-container v-else>
							<v-row>
								<v-col cols="12" md="4">
									<h3 class="pwhead text-uppercase">
										<span>Judges Choice</span>
									</h3>
									<div
										v-for="latest in finalists"
										:key="'finalist-' + latest.id"
									>
										<VideoLoop
											v-if="
												latest.finalist_detail
													.category_choice ==
												'pilihan-juri'
											"
											:latest="latest"
											activeBtn="2"
										/>
									</div>
								</v-col>
							</v-row>
							<v-row class="mt-4">
								<v-col cols="12" md="4">
									<h3 class="pwhead text-uppercase">
										<span>Voters Choice</span>
									</h3>
									<div
										v-for="latest in voters"
										:key="'finalist-' + latest.id"
									>
										<VideoLoop
											v-if="
												latest.finalist_detail
													.category_choice ==
												'top-star'
											"
											:latest="latest"
											activeBtn="2"
										/>
									</div>
								</v-col>
							</v-row>
						</v-container>
					</template>
					<template v-if="video_winners">
						<v-container v-if="winners.length == 0">
							<v-row>
								<v-col class="text-center" cols="12" md="12">
									<v-timeline dense>
										<v-timeline-item
											color="white"
											small
											fill-dot
										>
											No Video available :(
										</v-timeline-item>
									</v-timeline>
								</v-col>
							</v-row>
						</v-container>
						<v-container v-else>
							<v-row>
								<v-col cols="12" md="4">
									<div
										v-for="(latest, index) in winners.slice(
											0,
											4
										)"
										:key="'winner-' + latest.id"
									>
										<h2
											class="text-capitalize text-20 mb-3"
										>
											<v-row no-gutters>
												<v-col cols="2" class="mt-1">
													<img
														:src="
															'/img/BADGE-PW-WINNER-0' +
															(index + 1) +
															'.png'
														"
														width="50"
														alt=""
														style="
															vertical-align: middle;
														"
														class="mr-3"
													/>
												</v-col>
												<v-col cols="10">
													<v-row no-gutters>
														<v-col
															cols="12"
															class="mt-1"
														>
															{{
																propername(
																	latest
																		.winners_detail
																		.winner_name
																)
															}}<br />
														</v-col>
														<v-col
															cols="12"
															style="
																margin-top: -8px;
															"
														>
															<strong
																class="caption"
																>Rewards :
																{{
																	latest.prize
																		? latest
																				.prize
																				.redeem
																				.title
																		: "-"
																}}</strong
															>
														</v-col>
													</v-row>
												</v-col>
											</v-row>
										</h2>
										<VideoLoop
											action="nope"
											:latest="latest"
											activeBtn="3"
											:isWinner="1"
										/>
									</div>

									<div
										v-for="(latest, index) in winners.slice(
											4
										)"
										class="my-4"
										:key="'winnerz-' + latest.id"
									>
										<h2
											class="text-capitalize text-20 mb-2"
										>
											<v-row no-gutters>
												<v-col cols="2" class="mt-1">
													<img
														:src="
															'/img/BADGE-PW-WINNER-0' +
															(index + 5) +
															'.png'
														"
														width="50"
														alt=""
														style="
															vertical-align: middle;
														"
														class="mr-3"
													/>
												</v-col>
												<v-col cols="10">
													<v-row no-gutters>
														<v-col
															cols="12"
															class="mt-1"
														>
															{{
																propername(
																	latest
																		.winners_detail
																		.winner_name
																)
															}}<br />
														</v-col>
														<v-col
															cols="12"
															style="
																margin-top: -8px;
															"
														>
															<strong
																class="caption"
																>Rewards :
																{{
																	latest.prize
																		.redeem
																		.title
																}}</strong
															>
														</v-col>
													</v-row>
												</v-col>
											</v-row>
										</h2>
										<v-card
											class="StarxVideoLoop mx-auto mb-3 py-2 px-2 manual-border"
											elevation="0"
										>
											<v-row no-gutters align="center">
												<v-col cols="3" class="pr-2">
													<v-list-item-avatar
														tile
														size="80"
														color="grey"
													>
														<v-img
															:src="
																latest
																	.personnel_winner
																	.avatar
															"
														></v-img>
													</v-list-item-avatar>
												</v-col>
												<v-col cols="8">
													<v-list-item four-line>
														<v-list-item-content>
															<h4 class="mb-2">
																{{
																	latest
																		.personnel_winner
																		.personnel_name
																}}
															</h4>

															<v-row
																v-if="
																	latest.band
																"
																class="sm"
															>
																<v-col
																	v-if="
																		latest
																			.band
																			.image !=
																		''
																	"
																	cols="2"
																	class="py-0"
																>
																	<v-avatar
																		size="25"
																	>
																		<img
																			:src="
																				latest
																					.band
																					.image
																			"
																			alt="alt"
																		/>
																	</v-avatar>
																</v-col>
																<v-col
																	v-else
																	cols="2"
																	class="py-0"
																>
																	<v-avatar
																		size="25"
																	>
																		<img
																			src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/member/avatar-fallback.png"
																			alt="alt"
																		/>
																	</v-avatar>
																</v-col>
																<v-col
																	cols="10"
																	class="py-0"
																>
																	<strong
																		style="
																			font-size: 14px;
																		"
																		>{{
																			latest.personnel_winner
																				? latest
																						.personnel_winner
																						.asal_band
																				: ""
																		}}</strong
																	>
																	<div
																		class="caption"
																		v-if="
																			latest
																				.personnel_winner
																				.asal_sekolah
																		"
																	>
																		{{
																			latest
																				.personnel_winner
																				.asal_sekolah
																		}}
																	</div>
																</v-col>
															</v-row>
														</v-list-item-content>
													</v-list-item>
												</v-col>
												<v-col
													style="margin-left: -7px"
													cols="1"
												>
													<a
														style="
															text-decoration: none;
														"
														:href="
															'https://instagram.com/' +
															latest.personnel_winner.instagram.replace(
																'@',
																''
															)
														"
														target="blank"
														><v-icon
															class="grey--text"
															>mdi-instagram</v-icon
														></a
													>
												</v-col>
											</v-row>
										</v-card>
									</div>
								</v-col>
							</v-row>
						</v-container>
					</template>
					<br />
					<br />
					<!-- =====================================================================================
					BOTTOM NAVIGATION
					===================================================================================== -->
					<v-bottom-navigation
						:value="activeBtn"
						fixed
						dark
						grow
						color="white"
						background-color="black"
					>
						<v-btn
							text
							color="orange ancent-4"
							@click="
								video_latest = true
								video_finalist = false
								video_winners = false
							"
						>
							<span>Auditions</span>
						</v-btn>

						<v-btn
							text
							color="orange ancent-4"
							@click="
								video_finalist = true
								video_latest = false
								video_winners = false
							"
						>
							<span>Final</span>
						</v-btn>

						<v-btn
							text
							color="orange ancent-4"
							@click="
								video_finalist = false
								video_latest = false
								video_winners = true
							"
						>
							<span>Winners</span>
						</v-btn>
					</v-bottom-navigation>
				</v-tab-item>

				<!-- oooooooooooooooooooooooooooooooooooooo
				UPLOAD
				oooooooooooooooooooooooooooooooooooooo -->
				<v-tab-item value="tab-2">
					<StarxUpload />
				</v-tab-item>

				<!-- oooooooooooooooooooooooooooooooooooooo
				WINNER
				oooooooooooooooooooooooooooooooooooooo -->
				<v-tab-item value="tab-3">
					<v-container>
						<h4 class="pwhead"><span>REWARDS</span></h4>
						<v-alert
							border="left"
							dense
							colored-border
							type="info"
							style="
								border-top: 1px solid #2095f3;
								border-bottom: 1px solid #2095f3;
								border-right: 1px solid #2095f3;
							"
						>
							Total Hadiah: 10 Juta Rupiah
						</v-alert>
					</v-container>
					<v-carousel
						height="300"
						:aspect-ratio="16 / 9"
						hide-delimiters
					>
						<v-carousel-item
							v-for="(prize, i) in prizes"
							:key="prize.id"
						>
							<v-img
								:aspect-ratio="16 / 9"
								:src="prize.redeem.image"
							></v-img>
							<v-card-actions>
								<v-list-item class="grow">
									<v-list-item-avatar>
										<v-img
											class="elevation-6"
											:src="
												aws +
												'BADGE-PW-WINNER-0' +
												[i + 1] +
												'.png'
											"
										></v-img>
									</v-list-item-avatar>

									<v-list-item-content>
										<v-list-item-title>
											<div
												style="
													color: #000 !important;
													font-size: 14px;
												"
											>
												<div class="mb-2">
													<div
														style="font-size: 16px"
													>
														<strong>{{
															prize.redeem.title
														}}</strong>
													</div>
												</div>
												<v-icon
													color="orange accent-3"
													small
													class="mr-2"
												>
													mdi-star</v-icon
												>{{ prize.minimun_star }} |
												Juara ke - {{ i + 1 }}
											</div>
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-card-actions>
						</v-carousel-item>
					</v-carousel>

					<div class="devider-big my-4"></div>

					<v-container>
						<h3 class="pwhead">
							<span>TERMS &amp; CONDITIONS</span>
						</h3>
						<v-expansion-panels multiple>
							<v-expansion-panel class="mb-6">
								<v-expansion-panel-header
									>PENJURIAN &amp;
									PEMENANG</v-expansion-panel-header
								>
								<v-expansion-panel-content class="caption">
									STAGE: AUDITION
									<br />
									<ul>
										<li class="caption">
											Salah satu anggota band diharuskan
											membuat akun
											{{ domainTitle }} terlebih dahulu
											sebelum dapat mengupload video,
											tidak ada pungutan alias gratis
										</li>
										<li class="caption">
											Lengkapi data band dan personilnya
											agar voters mudah
										</li>
									</ul>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>

						<v-expansion-panels>
							<v-expansion-panel class="mb-6">
								<v-expansion-panel-header
									>SYARAT DAN KETENTUAN
									PESERTA</v-expansion-panel-header
								>
								<v-expansion-panel-content class="caption">
									<p class="caption">
										Syarat utama untuk bisa menjadi finalis
										atau menerima hadiah harus memiliki
										minimal 100 STAR dan terpampang stiker
										audisi yang sudah di print pada Video
									</p>
									<p class="caption">
										(&gt;=30 BAND) Total Hadiah tetap 20
										Juta Rupiah dan dipilih 10 Finalis jika
										jumlah peserta audisi online lebih atau
										sama dengan 30 Band
									</p>
									<p class="caption">
										(&gt; 10 dan 30 BAND) Total Hadiah
										menjadi 10 Juta Rupiah dan dipilih 5
										Finalis jika jumlah peserta audisi
										online kurang dari 30 Band
									</p>
									<p class="caption">
										(&lt;=10 BAND) Total Hadiah berkurang
										menjadi hanya 15% jika jumlah peserta
										audisi online kurang atau sama dengan 10
										peserta, maka masing-masing Band akan
										menerima hadiah senilai Rp. 300.000
									</p>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>

						<v-expansion-panels>
							<v-expansion-panel class="mb-6">
								<v-expansion-panel-header
									>SYARAT DAN KETENTUAN
									VOTER</v-expansion-panel-header
								>
								<v-expansion-panel-content class="caption">
									STAGE: AUDITION
									<br />
									<ul>
										<li class="caption">
											Salah satu anggota band diharuskan
											membuat akun
											{{ domainTitle }} terlebih dahulu
											sebelum dapat mengupload video,
											tidak ada pungutan alias gratis
										</li>
										<li class="caption">
											Lengkapi data band dan personilnya
											agar voters mudah
										</li>
									</ul>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
					</v-container>
				</v-tab-item>

				<!-- oooooooooooooooooooooooooooooooooooooo
				SYARAT
				oooooooooooooooooooooooooooooooooooooo -->
				<v-tab-item value="tab-4">
					<v-tabs-items v-model="syartab">
						<v-tab-item v-for="item in tabItems" :key="item">
							<template v-if="item == 'STARX'">
								<v-img src="/img/starxbanner.png"></v-img>
								<v-container>
									<!-- <h4 class="pwhead"><span>PENDAHULUAN</span></h4> -->

									<v-expansion-panels>
										<v-expansion-panel class="mb-6">
											<v-expansion-panel-header
												>PENDAHULUAN</v-expansion-panel-header
											>
											<v-expansion-panel-content
												class="caption"
											>
												TUJUAN
												<br />

												<p>
													Acara “STAR X” ini
													dilaksanakan dengan tujuan
													sebagai berikut:
												</p>

												<ul>
													<li class="caption">
														Meningkatkan minat dan
														bakat siswa dalam bidang
														olahraga dan seni.
													</li>
													<li class="caption">
														Mengembangkan rasa
														persatuan, persahabatan,
														dan kerja sama antar
														siswa SMA Regina Pacis
														dengan siswa sekolah
														se-Jabodetabek.
													</li>
													<li class="caption">
														Merealisasikan semboyan
														Regina Pacis yaitu “Ad
														veritatem Per
														caritatem”, yang
														memiliki arti mencapai
														kebenaran melalui cinta
														kasih yang terwujudkan
														dalam persaudaraan antar
														sekolah melalui bidang
														olahraga dan seni.
													</li>
													<li class="caption">
														Mempromosikan SMA Regina
														Pacis sebagai sekolah
														yang bukan hanya
														berprestasi dalam bidang
														akademis, namun juga
														dalam bidang non-
														akademis seperti
														olahraga dan seni.
													</li>
												</ul>
											</v-expansion-panel-content>
										</v-expansion-panel>
									</v-expansion-panels>

									<!-- <h4 class="pwhead"><span>TENTANG STARX</span></h4> -->

									<v-expansion-panels>
										<v-expansion-panel class="mb-6">
											<v-expansion-panel-header
												>TENTANG
												STARX</v-expansion-panel-header
											>
											<v-expansion-panel-content
												class="caption"
											>
												<p class="caption">
													“STAR X” merupakan acara
													pengembangan bakat olahraga
													dan seni yang akan
													dilaksanakan di SMA Regina
													Pacis Jakarta. Acara ini
													sudah berlangsung lama dan
													pada tahun ini sudah menjadi
													acara STAR ke-10. Acara ini
													diadakan setiap dua tahun
													sekali dan terus berkembang
													seiring waktu. Acara STAR
													pertama dimulai pada tahun
													2001 dengan nama STAR yang
													merupakan singkatan dari
													Sport at Recis. Tujuan
													berlangsungnya acara ini
													untuk memperkenalkan nama
													Regina Pacis, meningkatkan
													prestasi siswa dalam bidang
													non akademis, serta menjalin
													hubungan persahabatan antar
													sekolah. Berdasarkan
													kesuksesan STAR pertama maka
													STAR diadakan kembali pada
													tahun 2003 dan 2005.
												</p>
												<p class="caption">
													Pada tahun 2007, STAR
													ditambah dengan lomba di
													bidang kesenian, sehingga
													nama STAR memiliki arti
													menjadi Sport and Art at
													Recis dengan tema “Playful
													Carnaval”. Pada tahun 2009,
													diadakan STAR dengan tema
													“Pantai”, dan lahir maskot
													STAR berbentuk bintang
													berwarna kuning, yaitu
													Twinky. Selanjutnya, pada
													tahun 2011, STAR yang
													bernama STARWARS, menjadi
													salah satu STAR terbesar
													yang pernah diselenggarakan.
													Kemudian pada tahun 2013,
													STAR kembali diadakan dengan
													nama STARLIGHT. Pada tahun
													2015, kembali diadakan STAR
													dengan nama STARGAZE.
													Terakhir, pada tahun 2017,
													STAR dilaksanakan dengan
													nama STARDUST, yang
													merupakan kesuksesan STAR
													lainnya. Melihat antusiasme
													dari warga SMA Regina Pacis
													Jakarta, dan mengikuti jejak
													kesuksesan alumni dalam
													mengadakan STAR, maka OSIS
													SMA Regina Pacis Jakarta
													kembali mengadakan STAR
													dengan nama “STAR X”, yang
													berarti STAR ke-10. Dengan
													dasar yang sama, acara STAR
													X merupakan kegiatan para
													X-Crews (panitia), didukung
													oleh sponsor, peserta dan
													pengunjung. Adanya kegiatan
													STAR X diharapkan dapat
													menjadi sarana pengembang
													bagi peserta untuk
													menyalurkan bakat dan minat
													sekaligus menunjukkan
													kualitas diri serta relasi
													yang baik antar peserta.
												</p>
												<p class="caption">
													STAR X menggabungkan
													lomba-lomba di bidang seni,
													olahraga, serta e- sports.
													Mulai dari majalah dinding,
													fotografi, modern dance,
													band, basket, futsal, voli,
													bahkan PUBG dan Mobile
													Legends. Kedua permainan
													e-sports tersebutlah yang
													membedakan STAR X dengan
													kegiatan STAR sebelumnya.
													Dengan tingginya antusiasme
													siswa sekolah secara umum
													terhadap game PUBG dan
													Mobile Legends, maka X-Crew
													memutuskan untuk mengadakan
													lomba e-sports PUBG dan
													Mobile Legends. Berdasarkan
													hal tersebut, diharapkan
													kegiatan STAR X dapat
													menarik banyak peserta,
													sehingga acara STAR X
													menjadi acara yang diminati
													siswa.
												</p>
												<p class="caption">
													STAR X diharapkan mampu
													menjadi tempat penyaluran
													semangat dan bakat siswa
													SMA, SMP, dan masyarakat
													umum se-Jabodetabek, agar
													dapat berkembang di bidang
													non akademis. Kegiatan ini
													juga diharapkan mampu
													membangun semangat kerja
													sama antar panitia dan
													peserta agar tercipta
													kompetisi yang sehat. Oleh
													karena itu, STAR X juga
													dapat membuat siswa
													bersosialisasi dan
													berkembang, serta menjalin
													hubungan yang erat antar
													sekolah, yang tentunya akan
													sangat berguna bagi
													kehidupan mereka kelak.
												</p>
											</v-expansion-panel-content>
										</v-expansion-panel>
									</v-expansion-panels>

									<!-- <h4 class="pwhead"><span>TUJUAN VISI DAN MISI</span></h4> -->

									<v-expansion-panels>
										<v-expansion-panel class="mb-6">
											<v-expansion-panel-header
												>TUJUAN VISI DAN
												MISI</v-expansion-panel-header
											>
											<v-expansion-panel-content
												class="caption"
											>
												<p>
													Acara “STAR X” ini
													dilaksanakan dengan tujuan
													sebagai berikut:
												</p>

												<ul>
													<li class="caption">
														Meningkatkan minat dan
														bakat siswa dalam bidang
														olahraga dan seni.
													</li>
													<li class="caption">
														Mengembangkan rasa
														persatuan, persahabatan,
														dan kerja sama antar
														siswa SMA Regina Pacis
														dengan siswa sekolah
														se-Jabodetabek.
													</li>
													<li class="caption">
														Merealisasikan semboyan
														Regina Pacis yaitu “Ad
														veritatem Per
														caritatem”, yang
														memiliki arti mencapai
														kebenaran melalui cinta
														kasih yang terwujudkan
														dalam persaudaraan antar
														sekolah melalui bidang
														olahraga dan seni.
													</li>
													<li class="caption">
														Mempromosikan SMA Regina
														Pacis sebagai sekolah
														yang bukan hanya
														berprestasi dalam bidang
														akademis, namun juga
														dalam bidang non-
														akademis seperti
														olahraga dan seni.
													</li>
												</ul>
											</v-expansion-panel-content>
										</v-expansion-panel>
									</v-expansion-panels>

									<!-- <h4 class="pwhead"><span>FILOSOFI</span></h4> -->

									<v-expansion-panels>
										<v-expansion-panel class="mb-6">
											<v-expansion-panel-header
												>FILOSOFI</v-expansion-panel-header
											>
											<v-expansion-panel-content
												class="caption"
											>
												STAGE: AUDITION
												<br />
												<p class="caption">
													STAR X adalah acara yang
													diadakan oleh SMA Regina
													Pacis yang ke-10.
													Kepanjangan dari STAR adalah
													Sport and Art at Recis,
													yaitu acara yang menjadikan
													olahraga dan seni sebagai
													perhelatan antar sekolah.
													Nama STAR X diambil
													berdasarkan angka 10 dalam
													kalender romawi, yang
													menunjukkan bahwa ini adalah
													STAR yang diadakan untuk
													kesepuluh kalinya setelah
													STAR 2001, STAR 2003, STAR
													2005, STAR 2007, STAR 2009,
													STARWARS, STARLIGHT,
													STARGAZE, dan terakhir
													STARDUST.
												</p>
												<p class="caption">
													Slogan “An Arcade in a
													Decade” menunjukkan bahwa
													STAR X adalah suatu
													permainan yang ditujukan
													untuk suatu sportivitas,
													solidaritas, bukan hanya
													kemenangan belaka. Selain
													itu, acara yang akan
													diselenggarakan ke-10
													kalinya ini diharapkan
													menjadi ajang permainan yang
													menyenangkan, dapat
													mempererat tali
													persaudaraan, dan membawa
													pengaruh positif kepada
													banyak pihak. Pelaksana dari
													kegiatan ini adalah beberapa
													siswa SMA Regina Pacis
													Jakarta yang mendaftar
													sebagai panitia. Dalam hal
													ini panitia disebut sebagai
													X Crew. Tugas dari X Crew
													yaitu bertanggung jawab
													terhadap jalannya kegiatan
													STAR X dan menjadi pelayan
													yang baik atas acara yang
													diselenggarakan.
												</p>
												<p class="caption">
													Puncak acara STAR X adalah
													Concordia. Concordia berasal
													dari Bahasa Latin yang
													memiliki arti unity atau
													kesatuan. Concordia
													bertujuan untuk
													mempersatukan seluruh
													peserta yang telah
													berpartisipasi dalam STAR X.
													Selama tujuh hari para
													peserta dari berbagai
													sekolah akan bersaing
													bersama untuk membawa nama
													baik sekolah masing-masing.
													Acara ini juga dapat
													menjalin relasi sehingga
													meningkatkan rasa
													persaudaraan. Rasa
													persaudaraan ini diharapkan
													mampu menjaga kesatuan antar
													partisipan.
												</p>
											</v-expansion-panel-content>
										</v-expansion-panel>
									</v-expansion-panels>

									<!-- <h4 class="pwhead"><span>PANITIA</span></h4> -->

									<v-expansion-panels>
										<v-expansion-panel class="mb-6">
											<v-expansion-panel-header
												>PANITIA</v-expansion-panel-header
											>
											<v-expansion-panel-content
												class="caption"
											>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 17.5px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													<strong
														style="
															box-sizing: inherit;
															font-weight: bold;
															font-family: ProximaNovaSemibold,
																sans-serif;
														"
														>Pelindung</strong
													>
													: Sr. Linda Mulyati, FMM
												</p>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 17.5px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													<strong
														style="
															box-sizing: inherit;
															font-weight: bold;
															font-family: ProximaNovaSemibold,
																sans-serif;
														"
														>Penanggungjawab</strong
													>
													: Tarcicius Suhirman, S.Pd.,
													MM.
												</p>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 17.5px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													Ketua Umum : Prima Abim,
													S.Pd.
												</p>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 17.5px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													Indra Jaya Salim (XI IPS 1)
												</p>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 17.5px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													<strong
														style="
															box-sizing: inherit;
															font-weight: bold;
															font-family: ProximaNovaSemibold,
																sans-serif;
														"
														>Sekretaris</strong
													>
													: Wina Carlina Ginting,
													S.Pd.
												</p>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 17.5px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													Caecilia Surantilah
												</p>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 17.5px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													Celine Budhi Santoso (XI IPA
													2)
												</p>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 17.5px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													Gabriella Angelia (X IPA 2)
												</p>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 17.5px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													<strong
														style="
															box-sizing: inherit;
															font-weight: bold;
															font-family: ProximaNovaSemibold,
																sans-serif;
														"
														>Bendahara</strong
													>
													: Irene Danica Arlyn
													Saputri, S.Pd.
												</p>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 17.5px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													Luciana Wiwik Susiati
												</p>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 17.5px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													Gabriella Monica (XI IPS 1)
												</p>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 17.5px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													Antonius Filbert (X IPA 2)
												</p>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 17.5px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													<strong
														style="
															box-sizing: inherit;
															font-weight: bold;
															font-family: ProximaNovaSemibold,
																sans-serif;
														"
														>Ketua Divisi I</strong
													>
													: Veronica Srisupeni, S. Pd.
													<br
														style="
															box-sizing: inherit;
														"
													/>Steffany Chrisanta (XI IPS
													2)
												</p>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 17.5px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													<strong
														style="
															box-sizing: inherit;
															font-weight: bold;
															font-family: ProximaNovaSemibold,
																sans-serif;
														"
														>Ketua Divisi II</strong
													>
													: Agustinus Totowijayadi
													S.Pd., M.M. Michael Gery
													Wicaksono (XI IPS 1)
												</p>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 17.5px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													<strong
														style="
															box-sizing: inherit;
															font-weight: bold;
															font-family: ProximaNovaSemibold,
																sans-serif;
														"
														>Ketua Divisi
														III&nbsp;</strong
													>: Thomas Wahyu, S.Pd.
													<br
														style="
															box-sizing: inherit;
														"
													/>Christopher William Aryono
													(XI IPS 2)
												</p>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 17.5px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													<strong
														style="
															box-sizing: inherit;
															font-weight: bold;
															font-family: ProximaNovaSemibold,
																sans-serif;
														"
														>Ketua Divisi IV</strong
													>
													: Margareta Erika Ismayanti,
													S.Pd.
													<br
														style="
															box-sizing: inherit;
														"
													/>Steven (XI IPA 2)
												</p>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 16px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													<span
														style="
															box-sizing: inherit;
															font-size: 20px;
														"
														><em
															style="
																box-sizing: inherit;
															"
															><strong
																style="
																	box-sizing: inherit;
																	font-weight: bold;
																	font-family: ProximaNovaSemibold,
																		sans-serif;
																"
																>Divisi
																I</strong
															></em
														></span
													>
												</p>
												<blockquote
													style="
														box-sizing: inherit;
														padding: 10px 20px;
														margin: 0px 0px 20px;
														font-size: 17.5px;
														border-left: 5px solid
															rgb(235, 237, 239);
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>1.
															Dana&nbsp;</strong
														>: Veronica Srisupeni,
														S.Pd.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Theresa Winona Wijaya
														(XI IPA 1)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Madilyn Louisa (X IPA 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>2.
															Ticketing&nbsp;</strong
														>: Lesty Anna Donda,
														S.Pd.
														<br
															style="
																box-sizing: inherit;
															"
														/>Samarasanti (XI IPS 2)
														Albertus Ferdinand (X
														IPA 1)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>3.
															Sekretariat&nbsp;</strong
														>: Margaretha Nureni,
														S.Pd.
														<br
															style="
																box-sizing: inherit;
															"
														/>Delicia Karen Gunawan
														(XI IPA 1) Rachel
														Angelique Pramono (X IPA
														1)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>4.
															Konsumsi&nbsp;</strong
														>: Theresia Lies
														Setyowati, S.Pd.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Timothy Gracie
														Hasudungan W. (XI IPA 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px;
														"
													>
														Darren Owen Cornelius (X
														IPS)
													</p>
												</blockquote>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 16px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													<span
														style="
															box-sizing: inherit;
															font-size: 20px;
														"
														><em
															style="
																box-sizing: inherit;
															"
															><strong
																style="
																	box-sizing: inherit;
																	font-weight: bold;
																	font-family: ProximaNovaSemibold,
																		sans-serif;
																"
																>Divisi
																II</strong
															></em
														></span
													>
												</p>
												<blockquote
													style="
														box-sizing: inherit;
														padding: 10px 20px;
														margin: 0px 0px 20px;
														font-size: 17.5px;
														border-left: 5px solid
															rgb(235, 237, 239);
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>1. Perkap</strong
														>
														: Billy Amacora S.,
														S.Pd.
														<br
															style="
																box-sizing: inherit;
															"
														/>Pardianto
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Usmah
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Supriyanto
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Arnoldus Telu
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Mario Lukman (XI IPS 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Imanuel Randy (X IPS)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>2. P3K</strong
														>
														: Maria Satriya
														R.T.C.B., S.Pd.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Agustinus Totowijayadi
														S.Pd., M.M
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Nathasya Immanuella
														Putri Oni (XI IPS 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Callystha Josephine
														Gunawan (X IPA 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>3. Keamanan</strong
														>
														: Andrias Purwanto,
														S.Pd., MM.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Alapinus Siang, S.Pd.,
														MM.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Thimoti Wijaya (XI IPS
														1)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Vinsensius Ivank
														Sebastian (X IPA 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>4.
															Kebersihan</strong
														>
														: Drs. Heri Purnomo
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Elvin Dalisaputra (XI
														IPA 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px;
														"
													>
														Derian Ardenichson (X
														IPA 1)
													</p>
												</blockquote>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 16px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													<span
														style="
															box-sizing: inherit;
															font-size: 20px;
														"
														><em
															style="
																box-sizing: inherit;
															"
															><strong
																style="
																	box-sizing: inherit;
																	font-weight: bold;
																	font-family: ProximaNovaSemibold,
																		sans-serif;
																"
																>Divisi
																III</strong
															></em
														></span
													>
												</p>
												<blockquote
													style="
														box-sizing: inherit;
														padding: 10px 20px;
														margin: 0px 0px 20px;
														font-size: 17.5px;
														border-left: 5px solid
															rgb(235, 237, 239);
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>Cabang
															Olahraga</strong
														>
														: Thomas Wahyu, S.Pd.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>1. Basket</strong
														>
														: Kennen Josef (XI IPA
														1)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Melissa Gunawan (X IPA
														1)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>2. Futsal</strong
														>
														: Cornelius Rosavino
														Dwiputranto (XI IPS 1)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Yosua Wijaya (X IPS)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>3. Voli</strong
														>
														: Isabela Elrica (XI IPS
														2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Reagen Purnama (X IPA 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Cabang Non Olahraga :
														Dolorosa Sembiring,
														S.Pd.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>1. Modern
															Dance</strong
														>
														: Dolorosa Sembiring,
														S.Pd.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Dewi Ayunning Tyas,
														S.Pd.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Priscilla Frisca Halim
														(XI IPA 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Faustina Tiur Angelique
														(X IPS)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>2. Band</strong
														>
														: Dolorosa Sembiring,
														S.Pd.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Dewi Ayunning Tyas,
														S.Pd.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Christian Halim (XI IPS
														1)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Eugenia Pramesti
														Simabrata (X IPA 1)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>3. Mobile
															Legend</strong
														>
														: Agung Dwi Prakoso,
														S.Kom.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Steven Justin (XI IPS 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Owen Huang (X IPS)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>4. Wall
															Magazine</strong
														>
														: Petrus Harsono, S.Pd.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Drs. Suroto Lusia Ely
														Rahmawati, S.Pd.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Richard Harris (XI IPS
														2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Frederica Hananda Setya
														Tirtasari (X IPA 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>5.
															Fotografi</strong
														>
														: Agung Dwi Prakoso,
														S.Kom.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Dearista (XI IPS 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Angelina Christi Agung
														Nirmala (X IPA 1)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>6. PUBG
															Mobile</strong
														>
														: Agung Dwi Prakoso,
														S.Kom.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Regina Quinn (XI IPS 1)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px;
														"
													>
														Fernando Hosea (X IPA 2)
													</p>
												</blockquote>
												<p
													class="caption my-2"
													style="
														box-sizing: inherit;
														margin: 0px 0px 18px;
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-size: 16px;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													<span
														style="
															box-sizing: inherit;
															font-size: 20px;
														"
														><em
															style="
																box-sizing: inherit;
															"
															><strong
																style="
																	box-sizing: inherit;
																	font-weight: bold;
																	font-family: ProximaNovaSemibold,
																		sans-serif;
																"
																>Divisi
																IV</strong
															></em
														></span
													>
												</p>
												<blockquote
													style="
														box-sizing: inherit;
														padding: 10px 20px;
														margin: 0px 0px 20px;
														font-size: 17.5px;
														border-left: 5px solid
															rgb(235, 237, 239);
														color: rgb(0, 0, 0);
														font-family: ProximaNovaRegular,
															sans-serif;
														font-style: normal;
														font-variant-ligatures: normal;
														font-variant-caps: normal;
														font-weight: 300;
														letter-spacing: normal;
														orphans: 2;
														text-align: start;
														text-indent: 0px;
														text-transform: none;
														white-space: normal;
														widows: 2;
														word-spacing: 0px;
														-webkit-text-stroke-width: 0px;
														background-color: rgb(
															240,
															240,
															240
														);
														text-decoration-style: initial;
														text-decoration-color: initial;
													"
												>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>1. Humas</strong
														>
														: Bernadette Evy
														Anggraeny Dhewi, S.Si.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Jesline Amarya Putri
														Delima (XI IPA 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Vincent Revo Veodore (X
														IPS)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>2.
															Publikasi</strong
														>
														: Petrus Harsono, S.Pd.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Yosep Kristian Adi Karen
														Audriel (XI IPS 1)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Bonifasius Mika Nirmolo
														(XI IPS 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>3. Dokum</strong
														>
														: Petrus Harsono, S.Pd.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Yosep Kristian Adi
														Indigo Rama Kalpataru
														(XI IPA 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Vindy Cordellia Massie
														(X IPS)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>4. Dekor</strong
														>
														: Dra. Rini Makinto
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Sri Parwati, S.Pd.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Syamsudin Grace Elkitov
														Pantan (XI IPA 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Crescenzia Cinzia
														Chearasevi (X IPA 2)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														<strong
															style="
																box-sizing: inherit;
																font-weight: bold;
																font-family: ProximaNovaSemibold,
																	sans-serif;
															"
															>5. Acara</strong
														>
														: M. Erika Ismayanti,
														S.Pd.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Aloysia Astri Cerellia,
														S.Pd.
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px 0px 18px;
														"
													>
														Aurelia Prue (XI IPA 1)
													</p>
													<p
														class="caption my-2"
														style="
															box-sizing: inherit;
															margin: 0px;
														"
													>
														Naura Safinatunnajah (X
														IPS)
													</p>
												</blockquote>
											</v-expansion-panel-content>
										</v-expansion-panel>
									</v-expansion-panels>

									<!-- <h4 class="pwhead"><span>HUBUNGI STARX</span></h4> -->

									<v-expansion-panels>
										<v-expansion-panel class="mb-6">
											<v-expansion-panel-header
												>HUBUNGI
												STARX</v-expansion-panel-header
											>
											<v-expansion-panel-content
												class="caption"
											>
												<p class="my-2 caption">
													Sarana pendukung harus
													diserahkan ke pihak SMA
													Regina Pacis Jakarta yang
													terletak di:
												</p>
												<p class="my-2 caption">
													Jalan Palmerah Utara I no. 1
												</p>
												<p class="my-2 caption">
													Jakarta Barat 11480
												</p>
												<p class="my-2 caption">
													Telepon : (021) 548-1662
												</p>
												<p class="my-2 caption">
													Fax : (021) 548-2746
												</p>
												<p class="my-2 caption">
													Contact Person : Veronica
													Srisupeni, S. Pd.
													(089634519820)
												</p>
											</v-expansion-panel-content>
										</v-expansion-panel>
									</v-expansion-panels>
								</v-container>
							</template>

							<template v-if="item == 'Final Show'">
								<v-img src="/img/flyer.png"></v-img>
								<v-container>
									<!-- <h4 class="pwhead"><span>FINAL SHOW</span></h4> -->

									<v-expansion-panels>
										<v-expansion-panel class="mb-6">
											<v-expansion-panel-header
												>FINAL
												SHOW</v-expansion-panel-header
											>
											<v-expansion-panel-content
												class="caption"
											>
												STAGE: AUDITION
												<br />
												<ul>
													<li class="caption">
														Salah satu anggota band
														diharuskan membuat akun
														{{ domainTitle }}
														terlebih dahulu sebelum
														dapat mengupload video,
														tidak ada pungutan alias
														gratis
													</li>
													<li class="caption">
														Lengkapi data band dan
														personilnya agar voters
														mudah
													</li>
												</ul>
											</v-expansion-panel-content>
										</v-expansion-panel>
									</v-expansion-panels>
								</v-container>
							</template>

							<template v-if="item == 'Other Competition'">
								<div
									v-for="(eskul, i) in eskuls"
									:key="eskul.id"
								>
									<v-card
										class="mx-auto my-5 px-3"
										max-width="344"
										outlined
										:key="eskul.id"
										v-if="i > 0"
										:to="
											'/starx/eskul/' +
											eskul.eskul.slug +
											'/' +
											slugify(eskul.school.name)
										"
									>
										<v-row align="center">
											<v-col cols="2">
												<v-list-item-avatar
													tile
													size="45"
													color="white"
												>
													<img
														:src="icon"
														:alt="eskul.eskul.name"
													/>
												</v-list-item-avatar>
											</v-col>
											<v-col cols="8">
												<v-list-item-content>
													<v-list-item-title
														class="mb-1 text--uppercase"
														style="
															text-transform: uppercase;
														"
														>STARX-{{
															eskul.eskul.name
														}}</v-list-item-title
													>
													<v-list-item-subtitle
														>Peserta:
														{{
															eskul.participant
														}}</v-list-item-subtitle
													>
												</v-list-item-content>
											</v-col>
											<v-col cols="2">
												<v-icon
													>mdi-chevron-right</v-icon
												>
											</v-col>
										</v-row>
									</v-card>
								</div>
							</template>
						</v-tab-item>
					</v-tabs-items>

					<v-bottom-navigation
						fixed
						dark
						grow
						color="white"
						background-color="black"
						v-model="syartab"
					>
						<v-btn v-for="item in tabItems" :key="item">
							<span>{{ item }}</span>
						</v-btn>
					</v-bottom-navigation>
				</v-tab-item>
			</v-tabs-items>
		</v-container>
	</div>
</template>

<script
	type="text/javascript"
	src="https://app.sandbox.midtrans.com/snap/snap.js"
	data-client-key="VT-client-6SCMz_XPOiSANWuc"
></script>
<script>
const $img =
	"https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/program/starx.png"

import StarxService from "@/services/StarxService"
import StarxDesc from "@/components/starx/StarxDesc"
import StarxUpload from "@/components/starx/StarxUpload"
import VideoLoop from "@/components/starx/VideoLoop"
import _ from "lodash"
import ShareButton from "@/components/common/ShareButton"
export default {
	name: "StarxBand",
	components: {
		StarxDesc,
		StarxUpload,
		VideoLoop,
		ShareButton,
	},
	data() {
		return {
			domainTitle: process.env.domainTitle,
			page: 1,
			filter: "newest",
			overlay: false,
			timeout: 3000,
			total: null,
			activeBtn: 0,
			wholeResponse: [],
			latests: [],
			finalists: [],
			winners: [],
			prizes: [],
			loading: true,
			tab: null,
			aws:
				"https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/redeemicon/",
			hidden: false,
			sorter: "",
			video_latest: true,
			video_finalist: false,
			video_winners: false,
			dataUrl: process.env.mobileUrl + "starx/band",
			dataTitle: "STARX BAND - Playworld",
			// dataDescription: "Sumber konten VIRAL dari beragam informasi seperti Film, Musik, Olahraga, Travel, Teknologi. Tidak hanya itu, {{ domainTitle }} memberikan insentif dengan pengunjungnya dalam bentuk POIN. POIN bisa dikumpulkan atas interaksi memberikan Komentar, menjawab Quiz dan memberikan Star (Voting). Jumlah POIN yang cukup kemudian bisa ditukar dengan Reward",
			dataDescription:
				"Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya!",
			syartab: 0,
			tabItems: ["STARX", "Final Show", "Other Competition"],
			eskuls: [],
			icon: $img,
		}
	},
	computed: {
		filtered: function () {
			if (this.sorter == "hilow") {
				return _.orderBy(this.latests, "star", "desc")
			} else if (this.sorter == "lowhi") {
				return _.orderBy(this.latests, "star", "asc")
			} else if (this.sorter == "new") {
				return _.orderBy(this.latests, "created_at", "desc")
			} else {
				return _.orderBy(this.latests, "created_at", "asc")
			}
		},
		voters: function () {
			return _.orderBy(this.finalists, "star", "desc")
		},
		topstar: function () {
			var posts = _.keyBy(
				this.finalists,
				"finalist_detail['category_choice']"
			)
			return posts["top-star"]
		},
		juara: function () {
			return _.reverse(this.winners)
		},
	},
	methods: {
		/* Loader */
		setloading() {
			this.overlay = true
		},
		notloading() {
			this.overlay = false
		},

		propername(name) {
			var propername = name.replace("-", " ")
			return propername
		},
		removeat(name) {
			var propername = name.replace("@", "")
			return propername
		},
		async StarxBandHome(code, sortype) {
			this.loading = true
			var params = {
				phase: code,
				key: sortype,
			}
			try {
				const response = await StarxService.getBand(1, params)
				this.wholeResponse = response.data.data
				this.latests = response.data.data.latests.data
				this.prizes = this.wholeResponse.prizes
				this.loading = false
				this.total = response.data.data.latests.last_page
				this.page = response.data.data.latests.current_page
				//console.log(JSON.parse(JSON.stringify(response.data)));
			} catch (error) {
				console.log(error)
				this.loading = false
			}

			try {
				const response = await StarxService.finalist()
				// //console.log(response)
				this.finalists = response.data.data.finalist
				////console.log(JSON.parse(JSON.stringify(this.finalists)))
			} catch (error) {
				console.log(error)
			}
		},
		async fetchWinners() {
			try {
				const response = await StarxService.winners()
				this.winners = response.data.data.winners
				//console.log('winners')
				//console.log(JSON.parse(JSON.stringify(response)))
			} catch (error) {
				console.log(error)
			}
		},
		async next(page) {
			this.setloading()
			var params = {
				phase: 1,
				key: this.filter,
			}
			try {
				const response = await StarxService.getBand(page, params)
				this.wholeResponse = response.data.data
				this.latests = response.data.data.latests.data
				this.prizes = this.wholeResponse.prizes
				this.loading = false
				this.total = response.data.data.latests.last_page
				this.page = response.data.data.latests.current_page
				//console.log(JSON.parse(JSON.stringify(response.data)));
				this.notloading()
			} catch (error) {
				console.log(error)
				this.loading = false
			}
		},
		async StarxHome() {
			try {
				const response = await StarxService.getStarx()
				const results = response.data.data
				this.eskuls = results.eskuls
				//console.log(JSON.parse(JSON.stringify(this.eskuls)))
			} catch (error) {
				console.log(error)
			}
		},
		slugify(text) {
			return text
				.toString()
				.toLowerCase()
				.replace(/\s+/g, "-") // Replace spaces with -
				.replace(/[^\w\-]+/g, "") // Remove all non-word chars
				.replace(/\-\-+/g, "-") // Replace multiple - with single -
				.replace(/^-+/, "") // Trim - from start of text
				.replace(/-+$/, "") // Trim - from end of text
		},
	},
	mounted() {
		this.StarxBandHome(1, "newest")
		this.StarxHome()
		this.fetchWinners()
	},
}
</script>
<style lang="scss">
.v-application .primary {
	background-color: #ff5722 !important;
	border-color: #ff5722 !important;
}
.myshare {
	&.mt-5 {
		margin-top: 0 !important;
	}
	.v-btn {
		margin: 0;
		display: block;
		width: 100%;
	}
}
// div:not(.v-bottom-navigation) .fixed-tabs-bar {
// 	// position: fixed;
// 	// margin-top: 45px;
// 	// z-index: 2;
// }
.v-application .StarxBandHome .v-expansion-panel-content__wrap {
	font-size: 14px !important;
	color: #000 !important;
}
.v-application .StarxBandHome p,
.v-application .StarxBandHome li,
.v-application .StarxBandHome {
	font-size: 14px !important;
	color: #000 !important;
	&.caption {
		font-size: 14px !important;
		margin: 10px 0 !important;
		color: #000 !important;
	}
}
.manual-border {
	border-top: 1px #c5c5c5 solid !important;
	border-right: 1px #c5c5c5 solid !important;
	border-left: 1px #c5c5c5 solid !important;
	border-bottom: 1px #c5c5c5 solid !important;
}
// .v-content__wrap {
// 	padding-top: 55px;
// }
</style>

<template>
	<v-app>
		<v-app-bar
			v-if="
				wowtab != 4 &&
				wowtab != 1 &&
				$route.name != 'cat-subcat-articleslug' &&
				$route.name != 'purchase' &&
				$route.name != 'member-daily-limit' &&
				$route.name != 'member-purchase-daily' &&
				!$route.name.includes('sing')
			"
			dark
			color="dark"
			flat
			fixed
			tile
			class="main-app-bar"
		>
			<!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
			<template
				v-if="$route.name != 'index' && $route.name != 'tukarpoin'"
			>
				<v-btn @click="historyBack()" small icon>
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
				<div class="flex-grow-1"></div>
			</template>
			<template v-else>
				<template v-if="wowtab == 2 && $store.state.storehelpStep > 1">
					<v-btn @click="helpBack()" small icon>
						<v-icon>mdi-chevron-left</v-icon>
					</v-btn>
					<div class="flex-grow-1"></div>
				</template>
				<template
					v-else-if="
						wowtab == 3 && $store.state.storehelpStepRewards > 1
					"
				>
					<v-btn @click="reWardsHelpBack()" small icon>
						<v-icon>mdi-chevron-left</v-icon>
					</v-btn>
					<div class="flex-grow-1"></div>
				</template>
				<template v-else>
					<v-btn small icon>&nbsp;</v-btn>
					<div class="flex-grow-1"></div>
				</template>
			</template>

			<v-toolbar-title
				@click="
					$router.push('/')
					drawer = false
				"
				class="px-0"
			>
				<!-- {{$route.name}} -->
				<template
					v-if="
						$route.name == 'member-pengaturan' ||
						$route.name == 'member-pengaturan-profil'
					"
				>
					<strong>Profile</strong>
				</template>
				<template
					v-else-if="$route.name == 'member-histori_penggunaan_poin'"
				>
					<strong>Total Points</strong>
				</template>
				<template v-else-if="$route.name == 'purchase'">
					<strong>Purchase VIP Membership</strong>
				</template>
				<template
					v-else-if="$route.name == 'member-barang_yang_didapat'"
				>
					<strong>Rewards Status</strong>
				</template>
				<template
					v-else-if="$route.name == 'member-pengaturan-daftar-alamat'"
				>
					<strong>Address List for Rewards</strong>
				</template>
				<template
					v-else-if="$route.name == 'member-pengaturan-daftar-nomor'"
				>
					<strong>Phone List for Rewards</strong>
				</template>
				<template v-else-if="$route.name == 'member-status_transfer'">
					<strong>Purchase Status via Bank</strong>
				</template>
				<template v-else-if="$route.name == 'member-kode-pw'">
					<strong>VIP Code from SMS</strong>
				</template>
				<template v-else-if="$route.name == 'bantuan'">
					<strong>Help Desk</strong>
				</template>
				<template v-else-if="$route.name == 'member-daily-limit'">
					<strong>VIP Daily Limit</strong>
				</template>
				<template
					v-else-if="
						$route.name == 'tukarpoin' ||
						$route.name == 'tukarpoin-redeem-detail'
					"
				>
					<strong>Tukar Poin</strong>
				</template>
				<template v-else-if="$route.name.includes('toppoin')">
					<strong>TOP POIN</strong>
				</template>
				<template
					v-else-if="
						$route.name.includes('member-status_transfer-sms')
					"
				>
					<strong>Purchase Status via SMS</strong>
				</template>
				<template v-else-if="$route.name.includes('member-mypoints')">
					<strong>Total Points</strong>
				</template>
				<template
					v-else-if="$route.name.includes('member-purchase-daily')"
				>
					<strong>Purchase Daily</strong>
				</template>
				<template v-else-if="$route.name.includes('about-daily-limit')">
					<strong>HELP</strong>
				</template>
				<template
					v-else-if="$route.name.includes('member-rewards-status')"
				>
					<strong>REWARDS</strong>
				</template>
				<template v-else-if="$route.name == 'member-otp'">
					<strong>Verifikasi Nomor Ponsel</strong>
				</template>
				<template v-else>
					<img
						v-if="$route.name != 'purchase' && wowtab == 0"
						:src="mainlogo"
						width="130"
						class="mainlogo"
					/>
					<strong v-else-if="$route.name != 'purchase' && wowtab == 1"
						>Tukar Poin</strong
					>
					<strong v-else-if="$route.name != 'purchase' && wowtab == 2"
						>Top Poin</strong
					>
					<strong v-else-if="$route.name != 'purchase' && wowtab == 3"
						>Program</strong
					>
					<strong v-else-if="$route.name != 'purchase' && wowtab == 4"
						>Akun</strong
					>
				</template>

				<!-- {{$route.name}} -->
			</v-toolbar-title>
			<div class="flex-grow-1"></div>

			<div
				@click="
					$router.push('/')
					clearStorage()
				"
				class="pr-1"
				v-if="$route.name != 'index'"
			>
				<img src="/img/peweicon.svg" width="20" />
			</div>

			<div v-else @click="opensearch = true" class="pr-1">
				<v-icon>mdi-magnify</v-icon>
			</div>
		</v-app-bar>
		<v-main>
			<div class="pb-10">
				<nuxt keep-alive />
			</div>
			<v-bottom-navigation
				fixed
				dark
				grow
				color="white"
				background-color="#2c2c2d"
				v-model="tab"
			>
				<v-btn
					small
					class="text-center"
					v-for="item in tabItems"
					:key="item"
					:to="item.to"
				>
					<span style="font-size: 8px" v-html="item.name"></span>
				</v-btn>
			</v-bottom-navigation>

			<!-- LIKE MODAL -->
			<v-bottom-sheet
				dark
				width="600px"
				v-model="$store.state.profileDialog"
			>
				<v-sheet height="100%">
					<v-toolbar :elevation="1">
						<!-- Arrow -->
						<v-btn
							dark
							icon
							tile
							style="border-right: 0px solid #717171"
							light
							@click="$store.commit('SET_PROFILE_DIALOG', false)"
						>
							<v-icon>mdi-close</v-icon>
						</v-btn>

						<!-- Title -->
						<v-toolbar-items class="ml-2">
							<v-btn
								dark
								text
								class="pl-0"
								style="margin-left: -10px"
								>Informasi</v-btn
							>
						</v-toolbar-items>
						<div class="flex-grow-1"></div>
					</v-toolbar>

					<div class="px-4 pt-10 text-center">
						<!-- FAIL/SUCCESS ICON -->
						<div
							class="d-flex align-center text-center justify-center"
						>
							<v-img
								v-if="
									$store.state.dialog_content != null &&
									$store.state.dialog_content.success == true
								"
								src="/img/icons/success.svg"
								max-width="60"
								class="d-inline-block mr-2"
							></v-img>
							<v-img
								v-else-if="
									$store.state.dialog_content != null &&
									$store.state.dialog_content.success ==
										'info'
								"
								src="/img/icons/info-white.svg"
								max-width="60"
								class="d-inline-block mr-2"
							></v-img>
							<v-img
								v-else
								src="/img/icons/error-new.svg"
								max-width="60"
								class="d-inline-block mr-2"
							></v-img>
						</div>

						<!-- message -->
						<div class="mt-5 mb-0 text-16">
							<template
								v-if="
									$store.state.dialog_content != null &&
									$store.state.dialog_content.message
								"
							>
								<div
									v-html="$store.state.dialog_content.message"
								></div>
							</template>
							<template v-else> Data Sukses Tersimpan </template>

							<template
								v-if="
									$store.state.dialog_content != null &&
									$store.state.dialog_content.resi
								"
							>
								<h3 class="text-30">
									{{ $store.state.dialog_content.resi }}
									<v-icon
										@click="
											copyToClipBoard(
												$store.state.dialog_content.resi
											)
										"
										>mdi-content-copy</v-icon
									>
								</h3>
							</template>
						</div>
					</div>

					<!-- BUTTON -->
					<v-container class="text-center">
						<v-btn
							v-if="
								$store.state.dialog_content != null &&
								$store.state.dialog_content.button == false
							"
							@click="$store.commit('SET_PROFILE_DIALOG', false)"
							color="#ff4200"
							class="mt-2"
						>
							Tutup
						</v-btn>
						<v-btn
							color="#ff4200"
							class="mt-2"
							:target="
								$store.state.dialog_content.button.blank == true
									? '_BLANK'
									: '_SELF'
							"
							:href="
								$store.state.dialog_content != null
									? $store.state.dialog_content.button.to
									: '#'
							"
							v-else-if="
								$store.state.dialog_content != null &&
								$store.state.dialog_content.button != false
							"
						>
							{{ $store.state.dialog_content.button.text }}
						</v-btn>
					</v-container>
					<br />
					<br />
				</v-sheet>
			</v-bottom-sheet>
		</v-main>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			tabItems: [
				{
					name: "Profile Saya",
					to: "/member/pengaturan/profil",
				},
				{
					name: "Tujuan Pengiriman<br>Rewards Digital",
					to: "/member/pengaturan/daftar-nomor",
				},
				{
					name: "Tujuan Pengiriman<br>Rewards Fisik",
					to: "/member/pengaturan/daftar-alamat",
				},
				{
					name: "PIN",
					to: "/member/pengaturan/pin",
				},
			],
		}
	},
}
</script>

<style lang="scss">
.v-bottom-navigation {
	.v-btn {
		border-top: 5px solid #bababa !important;
		&.v-btn--active {
			border-color: #ff4200 !important;
		}
	}
}
</style>

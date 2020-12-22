<template>
	<v-bottom-sheet dark width="600px" v-model="$store.state.profileDialog">
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
					<v-btn dark text class="pl-0" style="margin-left: -10px"
						>Informasi</v-btn
					>
				</v-toolbar-items>
				<div class="flex-grow-1"></div>
			</v-toolbar>

			<div class="px-4 pt-10 text-center">
				<!-- FAIL/SUCCESS ICON -->
				<div class="d-flex align-center text-center justify-center">
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
							$store.state.dialog_content.success == 'info'
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
						<div v-html="$store.state.dialog_content.message"></div>
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
</template>

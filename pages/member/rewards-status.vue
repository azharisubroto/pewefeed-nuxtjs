<template>
	<div>
		<v-list-item-group>
			<template v-for="(item, i) in rewardsmenu">
				<div
					v-if="i == 0"
					:key="'dvdri-' + i"
					class="devider-small"
				></div>
				<v-list-item class="py-3" :key="'persmenu-' + i" :to="item.to">
					<v-list-item-content>
						<v-list-item-title>{{ item.name }}</v-list-item-title>
					</v-list-item-content>
					<v-list-item-icon>
						<v-icon>mdi-chevron-right</v-icon>
					</v-list-item-icon>
				</v-list-item>
				<div :key="'dvdr-' + i" class="devider-small"></div>
			</template>
		</v-list-item-group>
	</div>
</template>

<script>
export default {
	name: "RewardsMenu",
	data() {
		return {
			rewardsmenu: [
				{
					name: "Rewards Status",
					to: "/member/barang_yang_didapat/",
				},
				{
					name: "Phone List",
					to: "/member/pengaturan/daftar-nomor",
				},
				{
					name: "Address List",
					to: "/member/pengaturan/daftar-alamat",
				},
			],
		}
	},
}
</script>

<template>
	<div>

		<v-container class="pt-10">
			<v-row>
				<v-col cols="12" class="text-center">
					Pembelian Dengan Bank Transfer / Credit Card
				</v-col>
			</v-row>
		</v-container>

		<template v-if="step == 1">
			<v-list-item-group color="dark" class="mt-2">
				<template v-for="(item, i) in menu">
					<div  class="devider-small" :key="'div-'+i"></div>
					<v-list-item @click="step = 2" :key="'list-'+i">
						<v-list-item-content>
							<v-list-item-title>
								{{item.title}}
							</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon>
							<v-icon>mdi-chevron-right</v-icon>
						</v-list-item-icon>
					</v-list-item>
				</template>
				<div  class="devider-small"></div>
			</v-list-item-group>
		</template>

		<template v-if="step == 2">
			<v-list-item-group color="dark" class="mt-10">
				<div  class="devider-small"></div>
				<v-list-item href="http://www.gudangapp.com/Wap_action.jsp?content=EXT+WPW&dest=97789&&success=https://pewefeed.com/rand">
					<v-list-item-content>
						<v-list-item-title>
							Extra 300 VIP Daily Limit
							<div class="text-12">
								Rp 10.000 belum termasuk PPN 10%
							</div>
						</v-list-item-title>
					</v-list-item-content>
					<v-list-item-icon>
						<v-icon>mdi-chevron-right</v-icon>
					</v-list-item-icon>
				</v-list-item>
				<div  class="devider-small"></div>
			</v-list-item-group>
		</template>
	</div>
</template>

<script>
export default {
	name: "PurcahsePage",
	data() {
		return{
			step: 1,
			menu: [
				{
					title: 'BCA',
					to: 'bca'
				},
				{
					title: 'BRI',
					to: 'bca'
				},
				{
					title: 'BNI',
					to: 'bca'
				},
				{
					title: 'MANDIRI',
					to: 'bca'
				},
				{
					title: 'PERMATA',
					to: 'bca'
				},
			]
		}
	}
}
</script>

<template>
	<div>
		<template v-if="list && list.length">
			<v-card v-for="(item, i) in list" :key="item.id" :elevation="2" class="mb-4">
				<v-card-text>
					<v-row>
						<v-col cols="4">
							<div class="orange jangan lighten-1 py-2">
								<v-img contain :aspect-ratio="1" :src="item.image ? item.image : '/img/user.jpeg'"></v-img>
							</div>
						</v-col>
						<v-col cols="8">
							<div class="caption">{{item.created_at}}</div>
							<h4>{{item.title}}</h4>
							<div class="caption">
								on program - Tukar Poin
							</div>
						</v-col>
					</v-row>
				</v-card-text>
				<!-- ACTION -->
				<v-expansion-panels v-if="actionable">
					<v-expansion-panel class="elevation-0"
					>
						<v-expansion-panel-header>Lengkapi Data</v-expansion-panel-header>
						<v-expansion-panel-content>
							<v-alert
							text
							type="info"
							class="caption"
							success>Rewards No. <strong>{{ item.customer_redeem ? item.customer_redeem.redeem_code : '' }}</strong> memerlukan informasi berikut sebelum dikirimkan</v-alert>

							<template>
								<v-select
								v-if="item.type == 'Non Fisik'"
								:items="contact ? contact : ['Belum ada nomor']"
								placeholder="Pilih Nomor"
								item-text="title"
								item-value="id"
								v-model="id_tujuan[i]"
								></v-select>

								<v-select
								v-else
								:items="addresses ? addresses : ['Belum ada alamat']"
								placeholder="Pilih Alamat"
								item-text="title"
								item-value="id"
								v-model="id_tujuan[i]"
								></v-select>

								<v-btn
								dark depressed color="orange"
								@click="prosesReward(item.id, item.customer_redeem.id, id_tujuan[i], item.type, i)">
								Proses
								</v-btn>

								<v-btn
								v-if="item.type == 'Non Fisik'" depressed to="/member/pengaturan/daftar-nomor">Input Data Baru</v-btn>
								<v-btn v-else depressed to="/member/pengaturan/daftar-alamat">Input Data Baru</v-btn>
							</template>

							<!-- <template v-else>
								<v-select

								:items="contact"
								placeholder="Pilih Nomor"
								item-text="title"
								item-value="id"
								v-model="id_fisik[i]"
								></v-select>

								<v-btn @click="prosesFisik(item.id)">Proses</v-btn>
							</template> -->
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
				<!-- END ACTION -->

				<v-expansion-panels v-if="expandable">
					<v-expansion-panel class="elevation-0">
						<v-expansion-panel-header>
							Lacak
						</v-expansion-panel-header>
						<v-expansion-panel-content>
							<v-alert
							text
							type="info"
							class="caption"
							success>Rewards No. <strong>{{ item.customer_redeem ? item.customer_redeem.redeem_code : '' }}</strong> sedang diproses oleh admin {{ domainTitle }}</v-alert>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>

				<v-expansion-panels v-if="sent">
					<v-expansion-panel class="elevation-0">
						<v-expansion-panel-header>
							Lacak
						</v-expansion-panel-header>
						<v-expansion-panel-content>
							<v-alert
							text
							type="info"
							class="caption"
							success>Rewards No. <strong>{{ item.customer_redeem ? item.customer_redeem.redeem_code : '' }}</strong> sudah dikirim secara {{ (item.type == 'Non Fisik') ? 'Online' : 'Offline' }} pada tanggal <strong>{{ item.history_transaction[0].created_at }}</strong> </v-alert>

							<v-btn
							dark
							depressed
							color="orange"
							@click="confirm(item.id, item.customer_redeem.id)"
							>REWARDS TELAH DITERIMA</v-btn>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>

				<v-expansion-panels v-if="finished">
					<v-expansion-panel class="elevation-0">
						<v-expansion-panel-header>
							Lacak
						</v-expansion-panel-header>
						<v-expansion-panel-content>
							<v-alert
							text
							type="info"
							class="caption"
							success>Rewards No. <strong>{{ item.customer_redeem ? item.customer_redeem.redeem_code : '' }}</strong> sudah dikirim secara {{ (item.type == 'Non Fisik') ? 'Online' : 'Offline' }} pada tanggal <strong>{{ item.history_transaction[1] ? item.history_transaction[1].created_at : item.history_transaction[0].created_at }}</strong> dan telah diterima pada tanggal <strong>{{ item.history_transaction ? item.history_transaction[0].created_at : '' }}</strong></v-alert>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-card>
		</template>
		<template v-else>
			<div class="text-center text-bold py-5">
				<v-btn rounded color="#7D7D7D" class="text--italic px-5">no data</v-btn>
			</div>
		</template>
	</div>
</template>
<script>
import UserService from '@/services/UserService'
export default {
	name:"RewardCard",
	props: ['list','addresses','contact', 'expandable', 'actionable', 'sent', 'finished', 'type'],
	data() {
		return {
			domainTitle: process.env.domainTitle,
			id_tujuan: [],
			loading: []
		}
	},
	methods: {
		async claimDigital(id_barang, id_redeem, id_tujuan, i) {
			// id, customer_redeem_id, telepon_id
			var params = {
				id: id_barang,
				customer_redeem_id: id_redeem,
				contact_id: id_tujuan
			}
			console.log(params)

			try {
				const res = await UserService.claimDigital(params)
				console.log(res)
				if(res.status == 200) {
					this.$bus.$emit('refetchRewards')
					this.loading[i] = false
					alert('Anda telah berhasil mengirimkan request klaim');
					this.$bus.$emit('claimed')
				}
			} catch (error) {
				console.log(error)
			}
		},
		async claimFisik(id_barang, id_redeem, id_tujuan, i) {
			var params = {
				id: id_barang,
				customer_redeem_id: id_redeem,
				contact_id: id_tujuan
			}
			console.log(params)

			try {
				const res = await UserService.claimFisik(params)
				console.log(res)
				if(res.status == 200) {
					this.$bus.$emit('refetchRewards')
					this.loading[i] = false
					alert('Anda telah berhasil mengirimkan request klaim')
				}
			} catch (error) {
				console.log(error)
			}
		},
		prosesReward(id_barang, id_redeem, id_tujuan, type, i) {
			this.loading[i] = true
			//console.log('type: '+type+' | ID: '+id+' | redeem ID: '+id_barang)
			console.log('Item ID: '+ id_barang)
			console.log('Redeem ID: '+ id_redeem)
			console.log('Type Redeem: '+ type)
			console.log('ID Tujuan: '+ id_tujuan)

			if( type == 'Non Fisik' ) {
				this.claimDigital(id_barang, id_redeem, id_tujuan)
			} else {
				this.claimFisik(id_barang, id_redeem, id_tujuan)
			}
		},
		async confirm(id, customer_redeem_id){
			var params = {
				id: id,
				customer_redeem_id: customer_redeem_id,
			}
			console.log(params)

			try {
				const res = await UserService.confirmReward(params)
				console.log(res)
				if(res.status == 200) {
					this.$bus.$emit('refetchDiterima')
					alert('Anda telah mengkonfirmasi penerimaan reward')
				}
			} catch (error) {
				console.log(error)
			}
		}
	},
	mounted() {
		// console.log(JSON.parse(JSON.stringify(this.addresses)))
		// console.log(JSON.parse(JSON.stringify(this.contact)))
		const theList = this.list
		theList.forEach(element => {
			this.id_tujuan.push(null)
			//this.loading.push(null)
		});
	}
}
</script>
<style lang="sass">
	.v-card, .v-application .elevation-2
		box-shadow: 0 12px 14px rgba(0, 0, 0, 0.1) !important
	v-expansion-panel-header__icon
		margin-left: 0!important
		.v-icon
			color: var(--primary)!important
	.theme--light.v-expansion-panels .v-expansion-panel-header .v-expansion-panel-header__icon .v-icon
		color: var(--primary)!important
</style>
<style lang="scss">
	.v-expansion-panel-header__icon {
		margin-left:0!important;
	}
</style>

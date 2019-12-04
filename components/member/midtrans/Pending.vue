<template>
	<section class="pending-page">
		<v-container>
			<v-row v-if="list">
				<v-col>
					<v-expansion-panels v-if="!loading && datamidtrans" class="mb-3" focusable>
                        <v-expansion-panel
                        v-for="(mid, i) in datamidtrans"
                        :key="i"
                        class="mb-3"
                        >
                            <v-expansion-panel-header>
                                <v-row no-gutters>
                                    <v-col cols="5 text--secondary">{{ '#' + mid.order_id }}</v-col>
                                    <v-col cols="" class="text-center">{{ mid.transaction_time }}</v-col>
                                </v-row>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content class="pt-3">
                                <v-subheader>Detail Pembayaran</v-subheader>
                                <v-divider></v-divider>
                                <v-simple-table>
                                    <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <td>Transfer Ke</td>
                                            <td>BCA</td>
                                        </tr>
                                        <tr v-if="mid.veritrans_callback.va_numbers.length > 0">
                                            <td>No. Virtual Account</td>
                                            <td>
                                                <v-row no-gutters v-for="(va, i) in mid.veritrans_callback.va_numbers" :key="i">
                                                    <v-col cols="12">
                                                        {{va.va_number}}
                                                    </v-col>
                                                </v-row>
                                            </td>
                                        </tr>
                                        <tr v-else>
                                            <td>No. Virtual Account</td>
                                            <td> - </td>
                                        </tr>
                                        <tr>
                                            <td>Nama Perusahan</td>
                                            <td>PT. Jayadata Indonesia</td>
                                        </tr>
                                        <tr>
                                            <td>Jumlah Transfer</td>
                                            <td>{{'Rp.' + mid.amount + ',-'}}</td>
                                        </tr>
                                    </tbody>
                                    </template>
                                </v-simple-table>
                                <v-card>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-alert
                                                    prominent
                                                    text
                                                    type="info"
                                                    success>Informasi Penting</v-alert>
                                            </v-col>
                                            <v-col cols="12">
                                                <ul>
                                                    <li>Order ini akan expired pada {{mid.expired_at}}</li>
                                                    <li>Jika anda telah melakukan pembayaran, secara otomatis transaksi ini akan berubah menjadi "Selesai" tanpa perlu konfirmasi dari anda</li>
                                                    <li>Untuk membatalkan transaksi ini cukup dengan tidak melakukan pembayaran</li>
                                                </ul>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
					<br>
					<br>
					<br>
					<br>
				</v-col>
			</v-row>
			<v-row v-else-if="!list && !loading">
				<v-col>
					<v-alert
					prominent
					text
					type="info"
					success>Tidak ada data yang tersedia</v-alert>
				</v-col>
			</v-row>
			<v-skeleton-loader v-else
			class="mx-auto mt-5"
			type="list-item-avatar-three-line, list-item-avatar-three-line, list-item-avatar-three-line"
			></v-skeleton-loader>
		</v-container>
	</section>
</template>
<script>
import UserService from '@/services/UserService'
export default {
	name:"Pending",
	data() {
		return {
            midtranscallback: [],
            datamidtrans: [],
            list: false,
            loading: true
		}
	},
	methods: {
		async fetchData() {
            try {
                const res = await UserService.statusTransfer()
                if (res.data.data.pending.length > 0) {
                    this.list = true
                }
                this.loading = false
                console.log(res)
                this.datamidtrans = res.data.data.pending
            } catch (error) {
                console.log(error)
            }
        }
	},
	mounted() {
		this.fetchData()
	}
}
</script>
<style lang="sass" scoped>
	.pending-page .container
		background: #f9f9f9
</style>

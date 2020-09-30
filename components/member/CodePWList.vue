<template>
    <v-container>
        <!-- <v-skeleton-loader v-if="isLoader"
          type="table-tbody"
        ></v-skeleton-loader> -->
		<div v-if="isLoader" class="text-xs-center" align="center">
			<v-progress-circular
				indeterminate
				:size="80"
				:width="8"
				color="green"
				class="mt-5">
			</v-progress-circular>
		</div>
        <v-card class="mb-4" v-else>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">Tanggal</th>
                            <th class="text-center">Kode PW</th>
                            <th class="text-center">Deskripsi</th>
                            <th class="text-center" v-if="status == 'Active'">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in kodepw" :key="item.id">
                            <td class="text-center">{{ item.created_at }}</td>
                            <td class="text-center">{{ item.code }}</td>
                            <td class="text-center">{{ item.description }}</td>
                            <td class="text-center" v-if="item.status == 'Active'">
                                <v-btn @click="$router.push('/c/' + item.url_code)" color="success">Tukar</v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <v-row class="mt-4" v-if="kodepw.length > 0">
                <v-col cols="12">
                <v-pagination
                    v-model="page"
                    :length="totalPage"
                    :total-visible="totalVisible"
                    @input="next"
                ></v-pagination>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col cols="12" class="text-center">
                    <strong class="text-center body-2">Tidak Ada Data</strong>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import UserService from '@/services/UserService'
import _ from 'lodash';
export default {
    name: "CodePWList",
    props: ["status"],
    data: () => ({
        kodepw: [],
        page : 1,
        totalPage : 0,
        totalVisible : 7,
        isLoader: true,
        headers: [
            {
                text: 'Tanggal',
                align: 'center',
                value: 'created_at',
            },
            {
                text: 'Kode PW',
                align: 'center',
                sortable: false,
                value: 'code',
            },
            {
                text: 'Deskripsi',
                align: 'center',
                sortable: false,
                value: 'description',
            },
            {
                text: 'Status',
                align: 'center',
                sortable: false,
                value: 'status',
            },
        ]
    }),
    methods: {
        async fetchData(page, params) {
            try {
                const res = await UserService.getCodePW(page)
                this.kodepw = _.takeWhile(res.data.data, {'status': params})
                this.page = res.data.pagination.current_page
                this.totalPage = res.data.pagination.last_page
                this.isLoader = false;
            } catch (error) {
                console.log(error)
            }
        },
        next(num) {
            this.fetchData(num, this.status)
            this.isLoader = true
        }
    },
    mounted() {
        this.fetchData(1, this.status)
    }
}
</script>

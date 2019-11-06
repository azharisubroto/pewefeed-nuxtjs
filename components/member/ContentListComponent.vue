<template>
<v-container>
    <v-row class="justify-md-center">
        <v-col cols="12" md="8">
            <v-card>
                <v-card-title>
                Daftar Konten
                <div class="flex-grow-1"></div>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                </v-card-title>
                <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
                ></v-data-table>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import UserService from "@/services/UserService";
  export default {
    name: "ContentListComponent",
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Tgl',
            align: 'center',
            sortable: true,
            value: 'created_at',
          },
          {
            text: 'Kode',
            value: 'transaction_code',
            align: 'center',
            sortable: true,
          },
          {
            text: 'Type',
            value: 'type',
            align: 'center',
            sortable: true,
          },
          {
            text: 'Detail',
            value: 'detail',
            align: 'center',
            sortable: true,
          },
          {
            text: 'Vip',
            value: 'vip',
            align: 'center',
            sortable: true,
          },
        ],
        desserts: [],
      }
    },
    methods: {
        async getMutation() {
            try {
                const res = await UserService.getHistoryVip()
                this.desserts = res.data.data
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted() {
        this.getMutation();
    }
  }
</script>
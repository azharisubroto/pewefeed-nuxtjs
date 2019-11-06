<template>
<v-container>
    <v-card>
    <v-tabs
      v-model="tab"
      background-color="orange accent-14"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        Menunggu Response
        <img width="30" src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/m-menu2/tx1.png" alt="">
      </v-tab>

      <v-tab href="#tab-2">
        Sedang Di proses
        <img width="30" src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/m-menu2/tx2.png" alt="">
      </v-tab>

      <v-tab href="#tab-3">
        Konfirmasi Penerimaan
        <img width="30" src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/m-menu2/tx3.png" alt="">
      </v-tab>

      <v-tab href="#tab-4">
        Sudah Diterima
        <img width="30" src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/m-menu2/tx4.png" alt="">
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 3"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card>
          <v-card-text>Belum Ada Data</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</v-container>
</template>
<script>
export default {
    name: "TransactionComponent",
    data: () => ({

    })
}
</script>
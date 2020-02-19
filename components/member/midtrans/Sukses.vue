<template>
  <section class="finish-page">
    <v-container>
      <v-row v-if="list">
        <v-col>
          <v-expansion-panels v-if="!loading && datamidtrans" class="mb-3" focusable>
            <v-expansion-panel v-for="(mid, i) in datamidtrans" :key="i" class="mb-3">
              <v-expansion-panel-header>
                <v-row no-gutters>
                  <v-col cols="4" class="lh-a text-14">{{ mid.transaction_time }}</v-col>
				  <v-col cols="2">
					  <v-icon class="green--text rel">mdi-check-circle</v-icon>
				  </v-col>
                  <v-col
                    cols="6"
                    class="text-left text-14 lh-a"
                  >Pembayaran No. {{ '#' + mid.order_id }} senilai {{ mid.amount }} telah kami terima</v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="pt-3">
                <a
                  :href="downloadUrl(mid.order_id)"
                  target="blank"
                  style="text-decoration: none"
                  class="v-btn v-btn--block v-btn--depressed theme--dark v-size--default deep-orange"
                >DOWNLOAD INVOICE</a>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <br />
          <br />
          <br />
          <br />
        </v-col>
      </v-row>
      <v-row v-else-if="!list && !loading">
        <v-col>
          <v-alert prominent text type="info">Tidak ada data yang tersedia</v-alert>
        </v-col>
      </v-row>
      <v-skeleton-loader
        v-else
        class="mx-auto mt-5"
        type="list-item-avatar-three-line, list-item-avatar-three-line, list-item-avatar-three-line"
      ></v-skeleton-loader>
    </v-container>
  </section>
</template>
<script>
import UserService from "@/services/UserService";
export default {
  name: "Sukses",
  data() {
    return {
      midtranscallback: [],
      datamidtrans: [],
      list: false,
      loading: true
    };
  },
  methods: {
    async fetchData() {
      try {
        const res = await UserService.statusTransfer();
        if (res.data.data.finish.length > 0) {
          this.list = true;
        }
        this.loading = false;
        //console.log(res);
        this.datamidtrans = res.data.data.finish;
        console.log(JSON.parse(JSON.stringify(this.datamidtrans)));
      } catch (error) {
        console.log(error);
      }
    },
    downloadUrl(order_id) {
      return "https://payment.playworld.id/api/midtrans/print/" + order_id;
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
<style lang="scss">
.finish-page .container {
  background: #fff;
}

.finish-page .v-icon:not(.rel) {
  color: #ff5722 !important;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>

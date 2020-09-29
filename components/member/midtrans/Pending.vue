<template>
  <section class="pending-page">
    <div v-if="loading">
        <v-skeleton-loader
            class="mx-auto mt-5"
            type="list-item-avatar-three-line, list-item-avatar-three-line, list-item-avatar-three-line"
        ></v-skeleton-loader>
    </div>
    <div v-else>
        <template v-if="datamidtrans!=null && datamidtrans.length > 0">
            <div class="status-item" v-for="(mid, i) in datamidtrans" :key="i">
                <div class="deep-orange--text text-18"><strong>{{ '#' + mid.order_id }}</strong></div>
                <div class="text-16">
                    <div>{{ mid.created_at ? mid.created_at : 'n/a' }}</div>
                    <div>{{ mid.voucher.description ? mid.voucher.description : 'n/a' }}</div>
                    <div>{{ mid.voucher.price ? mid.voucher.price : 'n/a' }}</div>
                    <v-btn @click="openIframe(mid.invoice_url)" color="deep-orange" block large class="mt-4">
                        Selesaikan Pembayaran
                    </v-btn>
                </div>
            </div>
        </template>

        <v-row class="mx-0" v-else>
            <v-col cols="12">
                <div class="text-center pa-5">
                    <v-btn rounded color="#7D7D7D" class="text--italic px-5">no data</v-btn>
                </div>
            </v-col>
        </v-row>
    </div>

    <IframePreview
      :dialogVisible="iframeDialogVisible"
      :invoiceUrl="invoiceUrl"
      @close="iframeClose()"
    />
  </section>
</template>
<script>
import UserService from "@/services/UserService";
import IframePreview from "@/components/modal/IframePreview";
export default {
  name: "Pending",
  data() {
    return {
      midtranscallback: [],
      datamidtrans: [],
      list: false,
      loading: true,
      iframeDialogVisible: false,
      invoiceUrl: ""
    };
  },
  components: {
    IframePreview
  },
  methods: {
    async fetchData() {
      try {
        const res = await UserService.statusTransfer();
        if (res.data.data.pending.length > 0) {
          this.list = true;
        }
        this.loading = false;
        this.datamidtrans = res.data.data.pending;
        //console.log(JSON.parse(JSON.stringify(this.datamidtrans)));
      } catch (error) {
        console.log(error);
      }
    },
    iframeClose() {
      this.iframeDialogVisible = false;
    },
    openIframe(url) {
      this.invoiceUrl = url;
      this.iframeDialogVisible = true;
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
<style lang="scss">
.pending-page .v-icon {
  color: #ff5722 !important;
  position: absolute;
  top: 10px;
  right: 10px;
}
.status-item {
	border-top: 1px solid rgba(255, 236, 236, .5);
	padding: 20px 15px;
	line-height: 25px;
}
div .status-item:last-child {
	border-bottom: 1px solid rgba(255, 236, 236, .5);
}
</style>

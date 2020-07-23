<template>
  <div>
    <v-container class="pt-10">
      <v-row>
        <v-col cols="12" class="text-center">Pembelian Dengan Bank Transfer / Credit Card</v-col>
      </v-row>
    </v-container>

    <template v-if="step == 1">
      <v-list-item-group color="dark" class="mt-2">
        <template v-for="(item, i) in menu">
          <div class="devider-small" :key="'div-'+i"></div>
          <v-list-item @click="step = 2; merchant = item.merchant" :key="'list-'+i">
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>
        <div class="devider-small"></div>
      </v-list-item-group>
    </template>

    <template v-if="step == 2">
      <v-list-item-group color="dark" class="mt-10">
        <div class="devider-small"></div>
        <v-list-item @click="purchaseLink()">
          <v-list-item-content>
            <v-list-item-title>
              Extra 300 VIP Daily Limit
              <div class="text-12 mt-1">Rp 10.000 belum termasuk PPN 10%</div>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <div class="devider-small"></div>
      </v-list-item-group>
    </template>

	<IframePreview
      :dialogVisible="iframeDialogVisible"
      :invoiceUrl="invoiceUrl"
      @close="iframeClose()"
    />
  </div>
</template>

<script>
import PurchaseService from "@/services/PurchaseService";
import UserService from "@/services/UserService";
import IframePreview from "@/components/modal/IframePreview";
export default {
  name: "PurcahsePage",
  middleware: "auth",
  components: {
	  IframePreview,
  },
  data() {
    return {
      step: 1,
	  merchant: null,
	  invoiceUrl: "",
	  iframeDialogVisible: false,
	  data: {
        avatar: "",
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        msisdn: "",
        expire: "",
        instagram: "",
        no_telp: ""
      },
      menu: [
        {
          title: "BCA",
          to: "bca",
          merchant: "midtrans",
        },
        {
          title: "BRI",
          to: "bri",
          merchant: "xendit",
        },
        {
          title: "BNI",
          to: "bni",
          merchant: "xendit",
        },
        {
          title: "MANDIRI",
          to: "mandiri",
          merchant: "xendit",
        },
        {
          title: "PERMATA",
          to: "permata",
          merchant: "xendit",
        },
      ],
    };
  },
  mounted(){
	  this.setProfile();
  },
  methods: {
    fetchUserdata() {
      this.setProfile();
      this.isLoggedIn = true;
    },
    setProfile() {
      let vm = this;
      this.$auth.fetchUser().then(() => {
        localStorage.setItem("userdata", JSON.stringify(vm.$auth.user));
      });
      // this.$auth.fetchUser();
      if (localStorage.getItem("userdata")) {
        var res = [];
        res.data = JSON.parse(localStorage.getItem("userdata"));

        this.usermentah = res.data;
        this.userdata = res.data.data;
        this.mypoint = res.data.point_total;
        this.profile = res.data.data;

        var limit = res.data.point_limit;
        limit = limit.split("/");
        this.sekarang = limit[0];
        this.batas = limit[1];
        this.remaining = limit[1] - limit[0];

        this.data.first_name = res.data.data.first_name;
        this.data.last_name = res.data.data.last_name;
        this.data.username = res.data.data.username;
        this.data.msisdn = res.data.data.msisdn;
        this.data.no_telp = res.data.data.no_telp;
        this.data.instagram = res.data.data.instagram;
        this.data.email = res.data.data.email;
        this.data.expire = res.data.data.expire;
        this.expire_date = this.data.expire;
        if (res.data.data.status_expired == 1) {
          this.isActive = true;
        }
        this.login = true;
      }
    },
    async purchaseLink() {
      console.log(this.merchant);
      if (this.merchant == "xendit") {
        const sendvoucher = {
          voucher_id: 204,
          email: this.data.email,
        };

        try {
          const res = await PurchaseService.xendit(sendvoucher);
          if (res.status == 200) {
            console.log(res.data);
            this.invoiceUrl = res.data.invoice_url;
            this.iframeDialogVisible = true;
          }
        } catch (error) {
          console.log(error);
        }
      } else if (this.merchant == "midtrans") {
        const sendvoucher = {
          voucher_id: 204,
        };

        try {
          const res = await PurchaseService.midtrans(sendvoucher);
          if (res.status == 200) {
            // console.log(res.data)
            var url = res.data.snap_url;
            window.open(url, "_blank");
          }
        } catch (error) {
          console.log(error);
        }
      }
	},
	closeDialog() {
      this.e1 = 1;
      this.intDialogVisible = false;
    },
	iframeClose() {
      this.iframeDialogVisible = false;
      this.$router.push("/member/status_transfer");
      // other code
    },
    iframePreview() {
      this.iframeDialogVisible = true;
    }
  },
};
</script>

<template>
  <div>
    <template v-if="step == 1">
      <v-container class="pt-8">
        <v-row>
          <v-col cols="12" class="deep-orange--text text-18">
            <strong>Bank Transfer / Credit Card</strong>
          </v-col>
        </v-row>
      </v-container>
      <v-list-item-group color="dark" class="mt-0">
        <template v-for="(item, i) in menu">
          <div class="devider-small" :key="'div-'+i"></div>
          <v-list-item class="py-3" @click="step = 2; merchant = item.merchant" :key="'list-'+i">
            <v-list-item-content class="text-18">
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>
        <div class="devider-small"></div>
      </v-list-item-group>

	  <v-container class="pt-8">
        <v-row>
          <v-col cols="12" class="deep-orange--text text-18">
            <strong>eWallets</strong>
          </v-col>
        </v-row>
      </v-container>
      <v-list-item-group color="dark" class="mt-0">
        <template v-for="(item, i) in ewalletsmenu">
          <div class="devider-small" :key="'div-'+i"></div>
          <v-list-item class="py-3" @click="eWalletPurchase(item.merchant)" :key="'list-'+i">
            <v-list-item-content class="text-18">
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
        <v-list-item class="py-3" @click="purchaseLink()">
          <v-list-item-content class="text-18">
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

	<v-overlay
		:opacity="1"
		:value="ewalletOverlay"
	>
		<div class="text-center">
			<v-progress-circular indeterminate size="64" color="deep-orange"></v-progress-circular>
			<div class="mt-4">
				Connecting Provider...
			</div>
		</div>
	</v-overlay>
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
	  ewalletOverlay: false,
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
        no_telp: "",
      },
      ewalletsmenu: [
        {
          title: "DANA",
          merchant: "dana",
        },
        {
          title: "LINKAJA",
          merchant: "linkaja",
        },
	  ],
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
  mounted() {
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
	async eWalletPurchase(provider) {
		this.ewalletOverlay = true
		let data = {
			provider: provider,
			voucher_id: 204
		}
		try {
			const res = await UserService.eWalletBuy(data);
			console.log(res.data.invoice_url);
			window.open(res.data.invoice_url, '_blank');
			this.ewalletOverlay = false
		} catch (error) {
			console.log(error);
			this.ewalletOverlay = false
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
    },
  },
};
</script>

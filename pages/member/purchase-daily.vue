<template>
  <div class="paymentpage">
	<div
		style="background: #757575;color:#fff"
		class="text-center px-5 py-10 mb-4"
	>
		<strong class="text-18">Extra 300 VIP Daily Limit</strong>
		<div class="text-16">Rp. 10.000 (exclude PPN 10%)</div>
	</div>

    <template v-if="step == 1">
		<!-- SMS  -->
		<v-container class="mb-3 mt-5">
			<strong class="deep-orange--text text-18">SMS Method</strong>
		</v-container>
		<v-list-item-group>
			<template v-for="(item, i) in smspayment">
				<div v-if="i==0" class="devider-small" :key="'purchase-menu-devider-1'+i"></div>
				<v-list-item
				class="py-3"
				:key="'purchase-menu'+i"
				disabled
				>
				<v-list-item-content>
					<v-list-item-title style="line-height:23px">
					<strong class="d-block text-18">{{item.label}}</strong>
					<span class="d-block text-14">{{item.desc}}</span>
					</v-list-item-title>
				</v-list-item-content>
				<v-list-item-icon>
					<v-icon size="30">mdi-chevron-right</v-icon>
				</v-list-item-icon>
				</v-list-item>
				<div class="devider-small" :key="'purchase-menu-devider'+i"></div>
			</template>
		</v-list-item-group>
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
          <v-list-item class="py-3" @click="purchaseLink(item.to)" :key="'list-'+i">
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
	  smspayment: [
        {
          key: "xl",
          label: "XL",
          desc: "(Anda harus memiki nomor ponsel XL)",
        },
        {
          key: "indosat",
          label: "Indosat",
          desc: "(Anda harus memiki nomor ponsel Indosat)",
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
    async purchaseLink(merchant) {
		this.ewalletOverlay = true
      if (merchant != "bca") {
        const sendvoucher = {
          voucher_id: 204,
          email: this.data.email,
        };

        try {
          const res = await PurchaseService.xendit(sendvoucher);
          if (res.status == 200) {
            //console.log(res.data);
            this.invoiceUrl = res.data.invoice_url;
			this.iframeDialogVisible = true;
			this.ewalletOverlay = false
          }
        } catch (error) {
		  console.log(error);
		  this.ewalletOverlay = false
        }
      } else if (merchant == "bca") {
        const sendvoucher = {
          voucher_id: 204,
        };

        try {
          const res = await PurchaseService.midtrans(sendvoucher);
          if (res.status == 200) {
            // //console.log(res.data)
            var url = res.data.snap_url;
			window.open(url, "_blank");
			this.ewalletOverlay = false
          }
        } catch (error) {
		  console.log(error);
		  this.ewalletOverlay = false
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
			//console.log(res.data.invoice_url);
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
<style lang="scss">
.paymentpage {
  .v-list-item--disabled {
    .v-list-item__icon {
      display: none;
    }
    &:after {
      content: "not available" !important;
      display: inline-block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 15px;
      background: #7d7d7d;
      color: #fff;
      border-radius: 90px;
      line-height: 1;
      text-align: center;
      padding: 8px 12px;
      font-size: 10px;
      font-style: italic;
    }
  }
}
</style>

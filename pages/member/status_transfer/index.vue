<template>
  <section class="statusbank">
	<template v-if="tab == 0">
		<v-container>
			<v-alert class="mt-4" color="#0057FF" prominent>
				<template v-slot:prepend>
				<v-img src="/img/icons/info.svg" width="35" max-width="35" class="mr-3 infoarticleicon"></v-img>
				</template>
				Transaksi di bawah ini akan berakhir secara otomatis dalam waktu 1 jam
			</v-alert>
		</v-container>
		<Pending />
	</template>
	<template v-if="tab == 1">
		<v-container>
			<v-alert class="mt-4" color="#0057FF" prominent>
				<template v-slot:prepend>
				<v-img src="/img/icons/info.svg" width="35" max-width="35" class="mr-3 infoarticleicon"></v-img>
				</template>
				Anda bisa mendownload Invoice atas transaksi sukses pembelian VIP Membership di bawah ini
			</v-alert>
		</v-container>
		<Sukses />
	</template>
	<template v-if="tab == 2">
		<client-only>
			<v-stepper class="stepperHelp" v-model="helpStep">
				<v-stepper-items>
					<v-stepper-content class="pa-0" back step="1">
						<!-- BANTUAN -->
						<template v-if="bantuanMenu!=null">
							<template v-for="(bantuan, i) in bantuanMenu[0]['submenu'].slice(11)">
								<div v-if="i==0" class="devider-small my-0" :key="'asdasasd-'+i"></div>
								<v-expansion-panels :key="'asdaasdass-'+i">
									<v-expansion-panel class="mb-0">
										<v-expansion-panel-header class="py-5 text-uppercase"><span style="line-height:25px">{{bantuan.title}}</span></v-expansion-panel-header>
										<v-expansion-panel-content class='text-left'>
											<div v-html="bantuan.content"></div>
										</v-expansion-panel-content>
									</v-expansion-panel>
								</v-expansion-panels>
								<div class="devider-small my-0" :key="'cats-'+i"></div>
							</template>
						</template>
					</v-stepper-content>

					<v-stepper-content class="pa-0" step="2">
						<template v-if="secondahelpdata != null && secondahelpdata.length > 0">
						<template v-for="(bantuan, i) in secondahelpdata">
							<div v-if="i==0" class="devider-small my-4" :key="'asasdfsddas-'+i"></div>
							<div cols="12" class="px-4" :key="'cat-'+i">
							<a
								class="pl-0"
								text
								dark
								:id="'help-'+bantuan.id"
								@click="helpStep = 3; thirdhelpdata = bantuan.content; thirdhelptitle = bantuan.title"
							>{{bantuan.title}}</a>
							</div>
							<div class="devider-small my-4" :key="'cats-'+i"></div>
						</template>
						</template>
						<template v-else>
							<div class="pa-10 text-center">Konten tidak tersedia</div>
						</template>
					</v-stepper-content>

					<v-stepper-content class="pa-0" step="3">
						<template v-if="thirdhelpdata != null">
						<v-container>
							<h4 class="deep-orange--text text-20 mb-4 mt-5">{{thirdhelptitle}}</h4>
							<div v-html="thirdhelpdata"></div>
						</v-container>
						</template>
						<template v-else>
							<div class="pa-10 text-center">Konten tidak tersedia</div>
						</template>
					</v-stepper-content>
				</v-stepper-items>
			</v-stepper>
    	</client-only>
	</template>

    <!-- MENU -->
	<v-bottom-navigation
	fixed
	dark
	grow
	color="white"
	background-color="#2C2C2D"
	v-model="tab"
	height="80"
	class="pwmenubottom"
	>
		<v-btn v-for="item in tabItems" :key="item.label" class="text-uppercase">
        	<span class="text-capitalize">{{item.label}}</span>
			<img :src="'/img/icons/'+item.image" class="mb-1 d-block" width="20" height="20" />
      	</v-btn>
	</v-bottom-navigation>

    <LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose" />
  </section>
</template>
<script>
import Pending from "@/components/member/midtrans/Pending";
import Sukses from "@/components/member/midtrans/Sukses";
import UserService from "@/services/UserService";
import ArticleService from "@/services/ArticleService";
import LoginModal from "@/components/modal/LoginModal";
export default {
  components: {
    Pending,
    Sukses,
    LoginModal
  },
  data() {
    return {
      tab: 0,
      addresses: null,
      contact: null,
      tabItems: [
		{
		  label:"Pending",
		  image: "pending.svg"
		},
		{
		  label:"Success",
		  image: "success.svg"
	  	},
		{
		  label:"Info",
		  image: "transferinfo.svg"
	  	},
	  ],
	  loginModalVisible: false,
	  bantuanMenu: null,
	  helpStep: 1,
      secondahelpdata: null,
      thirdhelptitle: null,
      thirdhelpdata: null,
    };
  },
  methods: {
    async getAddresses() {
      this.isLoading = true;
      try {
        const res = await UserService.getAddresses();
        var items = res.data.data;
        if (items && items.length > 0) {
          //console.log(JSON.parse(JSON.stringify(items)))
          this.addresses = items;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getNumbers() {
      this.isLoading = true;
      try {
        const res = await UserService.getContacts();
        var items = res.data.data;
        if (items && items.length > 0) {
          //console.log(JSON.parse(JSON.stringify(items)))
          this.contact = items;
        }
      } catch (error) {
        console.log(res);
      }
    },
    openModalLogin() {
      this.loginModalVisible = true;
    },
    myDialogClose() {
      this.loginModalVisible = false;
	},
	async fetchBantuan() {
      try {
        const res = await ArticleService.getBantuan();
        const data = res.data.data;
        // console.log(JSON.parse(JSON.stringify(data)));
		this.bantuanMenu = data;
		setTimeout(() => {
			if( this.$router.currentRoute.query['tab'] ) {
				document.getElementById("help-2").click();
				setTimeout(() => {
					document.getElementById("help-73").click();
				}, 100);
			}
		}, 2000);
        //this.loading = false
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
	  this.fetchBantuan();
    if (!this.$auth.user) {
      this.openModalLogin();
    } else {
      this.getAddresses();
      this.getNumbers();
    }
  }
};
</script>

<style lang="scss">
	.statusbank {
		.theme--dark.v-expansion-panels .v-expansion-panel {
			background: transparent!important;
			.v-expansion-panel-content {
				background: rgba(255,255,255,.07)
			}
		}
	}
</style>

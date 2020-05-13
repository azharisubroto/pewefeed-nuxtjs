<template>
  <section>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems" :key="item">
        <template v-if="item == 'Pending'">
          <v-container>
            <v-alert
              border="left"
              dense
              colored-border
              color="blue"
              class="mb-0"
              icon="mdi-information-outline"
              style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
            >
              <v-row no-gutters>
                <v-col cols="12">
                  <ul class="text-12 pl-2 text-16">
                    <li>Keanggotaan VIP secara otomatis masuk ke dalam akun anda jika pembayaran sukses, jika mengalami kesulitan hubungi customer service kami</li>
                    <li>Untuk membatalkan transaksi ini, cukup dengan tidak melakukan pembayaran</li>
                  </ul>
                </v-col>
              </v-row>
            </v-alert>
          </v-container>
          <Pending />
        </template>
        <template v-if="item == 'Sukses'">
          <v-container>
            <v-alert
              border="left"
              dense
              colored-border
              color="blue"
              class="mb-0 text-16"
			  icon="mdi-information-outline"
              style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
            >Keanggotaan VIP secara otomatis masuk ke dalam akun anda jika pembayaran sukses, jika mengalami kesulitan hubungi customer service kami</v-alert>
          </v-container>
          <Sukses />
        </template>
      </v-tab-item>
    </v-tabs-items>

    <!-- PROFIL MENU -->
    <v-bottom-navigation fixed dark grow color="white" background-color="black" v-model="tab">
      <v-btn v-for="item in tabItems" :key="item" class="text-uppercase">
        <span>{{item}}</span>
      </v-btn>
    </v-bottom-navigation>

    <LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose" />
  </section>
</template>
<script>
import Pending from "@/components/member/midtrans/Pending";
import Sukses from "@/components/member/midtrans/Sukses";
import UserService from "@/services/UserService";
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
      tabItems: ["Pending", "Sukses"],
      loginModalVisible: false
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
    }
  },
  mounted() {
    if (!this.$auth.user) {
      this.openModalLogin();
    } else {
      this.getAddresses();
      this.getNumbers();
    }
  }
};
</script>

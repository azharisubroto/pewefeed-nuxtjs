<template>
  <v-container>
    <v-snackbar v-model="snackbar" top color="green">
      Data telah tersimpan
      <v-btn color="green lighten-2" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <!-- FORM -->
    <v-row class="pt-0 mt-0">
      <v-col cols="12">
        <div>
          <v-row align="center" justify="center">
            <v-col cols="12" class="pb-0">
              <v-alert
			  	v-if="isActive"
                border="left"
                dense
                outlined
                class="mb-0"
                type="success"
                :icon="false"
              >
                <v-row no-gutters>
                  <v-col cols="1" class="mr-2">
                    <img
                      width="25"
                      class="mt-1"
                      src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/m-menu2/v.png"
                      alt
                    />
                  </v-col>
                  <v-col cols="10">
                    <strong
                      :class="isActive ? 'subtitle-2 green--text font-weight-bold' : 'subtitle-2 red--text font-weight-bold'"
                      v-text="isActive ? 'ACTIVE' : 'INACTIVE'"
                    ></strong>
                    <br />
                    <strong
                      class="body-2 black--text"
                      v-text="isActive ? 'Keanggotaan VIP berlaku hingga ' + expire_date : 'Keanggotaan VIP telah kadaluarsa sejak ' + expire_date"
                    ></strong>
                    <div class="my-3"></div>
                    <v-btn @click="buyVip()" color="deep-orange" dark depressed small>PURCHASE VIP</v-btn>
                  </v-col>
                </v-row>
              </v-alert>
			  <v-alert
			  	v-else
                border="left"
                dense
                outlined
                class="mb-0"
                type="error"
                :icon="false"
              >
                <v-row no-gutters>
                  <v-col cols="1" class="mr-2">
                    <img
                      width="25"
                      class="mt-1"
                      src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/m-menu2/v.png"
                      alt
                    />
                  </v-col>
                  <v-col cols="10">
                    <strong
                      :class="isActive ? 'subtitle-2 green--text font-weight-bold' : 'subtitle-2 red--text font-weight-bold'"
                      v-text="isActive ? 'ACTIVE' : 'INACTIVE'"
                    ></strong>
                    <br />
                    <strong
                      class="body-2 black--text"
                      v-text="isActive ? 'Keanggotaan VIP berlaku hingga ' + expire_date : 'Keanggotaan VIP telah kadaluarsa sejak ' + expire_date"
                    ></strong>
                    <div class="my-3"></div>
                    <v-btn @click="buyVip()" color="deep-orange" dark depressed small>PURCHASE VIP</v-btn>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="3" md="3" lg="3">
              <v-row>
                <v-col cols="12">
                  <div class="text-center">
                    <v-avatar
                      v-if="avatar_preview"
                      size="100"
                      color="grey"
                      @click="avatar_preview=''"
                    >
                      <v-img
                        :src="avatar_preview"
                        @click="avatar_preview='' && data.avatar"
                        :aspect-ratio="1/1"
                      >
                        <v-icon dark class="mt-10">mdi-pencil</v-icon>
                      </v-img>
                    </v-avatar>
                  </div>
                  <vue-dropzone
                    v-if="!avatar_preview"
                    ref="dropzone"
                    id="drop1"
                    :options="dropOptions"
                    @vdropzone-success="afterComplete"
                  ></vue-dropzone>
                  <div class="text-center">
                    <a v-if="avatar_preview" @click="avatar_preview=false">Remove File</a>
                    <div></div>
                    <br />
                    <v-btn v-if="!avatar_preview" @click="avatar_preview = profile.avatar">Cancel</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="9" md="9" lg="9">
              <v-text-field
                label="First Name"
                placeholder="First Name"
                outlined
                v-model="data.first_name"
              ></v-text-field>
              <v-text-field
                label="Last Name"
                placeholder="Last Name"
                outlined
                v-model="data.last_name"
              ></v-text-field>
              <v-text-field
                label="Username"
                placeholder="Username"
                outlined
                v-model="data.username"
              ></v-text-field>
              <v-text-field
                label="Email"
                placeholder="Email"
                outlined
                readonly
                v-model="data.email"
              ></v-text-field>
              <v-text-field
                label="msisdn"
                placeholder="msisdn"
                outlined
                readonly
                v-model="data.msisdn"
              ></v-text-field>
              <v-text-field
                label="Expired"
                placeholder="Expired"
                outlined
                readonly
                v-model="data.expire"
              ></v-text-field>
              <v-text-field
                label="Instagram"
                placeholder="@username"
                outlined
                v-model="data.instagram"
              ></v-text-field>
              <v-text-field label="Phone" placeholder="Phone" outlined v-model="data.no_telp"></v-text-field>

              <v-btn depressed dark color="orange" @click="save">Save</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <!-- /FORM -->
	<BuyVip :dialogVisible="buyVipDialogVisible" @close="myDialogClose"/>
  </v-container>
</template>
<script>
import UserService from "@/services/UserService";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import BuyVip from "@/components/modal/BuyVip";

export default {
  name: "pengaturanPage",
  data() {
    return {
      profile: null,
      token: null,
      avatar_preview: "",
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
      snackbar: false,
      dropOptions: {
        url: "https://s1.playworld.id/api/member/avatar",
        headers: {
          Authorization: "",
          "Cache-Control": ""
        },
        method: "POST",
        paramName: "avatar",
        withCredentials: false,
        thumbnailWidth: 100,
        thumbnailHeight: 100
      },
      isActive: false,
      expire_date: "",
      dialog: false,
      buyVipDialogVisible: false
    };
  },
  components:{
	  BuyVip
  },
  methods: {
    removeAllFiles() {
      this.$refs.dropzone.removeAllFiles();
    },
    afterComplete(file, response) {
      console.log(response.file_name);
      this.data.avatar = response.file_name;
      this.avatar_preview =
        "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/avatars/" +
        response.file_name;
    },
    async fetchUserdata() {
      try {
        const res = await UserService.getSingleUser();
        this.user_id = res.data.data.id;
        this.profile = res.data.data;
        // console.log(JSON.parse(JSON.stringify(res.data.data)))
        this.dropOptions.headers.Authorization =
          "Bearer " + res.data.data.api_token;
        this.avatar_preview = res.data.data.avatar;
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
      } catch (error) {
        console.log(error);
        if (error.response.status == 401) {
          this.$router.push("/");
        }
      }
    },
    async save() {
      let vm = this;
      var params = {
        first_name: this.data.first_name,
        username: this.data.username,
        last_name: this.data.last_name,
        no_telp: this.data.no_telp,
        instagram: this.data.instagram,
        avatar: this.data.avatar
      };
      try {
        const res = await UserService.updateProfile(params);
        vm.snackbar = true;
      } catch (error) {
        console.log(error);
      }
	},
	myDialogClose () {
		this.buyVipDialogVisible = false
		// other code
	},
	buyVip() {
		// if not vip, show dialog
		this.notVipVisible = false;
		this.buyVipDialogVisible = true;
	}
  },
  mounted() {
    this.fetchUserdata();
  }
};
</script>

<style lang="sass">
	.v-item-group.v-bottom-navigation .v-btn .v-btn__content
		color: #fff
		opacity: 1
	.v-item-group.v-bottom-navigation .v-btn.v-btn--active .v-btn__content
		color: var(--primary)!important
</style>

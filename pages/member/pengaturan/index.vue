<template>
  <v-container>
    <v-snackbar
    v-model="snackbar"
    top
    color="green"
    >
        Data telah tersimpan
        <v-btn
            color="green lighten-2"
            text
            @click="snackbar = false"
        >
            Close
        </v-btn>
    </v-snackbar>

    <!-- FORM -->
    <v-row class="pt-0 mt-0">
      <v-col cols="12">
        <div>
          <v-row align="center" justify="center">
            <v-col cols="12" class="pb-0">
              <v-alert
                border="left"
                dense
                colored-border
                color="blue"
                class="mb-0"
                style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
              >
                <v-row no-gutters>
                  <v-col cols="1" class="mr-2">
                    <img width="25" class="mt-1" src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/m-menu2/v.png" alt="">
                  </v-col>
                  <v-col cols="10">
                    <strong :class="isActive ? 'subtitle-2 blue--text font-weight-bold' : 'subtitle-2 red--text font-weight-bold'" v-text="isActive ? 'ACTIVE' : 'INACTIVE'"></strong><br>
                    <strong class="body-2" v-text="isActive ? 'Keanggotaan VIP berlaku hingga ' + expire_date : 'Keanggotaan VIP telah kadaluarsa sejak ' + expire_date"></strong>
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
                        >
                          <v-img :src="avatar_preview" @click="avatar_preview='' && data.avatar" :aspect-ratio="1/1"></v-img>
                        </v-avatar>
                      </div>
                      <vue-dropzone
                      v-if="!avatar_preview"
                      ref="dropzone"
                      id="drop1"
                      :options="dropOptions"
                      @vdropzone-success="afterComplete"
                      ></vue-dropzone>
                      <a v-if="!avatar_preview" @click="avatar_preview=false">Remove File</a>
                      <v-btn v-if="avatar_preview" block class="mt-2" depressed color="grey darken-2" dark @click="avatar_preview=''">
                        <v-icon dark left>mdi-pencil</v-icon> Edit
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="9" md="9" lg="9" class="px-0 hahaha">
                    <div class="mb-2 px-4">First Name</div>
					<v-text-field
                        solo
						single-line
                        placeholder="Last Name"
                        filled
                        v-model="data.first_name"
                    ></v-text-field>
                    <div class="mb-2 px-4">Last Name</div>
					<v-text-field
						solo
						single-line
                        placeholder="Last Name"
                        filled
                        v-model="data.last_name"
                    ></v-text-field>
                    <div class="mb-2 px-4">Username</div>
					<v-text-field
						solo
						single-line
                        placeholder="Username"
                        filled
                        v-model="data.username"
                    ></v-text-field>
                    <div class="mb-2 px-4">Email</div>
					<v-text-field
						solo
						single-line
                        placeholder="Email"
                        filled
                        readonly
                        disabled
                        v-model="data.email"
                    ></v-text-field>
                    <div class="mb-2 px-4">msisdn</div>
					<v-text-field
						solo
						single-line
                        placeholder="msisdn"
                        filled
                        readonly
                        disabled
                        v-model="data.msisdn"
                    ></v-text-field>
                    <div class="mb-2 px-4">Expired</div>
					<v-text-field
						solo
						single-line
                        placeholder="Expired"
                        filled
                        readonly
                        disabled
                        v-model="data.expire"
                    ></v-text-field>
					<div class="mb-2 px-4">Phone</div>
					<v-text-field
						solo
						single-line
                        placeholder="Phone"
                        filled
                        v-model="data.no_telp"
                    ></v-text-field>
                    <div class="mb-2 px-4">Instagram</div>
					<v-text-field
						solo
						single-line
                        placeholder="@username"
                        filled
                        v-model="data.instagram"
                    ></v-text-field>


                    <div class="px-4">
						<v-btn depressed dark block color="green" @click="save" class="mb-3">
							Save
						</v-btn>
						<v-btn depressed dark block color="red" class="mb-5" @click="$router.go(-1)">
							Cancel
						</v-btn>
					</div>
                </v-col>
            </v-row>
        </div>
    </v-col>
    </v-row>
    <!-- /FORM -->
  </v-container>
</template>
<script>
import UserService from '@/services/UserService'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  middleware: 'auth',
  name:"pengaturanPage",
  data() {
    return {
      profile: null,
      token: null,
      avatar_preview: '',
      data:{
        avatar: '',
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        msisdn: '',
        expire: '',
        instagram: '',
        no_no_: '',
      },
      snackbar: false,
      dropOptions: {
          url:"https://s1.playworld.id/api/member/avatar",
          headers:{
              "Authorization":'',
              "Cache-Control": "",
          },
          method: "POST",
          paramName: 'avatar',
          withCredentials: false,
          thumbnailWidth: 100,
          thumbnailHeight: 100
      },
      isActive: false,
	    expire_date: ''
    }
  },
  methods: {
    removeAllFiles() {
        this.$refs.dropzone.removeAllFiles();
    },
    afterComplete(file, response) {
        console.log(response.file_name);
        this.data.avatar = response.file_name;
        this.avatar_preview = 'https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/avatars/'+response.file_name;
    },
    fetchUserdata() {
      // this.$auth.fetchUser()

      var res = []
      // res.data = this.$auth.user
      res.data = JSON.parse(localStorage.getItem('userdata'));

      this.user_id = res.data.data.id
      this.profile = res.data.data
      // console.log(JSON.parse(JSON.stringify(res.data.data)))
      this.dropOptions.headers.Authorization = 'Bearer '+res.data.token
      this.avatar_preview = res.data.data.avatar
      this.data.first_name = res.data.data.first_name
      this.data.last_name = res.data.data.last_name
      this.data.username = res.data.data.username
      this.data.msisdn = res.data.data.msisdn
      this.data.no_telp = res.data.data.no_telp
      this.data.instagram = res.data.data.instagram
      this.data.email = res.data.data.email
      this.data.expire = res.data.data.expire
      this.expire_date = this.data.expire
      // console.log(this.data)
      if(res.data.data.status_expired == 1) {
        this.isActive = true
      }
    },
    async save() {
        let vm = this
        var params = {
          first_name: this.data.first_name,
          username: this.data.username,
          last_name: this.data.last_name,
          no_telp: this.data.no_telp,
          instagram: this.data.instagram,
          avatar: this.data.avatar
        }

        try {
          const res = await UserService.updateProfile(params);

          this.$auth.fetchUser().then(() => {
            localStorage.setItem('userdata', JSON.stringify(vm.$auth.user))
          })
          vm.snackbar = true
          this.fetchUserdata()
        } catch (error) {
          console.log(error)
        }
    }
  },
  mounted() {
    this.fetchUserdata()
  }
}
</script>

<style lang="scss">
	.theme--dark.v-text-field--filled > .v-input__control > .v-input__slot {
		background: #313131;
	}
	.hahaha input {
		margin-top: 0!important;
	}
</style>

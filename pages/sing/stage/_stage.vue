<template>
	<section class="sing-stage">
		<v-app-bar dark color="dark" flat fixed tile class="main-app-bar px-0 pl-0">
			<v-row class="py-0" align="center" justify="space-between">
				<v-col cols="3" class="py-0 pl-0">
					<v-btn @click="$router.go(-1)" small icon>
						<v-icon>mdi-chevron-left</v-icon>
					</v-btn>
				</v-col>
				<v-col cols="6" class="py-0 text-center">
					<v-toolbar-title class="text-capitalize">
						<strong>{{$route.params.stage}}</strong>
					</v-toolbar-title>
				</v-col>
				<v-col cols="3" class="pb-2 text-right">
					 <v-img @click="$router.push('/')" src="/img/peweicon.svg" width="20" class="d-inline-block"></v-img>
				</v-col>
			</v-row>
		</v-app-bar>

    <v-container class="pb-0" v-if="userid && lock && savemyitem != null">
      <template v-for="(item, i) in savemyitem">
        <div v-if="item.customer.id == userid" class="mx-0 px-0" :key="'peserta-'+i">
          <v-card
          color="#FFC107"
          class="px-4 py-4"
          light
          >
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="d-flex">
                  <v-avatar size="30">
                    <v-img cover :src="item.customer.avatar ? item.customer.avatar : 'https://via.placeholder.com/350x150'"></v-img>
                  </v-avatar>
                  <div class="ml-3 text-14">
                    <strong class="text-14">{{item.customer.name}}</strong>

                    <div class="text-12 mt-1">
                      {{item.viewers}} Melihat &bull;
                      {{item.total_vote ? item.total_vote : '0'}} Vote &bull;
                      {{item.total_comments ? item.total_comments : '0'}} Komentar
                    </div>
                  </div>
                </div>
              </div>
              <div class="ml-2">
                <v-card
                tile
                color="#000"
                class="py-2 px-3 text-center text-14"
                dark
                elevation="0"
                >
                  <div class="d-flex align-center justify-space-between">
                    <div class="mr-4"><strong>{{item.ranking}}</strong></div>

                    <div class="ml-4">
                      <v-icon size="25" v-if="item.is_star" color="#FFC107">mdi-star</v-icon>
                      <v-icon size="25" v-else color="#fff">mdi-star-outline</v-icon>
                    </div>
                  </div>
                </v-card>
              </div>
            </div>
          </v-card>
        </div>
      </template>
    </v-container>
    <v-container class="pb-0" v-if="showupload">
      <v-card
        color="#FFC107"
        dark
        class="text-center pa-4"
        elevation="0"
        >
          <v-btn 
          color="#FF4200"
          depressed
          small
          @click="$bus.$emit('toggleUpload', userid);"
          class="px-8">
            <img src="/img/icons/upload.svg" class="mr-1" alt="upload"> Upload
          </v-btn>
        </v-card>
    </v-container>

    <template v-if="!isloading">
      <template v-if="peserta.length > 0">
        <StageContent v-if="!isloading" :type="type" :lock="lock" :content="content" :pesertaloop="peserta" :stage="content.stage.id" title="STAGE 1: Audisi ini berakhir tanggal 30 Agustus 2020"/>

        <v-container v-if="peserta !=null && peserta.length > 0" class="text-center py-0">
          <v-btn
          color="#ff4200"
          @click="next(page)"
          depressed
          dark
          v-if="page < maxpage"
          >
            <template v-if="!moreloading">
              Show More
            </template>
            <template v-else>
              Loading...
            </template>
          </v-btn>
        </v-container>
        <br>
        <br>
        <br>
        <br>
      </template>
    </template>
    <template v-else-if="isloading">
      <div class="text-center pa-10">
        <LoadingBar/>
      </div>
    </template>
    
		<div v-else class="pa-10 text-center">
			Tidak Ada Data
		</div>

		<!-- ======== -->
		<!-- BOTTOM NAVIGATION -->
		<v-bottom-navigation
			fixed
			dark
			grow
			color="white"
			background-color="#2C2C2D"
			height="80"
			class="pwmenubottom"
		>
			<v-btn @click="sortopen = true">
				<span class="text-10" style="color:#fff!important">Urutkan<br>Data</span>
				<img src="/img/icons/icon-sort.svg" class="mb-2 d-block" width="16" height="16" />
			</v-btn>
			<v-btn @click="opensearch = true">
				<span class="text-10" style="color:#fff!important">Cari<br>Peserta</span>
				<img src="/img/icons/icon-search.svg" class="mb-2 d-block" width="16" height="16" />
			</v-btn>
		</v-bottom-navigation>
		<!-- ======== -->

		<!-- SORTER -->
		<v-bottom-sheet v-model="sortopen">
			<v-sheet height="100%" class="antiloncat">
				<v-toolbar :elevation="1" style="border-top: 2px solid #404040">
					<!-- Arrow -->
					<v-btn
						dark
						icon
						tile
						style="border-right: 0px solid #717171"
						light
						@click="sortopen = false;"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>

					<!-- Title -->
					<v-toolbar-items class="ml-3">
						<v-btn dark text class="white--text pl-0 text-uppercase" style="margin-left:-10px;">Urutkan</v-btn>
					</v-toolbar-items>
					<div class="flex-grow-1"></div>
				</v-toolbar>

				<div class="mx-0 text-left px-4 pt-4">
					<template v-for="(item, i) in sorter">
						<v-btn
						:key="'devmid-'+i"
						@click="sortItem(item.slug, 1);setSorter(i);page=1"
						depressed
						outlined
						class="mr-2 mb-2 filterbtn"
						:color="i == sorterMode ? 'deep-orange' : '#f5f5f5'"
						style="text-transform: normal!important">{{item.title}}</v-btn>
					</template>
					<br><br><br><br><br><br><br><br>
				</div>
			</v-sheet>
		</v-bottom-sheet>

		<!-- ==== SEARCH BAR === -->
		<v-bottom-sheet v-model="opensearch">
			<v-sheet height="100%">
				<v-toolbar :elevation="0" style="border-top: 2px solid #404040">
				<!-- Arrow -->
				<v-btn
					dark
					icon
					tile
					style="border-right: 0px solid #717171"
					light
					@click="opensearch = false"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>

				<!-- Title -->
				<v-toolbar-items class="ml-3">
					<v-btn dark text class="white--text pl-0" style="margin-left:-15px">Cari</v-btn>
				</v-toolbar-items>
				<div class="flex-grow-1"></div>
				</v-toolbar>
				<div class="devider-small" style="border-color:rgba(255,255,255,.1)"></div>

				<div class="px-5 pb-10 pt-6">
				<v-text-field
					flat
					filled
					single-line
					solo
					hide-details
					outlined
					background-color="transparent"
					v-model="searchModel"
					@keyup.enter="search(searchModel, 1, false)"
					label="Tulis Kata Kunci . . ."
					style="border:0!important;box-shadow:none!important;"
					class="antipenyok"
					ref="searchbox"
				></v-text-field>
				<div class="text-right">
					<v-btn :disabled="searchModel.length == 0" depressed @click="search(searchModel, 1, false)" color="deep-orange" class="mt-3">Cari</v-btn>
					<v-btn depressed color="deep-orange" class="mt-3" @click="searchModel=''">Reset</v-btn>
				</div>
				<br>
				<br>
				<br>
				</div>
			</v-sheet>
		</v-bottom-sheet>
	</section>
</template>

<script>

import SingAppBar from "@/components/sing/SingAppBar";
import StageContent from "@/components/sing/StageContent";
import LoadingBar from "@/components/sing/LoadingBar";
import SingService from "@/services/SingService";
export default {
	name:"Sing",
	components: {
		StageContent,
		SingAppBar,
		LoadingBar
	},
	data() {
		return {
      userdata: null,
      userid: null,
			content: null,
      peserta: [],
      savemyitem: null,
      lock: false,
      showupload: false,
			isloading: true,
			type: 'default',
			isrunning: null,
			moreloading: false,
			sortopen: false,
			sortopen: false,
			sorter: [
				{
					title:'Terbaru',
					slug: 'newest',
				},
				{
					title:'Terlama',
					slug: 'oldest',
				},
				{
					title:'Vote Terbanyak',
					slug: 'high_vote',
				},
				{
					title:'Vote Terendah',
					slug: 'low_vote',
				},
				{
					title:'Komentar Terbanyak',
					slug: 'high_comment',
				},
				{
					title:'Komentar Terendah',
					slug: 'low_comment',
				},
				{
					title:'Star ke Non Star',
					slug: 'star',
				},
			],
			sorterMode: 0,
			page: 1,
			maxpage: null,
			thereismore: true,
			// 
			opensearch: false,
			searchModel: ''
		}
	},
	methods: {
		async stageDetail(slug, page) {
      let vm = this
			try {
				const res =  await SingService.getStageDetail(slug, page)
				const data = await res.data
				this.content = data
				this.maxpage = data.paginations.last_page
				this.page = data.paginations.current_page

				if( data.video_customer != null && data.video_customer.length > 0 ) {
					let loop = data.video_customer;
					//console.log(loop);
					let baru = []
					loop.forEach(el => {
						this.peserta.push(el);
          });

          var userdata = JSON.parse(localStorage.getItem('userdata'));

          if( this.lock !== true ) {
            //this.$auth.fetchUser().then(() => {
              if( userdata ) {
                this.userid = userdata.data.id
                this.userdata = userdata.data

                let userid = vm.$auth.user.data.id
                for (let index = 0; index < loop.length; index++) {
                  var el = loop[index];
                  if( el.customer.id == userid ) {
                    //alert('found');
                    //console.log(JSON.parse(JSON.stringify(el)));
                    vm.savemyitem = [el];
                    this.lock = true
                    break;
                  }
                }
              } else {
                this.showupload = true
              }
            //});
          }
					//this.page++
				}
				this.isloading = false
				this.moreloading = false
				////console.log(JSON.parse(JSON.stringify(this.peserta)))
			} catch (error) {
				console.log(error)
				this.isloading = false
				this.moreloading = false
			}
		},
		next(num) {
			let pagenum = parseInt(num) + 1

			this.moreloading = true;
			console.log(pagenum)
			if( this.type == 'search' ) {
				this.search(key, pagenum, ismore);
			} else if( this.type == 'sort' ){
				this.sortItem(this.sorter[this.sorterMode]['slug'], pagenum, true);
			} else {
				this.stageDetail(this.$route.params.stage, pagenum);
			}
		},
		setSorter(i) {
			localStorage.setItem('sing_sorter', JSON.stringify(i));
			this.sorterMode = i
		},
		async search(key, page, ismore) {
      if( this.searchModel.length == 0 || this.searchModel == '' || this.searchModel == null ) return false;
			//console.log('searching...');
			let vm = this
			this.opensearch = false
			var n = page ? page : 1;
			if( !ismore ) {
				//vm.content = null
				//vm.peserta = null
				vm.isloading = true
			}
			try {
				const res = await SingService.searchItem(this.$route.params.stage, key, n);
        let data = await res.data
        if( data && data.video_customer.length > 0 ) {
          this.renderChange(data, ismore);
        } else {
          alert('pencarianmu tidak dapat ditemukan')
        }
        vm.type = 'search'
        vm.isloading = false
			} catch (error) {
        console.log(error)
        alert('pencarianmu tidak dapat ditemukan')
				vm.isloading = false
				vm.type = 'search'
			}
		},
		async sortItem(key, page, ismore) {
			let vm = this
			this.sortopen = false
			this.sorterMode = key

			if( !ismore ) {
				vm.content = null
				vm.peserta = null
				vm.isloading = true
			}
			
			try {
				const res = await SingService.sortStageItem(this.$route.params.stage, key, page);
				let data = await res.data
				this.renderChange(data, ismore);
				vm.type = 'sort'
			} catch (error) {
				console.log(error)
				vm.isloading = false
				vm.type = 'sort'
			}
		},
		renderChange(data, ismore) {
			let vm = this
			this.maxpage = data.paginations.last_page
			this.page = data.paginations.current_page

			vm.content = data
			
			let vide = data.video_customer
			if( vide.length > 0 ) {

				if( !ismore ) {
					vm.peserta = vide;
					vm.isloading = false
				} else {
					vide.forEach(el => {
						this.peserta.push(el)
					});
				}
				this.moreloading = false
			}
		}
	},
	mounted() {
		let vm = this;
		
    this.stageDetail(this.$route.params.stage, 1);
	},
	watch: {
		opensearch(newval) {
			if (!newval) return; // you removed `return` here
			requestAnimationFrame(() => {
				return this.$refs.searchbox.focus();
			})
		},
	}
}
</script>

<style lang="scss">
	.sing {
		iframe {
			width: 100%;
			height: 300px;
		}
	}
	.pesertalist {
		margin: 0 0 15px 0;
		// &:first-of-type {
		// 	//padding-top: 0;
		// }
	}
</style>

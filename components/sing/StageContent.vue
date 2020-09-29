<template>
	<div class="stagesing">
		<v-app-bar dark color="dark" flat fixed tile class="main-app-bar px-0">
			<v-row class="py-0 mx-0" align="center" justify="space-between">
				<v-col cols="3" class="py-0">
					<v-btn @click="historyBack()" small icon>
						<v-icon>mdi-chevron-left</v-icon>
					</v-btn>
				</v-col>
				<v-col cols="6" class="py-0 text-center">
					<v-toolbar-title
						class="pl-4"
					>
						{{content.stage.label}}
					</v-toolbar-title>
				</v-col>
				<v-col cols="3" class="pb-2 text-right">
					 <v-img @click="$router.push('/')" src="/img/peweicon.svg" width="20" class="d-inline-block"></v-img>
				</v-col>
			</v-row>
		</v-app-bar>
		<!-- <pre>{{pesertaloop}}</pre> -->


		<v-container v-if="userid != null" class="hero pb-0">

			<!-- Loggedin but not uploaded any -->
			<v-card
			v-if="!uploaded"
			color="#FFC107"
			class="px-4 mb-0 py-4"
			elevation="0"
			light
			>
				<div class="d-flex justify-space-between align-center">
					<div>
						<v-avatar size="30">
							<v-img cover :src="userdata.data.avatar ? userdata.data.avatar : 'https://via.placeholder.com/350x150'"></v-img>
						</v-avatar>
						<div class="d-inline-block ml-2 text-14">
							<strong>{{userdata.data.first_name ? userdata.data.first_name : ''}}</strong>
						</div>
					</div>
					<div class="text-right">
						<v-btn v-if="uploadallowed" color="deep-orange" @click="decideAction();" small dark depressed>
							<img src="/img/icons/upload.svg" class="mr-1" alt="upload">  Upload
						</v-btn>
						<v-btn v-else color="deep-orange" disabled light smallk dark depressed>
							<img src="/img/icons/upload.svg" class="mr-1" alt="upload">  Upload
						</v-btn>
					</div>
				</div>
			</v-card>

			<!-- Logged in, has items -->
			<div v-if="pesertaloop != null && userid != null">
				<template v-for="(item, i) in pesertaloop">
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
			</div>
		</v-container>

		<!-- NOT LOGIN -->
		<v-container v-else class="hero">
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
				@click="loginModalVisible = true"
				class="px-8">
					<img src="/img/icons/upload.svg" class="mr-1" alt="upload"> Upload
				</v-btn>
			</v-card>
		</v-container>

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
						@click="sortItem(item.slug, 1);setSorter(i)"
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
					@keyup.enter="search(searchModel, 1)"
					label="Tulis Kata Kunci . . ."
					style="border:0!important;box-shadow:none!important;"
					class="antipenyok"
				></v-text-field>
				<div class="text-right">
					<v-btn depressed @click="search(searchModel)" color="deep-orange" class="mt-3">Cari</v-btn>
					<v-btn depressed color="deep-orange" class="mt-3" @click="searchModel=''">Reset</v-btn>
				</div>
				<br>
				<br>
				<br>
				</div>
			</v-sheet>
		</v-bottom-sheet>

		<v-container v-if="pesertaloop !=null && pesertaloop.length > 0">
			<div class="pesertalist" v-for="(item, i) in pesertaloop" :key="'peserta-'+i">
				<SingItem :isrunning="content.stage.isRunning" :item="item"/>
			</div>
		</v-container>
		<v-container v-else class="text-center pa-10">
			Tidak Ada Data
		</v-container>

		<v-container v-if="pesertaloop !=null && pesertaloop.length > 0">
			<v-pagination
				@input="next"
				v-model="pagination"
				:length="content.paginations.last_page"
				:total-visible="10"
			></v-pagination>
		</v-container>

		<UploadVideo :dialogVisible="uploadVisible" :stage="content.stage.id"/>

		<!-- BOTTOM NAVIGATION -->
		<br><br><br><br>
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
		
		<LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose" />
		<NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose" />

	</div>
</template>

<script>
import ShareButton2 from "@/components/common/ShareButton2";
import SingAppBar from "@/components/sing/SingAppBar";
import Video from "@/components/sing/Video";
import SingItem from "@/components/sing/SingItem";
import UploadVideo from "@/components/sing/UploadVideo";
import Sorter from "@/components/sing/Sorter";
import SingService from '../../services/SingService';
import LoginModal from "@/components/modal/LoginModal";
import NotVip from "@/components/modal/NotVip";

export default {
	name:"StageContent",
	props: ['title', 'pesertaloop', 'stage', 'content', 'type'],
	components: {
		ShareButton2,
		SingAppBar,
		Video,
		UploadVideo,
		SingItem,
		Sorter,
		LoginModal,
		NotVip
	},
	data(){
		return {
			userid: null,
			userdata: null,
			singtab: 0,
			maintab: 0,
			sortopen: false,
			opensearch: false,
			searchModel:'',
			uploadallowed: false,
			singcontent: [
				{
					title: 'Cara Ikutan',
					to: '/sing/cara-ikutan',
				},
				{
					title: 'Cara Vote',
					to: '/sing/cara-vote',
				},
				{
					title: 'Download Video',
					to: '/sing/download-video',
				},
				{
					title: 'Stage 1: Audisi',
					to: 'audisi',
				},
				{
					title: 'Stage 2: Semifinal',
					to: 'semifinal',
				},
				{
					title: 'Stage 3: Final',
					to: 'final',
				},
				{
					title: 'Winner',
					to: 'winner',
				},
			],
			punyaaku: [],
			peserta: [
				{
					name: 'Melynda',
					avatar: 'https://via.placeholder.com/80',
					video_thumb: 'https://via.placeholder.com/350x250',
					vote: 1043,
					comments: 30,
					star: true,
					slug: 'melynda'
				},
				{
					name: 'Azhari',
					avatar: 'https://via.placeholder.com/80',
					video_thumb: 'https://via.placeholder.com/350x250',
					vote: 700,
					comments: 30,
					star: false,
					slug: 'azhari'
				}
			],
			pagination: this.content ? this.content.paginations.current_page : 1,
			dialogVisible: false,
			uploadVisible: false,
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
			uploaded: false,
			loginModalVisible: false,
      		notVipDialogVisible: false,
		}
	},
	watch: {
		pesertaloop: {
			immediate: true,
			handler (val, oldVal) {
				//console.log(val);
				if (localStorage.getItem('userdata') && val != null ) {
					var userdata = JSON.parse(localStorage.getItem('userdata'));
					let userid = userdata.data.id
					for (let index = 0; index < val.length; index++) {
						const el = val[index];
						//console.log(el.customer.id, userid);
						if( el.customer.id == userid ) {
							this.uploaded = true
							console.log('exists');
							return false;
						}
					}
				}
			}
		},
	},
	methods: {
		decideAction() {
			if( this.userdata.data.vip == true ) {
				this.uploadVisible = true
			} else {
				this.notVipDialogVisible = true
			}
		},
		setSorter(i) {
			localStorage.setItem('sing_sorter', JSON.stringify(i));
		},
		myDialogClose() {
			this.dialog = false;
			this.loginModalVisible = false;
			this.buyVipDialogVisible = false;
			this.pleaseLoginDialogVisible = false;
			this.notVipDialogVisible = false;
			this.KomentarPoinVisible = false;
		},
		historyBack() {
			this.$router.back();
		},
		async checkUploadAvailablity(stage) {
			try {
				const res = await SingService.checkAvail(stage);
				//console.log(res.data);
				this.uploadallowed = res.data.upload_available
			} catch (error) {
				console.log(error)
			}
		},
		async search(key, page) {
			console.log('searching...');
			this.$bus.$emit('singSearchLoading');
			this.opensearch = false
			var n = page ? page : 1;
			localStorage.setItem('singkeyword', this.searchModel);
			try {
				const res = await SingService.searchItem(this.$route.params.stage, key, n);
				console.log(res.data)
				this.$bus.$emit('singReplaceData', res.data);
			} catch (error) {
				console.log(error)
			}
		},
		async sortItem(key, page) {
			this.$bus.$emit('singSearchLoading');
			this.sortopen = false
			localStorage.setItem('singSortKey', key);
			try {
				const res = await SingService.sortStageItem(this.$route.params.stage, key, page);
				this.$bus.$emit('singSortItem', res.data);
			} catch (error) {
				console.log(error)
			}
		},
		next(num) {
			console.log(num)
			if( this.type == 'search' ) {
				var key = localStorage.getItem('singkeyword');
				this.search(key, num);
			} else if( this.type == 'sort' ){
				var key = localStorage.getItem('singSortKey');
				this.sortItem(key,num);
			} else {
				this.$bus.$emit('refetchPaginate', num);
			}
		},
		reload() {
			location.reload();
			return false;
		}
	},
	mounted() {
		if( localStorage.getItem('sing_sorter') ) {
			this.sorterMode = JSON.parse(localStorage.getItem('sing_sorter'))
		}

		this.$bus.$on('datapunyaku', (data) => {
			this.punyaaku.push(data);
		});
		this.$bus.$on('uploadopen', (data) => {
			this.uploadVisible = true
		})
		this.$bus.$on('uploadclose', (data) => {
			this.uploadVisible = false
		})
		if (localStorage.getItem('userdata')) {
			var userdata = JSON.parse(localStorage.getItem('userdata'));
			//console.log(userdata)
			this.userdata = userdata
			this.userid = userdata.data.id
			this.checkUploadAvailablity(this.$route.params.stage);
		}
	}
}
</script>
<style lang="scss">
	.stagesing {
		.v-toolbar__content {
			padding-left: 0!important;
			padding-right: 0!important;
		}
	}
	.antiloncat {
		.header {
			position: relative!important;
		}
	}
	.antipenyok {
		&.v-text-field--filled.v-text-field--single-line input {
			margin-top: 0!important;
		}
	}
	.filterbtn * {
		text-transform: capitalize!important;
	}
</style>

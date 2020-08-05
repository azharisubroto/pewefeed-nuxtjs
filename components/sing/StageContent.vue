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
					<div @click="sortopen = true" class="mr-4 d-inline-block">
						<v-img src="/img/icons/filter.svg" width="20"></v-img>
					</div>
					<div @click="opensearch = true" class="d-inline-block">
						<v-img src="/img/icons/search.svg" width="20"></v-img>
					</div>
				</v-col>
			</v-row>
		</v-app-bar>

		<template v-if="maintab == 0">
			<v-container>
				<v-alert class="mt-4" color="#0057FF" prominent>
					<template v-slot:prepend>
					<v-img src="/img/icons/info.svg" width="35" max-width="35" class="mr-3 infoarticleicon"></v-img>
					</template>
					{{content.stage.label}} akan berakhir tanggal {{content.stage.end_date}}
				</v-alert>
			</v-container>
			<v-container v-if="uploaded">
				<div class="text-16"><strong>POSISI KAMU</strong></div>
			</v-container>
			<div v-if="pesertaloop != null && userid != null">
				<template v-for="(item, i) in pesertaloop">
					<v-container v-if="item.customer.id == userid && i == 0 && !uploaded" :key="i+'-abcd'" class="text-center py-0">
						<v-btn block :disabled="!uploadallowed" color="deep-orange" class="px-5" dark @click="uploadVisible=!uploadVisible">Upload Video Kamu</v-btn>
					</v-container>
					<div v-if="item.customer.id == userid" class="pesertalist mx-4" :key="'peserta-'+i">
						<SingItem :item="item" />
					</div>
				</template>
			</div>
			<div v-if="userid != null && uploadallowed">
				<v-container class="text-center py-0">
					<v-btn block :disabled="!uploadallowed" color="deep-orange" class="px-5" dark @click="uploadVisible=!uploadVisible">Upload Video Kamu</v-btn>
				</v-container>
			</div>
			<div v-else-if="userid == null">
				<v-container class="text-center py-0">
					<v-btn block color="deep-orange" class="px-5" dark @click="loginModalVisible = true">Upload Video Kamu</v-btn>
				</v-container>
			</div>

			<v-container class="d-none">
				<v-row align="center">
					<v-col cols="5">
						<div class="text-uppercase text-15">seluruh peserta</div>
					</v-col>
					<v-col cols="7" class="text-right">
						<v-btn small text @click="sortopen=true">
							<v-icon>mdi-sort-ascending</v-icon>
							<span class="text-10">Urutkan</span>
						</v-btn>
						<v-btn small text @click="opensearch = true">
							<v-icon>mdi-magnify</v-icon>
							<span class="text-10">Cari</span>
						</v-btn>
					</v-col>
				</v-row>
			</v-container>

			<!-- SORTER -->
			<v-bottom-sheet v-model="sortopen">
				<v-sheet height="100%" class="antiloncat">
					<v-toolbar :elevation="1" style="border-top: 2px solid #fff">
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
						<div class="flex-grow-1"></div>
						<v-toolbar-items>
							<v-btn dark text class="deep-orange--text pl-0 text-uppercase" style="margin-left:-10px;">SORT</v-btn>
						</v-toolbar-items>
						<div class="flex-grow-1"></div>
					</v-toolbar>

					<div class="mx-0 text-center px-4">
						<template v-for="(item, i) in sorter">
							<div class="devider-small" :key="'devtop-'+i"></div>
							<div class="py-4" :key="'devmid-'+i" @click="sortItem(item.slug, 1)">{{item.title}}</div>
						</template>
					</div>
				</v-sheet>
			</v-bottom-sheet>

			<!-- ==== SEARCH BAR === -->
			<v-bottom-sheet v-model="opensearch">
				<v-sheet height="100%">
					<v-toolbar :elevation="0" style="border-top: 2px solid #fff">
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
					<div class="flex-grow-1"></div>
					<v-toolbar-items>
						<v-btn dark text class="deep-orange--text pl-0" style="margin-left:-15px">Search</v-btn>
					</v-toolbar-items>
					<div class="flex-grow-1"></div>
					</v-toolbar>
					<div class="devider-small" style="border-color:rgba(255,255,255,.1)"></div>

					<div class="px-5 py-10">
					<v-text-field
						flat
						filled
						single-line
						solo
						hide-details
						prepend-inner-icon="mdi-magnify"
						background-color="#000"
						v-model="searchModel"
						@keyup.enter="search(searchModel, 1)"
						label="Tulis Kata Kunci . . ."
						style="border:0!important;box-shadow:none!important;"
						class="antipenyok"
					></v-text-field>
					<v-btn @click="search(searchModel)" block large color="deep-orange" class="mt-3">Search</v-btn>
					<v-btn block large color="deep-orange" class="mt-3" @click="reload()">Show All Participants</v-btn>
					</div>
				</v-sheet>
			</v-bottom-sheet>

			<div v-if="pesertaloop !=null && pesertaloop.length > 0">
				<div class="pesertalist mx-4" v-for="(item, i) in pesertaloop" :key="'peserta-'+i">
					<SingItem :item="item"/>
				</div>
			</div>
			<div v-else class="text-center pa-10">
				Tidak Ada Data
			</div>

			<v-container v-if="pesertaloop !=null && pesertaloop.length > 0">
				<v-pagination
					@input="next"
					v-model="pagination"
					:length="content.paginations.last_page"
					:total-visible="10"
				></v-pagination>
			</v-container>

			<UploadVideo :dialogVisible="uploadVisible" :stage="stage"/>
		</template>

		<template v-if="maintab == 1">
			<SingPrizes/>
		</template>

		<!-- BOTTOM NAVIGATION -->
		<br><br><br><br>
		<v-bottom-navigation
			fixed
			dark
			grow
			color="white"
			background-color="#2C2C2D"
			v-model="singtab"
			height="80"
			class="pwmenubottom"
		>
			<v-btn @click="maintab = 0">
				<span>Contestant</span>
				<img src="/img/icons/contestant.svg" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<v-btn @click="maintab = 1">
				<span>Prizes</span>
				<img src="/img/tukarpoin/tukarpoin-orange.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<ShareButton2/>
		</v-bottom-navigation>
		<LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose" />
		<NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose" />

	</div>
</template>

<script>
import ShareButton2 from "@/components/common/ShareButton2";
import SingAppBar from "@/components/sing/SingAppBar";
import SingPrizes from "@/components/sing/SingPrizes";
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
		SingPrizes,
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
			pagination: this.content.paginations.current_page,
			dialogVisible: false,
			uploadVisible: false,
			sorter: [
				{
					title:'Star to NOT Star',
					slug: 'star',
				},
				{
					title:'High VOTE to low VOTE',
					slug: 'high_vote',
				},
				{
					title:'Low VOTE to High VOTE',
					slug: 'low_vote',
				},
				{
					title:'High COMMENTS to Low COMMENTS',
					slug: 'high_comment',
				},
				{
					title:'Low COMMENTS to Hight COMMENTS',
					slug: 'low_comment',
				},
				{
					title:'Newest to Oldest',
					slug: 'newest',
				},
				{
					title:'Oldest to Newest',
					slug: 'oldest',
				},
			],
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
						console.log(el.customer.id, userid);
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
				console.log(res.data);
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
			console.log(userdata)
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
</style>

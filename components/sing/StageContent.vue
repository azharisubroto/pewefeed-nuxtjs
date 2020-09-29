<template>
	<div class="stagesing">

		<v-container v-if="userid != null" class="hero pb-0 pt-0">

			<!-- Loggedin but not uploaded any -->
			<v-card
			v-if="!uploaded && !lock"
			color="#FFC107"
			class="px-4 mb-0 py-4 mt-3"
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
							<img src="/img/icons/upload.svg" class="mr-1" alt="upload">  Upload coy
						</v-btn>
					</div>
				</div>
			</v-card>
		</v-container>

		<v-container v-if="pesertaloop !=null && pesertaloop.length > 0">
			<div class="pesertalist" v-for="(item, i) in pesertaloop" :key="'peserta-'+i">
				<SingItem :isrunning="content.stage.isRunning" :item="item"/>
			</div>
		</v-container>
		<v-container v-else class="text-center pa-10">
			Tidak Ada Data
		</v-container>

		<UploadVideo :dialogVisible="uploadVisible" :stage="content.stage.id"/>
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
	props: ['title', 'pesertaloop', 'stage', 'content', 'type', 'lock'],
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
			opensearch: false,
			searchModel:'',
			uploadallowed: false,
			punyaaku: [],
			pagination: this.content ? this.content.paginations.current_page : 1,
			dialogVisible: false,
			uploadVisible: false,
			uploaded: false,
			loginModalVisible: false,
			notVipDialogVisible: false,
			locked: false  
		}
	},
	watch: {
		pesertaloop: {
			immediate: true,
			handler (val, oldVal) {
				////console.log(val);
				if (localStorage.getItem('userdata') && val != null && !this.locked ) {
					var userdata = JSON.parse(localStorage.getItem('userdata'));
					let userid = userdata.data.id
					for (let index = 0; index < val.length; index++) {
						const el = val[index];
						////console.log(el.customer.id, userid);
						if( el.customer.id == userid ) {
							this.uploaded = true
							this.locked = true
							//console.log('exists');
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
				////console.log(res.data);
				this.uploadallowed = res.data.upload_available
			} catch (error) {
				console.log(error)
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
			////console.log(userdata)
			this.userdata = userdata
			this.userid = userdata.data.id
			this.checkUploadAvailablity(this.$route.params.stage);
		}

		this.$bus.$on('toggleUpload', (userid) => {
			let vm = this
			if( userid ) {
				vm.uploadVisible = true
			} else {
				vm.loginModalVisible = true
			}
		});
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

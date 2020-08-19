<template>
	<div>
		<template v-if="detail!=null && !loading">
			<!-- JUDUL -->
			<v-container class="mb-4">
				<h1 class="text-24 deep-orange--text text-center mt-4">
					{{detail.class.topic}}
				</h1>
			</v-container>

			<!-- TEASER -->
			<div v-html="detail.data[0].embed"></div>

			<!-- DESCRIPTION -->
			<v-container>
				<div v-html="detail.class.introduction"></div>
			</v-container>

			<v-container class="mb-4">
				<img src="/img/playlist.png" width="20" loading="lazy" class="mr-3" style="vertical-align:middle"> {{detail.data.length}} Materi
			</v-container>
			<div>
				<div v-for="(item,i) in detail.data" class="kelas-item" :key="'kelasitem-'+i">
					<div class="d-flex justify-space-between align-center">
						<div>
							<h4 class="mb-3"><strong>{{item.title}}</strong></h4>
						</div>
						<div class="ml-4">
							<template v-if="item.type == 'free'">
								<v-btn width="123" :to="'/kelas/'+slug+'/'+item.slug" color="deep-orange">
									Masuk
								</v-btn>
							</template>
							<template v-else>
								<v-btn width="123" v-if="loggedin && isVIP" :to="'/kelas/'+slug+'/'+item.slug" color="deep-orange">
									Masuk
								</v-btn>
								<v-btn v-else @click="checkMe()" color="deep-orange">
									{{isVIP ? 'Masuk' : 'Daftar VIP'}}
								</v-btn>
							</template>
						</div>
					</div>
				</div>
			</div>
		</template>
		<div v-else-if="detail==null && loading" class="text-center pa-10">
			<v-progress-circular :width="3" color="deep-orange" indeterminate></v-progress-circular>
		</div>
		<div v-else class="text-center pa-10">
			Data unavailable
		</div>

		<LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose" />
		<NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose" />
	</div>
</template>

<script>
import KelasService from '@/services/KelasService'
import LoginModal from "@/components/modal/LoginModal";
import NotVip from "@/components/modal/NotVip";

export default {
	name:"KelasDetailPage",
	components: {
		LoginModal,
		NotVip
	},
	data(){
		return {
			slug: this.$route.params.kelasdetail,
			loading: true,
			detail: null,
			loggedin: null,
			isVIP: null,
			loginModalVisible: false,
			notVipDialogVisible: false,
		}
	},
	methods: {
		myDialogClose() {
			this.loginModalVisible = false;
			this.notVipDialogVisible = false;
		// other code
		},
		fetchUserdata() {
			let vm = this
			this.$auth.fetchUser().then(() => {
				var res = vm.$auth.user;
				// var res = [];
				if( res ) {
					this.loggedin = true
					this.isVIP = res.data.vip
					//console.log('vip', res.data.vip)
				} else {
					this.loggedin = false
					this.isVIP = false
				}
				this.fetchDetail();
			});
		},
		checkMe() {
			if(!this.loggedin && !this.isVIP) {
				this.loginModalVisible = true
			}
			else if(this.loggedin && !this.isVIP) {
				this.notVipDialogVisible = true
			} else {
				this.loginModalVisible = true
			}
		},
		async fetchDetail() {
			try {
				const res = await KelasService.getDetail(this.slug);
				this.detail = res.data;
				this.loading = false
			} catch (error) {
				console.log(error);
				this.loading = false
			}
		}
	},
	mounted() {
		this.fetchUserdata();
	}
}
</script>

<style lang="scss">
	div .kelas-item {
		padding: 15px;
		border-top: 1px solid #fff;
	}
	div .kelas-item:last-of-type{
		border-bottom: 1px solid #fff;
	}
</style>

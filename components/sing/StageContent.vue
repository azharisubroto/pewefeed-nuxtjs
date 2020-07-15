<template>
	<div>
		<v-container>
			<v-alert
			outlined
			type="warning"
			color="white"
			prominent
			border="left"
			>
				{{content.stage.label}} akan berakhir tanggal {{content.stage.end_date}}
			</v-alert>
		</v-container>

		<v-container style="background: #3838ca" class="text-center py-10">
			<v-btn :disabled="!uploadallowed" color="deep-orange" class="px-5" dark @click="uploadVisible=!uploadVisible">Upload Video Kamu</v-btn>
		</v-container>

		<div v-if="userid != null">
			<v-container>
				<div class="text-16"><strong>POSISI KAMU</strong></div>
			</v-container>
			<template v-for="(item, i) in pesertaloop">
				<div style="background:#3838ca;color:white;" v-if="item.customer.id == userid" class="pesertalist px-4" :key="'peserta-'+i">
					<SingItem :item="item" />
				</div>
			</template>
		</div>

		<v-container>
			<v-row align="center">
				<v-col cols="5">
					<div class="text-uppercase text-12">seluruh peserta</div>
				</v-col>
				<v-col cols="7" class="text-right">
					<v-btn small text @click="sorter=true">
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
		<Sorter :dialogVisible="sorter"/>

		<!-- ==== SEARCH BAR === -->
		<v-bottom-sheet v-model="opensearch">
			<v-sheet height="100%">
				<v-toolbar :elevation="0" style="border-top: 2px solid #000">
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
					@keyup.enter="validate()"
					label="Tulis Kata Kunci . . ."
					style="border:0!important;box-shadow:none!important;"
				></v-text-field>
				<v-btn @click="validate()" block large color="deep-orange" class="mt-3">Search</v-btn>
				<v-btn block large color="deep-orange" class="mt-3">Show All Participants</v-btn>
				</div>
			</v-sheet>
		</v-bottom-sheet>

		<div class="devider-small"></div>
		<div v-if="pesertaloop !=null && pesertaloop.length > 0">
			<div class="pesertalist px-4" v-for="(item, i) in pesertaloop" :key="'peserta-'+i">
				<SingItem :item="item"/>
			</div>
		</div>

		<v-container v-if="pesertaloop !=null && pesertaloop.length > 0">
			<v-pagination
				v-model="pagination"
				:length="100"
				:total-visible="10"
			></v-pagination>
		</v-container>

		<UploadVideo :dialogVisible="uploadVisible" :stage="stage"/>

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
			<v-btn @click="$router.push('/sing/?tab=0'); ">
				<span>Join</span>
				<img src="/img/icons/icon-join-orange.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<v-btn @click="$router.push('/sing/?tab=1'); ">
				<span>Prizes</span>
				<img src="/img/tukarpoin/tukarpoin-orange.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<ShareButton2/>
		</v-bottom-navigation>
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
export default {
	name:"StageContent",
	props: ['title', 'pesertaloop', 'stage', 'content'],
	components: {
		ShareButton2,
		SingAppBar,
		Video,
		UploadVideo,
		SingItem,
		Sorter
	},
	data(){
		return {
			userid: null,
			singtab: 0,
			sorter: false,
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
			pagination: 1,
			dialogVisible: false,
			uploadVisible: false,
			userid: null
		}
	},
	methods: {
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

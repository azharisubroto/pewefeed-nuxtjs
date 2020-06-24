<template>
	<div>
		<SingAppBar title="STAGE 1 : AUDISI" :back="true"/>
		<v-container class="py-5">
			<v-avatar class="mr-3">
				<v-img :src="content.customer.avatar ? content.customer.avatar : 'https://via.placeholder.com/350x150'"></v-img>
			</v-avatar>
			{{content.customer.name}}
		</v-container>

		<Video/>

		<template v-if="singtab == 0">
			<v-container>
				<v-alert
				outlined
				type="warning"
				color="white"
				prominent
				border="left"
				dense
				class="text-12"
				>
					Untuk bisa masuk ke tahap selanjutnya, jagoan kamu harus punya minimal XX VOTE. Segera share halaman ini ke social media kamu!
				</v-alert>
			</v-container>

			<v-container>
				<v-row class="text-center">
					<v-col cols="4">
						<div @click="content.star=!content.star">
							<strong>STAR</strong><br>
							<v-icon v-if="content.star" color="yellow">mdi-star</v-icon>
							<v-icon v-else>mdi-star-outline</v-icon>
						</div>
					</v-col>
					<v-col cols="4">
						<strong>VOTE</strong><br>
						{{content.votes}}
					</v-col>
					<v-col cols="4">
						<strong>COMMENTS</strong><br>
						{{content.comments}}
					</v-col>
					<v-col cols="12" class="text-center">
						<v-btn color="deep-orange" @click="content.star=true">Beri Vote</v-btn>
					</v-col>
				</v-row>
			</v-container>

			<v-list color="transparent" class="mb-0">
				<v-list-item-group color="dark">
					<template v-for="(item, i) in howto">
					<div v-if="i==0" :key="'dvdri-'+i" class="devider-small"></div>
					<v-list-item :key="'persmenu-'+i" :to="item.to">
						<v-list-item-content>
							<v-list-item-title class="text-uppercase">
								{{item.title}}
							</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon>
							<v-icon>mdi-chevron-right</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<div :key="'dvdr-'+i" class="devider-small"></div>
					</template>
				</v-list-item-group>
			</v-list>

			<v-container class="px-5">
				<div class="text-16 weight-normal">VOTERS</div>

				<div v-for="(voter, i) in content.voters" class="px-3 py-3" :key="'voter-'+i">
					<div class="d-flex" style="width:100%;">
						<div class="mr-3">
							<v-avatar>
								<v-img :src="voter.avatar"></v-img>
							</v-avatar>
						</div>
						<div>
							<div class="text-14"><strong>{{voter.name}}</strong></div>
							<div class="text-12"><strong>{{voter.date}}</strong></div>
						</div>
					</div>
				</div>

				<div class="text-center">
					<v-btn color="deep-orange" class="mt-4">Show More</v-btn>
				</div>
			</v-container>
		</template>

		<template v-if="singtab == 1">
			<v-container>
				<div class="statusquo text-center row" style="background-color:#474747;border-top:1px solid #fff;border-bottom:1px solid #fff;">
					<v-col cols="12">
						<v-btn @click="comment_tab = 0; " :class="[comment_tab == 0 ? 'active' : null]" text dark small>
							<span>Berikan Komentar</span>
						</v-btn>
						<v-btn @click="comment_tab = 1; " :class="[comment_tab == 1 ? 'active' : null]" text dark small>
							<span>Ketentuan</span>
						</v-btn>
					</v-col>
				</div>
			</v-container>

			<v-container v-if="comment_tab==0">
				<v-alert
				outlined
				type="warning"
				color="white"
				prominent
				border="left"
				dense
				class="text-12"
				>
					Dapatkan 2 Poin atas setiap komentar dengan minimum 20 kata
				</v-alert>

				<!-- TEXT AREA -->
				<v-textarea
					class="mt-4"
					outlined
					color="deep-orange"
					label="Komentar"
					value
					rows="3"
					auto-grow
					v-model="comment_message"
				></v-textarea>
				<div
					class="counter mb-3"
					align="end"
					style="margin-top: -30px !important;"
				>{{ total_counter }}</div>
				<div class="d-block"></div>
				<recaptcha
					:key="recaptchaKey"
					class="mx-5 my-5"
					@error="onError()"
					@success="onSuccess()"
					@expired="onExpired()"
				/>
				<v-btn
					:disabled="recaptchaToken == null"
					:style="recaptchaToken == null ? 'background-color: grey !important' : ''"
					block
					dark
					depressed
					color="deep-orange"
					@click="postComment()"
				>
					<template v-if="!commentIsPosting">Kirim Komentar</template>
					<template v-else>Mengirim Komentar...</template>
				</v-btn>

				<h4 class="mb-4 mt-5">Star Comments</h4>
				<CommentList :items="starcomments" class="star-comments"/>

				<h4 class="mb-4 mt-5">{{ totalComment }} Comments</h4>

				<!-- KOMEN LIST -->
				<CommentList :items="comments" />

				<div v-if="isMoreComment" class="text-center py-3 caption">No more comments</div>

				<v-btn
				v-if="isMoreComment && comments.length > 0"
				:loading="moreLoadingComment"
				class="mt-5"
				block
				depressed
				dark
				color="deep-orange"
				@click="loadMoreComment(nextComment)"
				>Load More</v-btn>
				<div class="mb-5"></div>
			</v-container>

			<v-container v-if="comment_tab==1">
				<h4 class="mt-5 mb-3">KETENTUAN KOMENTAR</h4>
				<ol class="mb-5 pb-5">
					<li>Pastikan sudah login</li>
					<li>Tulis komentar dengan minimal terdiri dari 20 kata</li>
					<li>Poin hanya diberikan 1 kali untuk 1 User per 1 Artikel</li>
					<li>Seluruh komentar dimoderasi oleh tim Playworld ID dan bisa dihapus dan akan mengurangi total POIN jika komentar mengandung konten SARA, atau tidak sesuai dengan artikel yang dibaca</li>
				</ol>
			</v-container>
		</template>

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
			<v-btn>
				<span>Vote</span>
				<img src="/img/icons/icon-vote-orange.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<v-btn>
				<span>Comments</span>
				<img src="/img/icons/icon-comment-orange-v3.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<ShareButton2/>
		</v-bottom-navigation>
	</div>
</template>

<script>
import ShareButton2 from "@/components/common/ShareButton2";
import SingAppBar from "@/components/sing/SingAppBar";
import Video from "@/components/sing/Video";
import ArticleService from "@/services/ArticleService";
import CommentList from "@/components/common/CommentList";
export default {
	name:"SingVideoPage",
	components: {
		ShareButton2,
		SingAppBar,
		Video,
		CommentList
	},
	data() {
		return {
			comment_fetched: false,
			singtab: 0,
			howto: [{
				title: 'cara vote',
				content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, ab numquam. Repellendus perferendis reiciendis rem eligendi fugiat accusamus similique illo tempore officiis, iusto aliquid consequatur est ducimus vel a velit?'
			}],
			content: {
				customer: {
					avatar: '//via.placeholder.com/80',
					name: this.$route.params.video
				},
				star: false,
				votes: 100,
				voters: [
					{
						name: 'Fahli',
						avatar: '//via.placeholder.com/80',
						date: '10 Juni 2020, 11:00'
					},
					{
						name: 'Fahli',
						avatar: '//via.placeholder.com/80',
						date: '10 Juni 2020, 11:00'
					},
					{
						name: 'Fahli',
						avatar: '//via.placeholder.com/80',
						date: '10 Juni 2020, 11:00'
					},
					{
						name: 'Fahli',
						avatar: '//via.placeholder.com/80',
						date: '10 Juni 2020, 11:00'
					},
					{
						name: 'Fahli',
						avatar: '//via.placeholder.com/80',
						date: '10 Juni 2020, 11:00'
					},
				],
				comments: 234
			},

			comment_tab: 0,
			comments: [],
			starcomments: [
				{
					"comment_id":253876,
					"article_id":28350,
					"customer":{
					"id":4792116,
					"name":"Latinka",
					"avatar":"https:\/\/lh3.googleusercontent.com\/a-\/AOh14GgFR_bR9R0I10JoGR-GOfdim87Wyyd32oW1BJys-g"
					},
					"message":"Hfethg hewt Berilah pujian jikalau memang seseorang layak mendapatkan pujian. Jika pujian yang diberikan tidak sesuai dengan situasi yang sebenarnya, sering dilakukan tanpa ada sebab yang jelas plus karena ada agenda tersendiri\u2026 Nah, itulah yang disebut dengan menggombal",
					"commented_at":"38 minutes ago",
					"comment_replys":[

					]
				},
			],
			comments_fetched: false,
			totalComment: 0,
			recaptchaKey: 1,
			total_counter: 0,
			recaptchaToken: null,
			comment_message: null,
			isMoreComment: true,
			commentIsPosting: false,
			moreLoadingComment: false
		}
	},
	watch: {
		comment_message: function(value) {
			if (value) {
				if (value.length == 0) {
					return (this.total_counter = 0);
				}

				var regex = /\s+/gi;
				var wordCount = value
				.trim()
				.replace(regex, " ")
				.split(" ").length;

				return (this.total_counter = wordCount);
			} else {
				return (this.total_counter = 0);
			}
		},
		singtab: function(value) {
			if( value == 1 && this.comment_fetched != true && this.comments_fetched != true ) {
				this.fetchComment();
			}
		}
	},
	methods: {
		async fetchComment() {
			try {
				const res = await ArticleService.getComments(
					"news",
					'ganti-nama-software-antivirus-microsoft-defender-bakal-hadir-untuk-smartphone',
					1
				);
				// console.log(res)
				this.comments = res.data.data.comments;
				this.totalComment = res.data.pagination.total;
				this.comments_fetched = true;

				if (res.data.pagination.current_page == res.data.pagination.last_page) {
					this.isMoreComment = false;
				}
			} catch (error) {
				console.log(error);
			}
		},
		async loadMoreComment(n) {
			this.moreLoadingComment = true;
			try {
				const res = await ArticleService.getComments(
				"news",
				this.$route.params.articleslug,
				n
				);

				var dataComments = res.data.data.comments;

				dataComments.forEach(element => {
				this.comments.push(element);
				});

				this.nextComment += 1;

				this.moreLoadingComment = false;

				if (res.data.pagination.current_page == res.data.pagination.last_page) {
				this.isMoreComment = false;
				}
			} catch (error) {
				console.log(error);
				this.moreLoadingComment = false;
			}
		},
	}
}
</script>
<style lang="scss">
.devider {
  position: relative;
  text-align: center;
  z-index: 0;
  &:before {
    content: "";
    width: 100%;
    z-index: -1;
    height: 1px;
    background: #000;
    opacity: 0.1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto 0;
  }
  span {
    padding: 0 10px;
    background: #303030;
  }
}
.statusquo {
	.v-btn.active {
		color: var(--primary) !important;
	}
}
.star-comments .v-avatar {
	//border: 3px solid var(--primary);
	box-shadow: 0 0 0 3px var(--primary);
}
</style>

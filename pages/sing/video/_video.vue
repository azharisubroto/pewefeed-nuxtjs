<template>
  <div>
    <SingAppBar :title="content2 != null ? content2.stage : ''" :back="true" />

	<v-container>
		<v-alert class="mt-4" color="#0057FF" prominent>
			<template v-slot:prepend>
				<v-img src="/img/icons/info.svg" width="35" max-width="35" class="mr-3 infoarticleicon"></v-img>
			</template>
			Pastikan kamu memiliki minimal XXX Vote untuk bisa melaju ke stage selanjutnya
		</v-alert>


		<div v-if="content2!= null" class="d-flex justify-space-between align-center mt-3">
			<div>
				<v-avatar size="30">
					<v-img cover :src="content2.customer.avatar ? content2.customer.avatar : 'https://via.placeholder.com/350x150'"></v-img>
				</v-avatar>
				<div class="d-inline-block ml-2 text-14">
					{{content2.customer.name}}
				</div>
			</div>

			<div class="text-14 d-flex align-center justify-content-end metasing">
				<div class="d-inline-block">
					<v-img src="/img/icons/rank.svg" width="14" max-width="14" class="mr-1 d-inline-block"></v-img>
					(123)
				</div>
				<div class="d-inline-block ml-3">
					<v-img src="/img/icons/thumb.svg" width="14" max-width="14" class="mr-1 d-inline-block"></v-img>
					({{content2.total_vote}})
				</div>
				<div class="d-inline-block ml-3">
					<v-img src="/img/icons/comment-single.svg" width="14" max-width="14" class="mr-1 d-inline-block"></v-img>
					({{content2.total_comments}})
				</div>
			</div>
		</div>

		<div v-if="content2!= null" class="mt-4">
			<video v-if="videoutama!=null && playnow !== false" width="400" controls autoPlay>
				<source :src="videoutama" type="video/mp4">
			</video>
			<v-img v-else
				:src="content2.video.thumbnail_url"
				position="center"
				:aspect-ratio="16/9"
				class="position-relative"
				@click="playnow = true"
			>
				<div class="singstarstatus">
					<img v-if="content2.is_star" src="/img/icons/star-yellow.svg" alt="">
					<img v-else src="/img/icons/star-default.svg" alt="">
				</div>
				<template v-slot:default>
					<v-row
					class="ma-0"
					align="center"
					justify="center"
					style="height:100%;"
					>
						<v-icon size="100">mdi-play-circle</v-icon>
					</v-row>
				</template>
			</v-img>

			<v-btn
			  class="mt-4"
			  block
              color="deep-orange"
              @click="sendVote(content2.id);"
            >Beri Vote</v-btn>
		</div>
	</v-container>

    <template v-if="singtab == 0">
		<v-container>
			<div
			class="statusquo text-center row text-18"
			style="background-color:#000;border-top:1px solid #fff;border-bottom:1px solid #fff;"
			>
				<v-col cols="6">
					<v-btn
					@click="votetab = 0; "
					:class="[votetab == 0 ? 'active' : null]"
					text
					dark
					block
					class="text-18 text-capitalize"
					style="letter-spacing:0"
					>
						<strong>Voters</strong>
					</v-btn>
				</v-col>
				<v-col cols="6">
					<v-btn
					@click="votetab = 1; "
					:class="[votetab == 1 ? 'active' : null]"
					text
					dark
					block
					class="text-18 text-capitalize"
					style="letter-spacing:0"
					>
						<strong>Ketentuan</strong>
					</v-btn>
				</v-col>
			</div>
		</v-container>

      <v-container>
		  <template v-if="votetab == 0">
			<div v-for="(voter, i) in voters" class="px-3 py-3" :key="'voter-'+i">
				<div class="d-flex" style="width:100%;">
					<div class="mr-3">
						<v-avatar>
							<v-img :src="voter.avatar"></v-img>
						</v-avatar>
					</div>
					<div>
						<div class="text-14">
							<strong>{{voter.name}}</strong>
						</div>
						<div class="text-12">
							<strong>{{voter.date}}</strong>
						</div>
					</div>
				</div>
			</div>

			<div class="text-center mt-3" v-if="content2.total_vote > 0">
				<v-btn color="deep-orange" class="mt-4">Show More</v-btn>
			</div>
		  </template>

		  <template v-if="votetab == 1">
			Untuk ikut mendukung kontestan favoritmu
			kebabak selanjutnya <br> berikan vote dengan
			cara :<br><br>

			1. Pastikan kamu sudah memiliki VIP Pewefeed<br>
			2. Silakan pilih penyanyi favorit kamu dan
			berikan Vote sebanyak-banyaknya<br>
			3. Satu Vote berlaku hanya berlaku untuk
		  </template>
      </v-container>
    </template>

    <template v-if="singtab == 1">
      <v-container>
        <div
          class="statusquo text-center row text-18"
		  style="background-color:#000;border-top:1px solid #fff;border-bottom:1px solid #fff;"
        >
          <v-col cols="6">
			  <v-btn
              @click="comment_tab = 0; "
              :class="[comment_tab == 0 ? 'active' : null]"
              text
			  dark
			  block
			  class="text-18 text-capitalize"
			  style="letter-spacing:0"
            >
              <span>Berikan Komentar</span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              @click="comment_tab = 1; "
              :class="[comment_tab == 1 ? 'active' : null]"
              text
			  dark
			  block
			  class="text-18 text-capitalize"
			  style="letter-spacing:0"
            >
              <span>Ketentuan</span>
            </v-btn>
          </v-col>
        </div>
      </v-container>

      <v-container v-if="comment_tab==0">
        <v-alert class="mt-0" color="#0057FF" prominent>
			<template v-slot:prepend>
				<v-img src="/img/icons/info.svg" width="35" max-width="35" class="mr-3 infoarticleicon"></v-img>
			</template>
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
        <CommentList v-if="starcomments != null && starcomments.length > 0" :items="starcomments" class="star-comments" />
		<div v-else class="caption text-center pa-5">No Data</div>

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

    <br />
    <br />
    <br />
    <br />
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
        <img
          src="/img/icons/icon-comment-orange-v3.png"
          class="mb-1 d-block"
          width="20"
          height="20"
        />
      </v-btn>
      <ShareButton2 tipe="Sing" :customimage="content2.video.thumbnail_url"/>
    </v-bottom-navigation>

	<!-- Dapet bonus -->
	<v-bottom-sheet v-model="apakahbetul">
      <v-sheet height="100%">
        <v-toolbar :elevation="1" style="border-top: 2px solid #fff;">
          <!-- Arrow -->
          <v-btn
            dark
            icon
            tile
            style="border-right: 0px solid #717171"
            light
            @click="apakahbetul = !apakahbetul"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <!-- Title -->
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn dark text class="deep-orange--text pl-0" style="margin-left:-10px;">
				<span v-if="type=='vote'">You've got {{ type == 'vote' ? 5 : 2 }} Point!</span>
				<span v-if="type=='alreadyvote'">Information</span>
			</v-btn>
          </v-toolbar-items>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <div class="mx-2">
          <v-container v-if="type == 'vote'" class="text-center">
			  <img src="/img/poinextra.png" width="40" class="mt-5"/>
			  <br>
			  Kamu mendapat 5 Point karena sudah<br>
			  Memberikan vote
			  <br>
			  <v-btn to="/member/histori_penggunaan_poin" color="green" class="mt-2">Check Total Point</v-btn>
			  <br><br>
		  </v-container>
		  <v-container v-else-if="type == 'alreadyvote'" class="text-center">
			  <img src="/img/close.svg" width="40" class="mt-5"/>
			  <br>
			  Kamu sudah memberikan vote hari ini
			  <br>
			  <br>
			  <v-btn to="/member/histori_penggunaan_poin" color="green" class="mt-2">Check Total Point</v-btn>
			  <br><br>
		  </v-container>
		  <v-container v-else class="text-center">
			  <img src="/img/poinextra.png" width="40" class="mt-5"/>
			  <br>
			  Kamu mendapat 2 Point karena sudah<br>
			  Memberikan vote
			  <br>
			  <v-btn to="/member/histori_penggunaan_poin" color="green" class="mt-2">Check Total Point</v-btn>
			  <br><br>
		  </v-container>
        </div>
      </v-sheet>
    </v-bottom-sheet>

	<LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose" />
	<NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose" />
  </div>
</template>

<script>
import ShareButton2 from "@/components/common/ShareButton2";
import SingAppBar from "@/components/sing/SingAppBar";
import Video from "@/components/sing/Video";
import ArticleService from "@/services/ArticleService";
import CommentList from "@/components/common/CommentList";
import SingService from "@/services/SingService";
import LoginModal from "@/components/modal/LoginModal";
import NotVip from "@/components/modal/NotVip";

export default {
  name: "SingVideoPage",
  components: {
    ShareButton2,
    SingAppBar,
	CommentList,
	LoginModal,
	NotVip
  },
  data() {
    return {
		playnow: false,
      comment_fetched: false,
	  singtab: 0,
	  votetab: 0,
	  notVipDialogVisible: false,
	  loginModalVisible: false,
	  apakahbetul: false,
	  ispaging: false,
      howto: [
        {
		  title: "cara vote",
		  to: '/sing/help/cara-vote',
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, ab numquam. Repellendus perferendis reiciendis rem eligendi fugiat accusamus similique illo tempore officiis, iusto aliquid consequatur est ducimus vel a velit?"
        }
      ],
      content: {
        customer: {
          avatar: "//via.placeholder.com/80",
          name: this.$route.params.video
        },
        star: false,
        votes: 100,
        voters: null,
        comments: 234
      },
      content2: this.$store.state.sing_detail,
      voters: this.$store.state.sing_voters,

      comment_tab: 0,
      comments: [],
      starcomments: [
        {
          comment_id: 253876,
          article_id: 28350,
          customer: {
            id: 4792116,
            name: "Latinka",
            avatar:
              "https://lh3.googleusercontent.com/a-/AOh14GgFR_bR9R0I10JoGR-GOfdim87Wyyd32oW1BJys-g"
          },
          message:
            "Hfethg hewt Berilah pujian jikalau memang seseorang layak mendapatkan pujian. Jika pujian yang diberikan tidak sesuai dengan situasi yang sebenarnya, sering dilakukan tanpa ada sebab yang jelas plus karena ada agenda tersendiri\u2026 Nah, itulah yang disebut dengan menggombal",
          commented_at: "38 minutes ago",
          comment_replys: []
        }
      ],
      comments_fetched: false,
      totalComment: 0,
      recaptchaKey: 1,
      total_counter: 0,
      recaptchaToken: null,
      comment_message: null,
      isMoreComment: true,
      commentIsPosting: false,
	  moreLoadingComment: false,
	  videoutama: null,
	  type: null
    };
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
      if (
        value == 1 &&
        this.comment_fetched != true &&
        this.comments_fetched != true
      ) {
        this.fetchComment();
      }
    }
  },
  mounted() {
	  this.getVideoDetail(this.$route.params.video);
  },
  async fetch({ store, params }) {
    //console.log('fetch this')
    //console.log(params.articleslug)
    var item = await SingService.getDetailVideo(params.video).then(res => {
      return res.data;
    });
    const data = item;

    // Voters
    let voters = data.voters;
    let votersTemp = [];
    voters.forEach(el => {
      votersTemp.push({
        name: el.name,
        avatar: el.avatar,
        date: el.vote_date
      });
    });
    store.commit("SET_SING_VOTERS", votersTemp);
    store.commit("SET_SING_SINGLE", item);
    console.log(JSON.parse(JSON.stringify(item)));
  },
  methods: {
    async sendVote(id) {
      console.log("sendVote");
      try {
        const res = await SingService.sendVote({
          customer_video_id: id
        });
		const data = res.data;
		this.apakahbetul = true;
		this.type = 'vote'
		console.log(data);
		setTimeout(() => {
			window.location.reload(true);
		}, 1000);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status == 422) {
		  //alert(error.response.data.message);
		  this.apakahbetul = true
		  this.type = 'alreadyvote'
        } else if (error.response && error.response.status == 500) {
          alert("an error occured");
        } else if (error.response && error.response.status == 401) {
          this.loginModalVisible = true;
        } else {
          alert("error! " + error.message);
        }
      }
	},
	async fetchIGVIDEO(url) {
		try {
			const res = await SingService.igVideo(url);
			console.log('ig video', res);
			this.videoutama = res.data.graphql.shortcode_media.video_url
		} catch (error) {
			console.log(error)
		}
	},
    async getVideoDetail(slug) {
      console.log("getVideoDetail");
      try {
        const res = await SingService.getDetailVideo(slug);
        const data = res.data;
		let ig_video = data.video_url;
		let voters = data.voters

		let votersTemp = [];
		voters.forEach(el => {
			votersTemp.push({
				name: el.name,
				avatar: el.avatar,
				date: el.vote_date
			});
		});
		if( ig_video ) {
			this.fetchIGVIDEO(ig_video);
		}
      } catch (error) {
        console.log(error);
      }
    },
    async fetchComment() {
      try {
        const res = await SingService.getComments(this.$route.params.video);
        //console.log(res.data.data)
        this.comments = res.data.data.comments;
        this.starcomments = res.data.data.artist_comments;
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
    /* Recaptcha */
    onError(error) {
      console.log("Error happened:", error);
      this.recaptchaToken = null;
    },
    onSuccess(token) {
      this.recaptchaToken = "success";
    },
    onExpired() {
      console.log("Expired");
      this.recaptchaToken = null;
    },
    urlify(text) {
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      if (text) {
        var isUrl = text.replace(urlRegex);

        if (isUrl != text) {
          return true;
        }

        return false;
      }

      return false;
    },
    openModalLogin() {
      this.loginModalVisible = true;
    },
    myDialogClose() {
      this.dialog = false;
      this.loginModalVisible = false;
      this.buyVipDialogVisible = false;
      this.pleaseLoginDialogVisible = false;
      this.notVipDialogVisible = false;
      this.KomentarPoinVisible = false;
      // other code
    },
    /* Validasi Form Rating */
    validate() {
      if (this.$refs.form.validate()) {
        if (this.recaptchaToken != null) {
          this.postComment();
        } else {
          this.snackbar = true;
          this.responsemessage = "Mohon Centang Recaptha";
        }
      }
    },
    async postComment() {
      let vm = this;
      this.commentIsPosting = true;

      if (this.total_counter < 20) {
        var isUrl = this.urlify(this.comment_message);

        this.commentIsPosting = false;

        if (isUrl) {
          return alert("Comments tidak boleh mengandung tautan");
        }

        return alert("Comments harus mengandung minimal 20 kata");
      }

      var data = {
        msg: this.comment_message,
        customer_video_id: this.$route.params.video
      };

      try {
        const res = await SingService.postComment(data);
        this.$auth.fetchUser().then(() => {
          localStorage.setItem("userdata", JSON.stringify(vm.$auth.user));
        });
        // console.log(res.data.poin);
        this.fetchComment();
        this.commentIsPosting = false;
        this.comment_message = null;
        this.recaptchaToken = null;
        if (res.data.poin > 0) {
          	this.apakahbetul = true;
			this.type = 'komen'
        }
      } catch (error) {
        //console.log(error.response.status)
        this.commentIsPosting = false;
        if (error.response && error.response.status == 422) {
          alert(error.response.data.message);
        } else if (error.response && error.response.status == 500) {
          alert("an error occured");
        } else if (error.response && error.response.status == 401) {
          //alert('Mohon Maaf :(, Anda harus login')
          this.loginModalVisible = true
        } else {
          alert("error! " + error.message);
        }
      }
    }
  },
  beforeDestroy() {
	localStorage.setItem('sing_to_login', 'yes');
  }
};
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
  p {
	  font-size: 18px;
	  margin-top: 0;
  }
}
video {
	max-width: 100%!important;
}
</style>

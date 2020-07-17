<template>
  <div>
    <SingAppBar :title="$store.state.judge_num + ' Judges Winner'" :back="true"/>

    <v-container v-if="winner != null" class="py-5">
      <v-avatar class="mr-3">
        <v-img
          :src="winner.customer.avatar ? winner.customer.avatar : 'https://via.placeholder.com/350x150'"
        ></v-img>
      </v-avatar>

      {{winner.customer.name}}
      <v-btn text :href="winner.video.author_url">
        <v-icon class="mr-2">mdi-instagram</v-icon>
        {{winner.video.author_name}}
      </v-btn>
    </v-container>

    <template v-if="winner != null">
      <v-img :src="winner.video.thumbnail_url"></v-img>
      <div class="devider-small my-2"></div>
      <v-container>
        <v-row class="text-center">
          <v-col cols="4">
            <div>
              <strong>STAR</strong>
              <br />
              <v-icon v-if="winner.is_star" color="yellow">mdi-star</v-icon>
              <v-icon v-else>mdi-star-outline</v-icon>
            </div>
          </v-col>
          <v-col cols="4">
            <strong>VOTE</strong>
            <br />
            {{winner.total_vote}}
          </v-col>
          <v-col cols="4">
            <strong>COMMENTS</strong>
            <br />
            {{winner.total_comments}}
          </v-col>
        </v-row>
      </v-container>
    </template>
    <div class="devider-small"></div>

    <!-- VOTERS -->
    <template v-if="singtab == 0">
      <v-container v-if="winner!=null && winner.voters">
        <div class="text-16 weight-normal">VOTERS</div>

        <div class="d-flex py-3" v-for="(voter, i) in winner.voters" :key="'voter-'+i">
          <div class="mr-3">
            <v-avatar>
              <v-img
                :src="voter.avatar ? voter.avatar : 'https://via.placeholder.com/350x150'"
                :aspect-ratio="1"
              ></v-img>
            </v-avatar>
          </div>
          <div>
            <strong>{{voter.name}}</strong>
            <br />
            <span class="text-14">{{voter.vote_date}}</span>
          </div>
        </div>
      </v-container>
    </template>

    <!-- COMMENTS -->
    <template v-if="singtab == 1">
      <v-container>
        <v-alert
          outlined
          type="warning"
          color="white"
          prominent
          border="left"
          dense
          class="text-12"
        >Dapatkan 2 Poin atas setiap komentar dengan minimum 20 kata</v-alert>

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
        <!-- <recaptcha
					:key="recaptchaKey"
					class="mx-5 my-5"
					@error="onError()"
					@success="onSuccess()"
					@expired="onExpired()"
        />-->
        <v-btn block dark depressed color="deep-orange" @click="postComment();">
          <template v-if="!commentIsPosting">Kirim Komentar</template>
          <template v-else>Mengirim Komentar...</template>
        </v-btn>

        <h4 class="mb-4 mt-5">Star Comments</h4>
        <CommentList :items="starcomments" class="star-comments" />

        <h4 class="mb-4 mt-5">{{ totalComment }} Comments</h4>

        <!-- KOMEN LIST -->
        <CommentList :items="comments" />

        <div v-if="isMoreComment" class="text-center py-3 caption">No more comments</div>

        <v-btn
          v-if="isMoreComment"
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
    <!-- BOTTOM NAVIGATION -->
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
        <span>Votes</span>
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
      <ShareButton2 />
    </v-bottom-navigation>

	<LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose" />
	<NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose" />
  </div>
</template>

<script>
import ShareButton2 from "@/components/common/ShareButton2";
import Video from "@/components/sing/Video";
import SingAppBar from "@/components/sing/SingAppBar";
import SingService from "@/services/SingService";
import CommentList from "@/components/common/CommentList";
import LoginModal from "@/components/modal/LoginModal";
import NotVip from "@/components/modal/NotVip";

export default {
  name: "winnervidedetail",
  components: {
    Video,
    SingAppBar,
    ShareButton2,
	CommentList,
	LoginModal,
	NotVip
  },
  data() {
    return {
      singtab: 0,
      winner: null,
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
	  loginModalVisible: false,
      notVipDialogVisible: false,
    };
  },
  watch: {
    singtab: function(value) {
      if (value == 1) {
        this.getComments(this.$route.params.videodetail);
      }
    },
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
    }
  },
  methods: {
    async getVideoDetail() {
      try {
        const res = await SingService.winnerVideoDetail(
          this.$route.params.videodetail
        );
        this.winner = res.data;
        this.comments = res.data.comments;
        console.log(JSON.parse(JSON.stringify(res.data)));
      } catch (error) {
        console.log(error);
      }
    },
    async getComments(id) {
      try {
        const res = await SingService.getComments(id);
        console.log("sing comments:", res.data.data);
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
      const params = {
        msg: this.comment_message,
        type: "news"
      };

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
        customer_video_id: this.$route.params.videodetail
      };

      try {
        const res = await SingService.postComment(data);
        this.$auth.fetchUser().then(() => {
          localStorage.setItem("userdata", JSON.stringify(vm.$auth.user));
        });
        // console.log(res.data.poin);
        this.getComments();
        this.commentIsPosting = false;
        this.comment_message = null;
        this.recaptchaToken = null;
        if (res.data.poin > 0) {
          this.KomentarPoinVisible = true;
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
          this.openModalLogin();
        } else {
          alert("error! " + error.message);
        }
      }
    }
  },
  mounted() {
    this.getVideoDetail();
  }
};
</script>

<style lang="scss">
	.star-comments .v-avatar {
		//border: 3px solid var(--primary);
		box-shadow: 0 0 0 3px var(--primary);
	}
	.star-comments {
		p {
			margin-top: 0;
			font-size: 16px;
		}
	}
</style>

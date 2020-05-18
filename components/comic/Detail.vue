<template>
  <section>
    <v-skeleton-loader
      v-if="comic==''"
      class="mx-auto mt-5"
      type="list-item-avatar-three-line, image, article"
    ></v-skeleton-loader>

    <v-container v-if="comic" class="mb-5 pb-5">
      <!-- META 1 -->
      <div class="mb-1 caption">
        <div class="d-inline-block mr-2 mb-3">KOMIK</div>
        <div class="d-inline-block">
          <div class="d-inline-block mr-3 text--small">
            <v-icon small>mdi-clock-outline</v-icon>
            {{comic.created_at}}
          </div>
          <div class="d-inline-block mr-3 text--small">
            <v-icon small size="12">mdi-calendar-blank</v-icon>
            {{comic.date}}
          </div>
          <div class="d-inline-block mr-3 text--small">
            <v-icon small size="12">mdi-eye-outline</v-icon>
            {{comic.total_views}}
          </div>
          <div class="d-inline-block mr-3 text--small">
            <v-icon small size="12">mdi-message-text-outline</v-icon>
            {{comic.total_comment ? comic.total_comment : 0}}
          </div>
        </div>
      </div>

      <!-- TITLE -->
      <h2>{{comic.title}}</h2>
      <div>
        <v-row>
          <v-col cols="4" class="mr-2">
            <v-rating
              v-model="totalRating"
              background-color="orange"
              color="orange"
              dense
              half-increments
              hover
              size="23"
              readonly
            ></v-rating>
          </v-col>
          <v-col cols="2">
            <span class="caption ml-2">({{ total_review }})</span>
          </v-col>
        </v-row>
      </div>

      <!-- ARTICLE -->
      <template v-if="isComic">
        <v-row class="pb-5">
          <v-col cols="12">
            <div class="cover" v-if="!isVip">
              <v-img width="100%" :src="comic.thumbnail" class="blur">
                <v-btn
                  depressed
                  @click="checkVip()"
                  dark
                  class="btn-vip"
                  color="orange accent-4"
                >DAPATKAN HAK AKSES VIP</v-btn>
              </v-img>
            </div>

            <div class="content" v-else>
              <v-card max-width="444" class="mx-auto grey lighten-4 pt-5" :elevation="0">
                <flickity v-if="dataImage" :options="{adaptiveHeight: true,lazyLoad: true}">
                  <div v-for="content in dataImage" :key="content.link" style="width:100%">
                    <v-img :src="content.link" :aspect-ratio="1" width="300" height="300" class="mx-auto grey lighten-2"></v-img>
                  </div>
                </flickity>
                <v-row no-gutters class="mt-4">
                  <v-col
                    class="text-center black lighten-4 pt-4 pb-4 white--text"
                    cols="6"
                  >{{images.total_size}}</v-col>
                  <v-col class="text-center orange pt-4 pb-4 white--text" cols="6">
                    <a
                      style="text-decoration: none"
                      :href="images.zip_url"
                      download
                      class="white--text"
                    >Download</a>
                  </v-col>
                </v-row>
              </v-card>
            </div>

            <!-- CONTENT -->
            <div class="thumbnail mt-3" v-html="comic.description"></div>
          </v-col>
        </v-row>
      </template>

      <!-- RATING -->
      <template v-if="isRating">
        <v-btn @click="makeRating()" depressed dark color="orange ancent-4" class="my-2">BERI RATING</v-btn>
        <v-list three-line>
          <template v-for="(rating, index) in ratings">
            <v-list-item :key="rating.customer.name+'-'+index">
              <v-list-item-avatar>
                <v-img :src="rating.customer.avatar ? rating.customer.avatar : '/img/user.png'"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="rating.customer.name"></v-list-item-title>
                <v-list-item-subtitle>
                  <v-rating
                    background-color="orange"
                    color="orange"
                    dense
                    :value="rate(rating.rate)"
                    half-increments
                    hover
                    size="18"
                    readonly
                  ></v-rating>
                </v-list-item-subtitle>
                <v-list-item-subtitle class="mt-1" v-html="rating.comment"></v-list-item-subtitle>
                <v-list-item-subtitle class="mt-1">
                  <div class="d-inline-block mr-3 grey--text text--small">
                    <v-icon small size="12">mdi-clock-outline</v-icon>
                    {{rating.created_at}}
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
        <v-btn
          v-if="isMore"
          color="deep-orange"
          dark
          depressed
          block
          @click="loadMore(next)"
        >Load More</v-btn>
      </template>

      <!-- COMMENT -->
      <template v-if="isComment">
        <v-tabs color="deep-orange" v-model="tabCom">
          <v-tab href="#kasihkomen">Berikan Komentar</v-tab>
          <v-tab href="#ketentuankom">Ketentuan</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabCom">
          <v-tab-item value="kasihkomen">
            <v-alert
              border="left"
              dense
              colored-border
              type="info"
              class="mt-4"
              style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
            >
              Dapatkan <label class="orange--text text--accent-4">2 Poin</label> atas setiap komentar dengan minimum 20 kata
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
            <div class="counter mb-3" align="end" style="margin-top: -30px !important;">{{ total_counter }}</div>

            <v-btn :disabled="recaptchaToken == null" :style="recaptchaToken == null ? 'background-color: grey !important' : ''" block dark depressed class="mb-4" color="deep-orange" @click="postComment()">
              <template v-if="!commentIsPosting">Kirim Komentar</template>
              <template v-else>Mengirim Komentar...</template>
            </v-btn>

            <h4 class="mb-4 mt-5">{{ totalComment }} Comments</h4>

            <!-- KOMEN LIST -->
            <CommentList :items="comments" />
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
          </v-tab-item>

          <v-tab-item value="ketentuankom">
            <h4 class="mt-5 mb-3">KETENTUAN KOMENTAR</h4>
            <ol class="mb-5 pb-5">
              <li>Pastikan sudah login</li>
              <li>Tulis komentar dengan minimal terdiri dari 20 kata</li>
              <li>Poin hanya diberikan 1 kali untuk 1 User per 1 Artikel</li>
              <li>Seluruh komentar dimoderasi oleh tim Playworld ID dan bisa dihapus dan akan mengurangi total POIN jika komentar mengandung konten SARA, atau tidak sesuai dengan artikel yang dibaca</li>
            </ol>
          </v-tab-item>
        </v-tabs-items>

        <KomentarPoin :dialogVisible="KomentarPoinVisible" @close="myDialogClose" />
      </template>
    </v-container>
    <br />
    <br />
    <br />

    <LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose" />
    <BuyVip :dialogVisible="buyVipDialogVisible" @close="myDialogClose" />

    <!-- Make Rating -->
    <v-dialog v-model="ratingModal" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-card class="grey lighten-3" @makeloading="setloading" @notloading="notloading">
        <!-- Header -->
        <v-toolbar light color="white">
          <!-- Arrow -->
          <v-btn
            icon
            tile
            style="border-right: 1px solid #717171"
            light
            @click="ratingModal = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <!-- Logo -->
          <v-toolbar-title>
            <v-img :src="logo" :lazy-src="lazy" max-width="40" max-height="40"></v-img>
          </v-toolbar-title>

          <!-- Title -->
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn light text>Rating Submission</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <!-- FORM -->
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row no-gutters class="mt-5 text-center">
              <v-col cols="12" class="mb-4">
                <strong class="text-18">Berikan rating untuk komik ini</strong>
              </v-col>
              <v-col cols="12">
                <v-rating
                  v-model="formdata.rating"
                  :rules="ratingRules"
                  background-color="orange"
                  color="orange"
                  dense
                  half-increments
                  hover
                  size="40"
                ></v-rating>
              </v-col>
              <v-col cols="12">
                <recaptcha
                  class="mx-5 my-5"
                  @error="onError()"
                  @success="onSuccess()"
                  @expired="onExpired()"
                />
              </v-col>
              <v-col cols="12" class="mt-5">
                <v-btn @click="validate()" dark block color="orange accent-4">CONTINUE</v-btn>
              </v-col>
            </v-row>
          </v-form>

          <v-snackbar v-model="snackbar" :timeout="timeout" top>
            {{ responsemessage }}
            <v-btn color="primary" text icon @click="snackbar = false">
              <v-icon color="white">mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-snackbar>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- End Of Make Rating -->

    <v-bottom-navigation fixed dark grow color="white" background-color="black">
      <v-btn @click="isComic=true;isRating=false;isComment=false">
        <span>Konten</span>
      </v-btn>

      <v-btn @click="isComic=false;isRating=true;isComment=false">
        <span>Rating</span>
      </v-btn>

      <v-btn @click="isComic=false;isRating=false;isComment=true">
        <span>
          Komentar
          <br />(+2 Poin)
        </span>
      </v-btn>
    </v-bottom-navigation>

    <NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose" />
  </section>
</template>

<script>
import ComicService from "@/services/ComicService";
import UserService from "@/services/UserService";
import CommentList from "@/components/common/CommentList";
import LoginModal from "@/components/modal/LoginModal";
import KomentarPoin from "@/components/modal/KomentarPoin";
import NotVip from "@/components/modal/NotVip";
import BuyVip from "@/components/modal/BuyVip";
import MakeRating from "@/components/common/MakeRating";
import ShareButton from "@/components/common/ShareButton";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default {
  components: {
    CommentList,
    KomentarPoin,
    LoginModal,
    NotVip,
    BuyVip,
    MakeRating,
    ShareButton
  },
  data() {
    return {
      lazy:
        "https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png",
      logo:
        "https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png",
      formdata: {
        rating: 5
      },
      recaptchaToken: null,
      reviewRules: [v => !!v || "Mohon isi kolom pesan"],
      ratingRules: [v => !!v || "Mohon input rating"],
      overlay: false,
      snackbar: false,
      timeout: 3000,
      responsemessage: "",
      valid: false,
      isVip: false,
      isMore: true,
      comic: "",
      dataImage: "",
      totalRating: 0,
      total_review: 0,
      total_comment: 0,
      ratings: "",
      next: 2,
      isComic: true,
      isComment: false,
      isRating: false,
      user_id: null,
      profile: null,
      id: null,
      tabCom: null,
      comments: [],
      images: "",
      KomentarPoinVisible: false,
      commentIsPosting: false,
      comment_message: null,
      dialog: false,
      buyVipDialogVisible: false,
      loginModalVisible: false,
      pleaseLoginDialogVisible: false,
      notVipDialogVisible: false,
      ratingModal: false,
      dataUrl:
        process.env.mobileUrl + "komik/" +
        this.$route.params.category +
        "/" +
        this.$route.params.detail,
      totalComment: 0,
      isMoreComment: true,
      nextComment: 2,
      moreLoadingComment: false,
      total_counter: 0
    };
  },
  // computed: {
  //   reverseComment: function(){
  //     var commentArr = this.comments
  //     var finalArr = commentArr.reverse()
  //     return finalArr
  //   }
  // },
  methods: {
    /* Get Data */
    rate(rating) {
      const hasil = rating / 20;
      return hasil;
    },
    async fetchImage() {
      try {
        const res = await ComicService.getImages(this.$route.params.detail);
        this.images = res.data.data;
        this.dataImage = this.images.image;
        // console.log(this.images);
      } catch (error) {
        console.log(error);
      }
    },
    fetchUserdata() {
      var res = []

      if (this.$auth.user) {
        // this.$auth.fetchUser()
        // res.data = this.$auth.user
        res.data = JSON.parse(localStorage.getItem('userdata'));
        
        this.user_id = res.data.data.id;
        this.profile = res.data.data;
        this.isVip = this.profile.vip;
        // console.log(JSON.parse(JSON.stringify(res.data.data)))
      }
    },
    async fetchContent() {
      try {
        let res = await ComicService.getDetail(this.$route.params.detail);
        // console.log(JSON.parse(JSON.stringify(res.data.data)))
        this.id = res.data.data.content.id;
        this.comic = res.data.data.content;
        this.title = res.data.data.content.title;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchRating() {
      try {
        let res = await ComicService.getRating(this.$route.params.detail);
        this.ratings = res.data.data.review;
        this.total_review = res.data.data.total_review;
        this.totalRating = res.data.data.rate / 20;
        // console.log(JSON.parse(JSON.stringify(res.data)))
        if (res.data.pagination.current_page == res.data.pagination.last_page) {
          this.isMore = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async loadMore(n) {
      try {
        const res = await ComicService.getRating(
          this.$route.params.detail + "?page=" + n
        );
        // console.log(JSON.parse(JSON.stringify(res.data)))
        var newData = res.data.data.review;
        newData.forEach(element => {
          this.ratings.push(element);
        });
        this.next += 1;
        if (res.data.pagination.current_page == res.data.pagination.last_page) {
          this.isMore = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchComment() {
      try {
        const res = await ArticleService.getComments('comic', this.$route.params.detail, 1)
        // console.log(res)
        this.comments = res.data.data.comments
        this.totalComment = res.data.pagination.total

        if (res.data.pagination.current_page == res.data.pagination.last_page) {
          this.isMoreComment = false;
        }
      } catch (error) {
          console.log(error)
      }
    },
    async loadMoreComment(n) {
      this.moreLoadingComment = true;
      try {
        const res = await ArticleService.getComments('comic', this.$route.params.detail, n)

        var dataComments = res.data.data.comments

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
    urlify(text) {
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      if (text) {
        var isUrl = text.replace(urlRegex)

        if (isUrl != text) {
          return true
        }

        return false
      }

      return false
    },

    /* Submit Comment */
    async postComment() {
      this.commentIsPosting = true;
      const params = {
        msg: this.comment_message,
        type: "comic"
      };

      if (this.total_counter < 20) {
        var isUrl = this.urlify(this.comment_message)

        this.commentIsPosting = false

        if (isUrl) {
          return alert('Comments tidak boleh mengandung tautan')
        }

        return alert('Comments harus mengandung minimal 20 kata')
      }

      try {
        const res = await UserService.postComment(this.$route.params.detail, params);
        // console.log(res.data)
        this.fetchComment();
        if (res.data.poin > 0) {
          this.KomentarPoinVisible = true;
        }
        this.commentIsPosting = false;
        this.comment_message = null;
        this.recaptchaToken = null;
      } catch (error) {
        // console.log(error.response.status)
        this.commentIsPosting = false;
        if (error.response.status == 422) {
          alert(error.response.data.message)
        } else if (error.response.status == 500) {
          alert("an error occured");
        } else if (error.response.status == 401) {
          //alert('Mohon Maaf :(, Anda harus login')
          this.openModalLogin();
        } else {
          alert("error! " + error.message);
        }
      }
    },

    /* Submit Rating */
    async submitRating() {
      // send the form
      let vm = this;
      const sendform = {
        comic_id: this.comic.id,
        rating: this.formdata.rating * 20
      };
      this.setloading();
      try {
        const res = await ComicService.makeRating(sendform);
        this.notloading();
        this.recaptchaToken = null;
        // console.log(res);
        vm.snackbar = true;
        vm.responsemessage = "Sukses memberikan rating";
        this.$nextTick(function() {
          setTimeout(() => {
            this.ratingModal = false;
          }, 3000);
        });
        this.fetchRating();
      } catch (err) {
        console.log(err);
        this.notloading();
        vm.snackbar = true;
        vm.responsemessage = "Maaf, Kamu hanya dapat memberi RATING satu kali.";
      }
    },

    /* Modal Dialog */
    openModalLogin() {
      this.loginModalVisible = true;
    },
    myDialogClose() {
      this.dialog = false;
      this.buyVipDialogVisible = false;
      this.loginModalVisible = false;
      this.pleaseLoginDialogVisible = false;
      this.notVipDialogVisible = false;
      this.KomentarPoinVisible = false;
      this.ratingModal = false;
      // other code
    },

    /* Check Vip */
    checkVip() {
      if (!this.$auth.user) {
        this.loginModalVisible = true;
        // console.log("not login");
      } else {
        this.buyVipDialogVisible = true;
        // console.log("not vip");
      }
    },

    /* Make Rating Button Trigger */
    makeRating() {
      if (!this.$auth.user) {
        this.loginModalVisible = true;
        // console.log("not login");
      } else {
        if (this.isVip) {
          this.ratingModal = true;
        } else {
          this.buyVipDialogVisible = true;
        }
        // console.log("not vip");
      }
    },

    /* Loader */
    setloading() {
      this.overlay = true;
    },
    notloading() {
      this.overlay = false;
    },

    /* Recaptcha */
    onError(error) {
      // console.log("Error happened:", error);
      this.recaptchaToken = null;
    },
    onSuccess(token) {
      this.recaptchaToken = "success";
    },
    onExpired() {
      // console.log("Expired");
      this.recaptchaToken = null;
    },

    /* Validasi Form Rating */
    validate() {
      if (this.$refs.form.validate()) {
        if (this.recaptchaToken != null) {
          this.submitRating();
        } else {
          this.snackbar = true;
          this.responsemessage = "Mohon Centang Recaptha";
        }
      }
    }
  },
  watch: {
    comment_message: function (value) {

      if (value) {
        if (value.length == 0) {
          return this.total_counter = 0
        }

        var regex = /\s+/gi;
        var wordCount = value.trim().replace(regex, ' ').split(' ').length;

        return this.total_counter = wordCount
      } else {
        return (this.total_counter = 0)
      }
    }
  },
  mounted() {
    this.fetchImage();
    this.fetchContent();
    this.fetchUserdata();
    this.fetchRating();
    this.fetchComment();
    //this.fetchLatest()
  }
};
</script>
<style lang="scss">
	.article-thumb {
		margin-left: -15px;
		margin-right: -15px;
	}
</style>
<style lang="sass">
    .news-related
        ul
            margin: 0!important
            list-style: none
            padding: 0
            li
                margin: 0
                display: block
                overflow: hidden
                background: #f9f9f9
                padding: 10px
                font-size: 14px
                border-bottom: 1px solid #e5e5e5
                &
                    border: 0
                a
                    display: block
                    text-decoration: none
                    color: #000
                .thumbnail
                    width: 60px
                    height: 60px
                    float: left
                    margin-right: 10px
                    background-size: cover
    .v-breadcrumbs__item:not(.v-breadcrumbs__item--disabled)
        color: #ff9800!important
    .article-thumb
        margin: 0 -20px
    .v-content__wrap
        max-width: 100%
        overflow-x: hidden
    .container
      padding: 12px 20px
    p
      small
        line-height:0
        opacity:.5
    iframe
      width: calc(100% + 40px)
      margin-left: -20px
      margin-right: -20px

    .btn-vip
      position: absolute
      left: 50%
      top: 50%
      transform: translateX(-50%) translateY(-50%)
      background: rgba(0,0,0,.5)

    .blur .v-image__image--cover
        filter: blur(20px)
</style>

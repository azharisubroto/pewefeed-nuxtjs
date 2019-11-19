<template>
  <section>
    <v-container v-if="article" class="mb-5 pb-5">
      <v-row>
        <v-col>
          <!-- META 1 -->
          <div class="mb-1">
              <div class="d-inline-block mr-2" style="line-height:1;font-size:12px">
                  FAKTA / {{article.category}}
              </div>
              <div class="d-inline-block" style="font-size:12px">
                <div class="d-inline-block mr-3 grey--text text--small">
                    <v-icon small size="12">
                        mdi-clock-outline
                    </v-icon>
                    {{article.created_at}}
                </div>
                <div class="d-inline-block mr-3 grey--text text--small">
                    <v-icon small size="12">
                        mdi-eye-outline
                    </v-icon>
                    {{article.total_views}}
                </div>
                <div class="d-inline-block mr-3 grey--text text--small">
                    <v-icon small size="12">
                        mdi-message-reply
                    </v-icon>
                    {{comments.length}}
                </div>
              </div>
          </div>

          <!-- TITLE -->
          <h2 class="mb-0">{{article.title}}</h2>
          <v-rating
          v-if="article.rate >= 0"
          background-color="orange"
          color="orange lighten-2"
          readonly
          size="20"
          class="mb-3"
          dense
          :value="getrating(article.rate)"></v-rating>
          <div>
            <ShareButton
              style="text-align: left !important"
              :dataUrl="shareUrl"
            />
          </div>
        </v-col>
      </v-row>
      <!-- ARTICLE -->
      <template v-if="isArticle">
        <v-row class="pb-5">
            <v-col cols="12">
                <div class="cover" v-if="!isVip">
                      <v-img
                          width="100%"
                          :src="article.thumbnail"
                          class="blur"
                      >
                          <v-btn depressed @click="checkVip()" dark class="btn-vip" color="orange accent-4">DAPATKAN HAK AKSES VIP</v-btn>
                      </v-img>
                </div>
                <div v-else>
                  <div v-html="article.embed"></div>
                  <div class="my-4"></div>
                  <v-btn
                  dark
                  depressed
                  block
                  :href="article.video"
                  download
                  large
                  class="mb-4"
                  color="deep-orange">
                    <v-icon left dark>mdi-download</v-icon>
                    Download video {{article.size}}
                  </v-btn>
                </div>

                <!-- CONTENT -->
                <div v-html="article.description"></div>
            </v-col>
        </v-row>
      </template>

      <!-- RATING -->
      <template v-if="isReview">
          <v-btn @click="makeRating()" depressed dark color="orange ancent-4" class="my-2">BERI RATING</v-btn>
          <v-list three-line>
            <template v-for="(rating, index) in reviews">
                <v-list-item
                    :key="rating.customer.name+'-'+index"
                >
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
                        <v-list-item-subtitle class="mt-1" v-html="rating.message"></v-list-item-subtitle>
                        <v-list-item-subtitle class="mt-1">
                          <div class="d-inline-block mr-3 grey--text text--small">
                              <v-icon small size="12">
                                  mdi-clock-outline
                              </v-icon>
                              {{rating.commented_at}}
                          </div>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
          </v-list>
          <v-btn v-if="isMore" color="deep-orange" dark depressed block @click="loadMore(next)">
            Load More
          </v-btn>
      </template>

      <!-- COMMENT -->
      <template v-if="isComment">
        <v-tabs color="deep-orange" v-model="tabCom">
          <v-tab href="#kasihkomen">Berikan Komentar</v-tab>
          <v-tab href="#ketentuankom">Ketentuan</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabCom">
            <v-tab-item
              value="kasihkomen"
            >
              <h4 class="mb-4 mt-5">{{comments.length}} Comments</h4>

              <!-- TEXT AREA -->
              <v-textarea
                outlined
                color="deep-orange"
                label="Komentar"
                value=""
                counter
                rows="3"
                auto-grow
                v-model="comment_message"
              ></v-textarea>

              <v-btn block dark depressed color="deep-orange" @click="postComment()">
                <template v-if="!commentIsPosting">Kirim Komentar</template>
                <template v-else>Mengirim Komentar...</template>
              </v-btn>

              <!-- KOMEN LIST -->
              <CommentList :items="reverseComment"/>
              <div class="mb-5"></div>
            </v-tab-item>

            <v-tab-item
              value="ketentuankom"
            >
              <h4 class="mt-5 mb-3">KETENTUAN KOMENTAR </h4>
              <ol class="mb-5 pb-5">
                <li>Pastikan sudah login</li>
                <li>Tulis komentar dengan minimal terdiri dari 50 kata</li>
                <li>Poin hanya diberikan 1 kali untuk 1 User per 1 Artikel</li>
                <li>Seluruh komentar dimoderasi oleh tim Playworld ID dan bisa dihapus dan akan mengurangi total POIN jika komentar mengandung konten SARA, atau tidak sesuai dengan artikel yang dibaca</li>
                <li>Hanya user dengan keanggotaan VIP yang bisa memberikan komentar.</li>
              </ol>
            </v-tab-item>
          </v-tabs-items>

        <KomentarPoin :dialogVisible="KomentarPoinVisible" @close="myDialogClose"/>
      </template>


    </v-container>
    <v-container v-if="isComment" class="mb-5 pb-5"></v-container>
    <br><br><br>

    <LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose"/>
    <BuyVip :dialogVisible="buyVipDialogVisible" @close="myDialogClose"/>

    <!-- Rating Modal -->
    <v-row justify="center">
      <v-dialog
        v-model="ratingModal"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-overlay :value="overlay">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-card class="grey lighten-3" @makeloading="setloading" @notloading="notloading">
          <!-- Header -->
          <v-toolbar light color="white">
            <!-- Arrow -->
            <v-btn icon tile style="border-right: 1px solid #717171" light @click="ratingModal = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>

            <!-- Logo -->
            <v-toolbar-title>
              <v-img
                :src="logo"
                :lazy-src="lazy"
                max-width="40"
                max-height="40"
              >  
              </v-img>
            </v-toolbar-title>

            <!-- Title -->
            <div class="flex-grow-1"></div>
            <v-toolbar-items>
              <v-btn light text>Rating Submission</v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <!-- FORM -->
          <v-container>
              <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
              >
                  <v-row no-gutters class="mt-5">
                      <v-col cols="12">
                          <strong class="subtitle-2">Berikan rating untuk komik ini</strong>
                      </v-col>
                      <v-col cols="12">
                          <v-textarea
                              outlined
                              color="deep-orange"
                              value=""
                              counter
                              rows="3"
                              auto-grow
                              v-model="formdata.review"
                              :rules="reviewRules"
                          ></v-textarea>
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
                              size="23"
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

              <v-snackbar
                  v-model="snackbar"
                  :timeout="timeout"
                  top
              >
                  {{ responsemessage }}
                  <v-btn
                      color="primary"
                      text
                      icon
                      @click="snackbar = false"
                  >
                  <v-icon color="white">mdi-close-circle-outline</v-icon>
                  </v-btn>
              </v-snackbar>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- End Of Rating Modal -->

    <v-bottom-navigation
      fixed
      dark
      grow
      color="white"
      background-color="black"
    >
      <v-btn @click="isArticle=true;isComment=false;isReview=false">
        <span>Artikel</span>
      </v-btn>

      <v-btn @click="isArticle=false;isComment=false;isReview=true">
        <span>Rating</span>
      </v-btn>

      <v-btn @click="isArticle=false;isComment=true;isReview=false">
        <span>Komentar<br>(+2 Poin)</span>
      </v-btn>
    </v-bottom-navigation>

    <NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose"/>
  </section>
</template>

<script>
import LoginModal from '@/components/modal/LoginModal'
import ReviewModal from './ReviewModal'
import CommentList from '@/components/common/CommentList'
import NotVip from '@/components/modal/NotVip'
import BuyVip from '@/components/modal/BuyVip'
import ShareButton from '@/components/common/ShareButton'
import KomentarPoin from '@/components/modal/KomentarPoin'
import FaktaService from '@/services/FaktaService'
import UserService from '@/services/UserService'

export default {
  name:"FaktaDetail",
  props: ['article'],
  components: {
    LoginModal,
    ReviewModal,
    CommentList,
    NotVip,
    BuyVip,
    ShareButton,
    KomentarPoin
  },
  data() {
    return {
      lazy: 'https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png',
      logo: 'https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png',
      formdata : {
          review : '',
          rating : 5,
      },
      recaptchaToken: null,
      reviewRules: [
          v => !!v || 'Mohon isi kolom pesan'
      ],
      ratingRules: [
          v => !!v || 'Mohon input rating'
      ],
      overlay: false,
      snackbar: false,
      timeout: 3000,
      responsemessage: '',
      valid: false,
      isArticle: true,
      isComment: false,
      isReview: false,
      tabCom: null,
      isMore: true,
      comments: [],
      reviews: [],
      reviewPaging: 2,
      dialog: false,
      isVip: false,
      loginModalVisible: false,
      ratingModal: false,
      buyVipDialogVisible: false,
      pleaseLoginDialogVisible: false,
      notVipDialogVisible: false,
      KomentarPoinVisible: false,
      commentIsPosting: false,
      comment_message: '',
      slug: this.$route.params.slug,
      shareUrl: "https://m.playworld.id/fakta/detail/" + this.$route.params.slug,
    }
  },
  computed: {
    reverseComment: function(){
      var commentArr = this.comments
      var finalArr = commentArr.reverse()
      return finalArr
    }
  },
  methods: {
    rate(rating) {
        const hasil = rating / 20
        return hasil
    },
    myDialogClose () {
        this.dialog = false
        this.loginModalVisible = false
        this.buyVipDialogVisible = false
        this.pleaseLoginDialogVisible = false
        this.notVipDialogVisible = false
        this.KomentarPoinVisible = false
        this.ratingModal = false
        // other code
    },
    checkVip() {
        if (!localStorage.getItem('loggedin')) {
            this.loginModalVisible = true
            console.log('not login')
        } else {
            this.buyVipDialogVisible = true
            console.log('not vip');
        }
    },
    getrating(num) {
        var rating = num / 20;
            rating = rating.toFixed(0);
        return parseInt(rating)
    },
    async getReviews(page) {
      var page = page ? page : 1
      try {
        const res = await FaktaService.getReview(this.$route.params.slug, page)
        const items = res.data.data.review
        //console.log(res)
        const reviewitems = []
        items.forEach(el => {
          var obj = {
            id: el.id,
            customer: el.customer,
            message: el.comment,
            commented_at: el.created_at,
            rate: el.rate
          }
          reviewitems.push(obj)
        });
        if (res.data.pagination.current_page == res.data.pagination.last_page) {
          this.isMore = false;
        }
        this.reviews = reviewitems
        console.log(JSON.parse(JSON.stringify(this.reviews)))
      } catch (error) {
        console.log(error)
      }
    },
    async moreReview() {
      console.log(this.reviewPaging)
      try {
        const res = await FaktaService.getReview(this.$route.params.slug, this.reviewPaging)
        const items = res.data.data.review
        //console.log(items);
        //console.log(res)
        const reviewitems = []
        if( items.length > 0 ) {
          this.reviewPaging++
          items.forEach(el => {
            var obj = {
              id: el.id,
              customer: el.customer,
              message: el.comment,
              commented_at: el.created_at,
              rate: el.rate
            }
            this.reviews.push(obj)
          });
        } else {
          alert('No more review items')
        }
        if (res.data.pagination.current_page == res.data.pagination.last_page) {
          this.isMore = false;
        }
      } catch (error) {
        console.log(error)
      }
    },
    async fetchComment() {
      try {
        const res = await FaktaService.getComment(this.$route.params.slug, 1)
        const items = res.data.data
        //console.log(items);
        console.log(res)
        const commentItems = []
        if( items.length > 0 ) {
          this.reviewPaging++
          items.forEach(el => {
            var obj = {
              id: el.id,
              customer: el.customer,
              message: el.message,
              commented_at: el.commented_at,
              rate: el.rate
            }
            commentItems.push(obj)
          });
          this.comments = commentItems
        }
      } catch (error) {
        console.log(error)
      }
    },
    async postComment() {
      this.commentIsPosting = true;
      const params = {
        id: this.article.id,
        msg: this.comment_message,
        type: 'fakta'
      }

      try {
        const res = await FaktaService.postComment(params)
        console.log(res.data.poin)
        this.fetchComment()
        this.commentIsPosting = false;
        this.comment_message = null;
        if( res.data.poin > 0 ) {
          this.KomentarPoinVisible = true
        }
      } catch (error) {
        //console.log(error.response.status)
        this.commentIsPosting = false;
        if( error.response && error.response.status == 422 ) {
          alert('Mohon tulis komentar minimal 50 karakter')
        } else if( error.response && error.response.status == 500 ) {
          alert('an error occured')
        } else if( error.response && error.response.status == 401 ) {
          //alert('Mohon Maaf :(, Anda harus login')
          this.openModalLogin();
        } else {
          alert('error! ' + error.message)
        }
      }
    },
    openModalLogin() {
      this.loginModalVisible = true
    },
    openReviewModal() {
      this.ratingModal = true
    },
    eventListener() {
      let vm = this
      this.$bus.$on('reFetchReviews', () => {
        vm.getReviews();
      })
    },
    makeRating() {
      if (!localStorage.getItem('loggedin')) {
        this.loginModalVisible = true
        console.log('not login')
      } else {
        if (this.isVip) {
          this.openReviewModal()
        } else {
          this.buyVipDialogVisible = true
        }
      }
    },
    async fetchUserdata() {
      try {
        const res = await UserService.getSingleUser()
        // console.log('GET USER DATA')
        // console.log(JSON.parse(JSON.stringify(res.data.data)))
        this.user_id = res.data.data.id
        this.profile = res.data.data
        this.isVip = res.data.data.vip
      } catch (error) {
        console.log(error)
      }
    },

    /* Recaptcha */
    onError (error) {
        console.log('Error happened:', error)
        this.recaptchaToken = null
    },
    onSuccess (token) {
        this.recaptchaToken = 'success'
    },
    onExpired () {
        console.log('Expired')
        this.recaptchaToken = null
    },

    /* Validasi Review */
    validate () {
        if (this.$refs.form.validate()) {
            if (this.recaptchaToken != null) {
                this.submitReview();
            } else {
                this.snackbar = true;
                this.responsemessage = 'Mohon Centang Recaptha';
            }
        }
    },

    /* Submit Review */
    async submitReview() {
        // send the form
        let vm = this;
        const sendform = {
            content_id: this.article.id,
            review: this.formdata.review,
            rating: this.formdata.rating * 20
        };
        this.setloading();
        try {
            const res = await FaktaService.addReview(sendform)
            this.notloading();
            this.recaptchaToken = null;
            console.log(res)
            vm.snackbar = true
            vm.responsemessage = 'Sukses memberikan rating'
            this.$nextTick(function() {
                setTimeout(() => {
                    this.ratingModal = false
                }, 3000);
            });
            this.getReviews()
        } catch (err) {
            console.log(err)
            this.notloading();
            vm.snackbar = true;
            vm.responsemessage = 'Maaf terjadi kesalahan, silahkan mencoba lagi nanti :('
        }
    },

    /* Loader */
    setloading () {
        this.overlay = true
    },
    notloading() {
        this.overlay = false
    },
  },

  mounted() {
    this.fetchUserdata()
    this.getReviews()
    this.fetchComment()
    this.eventListener()
    // console.log(JSON.parse(JSON.stringify(this.article)))
  }
}
</script>

<style lang="sass">
  .blur .v-image__image--cover
    filter: blur(20px)
  .btn-vip
    position: absolute
    left: 50%
    top: 50%
    transform: translateX(-50%) translateY(-50%)
    background: rgba(0,0,0,.5)
</style>

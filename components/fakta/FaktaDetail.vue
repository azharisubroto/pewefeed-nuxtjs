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
                    {{article.total_review}}
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
                <div class="article-thumb">
                    <v-img :src="article.thumbnail" :aspect-ratio="4/3" class="thumbnailmain mb-4"></v-img>
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
import ShareButton from '@/components/common/ShareButton'
import KomentarPoin from '@/components/modal/KomentarPoin'
import FaktaService from '@/services/FaktaService'

export default {
  name:"FaktaDetail",
  props: ['article'],
  components: {
    LoginModal,
    ReviewModal,
    CommentList,
    NotVip,
    ShareButton,
    KomentarPoin
  },
  data() {
    return {
      isArticle: true,
      isComment: false,
      isReview: false,
      tabCom: null,
      isMore: true,
      comments: [],
      reviews: [],
      reviewPaging: 2,
      dialog: false,
      loginModalVisible: false,
      reviewModalVisible: false,
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
        this.reviewModalVisible = false
        // other code
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
      this.reviewModalVisible = true
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
        this.reviewModalVisible = true
        console.log('not vip');
      }
    },
  },
  mounted() {
    this.getReviews()
    this.fetchComment()
    this.eventListener()
    console.log(JSON.parse(JSON.stringify(this.article)))
  }
}
</script>

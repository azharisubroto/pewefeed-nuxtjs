<template>
  <section>
    <v-skeleton-loader v-if="!article || article==''"
      class="mx-auto mt-5"
      type="list-item-avatar-three-line, image, article"
    ></v-skeleton-loader>
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

      <template v-if="isReview">
        <v-btn
          color="deep-orange"
          dark
          depressed
        >
          BERI RATING
        </v-btn>
        <div class="my-4"></div>
        <CommentList :items="reviews"/>

      </template>

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
              Komentar
              <!-- <CommentList :items="reverseComment"/> -->
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
import CommentList from '@/components/common/CommentList'
import NotVip from '@/components/modal/NotVip'
import ShareButton from '@/components/common/ShareButton'

export default {
  name:"FaktaDetail",
  props: ['article'],
  components: {
    LoginModal,
    CommentList,
    NotVip,
    ShareButton
  },
  data() {
    return {
      isArticle: true,
      isComment: false,
      isReview: false,
      tabCom: null,
      comments: this.article.comments,
      reviews: [],
      dialog: false,
      loginModalVisible: false,
      buyVipDialogVisible: false,
      pleaseLoginDialogVisible: false,
      notVipDialogVisible: false,
      KomentarPoinVisible: false,
      commentIsPosting: false,
      comment_message: '',
      shareUrl: "https://m.playworld.id/fakta/detail/" + this.$route.params.slug,
    }
  },
  methods: {
    myDialogClose () {
        this.dialog = false
        this.loginModalVisible = false
        this.buyVipDialogVisible = false
        this.pleaseLoginDialogVisible = false
        this.notVipDialogVisible = false
        this.KomentarPoinVisible = false
        // other code
    },
    getrating(num) {
        var rating = num / 20;
            rating = rating.toFixed(0);
        return parseInt(rating)
    },
    setReviews() {
      const items = this.article.reviewed.data
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
      this.reviews = reviewitems
    }
  },
  mounted() {
    this.setReviews()
    console.log(JSON.parse(JSON.stringify(this.article)))
  }
}
</script>

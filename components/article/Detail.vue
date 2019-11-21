<template>
    <section>
        <v-skeleton-loader v-if="article==''"
          class="mx-auto mt-5"
          type="list-item-avatar-three-line, image, article"
        ></v-skeleton-loader>

        <v-container v-if="article" class="mb-5 pb-5">
            <v-row>
              <v-col>
                <!-- META 1 -->
                <div class="mb-1">
                    <div class="d-inline-block mr-2" style="line-height:1;font-size:12px">
                        {{article.type}}
                    </div>
                    <div class="d-inline-block" style="font-size:12px">
                      <div class="d-inline-block mr-3 grey--text text--small">
                          <v-icon small size="12">
                              mdi-clock-outline
                          </v-icon>
                          {{article.published_at}}
                      </div>
                      <div class="d-inline-block mr-3 grey--text text--small">
                          <v-icon small size="12">
                              mdi-eye-outline
                          </v-icon>
                          {{article.total_view}}
                      </div>
                      <div class="d-inline-block mr-3 grey--text text--small">
                          <v-icon small size="12">
                              mdi-message-reply
                          </v-icon>
                          {{article.total_comment}}
                      </div>
                    </div>
                </div>

                <!-- TITLE -->
                <h2 class="mb-0">{{article.title}}</h2>
                <div>
                  <ShareButton
                    style="text-align: left !important"
                    :sharingUrl="dataUrl"
                    :sharingTitle="article.title"
                    :sharingDescription="article.short_content"
                    :sharingImage="article.image.small"
                    :sharingTime="article.published_at"
                  />
                </div>
              </v-col>
            </v-row>
            <!-- ARTICLE -->
            <template v-if="isArticle">
              <v-row class="pb-5">
                  <v-col cols="12">
                      <div class="article-thumb">
                          <v-img :src="article.image.small" :aspect-ratio="4/3" class="thumbnailmain mb-4"></v-img>
                      </div>

                      <!-- CONTENT -->
                      <div v-html="article.content"></div>

                      <hr>

                      <!-- WRITER -->
                      <div class="mt-4">
                          <span class="grey--text caption">Tulisan ini dibuat oleh tim PLAYWORLD.ID dari berbagai sumber</span><br>
                          <v-row>
                              <v-col cols="2">
                                  <v-avatar>
                                      <v-img :src="writer.avatar"></v-img>
                                  </v-avatar>
                              </v-col>
                              <v-col cols="10">
                                  <strong>{{writer.name}}</strong><br>
                                  Writer
                              </v-col>
                          </v-row>
                      </div>
                  </v-col>
              </v-row>
              <div class="devider-big mb-5" style="margin-left: -20px;margin-right:-20px"></div>
              <!-- TERBARU -->
              <section class="py-4 mb-5 pb-5">
                <!-- TERBARU -->
                <div class="text-center mb-3">
                  ARTIKEL TERBARU LAINNYA
                </div>
                <NewsLoop :items="latests"/>
                <v-btn
                tile
                v-if="isMore"
                block
                depressed
                dark
                color="deep-orange"
                @click="loadMore(next)">
                  Load More
                </v-btn>
              </section>
              <!-- <v-row class="mb-5">
                <v-col cols="12">
                  <v-btn
                  tile
                  block
                  depressed
                  dark
                  color="deep-orange"
                  @click="loadMore(next)">
                    Load More
                  </v-btn>
                </v-col>
              </v-row> -->

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

            <!-- QUIZ -->
            <template v-if="isQuiz">
              <div v-if="quiz">

                <v-tabs color="deep-orange" v-model="tab">
                  <v-tab href="#jawab">Jawab Quiz</v-tab>
                  <v-tab href="#ketentuan">Ketentuan</v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <v-tab-item
                    value="jawab"
                  >
                    <h4 class="mt-5">{{ quiz.question }}</h4>
                    <v-radio-group v-model="jawabanQuiz">
                      <v-row>
                        <v-col cols="6">
                          <v-radio
                          :label="`${quiz.option_a}`"
                          value="A"
                        ></v-radio>
                        </v-col>
                        <v-col cols="6">
                          <v-radio
                          :label="`${quiz.option_b}`"
                          value="B"
                        ></v-radio>
                        </v-col>
                        <v-col cols="6">
                          <v-radio
                          :label="`${quiz.option_c}`"
                          value="C"
                        ></v-radio>
                        </v-col>
                        <v-col cols="6">
                          <v-radio
                          :label="`${quiz.option_d}`"
                          value="D"
                        ></v-radio>
                        </v-col>
                      </v-row>
                    </v-radio-group>

                    <v-btn
                      block
                      large
                      dark
                      depressed
                      color="deep-orange"
                      @click="submitAnswer()"
                    >KIRIM JAWABAN</v-btn>
                  </v-tab-item>
                  <v-tab-item
                    value="ketentuan"
                  >
                    <h4 class="mt-5 mb-4">KETENTUAN QUIZ </h4>
                    <ol class="pb-5 mb-5">
                      <li>Pastikan sudah login</li>
                      <li>Tulis hanya bisa di jawab 1 kali per 1 user</li>
                      <li>Hanya user dengan keanggotaan VIP yang bisa memberikan komentar.</li>
                    </ol>
                  </v-tab-item>
                </v-tabs-items>

              </div>

              <div v-else class="mt-5">
                <div class="text-center">
                  Quiz Tidak Tersedia
                </div>
              </div>

              <QuizModal :dialogVisible="dialog" :jawaban="answerResult" :already="already" @close="myDialogClose"/>

            </template>
        </v-container>
        <br><br><br>

        <LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose"/>

        <v-bottom-navigation
          fixed
          dark
          grow
          color="white"
          background-color="black"
        >
          <v-btn @click="isArticle=true;isComment=false;isQuiz=false">
            <span>Artikel</span>
          </v-btn>

          <v-btn @click="isArticle=false;isComment=true;isQuiz=false">
            <span>Komentar<br>(+2 Poin)</span>
          </v-btn>

          <v-btn @click="isArticle=false;isComment=false;isQuiz=true">
            <span>Quiz<br>(+20 Poin)</span>
          </v-btn>
        </v-bottom-navigation>

        <NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose"/>
    </section>
</template>

<script>
import ArticleService from '@/services/ArticleService'
import UserService from '@/services/UserService'
import NewsLoop from '@/components/common/NewsLoop'
import LoginModal from '@/components/modal/LoginModal'
import QuizModal from '@/components/common/QuizModal'
import KomentarPoin from '@/components/modal/KomentarPoin'
import CommentList from '@/components/common/CommentList'
import ShareButton from '@/components/common/ShareButton'
import NotVip from '@/components/modal/NotVip'

export default {
    components: {
      NewsLoop,
      QuizModal,
      CommentList,
      NotVip,
      KomentarPoin,
      ShareButton,
      LoginModal
    },
    props: ['respon'],
    data() {
        return {
            tab: null,
            tabCom: null,
            profile:null,
            id: '',
            title: '',
            article: '',
            writer: '',
            next: 2,
            isMore: true,
            isArticle: true,
            isComment: false,
            isQuiz: false,
            latests: [],
            commentIsPosting: false,
            comments: [],
            comment_message: null,
            quiz: null,
            answered: false,
            quiz_id: null,
            jawabanQuiz: null,
            dialog: false,
            answerResult: null,
            already: false,
            user_id:null,
            pleaseLoginDialogVisible: false,
            loginModalVisible: false,
            notVipDialogVisible: false,
            KomentarPoinVisible: false,
            items: [
                {
                    text: this.$route.params.cat,
                    disabled: false,
                    href: this.$route.params.cat
                },
                {
                    text: this.$route.params.subcat,
                    disabled: false,
                    href: this.$route.params.subcat
                },
                {
                    text: this.$route.params.articleslug,
                    disabled: true,
                    href: this.$route.params.subcat
                }
            ],
            dataUrl: "https://m.playworld.id/" + this.$route.params.cat + "/" + this.$route.params.subcat + "/" + this.$route.params.articleslug,
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
        async fetchContent() {
            //console.log(this.$route.params.articleslug)
            this.id = this.respon.article.id
            this.article = this.respon.article
            this.title = this.respon.article.title
            this.writer = this.respon.article.writer
            this.items[2].href = this.respon.article.title
            this.comments = this.respon.article.comments
            if( this.respon.quiz && this.respon.quiz.id ) {
              this.quiz = this.respon.quiz
              this.quiz_id = this.respon.quiz.id
              this.answered = this.respon.quiz.answered
            }
            this.fetchLatest(this.respon.article.slug)
        },
        async fetchLatest(slug) {
            try {
                const res = await ArticleService.getRelated(slug)
                //console.log(JSON.parse(JSON.stringify(res.data.data)))
                var articles = res.data.data.article
                articles.forEach(element => {
                  var link = element.link
                      link = link.replace('https://playworld.id/', '')
                  var obj = {
                    image: {
                      small: element.image.small
                    },
                    link: '/'+link,
                    title: element.title,
                    type: element.reaction,
                    published_at: element.publish_at
                  }
                  if( element.id != this.id ) {
                    this.latests.push(obj)
                  }
                });
            } catch (error) {
                console.log(error)
            }
        },
        async loadMore(n) {
          try {
                const res = await ArticleService.getRelatedMore(this.$route.params.articleslug, n)
                //console.log(JSON.parse(JSON.stringify(res.data.data)))
                var articles = res.data.data.article
                articles.forEach(element => {
                  var link = element.link
                      link = link.replace('https://playworld.id/', '')
                  var obj = {
                    image: {
                      small: element.image.small
                    },
                    link: '/'+link,
                    title: element.title,
                    type: element.reaction,
                    published_at: element.publish_at
                  }
                  if( element.id != this.id ) {
                    this.latests.push(obj)
                  }
                });
                this.next += 1
                if (res.data.pagination.current_page == res.data.pagination.last_page) {
                  this.isMore = false;
                }
            } catch (error) {
                console.log(error)
            }
        },
        async fetchUserdata() {
          try {
            const res = await UserService.getSingleUser()
            this.user_id = res.data.data.id
            this.profile = res.data.data
            console.log(JSON.parse(JSON.stringify(res.data.data)))
          } catch (error) {
            console.log(error)
          }
        },
        async fetchComment() {
          try {
            let res = await ArticleService.getDetail(this.$route.params.articleslug)
            this.comments = res.data.data.article.comments
          } catch (error) {
              console.log(error)
          }
        },
        async postComment() {
          this.commentIsPosting = true;
          const params = {
            id: this.id,
            msg: this.comment_message,
            type: 'news'
          }

          try {
            const res = await UserService.postComment(params)
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
        async submitAnswer() {
          if (!localStorage.getItem('loggedin')) {
            this.openModalLogin()
          } else {
            if( this.profile.vip != false ) {
              const params = {
                jawaban: this.jawabanQuiz,
                quiz_id: this.quiz_id
              }
              try {
                const res = await UserService.answerQuiz(params)
                console.log(res)
                this.dialog = true
                if( res.status == 200 ) {
                  //alert(res.data.data.message)
                  if( res.data.data.status == 'benar' ) {
                    this.answerResult = true
                  } else if( res.data.data.status == 'salah' ) {
                    this.answerResult = false
                  } else {
                    this.already = true
                  }
                  //this.answered = true
                }
              } catch (error) {
                console.log(error)
              }
            } else {
              this.notVipDialogVisible = true
            }
          }
        },
        openModalLogin() {
          this.loginModalVisible = true
        },
        myDialogClose () {
            this.dialog = false
            this.loginModalVisible = false
            this.buyVipDialogVisible = false
            this.pleaseLoginDialogVisible = false
            this.notVipDialogVisible = false
            this.KomentarPoinVisible = false
            // other code
        },
    },
    mounted() {
        this.fetchContent()
        this.fetchUserdata()
        //this.fetchLatest()
    },
}
</script>

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
                &:last-of-type
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

    .comment-item
      padding: 10px 0
      border-bottom: 1px solid #e5e5e5
</style>

<template>
    <section>
        <v-skeleton-loader v-if="article==''"
          class="mx-auto mt-5"
          type="list-item-avatar-three-line, image, article"
        ></v-skeleton-loader>

        <v-container v-if="article" class="mb-5 pb-5">
            <!-- META 1 -->
            <div class="mb-1 caption">
                <div class="d-inline-block mr-2 mb-3">
                    HOME / VIDEO / {{ article.article.type }}
                </div>
                <div class="d-inline-block">
                  <div class="d-inline-block mr-3 text--small">
                      <v-icon small>
                        mdi-clock-outline
                      </v-icon>
                      {{article.detail.publish_at}}
                  </div>
                  <div class="d-inline-block mr-3 text--small">
                    <v-icon small size="12">
                      mdi-calendar-blank
                    </v-icon>
                    {{article.detail.date}}
                  </div>
                  <div class="d-inline-block mr-3 text--small">
                      <v-icon small size="12">
                          mdi-eye-outline
                      </v-icon>
                      {{article.detail.total_views}}
                  </div>
                  <div class="d-inline-block mr-3 text--small">
                    <v-icon small size="12">
                      mdi-message-text-outline
                    </v-icon>
                    {{article.detail.total_comment ? article.detail.total_comment : 0}}
                  </div>
                </div>
            </div>

            <!-- TITLE -->
            <h2 class="mb-3">{{article.detail.title}}</h2>

            <!-- ARTICLE -->
            <template v-if="isArticle">
              <v-row class="pb-5">
                  <v-col cols="12">
                      <div v-html="article.detail.embed"></div>

                      <!-- CONTENT -->
                      <div class="iframe" v-html="article.article.content"></div>

                      <h4>Lihat Selengkapnya</h4>
                      <v-row
                      class="topview-item"
                      @click="$router.push('/'+selengkapnya.link.replace(process.env.baseUrl, ''))">
                        <v-col cols="4">
                          <v-img
                          :src="selengkapnya.image"
                          ></v-img>
                        </v-col>
                        <v-col cols="8" class="d-flex align-content-space-between flex-wrap">
                          <h2>{{article.detail.title}}</h2>
                          <div class="meta text--gray" style="font-size:12px;">
                            <span :class="article.detail.type">{{article.detail.type}}</span> - {{article.detail.published_at ? article.detail.published_at : article.detail.publish_at}}
                          </div>
                        </v-col>
                      </v-row>
                      <!-- WRITER -->
                      <!-- <div class="mt-4">
                          <span class="grey--text caption">Tulisan ini dibuat oleh tim {{ domainTitle }} dari berbagai sumber</span><br>
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
                      </div> -->
                  </v-col>
              </v-row>

              <div class="devider-big mb-5"></div>

              <!-- TERBARU -->
              <div class="text-center mb-3">
                VIDEO TERBARU LAINNYA
              </div>
              <NewsLoop :items="latests" class="pb-5"/>
              <v-row class="mb-5" v-if="isMore">
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
              </v-row>

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

                    <!-- TEXT AREA -->
                    <v-textarea
                      class="mt-4"
                      outlined
                      color="deep-orange"
                      label="Komentar"
                      value=""
                      rows="3"
                      auto-grow
                      v-model="comment_message"
                    ></v-textarea>
                    <div class="counter mb-3" align="end" style="margin-top: -30px !important;">{{ total_counter }}</div>

                    <v-btn block dark depressed color="deep-orange" @click="postComment()">
                      <template v-if="!commentIsPosting">Kirim Komentar</template>
                      <template v-else>Mengirim Komentar...</template>
                    </v-btn>

                    <h4 class="mb-4 mt-5">{{ totalComment }} Comments</h4>

                    <!-- KOMEN LIST -->
                    <CommentList :items="comments"/>
                    <v-btn
                      v-if="isMoreComment && comments.length > 0"
                      :loading="moreLoadingComment"
                      class="mt-5"
                      block
                      depressed
                      small
                      dark
                      color="deep-orange"
                      @click="loadMoreComment(nextComment)"
                    >Load More</v-btn>
                    <div class="mb-5"></div>
                  </v-tab-item>

                  <v-tab-item
                    value="ketentuankom"
                  >
                    <h4 class="mt-5 mb-3">KETENTUAN KOMENTAR </h4>
                    <ol class="mb-5 pb-5">
                      <li>Pastikan sudah login</li>
                      <li>Tulis komentar dengan minimal terdiri dari 20 kata</li>
                      <li>Poin hanya diberikan 1 kali untuk 1 User per 1 Artikel</li>
                      <li>Seluruh komentar dimoderasi oleh tim Playworld ID dan bisa dihapus dan akan mengurangi total POIN jika komentar mengandung konten SARA, atau tidak sesuai dengan artikel yang dibaca</li>
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
                      <li>Quiz hanya dapat di jawab 1 kali per 1 user</li>
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
		  v-model="active_tab"
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
import CommentList from '@/components/common/CommentList'
import LoginModal from '@/components/modal/LoginModal'
import QuizModal from '@/components/common/QuizModal'
import ShareButton from '@/components/common/ShareButton'
import KomentarPoin from '@/components/modal/KomentarPoin'
import NotVip from '@/components/modal/NotVip'

export default {
    components: {
      NewsLoop,
      QuizModal,
      CommentList,
      KomentarPoin,
      LoginModal,
      ShareButton,
      NotVip
    },
    data() {
        return {
            domainTitle: process.env.domainTitle,
			      active_tab: 0,
            tab: null,
            tabCom: null,
            id: '',
            title: '',
            article: '',
            selengkapnya: '',
            writer: '',
            isMore: true,
            next: null,
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
            user_id:null,
            dialog: false,
            answerResult: null,
            already: false,
            profile:null,
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
            dataUrl: process.env.mobileUrl + "sixty/" + this.$route.params.sixty,
            totalComment: 0,
            isMoreComment: true,
            nextComment: 2,
            moreLoadingComment: false,
            total_counter: 0
        }
    },
    // computed: {
    //   reverseComment: function(){
    //     var commentArr = this.comments
    //     var finalArr = commentArr.reverse()
    //     return finalArr
    //   }
    // },
    methods: {
        async fetchUserdata() {
          try {
            const res = await UserService.getSingleUser()
            this.user_id = res.data.data.id
            this.profile = res.data.data
            // console.log(JSON.parse(JSON.stringify(res.data.data)))
          } catch (error) {
            console.log(error)
          }
        },
        async fetchContent() {
            // console.log(this.$route.params.sixty)
            try {
                let res = await ArticleService.getSixtyDetail(this.$route.params.sixty)
                // console.log(JSON.parse(JSON.stringify(res.data.data)))
                this.id = res.data.data.detail.id
                this.article = res.data.data
                this.selengkapnya = res.data.data.article
                this.title = res.data.data.article.title
                this.writer = res.data.data.article.writer
                this.items[2].href = res.data.data.article.title
                this.comments = res.data.data.detail.comments

                if( res.data.data.quiz && res.data.data.quiz.id ) {
                  this.quiz = res.data.data.quiz
                  this.quiz_id = res.data.data.quiz.id
                  this.answered = res.data.data.quiz.answered
                }

                this.fetchLatest()
            } catch (error) {
                console.log(error)
            }
        },
        async fetchLatest() {
            try {
                const res = await ArticleService.getSixty('bottom')
                // console.log(JSON.parse(JSON.stringify(res.data)))
                // console.log('bottom')
                var articles = res.data.data
                var i = 1
                articles.forEach(element => {
                  if(i == 6) return false
                  var link = element.link
                      link = link.replace('http://m.playworld.id/', '')
                  var obj = {
                    id: element.id,
                    image: {
                      small: element.image
                    },
                    link: '/'+link,
                    title: element.title,
                    type: element.type,
                    published_at: element.publish_at
                  }
                  if( element.id != this.id ) {
                    this.latests.push(obj)
                    i++
                  }
                });
            } catch (error) {
                console.log(error)
            }
        },
        async loadMore(n) {
          try {
                const res = await ArticleService.getSixty('bottom', n)
                //console.log(JSON.parse(JSON.stringify(res.data.data)))
                var articles = res.data.data
                var i = 1
                articles.forEach(element => {
                  if(i == 6) return false
                  var link = element.link
                      link = link.replace('http://m.playworld.id/', '')
                  var obj = {
                    id: element.id,
                    image: {
                      small: element.image
                    },
                    link: '/'+link,
                    title: element.title,
                    type: element.type,
                    published_at: element.publish_at
                  }
                  if( element.id != this.id ) {
                    this.latests.push(obj)
                    i++
                  }
                });
                this.next += 1
                if (res.data.meta.current_page == res.data.meta.last_page) {
                  this.isMore = false;
                }
            } catch (error) {
                console.log(error)
            }
        },
        async fetchComment() {
          try {
            const res = await ArticleService.getComments('sixty', this.$route.params.sixty, 1)
            // console.log(res)
            this.comments = res.data.data.comments
            this.totalComment = res.data.pagination.total
          } catch (error) {
              console.log(error)
          }
        },
        async loadMoreComment(n) {
          this.moreLoadingComment = true;
          try {
            const res = await ArticleService.getComments('sixty', this.$route.params.sixty, n)

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
        async postComment() {
          this.commentIsPosting = true;
          const params = {
            msg: this.comment_message,
            type: 'sixty'
          }

          if (this.total_counter < 20) {
            var isUrl = this.urlify(this.comment_message)

            this.commentIsPosting = false

            if (isUrl) {
              return alert('Comments tidak boleh mengandung tautan')
            }

            return alert('Comments harus mengandung minimal 20 kata')
          }

          try {
            const res = await UserService.postComment(this.$route.params.sixty, params)
            // console.log(res)
            this.fetchComment()
            this.KomentarPoinVisible = true
            this.commentIsPosting = false;
            this.comment_message = null;
          } catch (error) {
            // console.log(error.response.status)
            this.commentIsPosting = false;
            if( error.response.status == 422 ) {
              alert(error.response.data.message)
            } else if( error.response.status == 500 ) {
              alert('an error occured')
            } else if( error.response.status == 401 ) {
              //alert('Mohon Maaf :(, Anda harus login')
              this.openModalLogin()
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
                sixty_id: this.id,
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
            this.buyVipDialogVisible = false
            this.loginModalVisible = false
            this.pleaseLoginDialogVisible = false
            this.notVipDialogVisible = false
            this.KomentarPoinVisible = false
            // other code
        },
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
        }
      }
    },
    mounted() {
        this.fetchContent()
        this.fetchComment()
        this.fetchUserdata()
        //this.fetchLatest()
    }
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
    iframe
      width: calc(100% + 40px)
      margin-left: -20px
      margin-right: -20px
</style>

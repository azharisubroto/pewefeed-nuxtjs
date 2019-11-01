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
              <hr>
              <!-- TERBARU -->
              <section class="py-4 mb-5 pb-5">
                <div class="text-center mb-3">
                  ARTIKEL TERBARU LAINNYA
                </div>
                <Terbaru :items="latests"/>
                <v-btn
                tile
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
              <h4 class="mb-4 mt-5">123 Comments</h4>

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
              <div
                class="comment-item"
                v-for="comment in reverseComment"
                :key="comment.id"
                :id="'comment'+comment.comment_id"
              >
                <v-row>
                  <v-col cols="2">
                    <v-avatar size="30">
                      <img
                        :src="comment.customer.avatar ? comment.customer.avatar : '/img/user.jpeg'"
                        onerror="this.src='/img/user.jpeg';"
                      >
                    </v-avatar>
                  </v-col>
                  <v-col cols="10">
                    <strong>{{ comment.customer.name }}</strong><br>
                    <div style="font-size:12px;">{{ comment.message }}</div>
                    <div class="mt-2 caption text--gray">
                      {{comment.commented_at}} - Balas
                    </div>
                  </v-col>
                </v-row>
              </div>
              <div class="mb-5"></div>
            </template>

            <!-- QUIZ -->
            <template v-if="isQuiz">
              <div v-if="quiz && answered != true" class="mt-5">
                <h4>{{ quiz.question }}</h4>
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
                  color="green"
                  @click="submitAnswer()"
                >KIRIM JAWABAN</v-btn>
              </div>

              <div v-else class="mt-5">
                <div class="text-center">
                  Quiz Tidak Tersedia
                </div>
              </div>
            </template>
        </v-container>

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
    </section>
</template>

<script>
import ArticleService from '@/services/ArticleService'
import UserService from '@/services/UserService'
import Terbaru from '@/components/article/Terbaru'
export default {
    components: {
      Terbaru
    },
    data() {
        return {
            id: '',
            title: '',
            article: '',
            writer: '',
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
            ]
        }
    },
    head () {
      return {
        title: this.title,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          { hid: 'description', name: 'description', content: 'My custom description' }
        ]
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
            try {
                let res = await ArticleService.getDetail(this.$route.params.articleslug)
                console.log(JSON.parse(JSON.stringify(res.data.data)))
                this.id = res.data.data.article.id
                this.article = res.data.data.article
                this.title = res.data.data.article.title
                this.writer = res.data.data.article.writer
                this.items[2].href = res.data.data.article.title
                this.comments = res.data.data.article.comments
                if( res.data.data.quiz && res.data.data.quiz.id ) {
                  this.quiz = res.data.data.quiz
                  this.quiz_id = res.data.data.quiz.id
                  this.answered = res.data.data.quiz.answered
                }

                this.fetchLatest(res.data.data.article.slug)
            } catch (error) {
                console.log(error)
            }
        },
        async fetchLatest(slug) {
            try {
                const res = await ArticleService.getRelated(slug)
                //console.log(JSON.parse(JSON.stringify(res)))
                var articles = res.data.data.article
                articles.forEach(element => {
                  console.log(element.id)
                  if( element.id != this.id ) {
                    this.latests.push(element)
                  }
                });
            } catch (error) {
                console.log(error)
            }
        },
        async fetchUserdata() {
          try {
            const res = await UserService.getSingleUser()
            this.user_id = res.data.data.id
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
            console.log(res)
            this.fetchComment()
            this.commentIsPosting = false;
            this.comment_message = null;
          } catch (error) {
            console.log(error)
            this.commentIsPosting = false;
            alert('error! ' + error.message)
          }
        },
        async submitAnswer() {
          const params = {
            jawaban: this.jawabanQuiz,
            quiz_id: this.quiz_id
          }
          try {
            const res = await UserService.answerQuiz(params)
            console.log(res)
            if( res.status == 200 ) {
              alert(res.data.data.message)
              this.answered = true
            }
          } catch (error) {
            console.log(error)
          }
        }
    },
    created() {
        this.fetchContent()
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

    .comment-item
      padding: 10px 0
      border-bottom: 1px solid #e5e5e5
</style>

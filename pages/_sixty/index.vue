<template>
    <section>
        <v-skeleton-loader v-if="article==''"
          class="mx-auto mt-5"
          type="list-item-avatar-three-line, image, article"
        ></v-skeleton-loader>

        <v-container v-if="article" class="mb-5 pb-5">
            <!-- ARTICLE -->
            <template v-if="isArticle">
              <v-row class="pb-5">
                  <v-col cols="12">
                      <!-- META 1 -->
                      <div class="mb-1">
                          <div class="d-inline-block mr-2">
                              SIXTY
                          </div>
                          <div class="d-inline-block">
                            <div class="d-inline-block mr-3 grey--text text--small">
                                <v-icon>
                                    mdi-clock-outline
                                </v-icon>
                                {{article.article.publish_at}}
                            </div>
                          </div>
                      </div>

                      <!-- TITLE -->
                      <h2 class="mb-3">{{article.detail.title}}</h2>

                      <div v-html="article.detail.embed"></div>

                      <!-- CONTENT -->
                      <div class="iframe" v-html="article.content"></div>

                      <hr>

                      <!-- WRITER -->
                      <!-- <div class="mt-4">
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
                      </div> -->
                  </v-col>
              </v-row>

              <!-- TERBARU -->
              <div class="text-center">
                ARTIKEL TERBARU LAINNYA
              </div>
              <Terbaru :items="latests" class="mb-5 pb-5"/>
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
              KOMENTAR
            </template>

            <!-- QUIZ -->
            <template v-if="isQuiz">
              QUIZ
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
            <span>Komentar</span>
          </v-btn>

          <v-btn @click="isArticle=false;isComment=false;isQuiz=true">
            <span>Quiz</span>
          </v-btn>
        </v-bottom-navigation>
    </section>
</template>

<script>
import ArticleService from '@/services/ArticleService'
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
    methods: {
        async fetchContent() {
            console.log(this.$route.params.sixty)
            try {
                let res = await ArticleService.getSixtyDetail(this.$route.params.sixty)
                //console.log(JSON.parse(JSON.stringify(res.data.data)))
                this.id = res.data.data.article.id
                this.article = res.data.data
                this.title = res.data.data.article.title
                this.writer = res.data.data.article.writer
                this.items[2].href = res.data.data.article.title
                this.fetchLatest()
            } catch (error) {
                console.log(error)
            }
        },
        async fetchLatest() {
            try {
                const res = await ArticleService.getLatest()
                //console.log(JSON.parse(JSON.stringify(res.data.data)))
                var articles = res.data.data
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
    },
    created() {
        this.fetchContent()
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
      width: 100%
</style>

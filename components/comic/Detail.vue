<template>
    <section>
        <v-skeleton-loader v-if="comic==''"
          class="mx-auto mt-5"
          type="list-item-avatar-three-line, image, article"
        ></v-skeleton-loader>

        <v-container v-if="comic" class="mb-5 pb-5">
            <!-- META 1 -->
            <div class="mb-1 caption">
                <div class="d-inline-block mr-2">
                    KOMIK / {{ comic.category }}
                </div>
                <div class="d-inline-block">
                  <div class="d-inline-block mr-3 grey--text text--small">
                      <v-icon small>
                        mdi-clock-outline
                      </v-icon>
                      {{comic.created_at}}
                  </div>
                  <div class="d-inline-block mr-3 grey--text text--small">
                      <v-icon small size="12">
                          mdi-eye-outline
                      </v-icon>
                      {{comic.total_views}}
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
                        ></v-rating>
                    </v-col>
                    <v-col cols="2">
                        <span class="caption ml-2">({{ comic.total_review }})</span>
                    </v-col>
                </v-row>
            </div>

            <!-- ARTICLE -->
            <template v-if="isComic">
              <v-row class="pb-5">
                  <v-col cols="12">
                      <div class="cover">
                            <v-img
                                width="100%"
                                :src="comic.thumbnail"
                            ></v-img>
                      </div>

                      <!-- CONTENT -->
                      <div class="thumbnail mt-3" v-html="comic.description"></div>
                  </v-col>
              </v-row>
            </template>

            <!-- RATING -->
            <template v-if="isRating">
                <v-btn dark color="orange ancent-4" class="my-2">BERI RATING</v-btn>
                <v-list three-line>
                    <template v-for="(rating, index) in ratings">
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
                                    ></v-rating>
                                </v-list-item-subtitle>
                                <v-list-item-subtitle v-html="rating.comment"></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                    </v-list>
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

              <KomentarPoin :dialogVisible="KomentarPoinVisible" @close="myDialogClose"/>
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
          <v-btn @click="isComic=true;isRating=false;isComment=false">
            <span>Konten</span>
          </v-btn>

          <v-btn @click="isComic=false;isRating=true;isComment=false">
            <span>Rating</span>
          </v-btn>

          <v-btn @click="isComic=false;isRating=false;isComment=true">
            <span>Komentar<br>(+20 Poin)</span>
          </v-btn>
        </v-bottom-navigation>

        <NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose"/>

    </section>
</template>

<script>
import ComicService from '@/services/ComicService'
import UserService from '@/services/UserService'
import Terbaru from '@/components/article/Terbaru'
import CommentList from '@/components/common/CommentList'
import LoginModal from '@/components/modal/LoginModal'
import KomentarPoin from '@/components/modal/KomentarPoin'
import NotVip from '@/components/modal/NotVip'

export default {
    components: {
      Terbaru,
      CommentList,
      KomentarPoin,
      LoginModal,
      NotVip
    },
    data() {
        return {
            comic: '',
            totalRating: 0,
            ratings: [],
            isComic: true,
            isComment: false,
            isRating: false,
            user_id: null,
            profile: null,
            id: null,
            tabCom: null,
            comments: [],
            KomentarPoinVisible: false,
            commentIsPosting: false,
            comment_message: null,
            dialog: false,
            buyVipDialogVisible: false,
            loginModalVisible: false,
            pleaseLoginDialogVisible: false,
            notVipDialogVisible: false,
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
        async fetchContent() {
            try {
                let res = await ComicService.getDetail(this.$route.params.detail)
                console.log(JSON.parse(JSON.stringify(res.data.data)))
                this.id = res.data.data.content.id
                this.comic = res.data.data.content
                this.title = res.data.data.content.title
                this.ratings = res.data.data.content.reviewed.data
                this.totalRating = this.comic.rate / 20
            } catch (error) {
                console.log(error)
            }
        },
        // async fetchComment() {
        //   try {
        //     let res = await ComicService.getSixtyDetail(this.$route.params.sixty)
        //     console.log(res)
        //     this.comments = res.data.data.detail.comments
        //   } catch (error) {
        //       console.log(error)
        //   }
        // },
        async postComment() {
          this.commentIsPosting = true;
          const params = {
            id: this.id,
            msg: this.comment_message,
            type: 'sixty'
          }

          try {
            const res = await UserService.postComment(params)
            console.log(res)
            this.fetchComment()
            this.KomentarPoinVisible = true
            this.commentIsPosting = false;
            this.comment_message = null;
          } catch (error) {
            console.log(error.response.status)
            this.commentIsPosting = false;
            if( error.response.status == 422 ) {
              alert('Mohon tulis komentar minimal 50 karakter')
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
    iframe
      width: calc(100% + 40px)
      margin-left: -20px
      margin-right: -20px
</style>

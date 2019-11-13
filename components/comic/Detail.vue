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
                            readonly
                        ></v-rating>
                    </v-col>
                    <v-col cols="2">
                        <span class="caption ml-2">({{ total_review }})</span>
                    </v-col>
                </v-row>
            </div>
            <!-- SHARE BUTTON -->
            <ShareButton
                style="text-align: left !important"
                :dataUrl="shareUrl"
            />

            <!-- ARTICLE -->
            <template v-if="isComic">
              <v-row class="pb-5">
                  <v-col cols="12">
                      <div class="cover" v-if="!isVip">
                            <v-img
                                width="100%"
                                :src="comic.thumbnail"
                                class="blur"
                            >
                                <v-btn @click="checkVip()" dark class="btn-vip" color="orange accent-4">DAPATKAN HAK AKSES VIP</v-btn>
                            </v-img>
                      </div>

                      <div class="content" v-else>
                            <v-card
                                max-width="444"
                                class="mx-auto"
                            >
                                <v-system-bar lights-out></v-system-bar>
                                <flickity v-if="dataImage" ref="flickity">
                                    <div
                                    v-for="content in dataImage"
                                    :key="content.link"
                                    class="featured-item">
                                        <v-img
                                            :src="content.link"
                                            :aspect-ratio="1"
                                            class="grey lighten-2"
                                        ></v-img>
                                    </div>
                                </flickity>
                                <v-row no-gutters>
                                    <v-col class="text-center grey pt-4 pb-4 white--text" cols="6">
                                        {{images.total_size}}
                                    </v-col>
                                    <v-col class="text-center success pt-4 pb-4 white--text" cols="6">
                                        <a style="text-decoration: none" :href="images.zipUrl" download class="white--text">Download</a>
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
                <v-btn @click="makeRating()" dark color="orange ancent-4" class="my-2">BERI RATING</v-btn>
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
                                      readonly
                                  ></v-rating>
                              </v-list-item-subtitle>
                              <v-list-item-subtitle v-html="rating.comment"></v-list-item-subtitle>
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
                    <h4 class="mb-4 mt-5">{{total_comment}} Comments</h4>

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

                    <v-btn block dark depressed class="mb-4" color="deep-orange" @click="postComment()">
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
        <br><br><br>

        <LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose"/>
        <BuyVip :dialogVisible="buyVipDialogVisible" @close="myDialogClose"/>
        <MakeRating :contentId="comic.id" :dialogVisible="makeRatingVisible" @close="myDialogClose"/>

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
            <span>Komentar<br>(+2 Poin)</span>
          </v-btn>
        </v-bottom-navigation>

        <NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose"/>

    </section>
</template>

<script>
import ComicService from '@/services/ComicService'
import UserService from '@/services/UserService'
import CommentList from '@/components/common/CommentList'
import LoginModal from '@/components/modal/LoginModal'
import KomentarPoin from '@/components/modal/KomentarPoin'
import NotVip from '@/components/modal/NotVip'
import BuyVip from '@/components/modal/BuyVip'
import MakeRating from '@/components/common/MakeRating'
import ShareButton from '@/components/common/ShareButton'
import JSZip from 'jszip'
import { saveAs } from 'file-saver';

export default {
    components: {
      CommentList,
      KomentarPoin,
      LoginModal,
      NotVip,
      BuyVip,
      MakeRating,
      ShareButton,
    },
    data() {
        return {
            isVip: false,
            isMore: true,
            comic: '',
            dataImage: '',
            totalRating: 0,
            total_review: 0,
            total_comment: 0,
            ratings: '',
            next: 2,
            isComic: true,
            isComment: false,
            isRating: false,
            user_id: null,
            profile: null,
            id: null,
            tabCom: null,
            comments: [],
            images: '',
            KomentarPoinVisible: false,
            commentIsPosting: false,
            comment_message: null,
            dialog: false,
            buyVipDialogVisible: false,
            loginModalVisible: false,
            pleaseLoginDialogVisible: false,
            notVipDialogVisible: false,
            makeRatingVisible: false,
            shareUrl: 'https://m.playworld.id/komik/' + this.$route.params.category + '/' + this.$route.params.detail
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
        async fetchImage() {
            try {
                const res = await ComicService.getImages(this.$route.params.detail)
                this.images = res.data.data
                this.dataImage = this.images.image
                console.log(this.images)
            } catch (error) {
                console.log(error)
            }
        },
        async fetchUserdata() {
          try {
            const res = await UserService.getSingleUser()
            this.user_id = res.data.data.id
            this.profile = res.data.data
            this.isVip = this.profile.vip
            // console.log(JSON.parse(JSON.stringify(res.data.data)))
          } catch (error) {
            console.log(error)
          }
        },
        async fetchContent() {
            try {
                let res = await ComicService.getDetail(this.$route.params.detail)
                // console.log(JSON.parse(JSON.stringify(res.data.data)))
                this.id = res.data.data.content.id
                this.comic = res.data.data.content
                this.title = res.data.data.content.title
            } catch (error) {
                console.log(error)
            }
        },
        async fetchRating() {
            try {
                let res = await ComicService.getRating(this.$route.params.detail)
                this.ratings = res.data.data.review
                this.total_review = res.data.data.total_review
                this.totalRating = res.data.data.rate / 20
                // console.log(JSON.parse(JSON.stringify(res.data)))
                if (res.data.pagination.current_page == res.data.pagination.last_page) {
                    this.isMore = false;
                }
            } catch (error) {
                console.log(error)
            }
        },
        async loadMore(n) {
          try {
                const res = await ComicService.getRating(this.$route.params.detail + '?page=' + n)
                // console.log(JSON.parse(JSON.stringify(res.data)))
                var newData = res.data.data.review
                newData.forEach(element => {
                  this.ratings.push(element)
                });
                this.next += 1
                if (res.data.pagination.current_page == res.data.pagination.last_page) {
                  this.isMore = false;
                }
            } catch (error) {
                console.log(error)
            }
        },
        async fetchComment() {
          try {
            let res = await ComicService.getComment(this.$route.params.detail)
            console.log(res)
            this.comments = res.data.data
            this.total_comment = res.data.total_comment
          } catch (error) {
              console.log(error)
          }
        },
        async postComment() {
          this.commentIsPosting = true;
          const params = {
            id: this.id,
            msg: this.comment_message,
            type: 'comic'
          }

          try {
            const res = await UserService.postComment(params)
            // console.log(res)
            this.fetchComment()
            this.KomentarPoinVisible = true
            this.commentIsPosting = false;
            this.comment_message = null;
          } catch (error) {
            // console.log(error.response.status)
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
            this.makeRatingVisible = false
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
        makeRating() {
            if (!localStorage.getItem('loggedin')) {
                this.loginModalVisible = true
                console.log('not login')
            } else {
                this.makeRatingVisible = true
                console.log('not vip');
            }
        },
    },
    created() {
        this.fetchImage()
        this.fetchContent()
        this.fetchUserdata()
        this.fetchRating()
        this.fetchComment()
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

    .btn-vip
      position: absolute
      left: 50%
      top: 50%
      transform: translateX(-50%) translateY(-50%)
      background: rgba(0,0,0,.5)

    .blur .v-image__image--cover
        filter: blur(20px)
</style>

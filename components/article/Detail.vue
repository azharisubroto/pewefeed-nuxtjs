<template>
  <section>
    <v-skeleton-loader
      v-if="article==''"
      class="mx-auto mt-5"
      type="list-item-avatar-three-line, image, article"
    ></v-skeleton-loader>
    <v-container v-if="article" class="mb-5 pb-5 articlewrapper">
      <v-row>
        <v-col>
          <!-- META 1 -->
          <div class="mb-1">
            <div
              class="d-inline-block mr-2"
              style="line-height:1;font-size:12px"
            >{{article.type == 'LAGU' ? 'MUSIK' : article.type}}</div>
            <div class="d-inline-block" style="font-size:12px">
              <div class="d-inline-block mr-3 text--small">
                <v-icon small size="12">mdi-clock-outline</v-icon>
                {{article.published_at}}
              </div>
              <div class="d-inline-block mr-3 text--small">
                <v-icon small size="12">mdi-calendar-blank</v-icon>
                {{article.created_at}}
              </div>
              <div class="d-inline-block mr-3 text--small">
                <v-icon small size="12">mdi-eye-outline</v-icon>
                {{article.total_view}}
              </div>
              <div class="d-inline-block mr-3 text--small">
                <v-icon small size="12">mdi-message-text-outline</v-icon>
                {{article.total_comment ? article.total_comment : 0}}
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

            <div class="devider-small my-4"></div>

            <!-- WRITER -->
            <div class="mt-4">
              <span
                class="grey--text caption"
              >Tulisan ini dibuat oleh tim {{ domainTitle }} dari berbagai sumber</span>
              <br />
              <v-row justify="space-between" class="mt-3" v-if="team_content" no-gutters>
                <v-col cols="6">
                  <v-row class="pa-0">
                    <template v-for="(person, i) in team_content">
                      <v-col :key="i" cols="2" class="py-0" v-if="person.name != null">
                        <v-avatar size="30">
                          <v-img :src="person.avatar ? person.avatar : '/img/user.jpeg'"></v-img>
                        </v-avatar>
                      </v-col>
                    </template>
                  </v-row>
                </v-col>
                <v-col cols="6" class="text-right">
                  <v-btn text @click="[ expandTeam ? expandTeam = false : expandTeam = true]">
                    Team Content
                    <template v-if="!expandTeam">
                      <v-icon>mdi-menu-down</v-icon>
                    </template>
                    <template v-else>
                      <v-icon>mdi-menu-up</v-icon>
                    </template>
                  </v-btn>
                </v-col>
              </v-row>

              <div v-if="expandTeam" class="mt-4">
                <v-row v-for="(person, i) in team_content" :key="i">
                  <v-col cols="2" v-if="person.name != null">
                    <v-avatar size="45">
                      <v-img :src="person.avatar ? person.avatar : '/img/user.jpeg'"></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="10" v-if="person.name != null">
                    <strong>{{person.name}}</strong>
                    <br />
                    <div class="caption grey--text">{{person.profession}}</div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
        <div class="devider-big mb-5"></div>
        <!-- TERBARU -->
        <section class="py-4 mb-5 pb-5">
          <!-- TERBARU -->
          <div class="text-center mb-4 font-weight-bold">ARTIKEL TERBARU LAINNYA</div>
          <NewsLoop
            v-if="this.$route.params.cat == 'viral'"
            :items="latests"
            ADSlayoutKey="-fb+5w+4e-db+86"
            ADSclient="ca-pub-6581994114503986"
            ADSslot="3272838865"
          />
          <NewsLoop
            v-else-if="this.$route.params.cat == 'lagu'"
            :items="latests"
            ADSlayoutKey="-fb+5w+4e-db+86"
            ADSclient="ca-pub-6581994114503986"
            ADSslot="2144919011"
          />
          <NewsLoop
            v-else-if="this.$route.params.cat == 'nonton'"
            :items="latests"
            ADSlayoutKey="-fb+5w+4e-db+86"
            ADSclient="ca-pub-6581994114503986"
            ADSslot="5389550524"
          />
          <NewsLoop
            v-else-if="this.$route.params.cat == 'piknik'"
            :items="latests"
            ADSlayoutKey="-fb+5w+4e-db+86"
            ADSclient="ca-pub-6581994114503986"
            ADSslot="1538414350"
          />
          <NewsLoop
            v-else-if="this.$route.params.cat == 'tekno'"
            :items="latests"
            ADSlayoutKey="-fb+5w+4e-db+86"
            ADSclient="ca-pub-6581994114503986"
            ADSslot="5006407143"
          />
          <NewsLoop
            v-else-if="this.$route.params.cat == 'sport'"
            :items="latests"
            ADSlayoutKey="-fb+5w+4e-db+86"
            ADSclient="ca-pub-6581994114503986"
            ADSslot="4731074976"
          />
          <v-btn
            tile
            v-if="isMore"
            block
            depressed
            dark
            color="deep-orange"
            @click="loadMore(next)"
          >Load More</v-btn>
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
        </v-row>-->
      </template>

      <!-- COMMENT -->
      <template v-if="isComment">
        <v-tabs color="deep-orange" v-model="tabCom">
          <v-tab href="#kasihkomen">Berikan Komentar</v-tab>
          <v-tab href="#ketentuankom">Ketentuan</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabCom">
          <v-tab-item value="kasihkomen">
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
            <div
              class="counter mb-3"
              align="end"
              style="margin-top: -30px !important;"
            >{{ total_counter }}</div>

            <recaptcha
              :key="recaptchaKey"
              class="mx-5 my-5"
              @error="onError()"
              @success="onSuccess()"
              @expired="onExpired()"
            />

            <v-btn block dark depressed color="deep-orange" @click="postComment()">
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
              small
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

      <!-- QUIZ -->
      <template v-if="isQuiz">
        <div v-if="quiz">
          <v-tabs color="deep-orange" v-model="tab">
            <v-tab href="#jawab">Jawab Quiz</v-tab>
            <v-tab href="#ketentuan">Ketentuan</v-tab>
            <v-tab href="#statistik">Statistik</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item value="jawab">
              <div v-if="quizzes!=null && !sudahpernah && !ispoin">
                <div v-for="(quiz, i) in quizzes" :key="'quiz-'+i">
                  <h4 class="mt-5">{{ quiz.question }}</h4>
                  <v-radio-group v-model="jawabanQuiz[i]">
                    <v-row>
                      <v-col cols="6">
                        <v-radio :label="`${quiz.option_a}`" value="A"></v-radio>
                      </v-col>
                      <v-col cols="6">
                        <v-radio :label="`${quiz.option_b}`" value="B"></v-radio>
                      </v-col>
                      <v-col cols="6">
                        <v-radio :label="`${quiz.option_c}`" value="C"></v-radio>
                      </v-col>
                      <v-col cols="6">
                        <v-radio :label="`${quiz.option_d}`" value="D"></v-radio>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                </div>

                <v-btn
                  block
                  large
                  dark
                  depressed
                  color="deep-orange"
                  :loading="sending"
                  @click="submitAnswer()"
                >KIRIM JAWABAN</v-btn>
              </div>
              <div v-else-if="!sudahpernah && quizzes == null" class="pa-8 text-center">Loading Quiz</div>

              <v-container v-if="ispoin">
                <v-alert
                  border="left"
                  dense
                  colored-border
                  color="primary"
                  style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
                >
                  <v-row>
                    <v-col cols="2">
                      <img width="30" src="/img/poinextra.png" alt />
                    </v-col>
                    <v-col cols="10">
                      <template v-if="total_poin == 0">
                        <strong class="orange--text text--deep body-1">No Extra Poin</strong>
                        <br />Maaf! Kamu gagal mendapatkan tambahan POIN karena salah menjawab QUIZ
                      </template>
                      <template v-else>
                        <strong class="orange--text text--deep body-1">{{ total_poin }} Poin</strong>
                        <br />Selamat! Kamu mendapatkan tambahan POIN karena telah menjawab QUIZ dengan benar
                      </template>
                    </v-col>
                  </v-row>
                </v-alert>
                <v-btn
                  @click="$router.push('/member/histori_penggunaan_poin')"
                  block
                  dark
                  color="orange"
                >LIHAT TOTAL POIN</v-btn>
                <v-btn
                  class="mt-2"
                  @click="drawer = false; ispoin = false; profile = true; notLogin = false; sudahpernah = false; noLimit = false"
                  block
                  dark
                  color="deep-orange"
                >TUTUP</v-btn>
              </v-container>

              <v-container v-if="sudahpernah">
                <v-alert
                  border="left"
                  dense
                  colored-border
                  color="primary"
                  style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
                >
                  <v-row>
                    <v-col cols="2">
                      <img width="30" src="/img/poinextra.png" alt />
                    </v-col>
                    <v-col cols="10">
                      <strong class="orange--text text--deep body-1">No Extra Poin</strong>
                      <br />Maaf! Kamu gagal mendapatkan tambahan POIN karena telah menjawab QUIZ
                    </v-col>
                  </v-row>
                </v-alert>
                <v-btn
                  @click="$router.push('/member/histori_penggunaan_poin')"
                  block
                  dark
                  color="orange"
                >LIHAT TOTAL POIN</v-btn>
                <v-btn
                  class="mt-2"
                  @click="drawer = false; ispoin = false; profile = true; notLogin = false; sudahpernah = false; noLimit = false"
                  block
                  dark
                  color="deep-orange"
                >TUTUP</v-btn>
              </v-container>

              <v-container v-if="noLimit">
                <v-alert
                  border="left"
                  dense
                  colored-border
                  color="primary"
                  style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
                >
                  <v-row>
                    <v-col cols="2">
                      <img width="30" src="/img/poinextra.png" alt />
                    </v-col>
                    <v-col cols="10">
                      <strong class="orange--text text--deep body-1">No Extra Poin - VIP Limit</strong>
                      <br />Limit Poin harian untuk interaksi VIP sudah mencapai 200 Poin, namun interaksi Comment dan Share masih dapat kamu lakukan.
                    </v-col>
                  </v-row>
                </v-alert>
                <v-btn
                  @click="$router.push('/member/histori_penggunaan_poin')"
                  block
                  dark
                  color="orange"
                >LIHAT TOTAL POIN</v-btn>
                <v-btn
                  class="mt-2"
                  @click="drawer = false; ispoin = false; profile = true; notLogin = false; sudahpernah = false; noLimit = false"
                  block
                  dark
                  color="deep-orange"
                >TUTUP</v-btn>
              </v-container>
            </v-tab-item>
            <v-tab-item value="ketentuan">
              <h4 class="mt-5 mb-4">KETENTUAN QUIZ</h4>
              <ol class="pb-5 mb-5">
                <li>Pastikan sudah login</li>
                <li>Quiz hanya dapat di jawab 1 kali per 1 user</li>
                <li>Hanya user dengan keanggotaan VIP yang bisa memberikan komentar.</li>
              </ol>
            </v-tab-item>
            <v-tab-item value="statistik">
              <h4 class="mt-5 mb-3">Statistik</h4>
              <v-row>
                <v-col cols="6">Total Penjawab</v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >{{quizstatistic ? quizstatistic.total_answer : 0}}</v-col>

                <v-col cols="6">Penjawab Benar</v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >{{quizstatistic ? quizstatistic.total_answer_is_correct : 0}}</v-col>

                <v-col cols="6">Penjawab Salah</v-col>
                <v-col
                  cols="6"
                  class="text-right"
                >{{quizstatistic ? quizstatistic.total_answer_is_wrong : 0}}</v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </div>

        <div v-else class="mt-5">
          <div class="text-center">Quiz Tidak Tersedia</div>
        </div>

        <QuizModal
          :dialogVisible="dialog"
          :jawaban="answerResult"
          :already="already"
          :nolimit="nolimit"
          @close="myDialogClose"
        />
      </template>
    </v-container>
    <br />
    <br />
    <br />

    <LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose" />

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
        <span>
          Komentar
          <br />(+2 Poin)
        </span>
      </v-btn>

      <v-btn @click="isArticle=false;isComment=false;isQuiz=true">
        <span>
          Quiz
          <br />(+20 Poin)
        </span>
      </v-btn>
    </v-bottom-navigation>

    <NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose" />
  </section>
</template>

<script>
import ArticleService from "@/services/ArticleService";
import UserService from "@/services/UserService";
import NewsLoop from "@/components/common/NewsLoop";
import LoginModal from "@/components/modal/LoginModal";
import QuizModal from "@/components/common/QuizModal";
import KomentarPoin from "@/components/modal/KomentarPoin";
import CommentList from "@/components/common/CommentList";
import ShareButton from "@/components/common/ShareButton";
import NotVip from "@/components/modal/NotVip";

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
  props: ["respon"],
  data() {
    return {
      domainTitle: process.env.domainTitle,
      active_tab: 0,
      tab: null,
      tabCom: null,
      profile: null,
      id: "",
      title: "",
      article: "",
      writer: "",
      team_content: "",
      next: 2,
      isMore: true,
      isArticle: true,
      isComment: false,
      isQuiz: false,
      latests: [],
      commentIsPosting: false,
      comments: [],
      comment_message: null,
      quizzes: null,
      quizstatistic: null,
      jawabanQuiz: [],
      quiz_ids: [],
      quizs: "",
      sudahpernah: false,
      sending: false,
      quizstatistic: null,
      answered: false,
      ispoin: false,
      quiz_id: null,
      dialog: false,
      answerResult: null,
      already: false,
      nolimit: false,
      noLimit: false,
      user_id: null,
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
      dataUrl:
        process.env.mobileUrl +
        this.$route.params.cat +
        "/" +
        this.$route.params.subcat +
        "/" +
        this.$route.params.articleslug,
      expandTeam: false,
      totalComment: 0,
      isMoreComment: true,
      nextComment: 2,
      moreLoadingComment: false,
      total_counter: 0,
      total_poin: null,
      notLogin: null,
      recaptchaToken: null,
      recaptchaKey: 1
    };
  },
  // computed: {
  //   reverseComment: function() {
  //     var commentArr = this.comments;
  //     var finalArr = commentArr.reverse();
  //     return finalArr;
  //   }
  // },
  methods: {
    async fetchContent() {
      //console.log(this.$route.params.articleslug)
      this.id = this.respon.article.id;
      this.article = this.respon.article;
      this.title = this.respon.article.title;
      this.writer = this.respon.article.writer;
      this.items[2].href = this.respon.article.title;
      this.comments = this.respon.article.comments;
      this.team_content = this.respon.article.team_content;
      if (this.respon.quiz && this.respon.quiz.id) {
        this.quiz = this.respon.quiz;
        this.quiz_id = this.respon.quiz.id;
        this.answered = this.respon.quiz.answered;
      }
      this.fetchLatest(this.respon.article.slug);
    },
    async fetchQuiz() {
      try {
        const res = await ArticleService.getQuiz(
          this.$route.params.articleslug
        );
        const data = await res.data.data;
        // console.log("statistik", data[0].statistic);
        this.quizstatistic = data[0].statistic;
        this.quizzes = data;
        data.forEach(el => {
          this.quiz_ids.push(el.id);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchLatest(slug) {
      try {
        const res = await ArticleService.getRelated(slug);
        //console.log(JSON.parse(JSON.stringify(res.data.data)))
        var articles = res.data.data.article;
        articles.forEach(element => {
          var link = element.link;
          link = link.replace("https://pewefeed.com/", "");
          var obj = {
            image: {
              small: element.image.small
            },
            link: "/" + link,
            title: element.title,
            type: element.reaction,
            published_at: element.publish_at
          };
          if (element.id != this.id) {
            this.latests.push(obj);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async loadMore(n) {
      try {
        const res = await ArticleService.getRelatedMore(
          this.$route.params.articleslug,
          n
        );
        //console.log(JSON.parse(JSON.stringify(res.data.data)))
        var articles = res.data.data.article;
        articles.forEach(element => {
          var link = element.link;
          link = link.replace("https://pewefeed.com/", "");
          var obj = {
            image: {
              small: element.image.small
            },
            link: "/" + link,
            title: element.title,
            type: element.reaction,
            published_at: element.publish_at
          };
          if (element.id != this.id) {
            this.latests.push(obj);
          }
        });
        this.next += 1;
        if (res.data.pagination.current_page == res.data.pagination.last_page) {
          this.isMore = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserdata() {
      try {
        const res = await UserService.getSingleUser();
        this.user_id = res.data.data.id;
        this.profile = res.data.data;
        // console.log(JSON.parse(JSON.stringify(res.data.data)));
      } catch (error) {
        console.log(error);
      }
    },
    async fetchComment() {
      try {
        const res = await ArticleService.getComments(
          "news",
          this.$route.params.articleslug,
          1
        );
        // console.log(res)
        this.comments = res.data.data.comments;
        this.totalComment = res.data.pagination.total;
      } catch (error) {
        console.log(error);
      }
    },
    async loadMoreComment(n) {
      this.moreLoadingComment = true;
      try {
        const res = await ArticleService.getComments(
          "news",
          this.$route.params.articleslug,
          n
        );

        var dataComments = res.data.data.comments;

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
        var isUrl = text.replace(urlRegex);

        if (isUrl != text) {
          return true;
        }

        return false;
      }

      return false;
    },
    /* Recaptcha */
    onError(error) {
      console.log("Error happened:", error);
      this.recaptchaToken = null;
    },
    onSuccess(token) {
      this.recaptchaToken = "success";
    },
    onExpired() {
      console.log("Expired");
      this.recaptchaToken = null;
    },

    /* Validasi Form Rating */
    validate() {
      if (this.$refs.form.validate()) {
        if (this.recaptchaToken != null) {
          this.postComment();
        } else {
          this.snackbar = true;
          this.responsemessage = "Mohon Centang Recaptha";
        }
      }
    },
    async postComment() {
      this.commentIsPosting = true;
      const params = {
        msg: this.comment_message,
        type: "news"
      };

      if (this.total_counter < 20) {
        var isUrl = this.urlify(this.comment_message);

        this.commentIsPosting = false;

        if (isUrl) {
          return alert("Comments tidak boleh mengandung tautan");
        }

        return alert("Comments harus mengandung minimal 20 kata");
      }

      try {
        const res = await UserService.postComment(
          this.$route.params.articleslug,
          params
        );
        // console.log(res.data.poin);
        this.fetchComment();
        this.commentIsPosting = false;
        this.comment_message = null;
        if (res.data.poin > 0) {
          this.KomentarPoinVisible = true;
        }
      } catch (error) {
        //console.log(error.response.status)
        this.commentIsPosting = false;
        if (error.response && error.response.status == 422) {
          alert(error.response.data.message);
        } else if (error.response && error.response.status == 500) {
          alert("an error occured");
        } else if (error.response && error.response.status == 401) {
          //alert('Mohon Maaf :(, Anda harus login')
          this.openModalLogin();
        } else {
          alert("error! " + error.message);
        }
      }
    },
    async submitAnswer() {
      this.sending = true;
      if (!this.profile) {
        this.notLogin = true;
      } else {
        this.notLogin = false;
        if (this.profile.vip != false) {
          var params = {
            article_id: this.id,
            quiz_id: this.quiz_ids,
            jawaban: this.jawabanQuiz
          };

          try {
            const res = await UserService.answerMultiple(params);
            const data = await res.data;
            this.total_poin = data.total_point;
            this.ispoin = true;
            this.profile = false;
            this.notLogin = true;
            // console.log('Hasil', JSON.parse(JSON.stringify(data)))
          } catch (error) {
            console.log(error);
            if (error.response.status == 410) {
              this.noLimit = true;
              this.sudahpernah = false;
            } else {
              this.noLimit = false;
              this.sudahpernah = true;
            }
          }
        } else {
          this.notVipDialogVisible = true;
        }
      }
    },
    openModalLogin() {
      this.loginModalVisible = true;
    },
    myDialogClose() {
      this.dialog = false;
      this.loginModalVisible = false;
      this.buyVipDialogVisible = false;
      this.pleaseLoginDialogVisible = false;
      this.notVipDialogVisible = false;
      this.KomentarPoinVisible = false;
      // other code
    }
  },
  watch: {
    comment_message: function(value) {
      if (value) {
        if (value.length == 0) {
          return (this.total_counter = 0);
        }

        var regex = /\s+/gi;
        var wordCount = value
          .trim()
          .replace(regex, " ")
          .split(" ").length;

        return (this.total_counter = wordCount);
      } else {
        return (this.total_counter = 0)
      }
    }
  },
  mounted() {
    this.fetchContent();
    this.fetchUserdata();
    this.fetchQuiz();
    this.fetchComment();
    //this.fetchLatest()
  }
};
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
			line-height: 0
			opacity: .5

	.comment-item
		padding: 10px 0
		border-bottom: 1px solid #e5e5e5
	.v-item-group.v-bottom-navigation .v-btn .v-btn__content
		color: #fff
		opacity: 1
	.v-item-group.v-bottom-navigation .v-btn.v-btn--active .v-btn__content
		color: var(--primary)!important
</style>
<style lang="scss">
.articlewrapper {
  h3 {
    font-size: 20px !important;
    span {
      font-size: 20px !important;
    }
  }
}
</style>

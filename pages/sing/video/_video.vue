<template>
  <div>
    <SingAppBar :title="content2 != null ? content2.stage : ''" :back="true" />

    <v-container class="hero-detailsing pb-5">
      <!-- ALERT -->
      <v-alert class="mt-1 text-14" color="#0057FF" prominent>
        <template v-slot:prepend>
          <v-img
            src="/img/icons/info.svg"
            width="35"
            max-width="35"
            class="mr-3 infoarticleicon"
          ></v-img>
        </template>
        Pastikan kamu memiliki minimal
        {{
          content2.full_stage && content2.full_stage.min_vote
            ? content2.full_stage.min_vote
            : "xxx"
        }}
        Vote untuk bisa melaju ke stage selanjutnya
      </v-alert>

      <!-- CONTENT CARD HEAD -->
      <v-card
      v-if="content2 != null"
      color="#404040"
      class="pt-3"
      >
        <div
          v-if="content2 != null"
          class="d-flex justify-space-between align-center mb-3 px-4"
        >
          <div>
            <v-avatar size="30" >
              <v-img cover :src="content2.customer.avatar ? content2.customer.avatar : 'https://via.placeholder.com/350x150'"></v-img>
            </v-avatar>
            <div class="d-inline-block ml-2 text-14">
              {{content2.customer.name ? content2.customer.name : 'n/a'}}
            </div>
          </div>

          <div>
            <v-btn v-if="content2.customer.instagram!=null" :href="'https://instagram.com/'+content2.customer.instagram" target="_BLANK" class="ml-2" small color="#ff4200">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>

            <v-btn 
            color="#ff4200" 
            small 
            @click="sendVote(content2.id)"
            >
              <img src="/img/icons/vote-w.svg" class="mr-1" alt=""> Vote
            </v-btn>
          </div>
        </div>

        <div style="line-height:0;">
          <template v-if="!videoutama_is_iframe">
            <div v-if="videoutama != null && playnow !== false">
              <video width="400" controls autoPlay style="margin-bottom: -8px">
                <source :src="videoutama" type="video/mp4" />
              </video>
            </div>
            <div v-else>
              <v-img
                :src="content2.video.thumbnail_url"
                position="center"
                :aspect-ratio="16 / 9"
                class="position-relative deep-orange lighten-3"
                @click="playnow = true"
              >
                <!-- <div class="singstarstatus">
                              <img v-if="content2.is_star" src="/img/icons/star-yellow.svg" alt="">
                              <img v-else src="/img/icons/star-default.svg" alt="">
                          </div> -->
                <template v-slot:default>
                  <v-row
                    class="ma-0"
                    align="center"
                    justify="center"
                    style="height: 100%"
                  >
                    <v-icon size="100" v-if="videoutama != null"
                      >mdi-play-circle</v-icon
                    >
                    <v-progress-circular
                      v-else
                      indeterminate
                      size="64"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </div>
          </template>
          <template v-else>
            <iframe
              :src="videoutama"
              frameborder="0"
              height="300"
              style="width: 100%"
            ></iframe>
          </template>
        </div>

        <div class="d-flex justify-space-between pr-4 align-center">
          <div>
            <div class="text-20 float-left text-center px-4" style="line-height:41px">
              <strong>{{content2.ranking}}</strong>
            </div>
            <div style="background:#000;border-radius: 0;color:#fff" class="px-3 py-2 float-left">
              <v-icon size="25" v-if="item.is_star" color="#FFC107">mdi-star</v-icon>
              <v-icon size="25" v-else color="#fff">mdi-star-outline</v-icon>
            </div>
          </div>

          <div class="singmetaicons text-12 d-flex align-center justify-content-end metasing">
            {{content2.viewers}} Melihat &nbsp;&bull;&nbsp;
            {{content2.total_vote ? content2.total_vote : '0'}} Vote &nbsp;&bull;&nbsp;
            {{content2.total_comments ? content2.total_comments : '0'}} Komentar
          </div>
        </div>
      </v-card>
    </v-container>


    <!-- EXTRA -->
    <template v-if="maintab == 0">
      <v-container class="px-0">
        <!-- TAB HEAD -->
        <div
          class="statusquo text-center row mx-0 text-18"
          style="background-color: #000;border-top:2px solid #fff;border-bottom:2px solid #fff"
        >
          <v-col cols="6">
            <div
              @click="votetab = 0"
              :class="[votetab == 0 ? 'active' : null]"
              class="text-14 text-capitalize text-center py-2"
              style="letter-spacing: 0"
            >
              <strong>Voters</strong>
            </div>
          </v-col>
          <v-col cols="6">
            <div
              @click="votetab = 1"
              :class="[votetab == 1 ? 'active' : null]"
              class="text-14 text-capitalize text-center py-2"
              style="letter-spacing: 0"
            >
              <strong>Ketentuan</strong>
            </div>
          </v-col>
        </div>
      </v-container>

      <!-- TAB CONTENT -->
      <template v-if="votetab == 0">
        <v-container class="pb-0">
          <v-alert class="mt-0 text-14" color="#0057FF" prominent>
            <template v-slot:prepend>
              <v-img
                src="/img/icons/info.svg"
                width="35"
                max-width="35"
                class="mr-3 infoarticleicon"
              ></v-img>
            </template>
            Dapatkan 5 Poin atas setiap Vote. Vote pada masing-masing kontestan
            hanya bisa diberikan 1 kali per 1 hari.
          </v-alert>
        </v-container>

        <div v-if="voters.length > 0">
          <v-row no-gutters class="px-2">
            <template v-for="(voter, i) in voters">
              <v-col 
              cols="6" 
              class="pa-1"
              :key="'voter-' + i">
                <v-card
                color="#404040"
                dark
                elevation="0"
                class="px-3 py-3"
                height="100%"
                >
                  <div class="d-flex" style="width: 100%">
                    <div class="mr-3">
                      <v-avatar>
                        <v-img
                          :src="
                            voter.avatar ? voter.avatar : '//via.placeholder.com/80'
                          "
                        ></v-img>
                      </v-avatar>
                    </div>
                    <div>
                      <div class="text-12">
                        <strong>{{ voter.name ? voter.name : "null" }}</strong>
                      </div>
                      <div class="text-10">
                        <strong>{{ voter.date ? voter.date : "null" }}</strong>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </template>
          </v-row>
        </div>

        <div class="text-center mt-3" v-if="votersismore">
          <v-btn
            color="#ff4200"
            class="mt-4"
            @click="loadVoters(voterspaging)"
            >Show More</v-btn
          >
        </div>
      </template>

      <template v-if="votetab == 1">
        <v-container>
          Untuk ikut mendukung kontestan favoritmu kebabak selanjutnya berikan
          vote dengan cara: <br /><br />

          1. Pastikan kamu sudah memiliki VIP Pewefeed<br />
          2. Silakan pilih penyanyi favorit kamu dan berikan Vote
          sebanyak-banyaknya <br />
          3. Satu Vote berlaku hanya berlaku untuk satu kontestan dalam satu
          hari <br />
          4. Jika Vote memenuhi syarat maka penyanyi favorit kamu bisa melangkah
          ke babak selanjutnya
        </v-container>
      </template>

    </template>

    <template v-if="maintab == 1">
      <v-container class="px-0">
        <div
          class="statusquo text-center row mx-0 text-18"
          style="background-color: #000;border-top:2px solid #fff;border-bottom:2px solid #fff"
        >
          <v-col cols="6">
            <div
              @click="comment_tab = 0"
              :class="[comment_tab == 0 ? 'active' : null]"
              class="text-14 text-capitalize py-2 text-center"
            >
              <strong>Komentar</strong>
            </div>
          </v-col>
          <v-col cols="6">
            <div
              @click="comment_tab = 1"
              :class="[comment_tab == 1 ? 'active' : null]"
              class="text-14 text-capitalize text-center py-2"
              style="letter-spacing: 0"
            >
              <strong>Ketentuan</strong>
            </div>
          </v-col>
        </div>
      </v-container>

      <v-container v-if="comment_tab == 0">
        <v-alert class="mt-0 text-14" color="#0057FF" prominent>
          <template v-slot:prepend>
            <v-img
              src="/img/icons/info.svg"
              width="35"
              max-width="35"
              class="mr-3 infoarticleicon"
            ></v-img>
          </template>
          Dapatkan 5 poin atas setiap komentar dengan minimum 20 kata
        </v-alert>

        <!-- TEXT AREA -->
        <v-textarea
          class="mt-4"
          outlined
          color="#ff4200"
          label="Komentar"
          value
          rows="3"
          auto-grow
          v-model="comment_message"
        ></v-textarea>
        <div
          class="counter mb-3"
          align="end"
          style="margin-top: -30px !important"
        >
          {{ total_counter }}
        </div>
        <div class="d-block"></div>
        <v-btn block dark color="#ff4200" @click="recaptchaPreSend = true">
          <template v-if="!commentIsPosting">Kirim Komentar</template>
          <template v-else>Mengirim Komentar...</template>
        </v-btn>

        <h4 class="mb-4 mt-5">Star Comments</h4>
        <CommentList
          v-if="starcomments != null && starcomments.length > 0"
          :items="starcomments"
          class="star-comments"
        />
        <div v-else class="caption text-center pa-5">No Data</div>

        <h4 class="mb-4 mt-5">{{ totalComment }} Comments</h4>

        <!-- KOMEN LIST -->
        <CommentList :items="comments" />

        <div v-if="isMoreComment" class="text-center py-3 caption">
          No more comments
        </div>

        <v-btn
          v-if="isMoreComment && comments.length > 0"
          :loading="moreLoadingComment"
          class="mt-5"
          block
          depressed
          dark
          color="#ff4200"
          @click="loadMoreComment(nextComment)"
          >Load More</v-btn
        >
        <div class="mb-5"></div>
      </v-container>

      <v-container v-if="comment_tab == 1">
        <h4 class="mt-5 mb-3">KETENTUAN KOMENTAR</h4>
        <ol class="mb-5 pb-5">
          <li>Pastikan sudah login</li>
          <li>Tulis komentar dengan minimal terdiri dari 20 kata</li>
          <li>Poin hanya diberikan 1 kali untuk 1 User per 1 Artikel</li>
          <li>
            Seluruh komentar dimoderasi oleh tim Playworld ID dan bisa dihapus
            dan akan mengurangi total POIN jika komentar mengandung konten SARA,
            atau tidak sesuai dengan artikel yang dibaca
          </li>
        </ol>
      </v-container>
    </template>

    <br />
    <br />
    <br />
    <br />
    <v-bottom-navigation
      fixed
      dark
      grow
      color="white"
      background-color="#2C2C2D"
      height="80"
      class="pwmenubottom"
      v-model="singtab"
    >
      <v-btn @click="maintab = 0">
        <span style="font-size: 10px !important">
          Vote
          <br />
          <span>(+5 Poin)</span>
        </span>
        <img
          :src=" singtab == 0 ? '/img/icons/vote-o.svg' : '/img/icons/vote-w.svg' "
          class="mb-1 d-block"
          width="20"
          height="20"
        />
      </v-btn>
      <v-btn @click="maintab = 1">
        <span style="font-size:10px;">
          Komentar
          <br />(+5 Poin)
        </span>
        <img
          :src=" singtab == 1 ? '/img/icons/articles/komentar-o.svg' : '/img/icons/articles/komentar-w.svg' "
          class="mb-1 d-block"
          height="20"
          alt
        />
      </v-btn>
      <v-btn>
        <ShareButton2 
        class="text-center" 
        independent
        tipe="Sing"
        shareSingTitle='Dukung video saya di "Duet" klik disini untuk vote'
        :customimage="content2.video.thumbnail_url"
        >
          <img
            :src=" singtab == 4 ? '/img/icons/articles/bagikan-o.svg' : '/img/icons/articles/bagikan-w.svg' "
            height="18"
            style="display:inline-block;position:relative;top:2px"
            alt
          />
          <div></div>
          <span style="font-size:10px;">
            Bagikan
            <br />(+1 Poin)
          </span>
        </ShareButton2>
      </v-btn>
    </v-bottom-navigation>

    <!-- Dapet bonus -->
    <v-bottom-sheet v-model="apakahbetul">
      <v-sheet height="100%">
        <v-toolbar :elevation="1" style="border-top: 2px solid #fff">
          <!-- Arrow -->
          <v-btn
            dark
            icon
            tile
            style="border-right: 0px solid #717171"
            light
            @click="apakahbetul = !apakahbetul"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <!-- Title -->
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn
              dark
              text
              class="deep-orange--text pl-0"
              style="margin-left: -10px"
            >
              <span>Information</span>
            </v-btn>
          </v-toolbar-items>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <div class="mx-2">
          <v-container v-if="type == 'vote'" class="text-center">
            <img src="/img/poinextra.png" width="40" class="mt-5" />
            <br />
            Kamu mendapat 5 Point karena sudah<br />
            Memberikan vote
            <br />
            <v-btn
              to="/member/histori_penggunaan_poin"
              color="#ff4200"
              class="mt-2"
              >Check Total Point</v-btn
            >
            <br /><br />
          </v-container>
          <v-container v-if="type == 'komen'" class="text-center">
            <img src="/img/poinextra.png" width="40" class="mt-0" />
            <br />
            Kamu mendapat 5 point karena sudah<br />
            Memberikan komentar
            <br />
            <v-btn
              to="/member/histori_penggunaan_poin"
              color="#ff4200"
              class="mt-2"
              >Check Total Point</v-btn
            >
            <br /><br /><br /><br />
          </v-container>
          <v-container v-else-if="type == 'alreadyvote'" class="text-center">
            <img src="/img/close.svg" width="40" class="mt-5" />
            <br />
            Kamu sudah memberikan vote hari ini
            <br />
            <br />
            <v-btn
              to="/member/histori_penggunaan_poin"
              color="#ff4200"
              class="mt-2"
              >Check Total Point</v-btn
            >
            <br /><br />
          </v-container>
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <!-- RECAPTCHA POPUP -->
    <v-bottom-sheet v-model="recaptchaPreSend">
      <v-sheet height="100%" color="transparent">
        <v-card style="border-radius: 0 !important">
          <v-toolbar :elevation="1" style="border-top: 2px solid #fff">
            <!-- Arrow -->
            <v-btn
              dark
              icon
              tile
              style="border-right: 0px solid #717171"
              light
              @click="recaptchaPreSend = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>

            <!-- Title -->
            <div class="flex-grow-1"></div>
            <v-toolbar-items>
              <v-btn dark text class="deep-orange--text">VERIFICATION</v-btn>
            </v-toolbar-items>
            <div class="flex-grow-1"></div>
          </v-toolbar>

          <div class="px-5 pt-1 text-center">
            <div class="mt-3 pb-5 pb-10 text-14">
              <recaptcha
                :key="recaptchaKey"
                class="mx-5 my-5"
                @error="onError()"
                @success="onSuccess()"
                @expired="onExpired()"
              />
            </div>
          </div>
        </v-card>
      </v-sheet>
    </v-bottom-sheet>

    <LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose" />
    <NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose" />
  </div>
</template>

<script>
import ShareButton2 from "@/components/common/ShareButton2";
import SingAppBar from "@/components/sing/SingAppBar";
import Video from "@/components/sing/Video";
import ArticleService from "@/services/ArticleService";
import CommentList from "@/components/common/CommentList";
import SingService from "@/services/SingService";
import LoginModal from "@/components/modal/LoginModal";
import NotVip from "@/components/modal/NotVip";

export default {
  name: "SingVideoPage",
  components: {
    ShareButton2,
    SingAppBar,
    CommentList,
    LoginModal,
    NotVip,
  },
  data() {
    return {
      item: this.$store.state.item,
      origin: this.$store.state.host,
      playnow: false,
      maintab: 0,
      comment_fetched: false,
      singtab: 0,
      votetab: 0,
      notVipDialogVisible: false,
      loginModalVisible: false,
      apakahbetul: false,
      ispaging: false,
      howto: [
        {
          title: "cara vote",
          to: "/sing/help/cara-vote",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, ab numquam. Repellendus perferendis reiciendis rem eligendi fugiat accusamus similique illo tempore officiis, iusto aliquid consequatur est ducimus vel a velit?",
        },
      ],
      content: {
        customer: {
          avatar: "//via.placeholder.com/80",
          name: this.$route.params.video,
        },
        star: false,
        votes: 100,
        voters: null,
        comments: 234,
      },
      content2: this.$store.state.sing_detail,
      voters: [],

      comment_tab: 0,
      comments: [],
      starcomments: [],
      recaptchaPreSend: false,
      comments_fetched: false,
      totalComment: 0,
      recaptchaKey: 1,
      total_counter: 0,
      recaptchaToken: null,
      comment_message: null,
      isMoreComment: true,
      commentIsPosting: false,
      moreLoadingComment: false,
      videoutama: null,
      videoutama_is_iframe: false,
      type: null,
      voterspaging: 1,
      votersismore: false,
      isrunning: true,
    };
  },
  watch: {
    comment_message: function (value) {
      if (value) {
        if (value.length == 0) {
          return (this.total_counter = 0);
        }

        var regex = /\s+/gi;
        var wordCount = value.trim().replace(regex, " ").split(" ").length;

        return (this.total_counter = wordCount);
      } else {
        return (this.total_counter = 0);
      }
    },
    singtab: function (value) {
      if (
        value == 1 &&
        this.comment_fetched != true &&
        this.comments_fetched != true
      ) {
        this.fetchComment();
      }
    },
  },
  mounted() {
    this.getVideoDetail(this.$route.params.video);
    this.loadVoters(this.voterspaging);
    localStorage.setItem("sing_to_login", "yes");
  },
  async fetch({ store, params }) {
    var item = await SingService.getDetailVideo(params.video).then((res) => {
      return res.data;
    });
    const data = item;
    store.commit("SET_SING_SINGLE", item);
    store.commit("SET_ITEM", item);
    console.log(JSON.parse(JSON.stringify(item)));
  },
  head() {
    let host = this.origin;
    var url = "https://" + host + "/sing/video/" + this.item.id;
    return {
      title: this.item.video.title,
      meta: [
        {
          hid: "description",
          property: "description",
          content: this.item.video.title,
        },
        // Facebok
        {
          hid: "og:title",
          property: "og:title",
          content: this.item.video.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.item.video.title,
        },
        { hid: "og:type", property: "og:type", content: "website" },
        { hid: "og:url", property: "og:url", content: url },
        {
          hid: "og:image",
          property: "og:image",
          content: this.item.video.thumbnail_url,
        },
        { hid: "og:image:width", property: "og:image:width", content: "640" },
        { hid: "og:image:height", property: "og:image:height", content: "434" },
        { hid: "og:locale", property: "og:locale", content: "id_ID" },
        { hid: "og:site_name", property: "og:site_name", content: "Pewefeed" },
        { hid: "fb:admins", property: "fb:admins", content: "100006462279538" },
        { hid: "fb:app_id", property: "fb:app_id", content: "107188393464738" },

        // Twitter
        { hid: "twitter:card", name: "twitter:card", content: "summary" },
        {
          hid: "twitter:creator",
          name: "twitter:creator",
          content: "@pewedeed",
        },
        { hid: "twitter:site", name: "twitter:site", content: "@pewedeed" },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.item.video.title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.item.video.title,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.item.video.thumbnail_url,
        },
      ],
    };
  },
  methods: {
    async sendVote(id) {
      console.log("sendVote");
      try {
        const res = await SingService.sendVote({
          customer_video_id: id,
        });
        const data = res.data;
        this.apakahbetul = true;
        this.type = "vote";
        console.log(data);
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status == 422) {
          //alert(error.response.data.message);

          if (error.response.data.not_vip == true) {
            this.notVipDialogVisible = true;
          } else {
            this.apakahbetul = true;
            this.type = "alreadyvote";
          }
        } else if (error.response && error.response.status == 500) {
          alert("an error occured");
        } else if (error.response && error.response.status == 401) {
          this.loginModalVisible = true;
        } else {
          alert("error! " + error.message);
        }
      }
    },
    async fetchIGVIDEO(url) {
      try {
        const res = await SingService.igVideo(url);
        //console.log('ig video', res);
        this.videoutama = res.data.graphql.shortcode_media.video_url
          ? res.data.graphql.shortcode_media.video_url
          : null;
      } catch (error) {
        console.log(error);
      }
    },
    async getVideoDetail(slug) {
      console.log("getVideoDetail");
      try {
        const res = await SingService.getDetailVideo(slug);
        const data = res.data;
        let video = data.video;
        if (video.type == "instagram") {
          this.fetchIGVIDEO(video.video_url + "&__a=1");
        } else if (video.type == "tiktok") {
          this.videoutama = video.video_url;
        } else {
          this.videoutama = video.video_url;
          this.videoutama_is_iframe = true;
        }

        this.isrunning = res.data.full_stage.isRunning;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchComment() {
      try {
        const res = await SingService.getComments(this.$route.params.video);
        //console.log(res.data.data)
        this.comments = res.data.data.comments;
        this.starcomments = res.data.data.artist_comments;
        this.totalComment = res.data.pagination.total;
        this.comments_fetched = true;

        if (res.data.pagination.current_page == res.data.pagination.last_page) {
          this.isMoreComment = false;
        }
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

        dataComments.forEach((element) => {
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
    async loadVoters(n) {
      try {
        const res = await SingService.getVoters(this.$route.params.video, n);
        let voters = res.data.data;

        voters.forEach((el) => {
          this.voters.push({
            name: el.name,
            avatar: el.avatar,
            date: el.vote_date,
          });
        });

        //this.voters.push(votersTemp);
        this.voterspaging++;

        let current = res.data.paginations.current_page;
        let last = res.data.paginations.last_page;

        this.votersismore = last > current ? true : false;
      } catch (error) {
        console.log(error);
      }
    },
    /* Recaptcha */
    onError(error) {
      console.log("Error happened:", error);
      this.recaptchaToken = null;
    },
    onSuccess(token) {
      this.recaptchaToken = "success";
      this.postComment();
    },
    onExpired() {
      console.log("Expired");
      this.recaptchaToken = null;
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
    },
    /* Validasi Form Rating */
    validate() {
      if (!this.$refs.form.validate()) {
        this.snackbar = true;
        this.responsemessage = "Mohon Centang Recaptha";
      } else {
        this.recaptchaPreSend = true;
      }
    },
    async postComment() {
      let vm = this;
      this.commentIsPosting = true;

      var data = {
        msg: this.comment_message,
        customer_video_id: this.$route.params.video,
      };

      try {
        const res = await SingService.postComment(data);
        this.$auth.fetchUser().then(() => {
          localStorage.setItem("userdata", JSON.stringify(vm.$auth.user));
        });
        // console.log(res.data.poin);
        this.fetchComment();
        this.commentIsPosting = false;
        this.comment_message = null;
        this.recaptchaToken = null;
        this.recaptchaPreSend = false;
        if (res.data.poin > 0) {
          this.apakahbetul = true;
          this.type = "komen";
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
          this.loginModalVisible = true;
        } else {
          alert("error! " + error.message);
        }
        this.recaptchaPreSend = false;
      }
    },
  },
};
</script>
<style lang="scss">
.devider {
  position: relative;
  text-align: center;
  z-index: 0;
  &:before {
    content: "";
    width: 100%;
    z-index: -1;
    height: 1px;
    background: #000;
    opacity: 0.1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto 0;
  }
  span {
    padding: 0 10px;
    background: #303030;
  }
}
.statusquo {
  .active {
    color: var(--primary) !important;
    .v-image {
      filter: grayscale(0);
    }
  }
  .v-image {
    filter: grayscale(100%) invert(1);
  }
}
.star-comments .v-avatar {
  //border: 3px solid var(--primary);
  box-shadow: 0 0 0 3px var(--primary);
  p {
    font-size: 18px;
    margin-top: 0;
  }
}
video {
  max-width: 100% !important;
}
.hero-detailsing {
  .singmetaicons {
    .v-image {
      filter: invert(1);
      vertical-align: middle;
    }
  }
}
</style>

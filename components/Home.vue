<template>
  <div>
    <v-skeleton-loader v-if="articles==''" class="mx-auto mt-5" type="image"></v-skeleton-loader>

    <div v-if="articles">
      <!-- LATEST -->
      <client-only>
        <flickity ref="flickity" :options="flickityOptions">
          <div
            v-for="article in articles"
            :key="article.id"
            @click="$router.push(link(article))"
            class="featured-item"
          >
            <v-img :src="article.image.small" aspect-ratio="1" class="grey lighten-2"></v-img>
            <div class="caption">
              <div class="caption-inner">
                <strong>{{article.type == 'LAGU' ? 'MUSIK' : article.type}}</strong>
                <h2 class="mt-1">{{ article.title }}</h2>
              </div>
            </div>
          </div>
        </flickity>
      </client-only>
    </div>

    <!-- ADSENSE -->

    <!-- Ini nuxt-adsense : ini error -->
    <!-- <adsbygoogle
          :ad-style="{
            display: 'blok',
          }"
          ad-layout-key="-fb+5w+4e-db+86"
          ad-format="auto"
          ad-slot="2653891769"
          width="100%"
          height="100%"
    />-->

    <!-- Ini vue-adsense : ini jalan -->
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <InFeedAdsense
            data-ad-layout-key="-fb+5w+4e-db+86"
            data-ad-client="ca-pub-6581994114503986"
            data-ad-slot="2653891769"
          ></InFeedAdsense>
        </v-col>
      </v-row>
    </v-container>

    <v-skeleton-loader v-if="topviews.length==0" class="mx-auto" type="list-item-avatar-three-line"></v-skeleton-loader>
    <div v-if="topviews">
      <!-- PLAIN NEWS LOOP -->
      <div class>
        <v-container>
          <template v-for="(article, i) in topviews">
            <NewsLoop2
              :key="'article-top-'+i"
              :article="article"
              ADSlayoutKey="-fb+5w+4e-db+86"
              ADSclient="ca-pub-6581994114503986"
              ADSslot="2653891769"
              v-if="i < 6"
            />
          </template>

          <!-- TOP VIEWS -->
          <client-only>
            <v-row class="specuavg">
              <div class="thebg" :style="'background-image:url('+ activebg +')'"></div>
              <v-col cols="12">
                <flickity
                  class="pb-5 special"
                  v-if="specials.length > 0"
                  ref="flickity2"
                  :options="flickityOptions"
                >
                  <div style="width:100%" v-for="(article, i) in specials" :key="article.id">
                    <input type="hidden" :id="'bg-'+i" :value="article.image.small" />
                    <a :href="link(article)">
                      <v-img :src="article.image.small" :aspect-ratio="16/9" class="grey lighten-2"></v-img>
                    </a>
                    <div class="pt-3 dark" @click="$router.push(link(article))">
                      <strong>{{article.type == 'LAGU' ? 'MUSIK' : article.type}}</strong>
                      <h2 class="mt-1 text-18">{{ article.title }}</h2>
                    </div>
                  </div>
                </flickity>
                <div class="pa-5 text-center dark" v-else>Loading...</div>
              </v-col>
            </v-row>
          </client-only>

          <!-- END TOP VIEWS -->

          <template v-for="(article, i) in topviews">
            <NewsLoop2
              :key="'article-top-'+i"
              :article="article"
              ADSlayoutKey="-fb+5w+4e-db+86"
              ADSclient="ca-pub-6581994114503986"
              ADSslot="2653891769"
              v-if="i > 6"
            />
          </template>
          <v-row v-if="isMore">
            <v-col cols="12">
              <v-btn tile block depressed dark color="deep-orange" @click="loadMore(next)">Load More</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <!-- <div class="my-3">
              <div class="px-3">
                  <div class="text-capitalize d-flex justify-space-between">
                      <div>
                          Sixty
                      </div>
                      <v-btn
                      @click="$router.push('/sixty')"
                      icon
                      >
                          <v-icon>
                              mdi-arrow-right
                          </v-icon>
                      </v-btn>
                  </div>
                  <hr>
              </div>
              <TopViews :items="sixty" :isvideo="true"/>
      </div>-->
    </div>
  </div>
</template>

<script>
import ArticleService from "@/services/ArticleService.js";
import TopViews from "@/components/article/TopViews";
import NewsLoop from "@/components/common/NewsLoop";
import NewsLoop2 from "@/components/common/NewsLoop2";
import ShareButton from "@/components/common/ShareButton";
export default {
  name: "HomePage",
  props: ["items"],
  components: {
    TopViews,
    NewsLoop,
    NewsLoop2,
    ShareButton
  },
  data() {
    return {
      domainTitle: process.env.domainTitle,
      model: null,
      articles: [],
      topviews: [],
      specials: [],
      activebg: null,
      next: 2,
      isMore: true,
      toppoinbanner:
        "http://b16e2bab9e94a9d05089-aa7428b954372836cd8898750ce2dd71.r41.cf6.rackcdn.com/assets/frontend/images/banner-toppoin.jpg",
      garfik: "",
      mainCategories: {
        viral: null,
        sport: null,
        piknik: null,
        lagu: null,
        nonton: null,
        tekno: null
      },
      sixty: [],
      flickityOptions: {
        groupCells: 1,
        prevNextButtons: false,
        pageDots: true,
        wrapAround: true,
        adaptiveHeight: true
      },
      dataUrl: process.env.mobileUrl,
      dataTitle:
        "Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya! - " + process.env.domainTitle,
      // dataDescription: "Sumber konten VIRAL dari beragam informasi seperti Film, Musik, Olahraga, Travel, Teknologi. Tidak hanya itu, {{ domainTitle }} memberikan insentif dengan pengunjungnya dalam bentuk POIN. POIN bisa dikumpulkan atas interaksi memberikan Komentar, menjawab Quiz dan memberikan Star (Voting). Jumlah POIN yang cukup kemudian bisa ditukar dengan Reward",
      dataDescription: "Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya!"
    };
  },
  methods: {
    async fetchTopViews() {
      try {
        const res = await ArticleService.getTopViews(1);
        const items = res.data.data;
        items.forEach(element => {
          var link = element.link;
          if (link.includes("sixty")) {
            var slug = "/sixty" + element.link;
          } else {
            var slug = element.link;
          }
          var obj = {
            id: element.id,
            image: element.image,
            link: slug,
            title: element.title,
            type: element.type,
            published_at: element.published_at
          };
          this.topviews.push(obj);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchSpecial() {
      try {
        const res = await ArticleService.getSpecials();
        const items = res.data.data;
        items.forEach(element => {
          var link = element.link;
          if (link.includes("sixty")) {
            var slug = "/sixty" + element.link;
          } else {
            var slug = element.link;
          }
          var obj = {
            id: element.id,
            image: element.image,
            link: slug,
            title: element.title,
            type: element.type,
            published_at: element.publish_at
          };
          this.specials.push(obj);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async loadMore(n) {
      try {
        const res = await ArticleService.getTopViews(n);
        //console.log(JSON.parse(JSON.stringify(res.data.data)))
        const items = res.data.data;
        items.forEach(element => {
          var link = element.link;
          if (link.includes("sixty")) {
            var slug = "/sixty" + element.link;
          } else {
            var slug = element.link;
          }
          var obj = {
            id: element.id,
            image: element.image,
            link: slug,
            title: element.title,
            type: element.type,
            published_at: element.published_at
          };
          this.topviews.push(obj);
        });
        this.next += 1;
        // console.log(res.data.meta)
        if (res.data.meta.current_page == res.data.meta.last_page) {
          this.isMore = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchSixty() {
      try {
        const res = await ArticleService.getSixty();
        this.sixty = res.data.data.sixty;
        //console.log(JSON.parse(JSON.stringify(res.data)))
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPromotedNews() {
      try {
        const res = await ArticleService.getLatest();
        //console.log(JSON.parse(JSON.stringify(res.data.data)))
        this.articles = res.data.data;
        // if (res.data.data.length > 0) {
        this.$nextTick(function() {
          this.$refs.flickity.rerender();
        });
        // }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchTopPoin() {
      try {
        const res = await ArticleService.getTopPoin();
        //console.log(JSON.parse(JSON.stringify(res.data.data.ranked.garfik)))
        this.toppoinbanner = res.data.data.periode.banner.desktop;
        this.garfik = res.data.data.ranked.garfik;
      } catch (error) {
        console.log(error);
      }
    },
    link(article) {
      var url, cropped;
      if (article.link != process.env.mobileUrl + "sixty") {
        url = article.link;
        cropped = url.replace(process.env.baseUrl, "");
      } else {
        url = article.link_detail;
        cropped = url.replace(process.env.mobileUrl, "");
      }
      return cropped;
    },
    random() {
      return Math.random();
    }
  },
  mounted() {
    this.fetchPromotedNews();
    this.fetchTopViews();
    this.fetchSpecial();

    let vm = this;
    setTimeout(() => {
      vm.activebg = document.getElementById("bg-0").value;
      vm.$refs.flickity2.on("change", event => {
        //console.log(vm.$refs.flickity2.selectedIndex());
        let index = vm.$refs.flickity2.selectedIndex();
        vm.activebg = document.getElementById("bg-" + index).value;
        console.log(vm.activebg);
      });
    }, 2000);
  }
};
</script>

<style lang="scss">
.flickity-viewport {
  transition: height 0.2s;
}
.special {
  .flickity-page-dots {
    bottom: -10px !important;
  }
}
.dark {
  color: #fff;
}
.specuavg {
  position: relative;
  z-index: 1;
  margin-top: 30px;
  margin-bottom: 30px;
  padding-top: 50px;
  padding-bottom: 50px;
  .thebg {
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    z-index: -1;
    background-color: #000;
    transform: skewY(-5deg);
    overflow: hidden;
    background-size: cover !important;
    &:before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
      background: #000;
      //backdrop-filter: blur(10px);
      background-image: inherit;
      background-size: cover !important;
      filter: blur(20px);
      transform: scale(1.2);
    }
    &:after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 0;
      background: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>

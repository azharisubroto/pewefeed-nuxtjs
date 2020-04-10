<template>
    <div>
        <v-skeleton-loader v-if="articles==''"
          class="mx-auto mt-5"
          type="image"
        ></v-skeleton-loader>

        <div v-if="articles">
          <!-- LATEST -->
		  <client-only>
          <flickity ref="flickity" :options="flickityOptions">
            <div
            v-for="article in articles"
            :key="article.id"
            @click="$router.push(link(article))"
            class="featured-item">
              <v-img
                :src="article.image.small"
                aspect-ratio="1"
                class="grey lighten-2"
              ></v-img>
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
        /> -->

        <!-- Ini vue-adsense : ini jalan -->
        <v-container>
          <v-row no-gutters>
            <v-col cols="12">
              <InFeedAdsense
                data-ad-layout-key="-fb+5w+4e-db+86"
                data-ad-client="ca-pub-2254958995437488"
                data-ad-slot="2653891769">
              </InFeedAdsense>
            </v-col>
          </v-row>
        </v-container>

        <v-skeleton-loader v-if="topviews.length==0"
          class="mx-auto"
          type="list-item-avatar-three-line"
        ></v-skeleton-loader>
        <div v-if="topviews">
          <!-- TOP VIEWS -->
          <div class="">
            <v-container>
              <NewsLoop
                :items="topviews"
                ADSlayoutKey="-fb+5w+4e-db+86"
                ADSclient="ca-pub-2254958995437488"
                ADSslot="2653891769"
              />
              <v-row v-if="isMore">
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
          </div> -->
        </div>
    </div>
</template>

<script>
import ArticleService from '@/services/ArticleService.js'
import TopViews from '@/components/article/TopViews'
import NewsLoop from '@/components/common/NewsLoop'
import ShareButton from '@/components/common/ShareButton'
export default {
    name:"HomePage",
    props: ["items"],
    components: {
        TopViews,
        NewsLoop,
        ShareButton
    },
    data() {
        return {
            domainTitle: process.env.domainTitle,
            model: null,
            articles: [],
            topviews: [],
            next: 2,
            isMore: true,
            toppoinbanner: 'http://b16e2bab9e94a9d05089-aa7428b954372836cd8898750ce2dd71.r41.cf6.rackcdn.com/assets/frontend/images/banner-toppoin.jpg',
            garfik: '',
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
              wrapAround: true
            },
            dataUrl: process.env.mobileUrl,
            dataTitle: "Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya! - Playworld",
            // dataDescription: "Sumber konten VIRAL dari beragam informasi seperti Film, Musik, Olahraga, Travel, Teknologi. Tidak hanya itu, {{ domainTitle }} memberikan insentif dengan pengunjungnya dalam bentuk POIN. POIN bisa dikumpulkan atas interaksi memberikan Komentar, menjawab Quiz dan memberikan Star (Voting). Jumlah POIN yang cukup kemudian bisa ditukar dengan Reward",
            dataDescription: "Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya!",
        }
    },
    methods: {
        async fetchTopViews() {
            try {
                const res = await ArticleService.getTopViews(1)
                const items = res.data.data
                items.forEach(element => {
                  var link = element.link
                  if( link.includes('sixty') ) {
                    var slug = '/sixty'+element.link
                  } else {
                    var slug = element.link
                  }
                  var obj = {
                    id: element.id,
                    image: element.image,
                    link: slug,
                    title: element.title,
                    type: element.type,
                    published_at: element.published_at
                  }
                  this.topviews.push(obj)
                });
            } catch (error) {
                console.log(error)
            }
        },
        async loadMore(n) {
          try {
                const res = await ArticleService.getTopViews(n)
                //console.log(JSON.parse(JSON.stringify(res.data.data)))
                const items = res.data.data
                items.forEach(element => {
                  var link = element.link
                  if( link.includes('sixty') ) {
                    var slug = '/sixty'+element.link
                  } else {
                    var slug = element.link
                  }
                  var obj = {
                    id: element.id,
                    image: element.image,
                    link: slug,
                    title: element.title,
                    type: element.type,
                    published_at: element.published_at
                  }
                  this.topviews.push(obj)
                });
                this.next += 1
                // console.log(res.data.meta)
                if (res.data.meta.current_page == res.data.meta.last_page) {
                  this.isMore = false;
                }
            } catch (error) {
                console.log(error)
            }
        },
        async fetchSixty() {
            try {
                const res = await ArticleService.getSixty()
                this.sixty = res.data.data.sixty
                //console.log(JSON.parse(JSON.stringify(res.data)))
            } catch (error) {
                console.log(error)
            }
        },
        async fetchPromotedNews() {
            try {
                const res = await ArticleService.getLatest()
                //console.log(JSON.parse(JSON.stringify(res.data.data)))
                this.articles = res.data.data
                // if (res.data.data.length > 0) {
                  this.$nextTick(function() {
                    this.$refs.flickity.rerender();
                  });
                // }
            } catch (error) {
                console.log(error)
            }
        },
        async fetchTopPoin() {
            try {
                const res = await ArticleService.getTopPoin()
                //console.log(JSON.parse(JSON.stringify(res.data.data.ranked.garfik)))
                this.toppoinbanner = res.data.data.periode.banner.desktop
                this.garfik = res.data.data.ranked.garfik
            } catch (error) {
                console.log(error)
            }
        },
        link(article) {
            var url, cropped
            if( article.link != process.env.mobileUrl + 'sixty' ) {
                url = article.link
                cropped = url.replace(process.env.baseUrl, '')
            } else {
                url = article.link_detail
                cropped = url.replace(process.env.mobileUrl, '')
            }
            return cropped
        },
        random() {
          return Math.random()
        }
    },
    mounted() {
        this.fetchPromotedNews()
        this.fetchTopViews()
    }
}
</script>

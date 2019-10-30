<template>
    <div>
        <!-- LATEST -->
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
                <strong>{{article.type}}</strong>
                <h2 class="mt-1">{{ article.title }}</h2>
              </div>
            </div>
          </div>
        </flickity>

        <!-- TOP VIEWS -->
        <div class="mt-5">
          <v-container>
            <Terbaru :items="topviews"/>
            <v-row>
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
</template>

<script>
import ArticleService from '@/services/ArticleService.js'
import TopViews from '@/components/article/TopViews'
import Terbaru from '@/components/article/Terbaru'
export default {
    name:"HomePage",
    components: {
        TopViews,
        Terbaru
    },
    data() {
        return {
            model: null,
            articles: [],
            topviews: [],
            next: 2,
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
            }

        }
    },
    methods: {
        async fetchTopViews() {
            try {
                const res = await ArticleService.getTopViews(1)
                console.log(JSON.parse(JSON.stringify(res.data.data)))
                this.topviews = res.data.data
            } catch (error) {
                console.log(error)
            }
        },
        async loadMore(n) {
          try {
                const res = await ArticleService.getTopViews(n)
                //console.log(JSON.parse(JSON.stringify(res.data.data)))
                var newData = res.data.data
                newData.forEach(element => {
                  this.topviews.push(element)
                });
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
                this.$nextTick(function() {
                  this.$refs.flickity.rerender();
                });
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
            if( article.link != 'https://m.playworld.id/sixty' ) {
                url = article.link
                cropped = url.replace('https://playworld.id/', '')
            } else {
                url = article.link_detail
                cropped = url.replace('https://m.playworld.id/', '')
            }
            return cropped
        },
        random() {
          return Math.random()
        }
    },
    created() {
        this.fetchPromotedNews()
        this.fetchTopPoin()
        this.fetchTopViews()
        this.fetchSixty()
    }
}
</script>

<style lang="scss">
    .v-slide-group.v-item-group > .v-slide-group__next, .v-slide-group.v-item-group > .v-slide-group__prev {
        display: none;
    }
    .promo_news .promo_caption {
        position: absolute;
        bottom: 0;
        margin: 10px;
    }
    .juara {
        font-size: 20px;
    }
    .featured-item {
      width: 100%;
      text-align:center;
      height: 40vh;
      background: #000;
      color: #fff;
      position: relative;
      .caption {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0,0,0,.7);
        .caption-inner {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
          right: 0;
          margin: 0 auto;
          padding: 30px;
          h2 {
            font-weight: 900;
            font-size: 24px;
            line-height: 1.3
          }
        }
      }
    }
    .flickity-page-dots {
      bottom: 20px!important;
      .dot {
        background: #fff;
        opacity: .5;
        width: 7px;
        height: 7px;
      }
    }
    .dot.is-selected {
      background-color: var(--primary)
    }
</style>

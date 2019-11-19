<template>
    <div>
        <v-skeleton-loader v-if="articles==''"
          class="mx-auto mt-5"
          type="image"
        ></v-skeleton-loader>

        <div v-if="articles">
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
        </div>

        <!-- SHARE BUTTON -->
        <ShareButton
          :dataUrl="shareUrl"
        />

        <v-skeleton-loader v-if="topviews.length==0"
          class="mx-auto"
          type="list-item-avatar-three-line"
        ></v-skeleton-loader>
        <div v-if="topviews">
          <!-- TOP VIEWS -->
          <div class="">
            <v-container>
              <NewsLoop :items="topviews"/>
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
    components: {
        TopViews,
        NewsLoop,
        ShareButton
    },
    data() {
        return {
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
            shareUrl: "https://ssr.playworld.id"

        }
    },
    methods: {
        async fetchTopViews() {
            try {
                const res = await ArticleService.getTopViews(1)
                console.log(JSON.parse(JSON.stringify(res.data.data)))
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
                var newData = res.data.data
                newData.forEach(element => {
                  this.topviews.push(element)
                });
                this.next += 1
                if (res.data.pagination.current_page == res.data.pagination.last_page) {
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
    mounted() {
        this.fetchPromotedNews()
        this.fetchTopViews()
    }
}
</script>

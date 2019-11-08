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
        <ShareButton />

        <v-skeleton-loader v-if="articleList.length==0"
          class="mx-auto mt-5"
          type="list-item-avatar-three-line"
        ></v-skeleton-loader>
        <div v-if="articleList">
          <div class="mt-5">
            <v-container>
              <Terbaru :items="articleList"/> 
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
        </div>
    </div>
</template>

<script>
import ArticleService from '@/services/ArticleService.js'
import TopViews from '@/components/article/TopViews'
import Terbaru from '@/components/article/Terbaru'
import ShareButton from '@/components/common/ShareButton'
export default {
    name:"HomePage",
    components: {
        TopViews,
        Terbaru,
        ShareButton
    },
    data() {
        return {
            model: null,
            articles: [],
            articleList: [],
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
            }

        }
    },
    methods: {
        async fetchArticle() {
            try {
                const res = await ArticleService.getListArticleByCategory(this.$route.params.cat)
                // console.log(JSON.parse(JSON.stringify(res.data.data)))
                const items = res.data.data.article
                items.forEach(article => {
                    var slug = article.link
                        slug = slug.replace('https://playworld.id/', '')
                    var obj = {
                        image: article.image,
                        link: slug,
                        title: article.title,
                        type: article.type,
                        published_at: article.publish_at
                    }
                    this.articleList.push(obj)
                });

            } catch (error) {
                console.log(error)
            }
        },
        async loadMore(n) {
          try {
                const res = await ArticleService.getListArticleByCategory(this.$route.params.cat + '?page=' + n)
                // console.log(JSON.parse(JSON.stringify(res.data)))
                var newData = res.data.data.article
                newData.forEach(element => {
                  this.articleList.push(element)
                });
                this.next += 1
                if (res.data.pagination.current_page == res.data.pagination.last_page) {
                  this.isMore = false;
                }
            } catch (error) {
                console.log(error)
            }
        },
        async fetchTrending() {
            try {
                const res = await ArticleService.getTrendingArticleByCategory(this.$route.params.cat)
                console.log(JSON.parse(JSON.stringify(res.data.data)))
                this.articles = res.data.data.article
                // if (res.data.data.length > 0) {
                  this.$nextTick(function() {
                    this.$refs.flickity.rerender();
                  });
                // }
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
        this.fetchArticle()
        this.fetchTrending()
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
        background: #fff!important;
        opacity: .5!important;
        width: 7px!important;
        height: 7px!important;
        &.is-selected {
          background-color: var(--primary)!important;
          opacity:1!important;
        }
      }
    }
</style>

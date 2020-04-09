<template>
    <div>
        <v-skeleton-loader v-if="comics==''"
          class="mx-auto mt-5"
          type="image"
        ></v-skeleton-loader>

        <div v-if="comics">
          <!-- LATEST -->
          <flickity ref="flickity" :options="flickityOptions">
            <div
            v-for="comic in comics"
            :key="comic.id"
            @click="$router.push('/komik/' + comic.category.toLowerCase() + '/' + comic.slug)"
            class="featured-item">
              <v-img
                :src="comic.thumbnail"
                aspect-ratio="1"
                class="grey lighten-2"
              ></v-img>
              <div class="caption">
                <div class="caption-inner">
                  <strong>{{'KOMIK/' + comic.category}}</strong>
                  <h2 class="mt-1">{{ comic.title }}</h2>
                </div>
              </div>
            </div>
          </flickity>
        </div>

        <!-- ADSENSE -->
        <v-container>
          <v-row no-gutters>
            <v-col cols="12">
              <InFeedAdsense
                data-ad-layout-key="-fb+5w+4e-db+86"
                data-ad-client="ca-pub-6581994114503986"
                data-ad-slot="6012011839">
              </InFeedAdsense>
            </v-col>
          </v-row>
        </v-container>
        <!-- END ADSENSE -->

        <v-skeleton-loader v-if="comicList.length==0"
          class="mx-auto mt-5"
          type="list-item-avatar-three-line"
        ></v-skeleton-loader>
        <div>
          <div class="">
            <v-container>

              <!-- KATEGORI KOMIK -->
              <v-row>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="categories"
                    name="category"
                    v-model="category"
                    item-text="name"
                    item-value="id"
                    label="Kategori"
                    dense
                    outlined
                    @change="filter(category)"
                  ></v-select>
                </v-col>
              </v-row>

              <!-- DAFTAR KOMIK -->
              <div v-if="total > 0">
                <ListComic
                  :items="comicList"
                  ADSlayoutKey="-fb+5w+4e-db+86"
                  ADSclient="ca-pub-6581994114503986"
                  ADSslot="6012011839"
                />

                <!-- LOAD MORE -->
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
              </div>

              <!-- JIKA KOSONG -->
              <div v-else align="center">
                <v-container>
                  <strong>
                    BELUM ADA KOMIK
                  </strong>
                </v-container>
              </div>
            </v-container>
          </div>
        </div>
    </div>
</template>

<script>
import ComicService from '@/services/ComicService.js'
import ListComic from '@/components/comic/ListComic'
import ShareButton from '@/components/common/ShareButton'
export default {
    name:"Comic",
    props:["respon", "title", "description"],
    components: {
        ListComic,
        ShareButton
    },
    data() {
        return {
            model: null,
            comics: [],
            comicList: [],
            categories: [],
            category: 0,
            next: 2,
            isMore: true,
            sixty: [],
            total: 0,
            flickityOptions: {
              groupCells: 1,
              prevNextButtons: false,
              pageDots: true,
              wrapAround: true
            },
            dataUrl: process.env.mobileUrl + "komik",
            dataTitle: this.title,
            dataDescription: this.description,
        }
    },
    methods: {
        async fetchComic(id) {
            try {
                var res = await ComicService.getAll(id)
                var items = res.data.data.content
                this.total = res.data.pagination.total
                // console.log(JSON.parse(JSON.stringify(res.data.data)))
                items.forEach(comic => {
                    var slug = comic.slug
                    var obj = {
                        image: comic.thumbnail,
                        link: slug,
                        title: comic.title,
                        category: comic.category,
                        rating: comic.rating,
                        type: 'KOMIK/' + comic.category,
                        created_at: comic.created_at
                    }
                    this.comicList.push(obj)
                });

            } catch (error) {
                console.log(error)
            }
        },
        async fetchCategory() {
          try {
            const res = await ComicService.getAllCategory()
            this.categories = res.data.data.category
            var obj = {
              active: true,
              id: 0,
              name: "ALL",
              created_at: "2019-05-02"
            }
            this.categories.push(obj)
            console.log('ini respon : ')
            console.log(this.categories)
          } catch (error) {
            console.log(error)
          }
        },
        async loadMore(n) {
          try {
                const res = await ComicService.getAll(this.category + '?page=' + n)
                // console.log(JSON.parse(JSON.stringify(res.data)))
                var newData = res.data.data.content
                newData.forEach(comic => {
                  var slug = comic.slug
                  var obj = {
                      image: comic.thumbnail,
                      link: slug,
                      title: comic.title,
                      category: comic.category,
                      rating: comic.rating,
                      type: 'KOMIK/' + comic.category,
                      created_at: comic.created_at
                  }
                  this.comicList.push(obj)
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
                const res = await ComicService.getTrending()
                this.comics = res.data.data.content
                // if (res.data.data.length > 0) {
                  this.$nextTick(function() {
                    this.$refs.flickity.rerender();
                  });
                // }
            } catch (error) {
                console.log(error)
            }
        },
        async filter(category) {
          try {
            this.fetchComic(category)
            this.category = category
          } catch (error) {
            console.log(error)
          }
        }
    },
    mounted() {
        this.fetchComic(0)
        this.fetchTrending()
        this.fetchCategory()
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

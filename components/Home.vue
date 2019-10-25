<template>
    <div>
        <div class="promo_news">
            <v-row class="mx-0">
              <template v-for="(article, i) in articles">
                <v-col
                :cols="i == 0 ? '12' : '6'"
                class="pa-0"
                :key="'promo-'+i">
                  <div
                    color="grey lighten-1"
                    class="ma-0 flex"
                    :elevation="0"
                    flex
                    @click="$router.push(link(article))"
                    >
                        <v-img :src="article.image.small" :aspect-ratio="i == 0 ? 16/9 : 2/2.5">
                            <div class="align-end white promo_caption pa-2 text--light gray">
                                <div style="font-size:14px;background:#fff" class="mb-2">{{article.title}}</div>
                                <div class="grey--text text--darken-1 caption"><v-icon :size="12">mdi-clock</v-icon> {{article.published_at}}</div>
                            </div>
                        </v-img>
                    </div>
                </v-col>
              </template>
            </v-row>
        </div>

        <div
        v-for="(cat, key, i) in mainCategories"
        :key="'cat-'+i"
        class="my-3">
            <div class="px-3">
                <div class="text-capitalize d-flex justify-space-between">
                    <div>
                        {{key}}
                    </div>
                    <v-btn
                    @click="$router.push('/'+key)"
                    icon
                    >
                        <v-icon>
                            mdi-arrow-right
                        </v-icon>
                    </v-btn>
                </div>
                <hr>
            </div>
            <TopViews :items="cat"/>
        </div>

        <div class="my-3">
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
        </div>
    </div>
</template>

<script>
import ArticleService from '@/services/ArticleService.js'
import TopViews from '@/components/article/TopViews'

export default {
    name:"HomePage",
    components: {
        TopViews
    },
    data() {
        return {
            model: null,
            articles: [],
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
            sixty: []

        }
    },
    methods: {
        async fetchTopViews() {
            try {
                const res = await ArticleService.getTopViews()
                console.log(JSON.parse(JSON.stringify(res.data)))
                this.mainCategories.viral = res.data.viral
                this.mainCategories.sport = res.data.sport
                this.mainCategories.piknik = res.data.piknik
                this.mainCategories.lagu = res.data.lagu
                this.mainCategories.nonton = res.data.nonton
                this.mainCategories.tekno = res.data.tekno
            } catch (error) {
                console.log(error)
            }
        },
        async fetchSixty() {
            try {
                const res = await ArticleService.getSixty()
                this.sixty = res.data.data.sixty
                console.log(JSON.parse(JSON.stringify(res.data)))
            } catch (error) {
                console.log(error)
            }
        },
        async fetchPromotedNews() {
            try {
                const res = await ArticleService.getPromotedNews()
               // console.log(JSON.parse(JSON.stringify(res.data.article)))
                this.articles = res.data.article
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

<style>
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
</style>

<template>
    <div>
        <div class="promo_news">
            <v-slide-group
                v-model="model"
                class="pb-5">
                <v-slide-item
                    v-for="(article, i) in articles"
                    :key="'promo-'+i"
                >
                    <v-card
                    color="grey lighten-1"
                    class="ma-3 flex"
                    width="200"
                    height="250"
                    :elevation="3"
                    flex
                    @click="$router.push(link(article))"
                    >
                        <v-img :src="article.image" :aspect-ratio="2/2.5">
                            <div class="align-end white promo_caption pa-2 text--light gray">
                                <div style="font-size:14px;background:#fff" class="mb-2">{{article.title}}</div>
                                <div class="grey--text text--darken-1 caption"><v-icon :size="12">mdi-clock</v-icon> {{article.published_at}}</div>
                            </div>
                        </v-img>
                    </v-card>
                </v-slide-item>
            </v-slide-group>
        </div>


        <div class="py-3 white">
            <v-container>
                <v-row>
                    <v-col cols="12"><h4>TOP POIN</h4></v-col>
                    <v-img :src="toppoinbanner"></v-img>
                </v-row>
            </v-container>
            <v-list three-line>
                <template v-for="(item, index) in garfik">
                    <v-list-item
                    :key="item.name+'-'+index"
                    >
                    <v-btn class="mr-4 juara" fab dark small color="deep-orange">
                        {{ index + 1 }}
                    </v-btn>

                    <v-list-item-content>
                        <v-list-item-title v-html="item.name"></v-list-item-title>
                        <v-list-item-subtitle>Total Poin: <strong class="text--green">{{ item.total_poin }}</strong></v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>

            <v-container>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-btn block outlined color="deep-orange">
                            Lihat Peringkat Kamu
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>

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
            <TopViews :items="sixty"/>
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
                viral: [],
                sport: [],
                piknik: [],
                lagu: [],
                nonton: [],
                tekno: []
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
                //console.log(res.data.article)
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

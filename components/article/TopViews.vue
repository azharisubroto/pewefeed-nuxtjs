<template>
    <v-slide-group
        class="pb-5 promo_news">
        <v-slide-item
            v-for="(article, i) in items"
            :key="'promo-'+i"
        >
            <v-card
            color="grey lighten-1"
            class="ma-3 flex"
            width="200"
            height="250"
            :elevation="3"
            flex
            @click="$router.push(link(article)).catch(err=>{})"
            >
                <v-img :src="article.image ? article.image : article.thumbnail" :aspect-ratio="2/2.5">
                    <div class="align-end white promo_caption pa-2 text--light gray">
                        <div style="font-size:14px;background:#fff" class="mb-2">{{article.title}}</div>
                        <div class="grey--text text--darken-1 caption"><v-icon :size="12">mdi-clock</v-icon> {{article.publish_at}}</div>
                    </div>
                </v-img>
            </v-card>
        </v-slide-item>
    </v-slide-group>
</template>
<script>
//import ArticleService from '@/services/ArticleService.js'
export default {
    name:"TopViews",
    props: ['items'],
    methods: {
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
    }
}
</script>

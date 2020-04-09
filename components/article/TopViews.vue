<template>
    <div class="pb-5 promo_news scroller">
        <div
            class="carousel-cell"
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
            @click="$router.push(link(article))"
            >
              <v-icon dark v-if="isvideo" :size="30" class="playbutton">mdi-play-circle-outline</v-icon>
              <v-img :src="article.image ? article.image.small : article.thumbnail" :aspect-ratio="2/2.5">
                  <div class="align-end white promo_caption pa-2 text--light gray">
                      <div style="font-size:14px;background:#fff" class="mb-2">{{article.title}}</div>
                      <div class="grey--text text--darken-1 caption"><v-icon :size="12">mdi-clock</v-icon> {{article.publish_at}}</div>
                  </div>
              </v-img>
            </v-card>
        </div>
    </div>
</template>
<script>
export default {
    name:"TopViews",
    data() {
      return {
        flickityOptions: {
          prevNextButtons: false,
          pageDots: false,
          wrapAround: true
        }
      }
    },
    props:{
      items: Array,
      isvideo: Boolean
    },
    methods: {
      link(article) {
        var url, cropped
        if( article.link != process.env.baseUrl + 'sixty' ) {
            url = article.link
            cropped = url.replace(process.env.baseUrl, '')
        } else {
            url = article.link_detail
            cropped = url.replace(process.env.baseUrl, '')
        }
        return cropped
      }
    }
}
</script>

<style lang="scss">
  .playbutton {
    position: absolute;
    top: 10px;
    left: 10px;
    color: #fff;
    z-index: 2000;
  }
</style>

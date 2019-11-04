<template>
  <div>
    <v-row
      class="topview-item"
      v-for="(article, i) in items"
      :key="'topview-'+article.id+'-'+i"
      @click="$router.push(article.link)"
    >
      <v-col cols="4">
        <v-img
          :src="article.image.small"
          aspect-ratio="1"
          class="grey lighten-2"
        >
          <v-icon
          dark
          size="35"
          class="playbutton"
          v-if="isSixty(article.title)">
            mdi-play-circle-outline
          </v-icon>
        </v-img>
      </v-col>
      <v-col cols="8" class="d-flex align-content-space-between flex-wrap">
          <h2>{{article.title}}</h2>
          <div class="meta text--gray" style="font-size:12px;">
            <span :class="article.type">{{ isSixty(article.title) ? 'SIXTY/' : ''}}</span>
            <span :class="article.type">{{article.type}}</span> - {{article.published_at ? article.published_at : article.publish_at}}
          </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name:"Terbaru",
  props: ['items'],
  methods: {
    link(article) {
        var url, cropped
        if( article.link != 'https://m.playworld.id/sixty' ) {
            url = article.link
            cropped = url.replace('https://playworld.id', '')
        } else {
            url = article.link_detail
            cropped = url.replace('https://m.playworld.id', '')
        }
        return cropped
    },
    isSixty(title) {
      if( title.indexOf('SIXTY') >= 0 ) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

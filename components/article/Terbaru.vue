<template>
  <div>
    <v-row
      class="topview-item"
      v-for="(article, i) in items"
      :key="'topview-'+article.id+'-'+i"
      @click="$router.push(link(article))"
    >
      <v-col cols="4">
        <v-img
          :src="article.image.small"
          aspect-ratio="1"
          class="grey lighten-2"
        ></v-img>
      </v-col>
      <v-col cols="8" class="d-flex align-content-space-between flex-wrap">
          <h2>{{article.title}}</h2>
          <div class="meta text--gray" style="font-size:12px;">
            <span :class="article.type">{{article.type}}</span> - {{article.published_at}}
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
  }
}
</script>

<style lang="scss">
  .topview-item {
    h2 {
      font-size: 16px;
      font-weight: normal;
      line-height: 1.3
    }
    .VIRAL{color:var(--VIRAL)}
    .SPORT{color:var(--SPORT)}
    .PIKNIK{color:var(--PIKNIK)}
    .LAGU{color:var(--LAGU)}
    .NONTON{color:var(--NONTON)}
    .TEKNO{color:var(--TEKNO)}
  }
</style>

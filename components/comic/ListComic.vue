<template>
  <div>
    <v-row
      :class="['topview-item ', comic.class ? comic.class : '']"
      v-for="(comic, i) in items"
      :key="'topview-'+comic.id+'-'+i"
      @click="$router.push('/komik/' + comic.category.toLowerCase() + '/' + comic.link)"
    >
      <v-col cols="12" v-if="(i%5 == 0) && (i != 0)">
        <!-- ADSENSE -->
        <InFeedAdsense
          :data-ad-layout-key="ADSlayoutKey"
          :data-ad-client="ADSclient"
          :data-ad-slot="ADSslot">
        </InFeedAdsense>
      </v-col>
      <v-col cols="4">
        <v-img
          :src="comic.image"
          aspect-ratio="1"
          class="grey lighten-2"
        >
            <v-img
            dark
            src="/img/gallery-layout.png"
            width="35"
            style="border-radius: 0px !important"
            class="playbutton"></v-img>
            </v-img>
      </v-col>
      <v-col cols="8" class="d-flex align-content-space-between flex-wrap">
          <div class="w-100">
            <h2>{{comic.title}}</h2>
            <v-rating
                :value="rate(comic.rating)"
                background-color="orange"
                color="orange"
                dense
                half-increments
                hover
                size="18"
                readonly
            ></v-rating>
          </div>
          <div class="meta text--gray w-100" style="font-size:12px;">
            <span class="comic">{{comic.type}}</span> - {{comic.created_at}}
          </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name:"ListComic",
  props: ['items','ADSlayoutKey','ADSclient','ADSslot'],
  methods: {
    rate(rating) {
      return rating / 20
    }
  }
}
</script>

<style lang="scss">
  .comic {
    color: #FF9800;
  }
  .w-100 {
    width: 100%;
  }
</style>

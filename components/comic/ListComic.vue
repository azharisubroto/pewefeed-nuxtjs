<template>
  <div>
    <v-row
      :class="['topview-item ', comic.class ? comic.class : '']"
      v-for="(comic, i) in items"
      :key="'topview-'+comic.id+'-'+i"
      @click="$router.push('/komik/' + comic.category.toLowerCase() + '/' + comic.link)"
    >
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
            class="playbutton"></v-img>
            </v-img>
      </v-col>
      <v-col cols="8" class="d-flex align-content-space-between flex-wrap">
          <h2 class="mr-10">{{comic.title}}</h2>
          <div class="meta text--gray" style="font-size:12px;">
            <span class="comic">{{comic.type}}</span> - {{comic.created_at}}
          </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name:"ListComic",
  props: ['items'],
}
</script>

<style lang="scss">
  .comic {
    color: #FF9800;
  }
</style>

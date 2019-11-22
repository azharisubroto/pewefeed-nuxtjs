<template>
  <section>
    <!-- SLIDER -->
    <v-skeleton-loader v-if="hero_is_fetching"
      class="mx-auto mt-5"
      type="image"
    ></v-skeleton-loader>
    <HeroSlide v-if="hero_items.length > 0 && !hero_is_fetching" :items="hero_items"/>
    <!-- END SLIDER -->

    <!-- SHARE BUTTON -->
    <ShareButton
      :sharingUrl="dataUrl"
      :sharingTitle="dataTitle"
      :sharingDescription="dataDescription"
    />
    <!-- END SHARE BUTTON -->

    <!-- TERBARU -->
    <v-container class="pb-0">
      <v-row>
        <v-col cols="12" class="pb-0">
          <v-select
            :items="categories"
            label="Kategori"
            item-text="name"
            item-value="id"
            outlined
            v-model="catpick"
            @change="fetchLatest(catpick)"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
    <v-skeleton-loader v-if="latests_is_loading"
      class="mx-auto mt-5"
      type="list-item-avatar-three-line"
    ></v-skeleton-loader>
    <v-container>
      <v-row class="minheight">
        <v-col cols="12" v-if="latests.length > 0 && !latests_is_loading">
          <NewsLoop :items="latests"/>
        </v-col>
      </v-row>
    </v-container>
    <!-- END TERBARU -->
  </section>
</template>

<script>
import HeroSlide from '@/components/common/HeroSlide'
import ShareButton from '@/components/common/ShareButton'
import NewsLoop from '@/components/common/NewsLoop'
import FaktaService from '@/services/FaktaService'

export default {
  name: "FaktaHome",
  components: {
    HeroSlide,
    ShareButton,
    NewsLoop
  },
  data() {
    return {
      hero_items: [],
      hero_is_fetching: true,
      latests: [],
      latests_is_loading: true,
      categories: [],
      catpick: 0,
      dataUrl: "https://m.playworld.id/fakta",
      dataTitle: "Tonton Video FAKTA, Kumpulin Poinnya, Dapetin Hadiahnya! - Playworld",
      dataDescription: "Sumber konten VIRAL dari beragam informasi seperti Film, Musik, Olahraga, Travel, Teknologi. Tidak hanya itu, PLAYWORLD.ID memberikan insentif dengan pengunjungnya dalam bentuk POIN. POIN bisa dikumpulkan atas interaksi memberikan Komentar, menjawab Quiz dan memberikan Star (Voting). Jumlah POIN yang cukup kemudian bisa ditukar dengan Reward",
    }
  },
  methods: {
    async getCategory() {
      try {
        const res = await FaktaService.getCategory()
        //console.log(res.data.data.category)
        this.categories = res.data.data.category
      } catch (error) {
        console.log(error)
      }
    },
    async fetchSlide() {
      try {
        const res = await FaktaService.getSlide()
        const items = res.data.data.content
        //console.log(res.data.data.content)
        if( items ) {
          var itemArr = []
          items.forEach(el => {
            var obj = {
              id: el.id,
              title: el.title,
              link: '/fakta/detail/'+el.slug,
              image: el.thumbnail,
              type: 'FAKTA/'+el.category,
            }
            itemArr.push(obj)
          });

          this.hero_items = itemArr
          this.hero_is_fetching = false
        }
      } catch (error) {
        console.log(error)
        this.hero_is_fetching = false
      }
    },
    async fetchLatest(cat) {
      this.latests_is_loading = true
      var category = cat ? cat : 0
      try {
        const res = await FaktaService.getLatest(cat)
        console.log(res.data.data.content)
        const articles = res.data.data.content

        var latests = []
        articles.forEach(el => {
          var obj = {
            image: {
              small: el.thumbnail
            },
            link: '/fakta/detail/'+el.slug,
            title: el.title,
            type: 'FAKTA/'+el.category,
            published_at: el.created_at,
            isVideo: true,
            rating: el.rate,
          }
          latests.push(obj)
        });

        this.latests = latests
        this.latests_is_loading = false
      } catch (error) {
        console.log(error)
        this.latests_is_loading = false
      }
    }
  },
  mounted() {
    this.getCategory()
    this.fetchSlide()
    this.fetchLatest()
  }
}
</script>

<style lang="scss">
  .minheight {
    min-height: 500px
  }
</style>

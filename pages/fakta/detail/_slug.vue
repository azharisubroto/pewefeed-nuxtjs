<template>
  <section>
    <v-skeleton-loader v-if="!item || item=='' || item.length == 0 "
      class="mx-auto mt-5"
      type="list-item-avatar-three-line, image, article"
    ></v-skeleton-loader>
    <FaktaDetail :article="item"/>
  </section>
</template>

<script>
import FaktaService from '@/services/FaktaService'
import FaktaDetail from '@/components/fakta/FaktaDetail'

export default {
  name:"PageFaktaDetail",
  components: {
    FaktaDetail
  },
  data() {
    return {
      item: this.$store.state.item,
      origin: this.$store.state.host,
    }
  },
  async fetch ({ store, params }) {
    //console.log('fetch this')
    //console.log(params.slug)
    let item = await FaktaService.getDetail(params.slug)
    .then(res => {
      console.log(JSON.parse(JSON.stringify(res.data.data)))
      return res.data.data.content
    })
    store.commit('SET_ITEM', item)
  },
  head () {
    let host = this.origin
    var url = 'https://' + host + '/fakta/detail/' + this.item.slug
    return {
      title: this.item.title,
      meta: [
        {hid: 'description', property: 'description', content: this.item.short_content},
        {hid: 'keywords', name: 'keywords', content: process.env.domainTitle + ', ' + process.env.title + ', Play, Main, hiburan, entertainment, entertain, komedi, lucu, ngakak, buset, ngetrend, trend, trending, juara, apa, fokus, nyeleneh, selfie, asik, seru, instagram, facebook, google, twitter, serem, teknologi, tekno, mewah, pacar, gebetan, cinta, romantis, hadiah, undian, unik, artis, selebriti, startup, jayadata, indonesia, jakarta, bandung, musik, film, olahraga, techno, kreatif, travel, event, bisnis, gaul, hewan, komunitas, otomotif, makanan, dunia, gaya, kesehatan, lingkungan, sains'},
        // Facebok
        {hid: 'og:title', name: 'og:title', content: this.item.title},
        {hid: 'og:description', name: 'og:description', content: this.item.short_content},
        {hid: 'og:type', name: 'og:type', content: 'website'},
        {hid: 'og:url', name: 'og:url', content: url},
        {hid: 'og:image', name: 'og:image', content: this.item.thumbnail},
        {hid: 'og:locale', name: 'og:locale', content: 'id_ID'},
        {hid: 'og:site_name', name: 'og:site_name', content: process.env.domainTitle},

        // Twitter
        {hid: 'twitter:card', name: 'twitter:card', content: 'summary'},
        {hid: 'twitter:creator', name: 'twitter:creator', content: '@' + process.env.twitter},
        {hid: 'twitter:site', name: 'twitter:site', content: '@' + process.env.twitter},
        {hid: 'twitter:title', name: 'twitter:title', content: this.item.title},
        {hid: 'twitter:description', name: 'twitter:description', content: this.item.title},
        {hid: 'twitter:image', name: 'twitter:image', content: this.item.thumbnail},
      ]
    }
  }
}
</script>

<template>
  <Comic :respon="item"/>
</template>

<script>
import Comic from '@/components/comic/Comic';
import ComicService from '@/services/ComicService'

export default {
  components: {
    Comic,
  },
  data() {
    return {
      item: this.$store.state.item,
      origin: this.$store.state.host,
    }
  },
  async fetch ({ store, params }) {
    //console.log('fetch this')
    //console.log(params.articleslug)
    let item = await ComicService.getAll(0)
    .then(res => {
      return res.data.data
    })
    .catch(err => {
        console.log(err)
    })
    store.commit('SET_ITEM', item)
    console.log(JSON.parse(JSON.stringify(item)))
  },
  head () {
    let host = this.origin
    var url = 'https://' + host + '/comic'
    return {
      title: 'Komik',
      meta: [
        // Facebok
        {hid: 'og:title', name: 'og:title', content: 'Komik'},
        {hid: 'og:description', name: 'og:description', content: 'Bikin Kamu Ketawa Adalah Tujuan Kami'},
        {hid: 'og:type', name: 'og:type', content: 'website'},
        {hid: 'og:url', name: 'og:url', content: url},
        {hid: 'og:description', name: 'og:description', content: 'Bikin Kamu Ketawa Adalah Tujuan Kami'},
        {hid: 'og:image', name: 'og:image', content: this.item.content.thumbnail},
        {hid: 'og:locale', name: 'og:locale', content: 'id_ID'},
        {hid: 'og:site_name', name: 'og:site_name', content: 'Playworld'},

        // Twitter
        {hid: 'twitter:card', name: 'twitter:card', content: 'summary'},
        {hid: 'twitter:creator', name: 'twitter:creator', content: '@playworld'},
        {hid: 'twitter:site', name: 'twitter:site', content: '@playworld'},
        {hid: 'twitter:title', name: 'twitter:title', content: 'Komik'},
        {hid: 'twitter:description', name: 'twitter:description', content: 'Bikin Kamu Ketawa Adalah Tujuan Kami'},
        {hid: 'twitter:image', name: 'twitter:image', content: this.item.content.thumbnail},
      ]
    }
  }
};
</script>
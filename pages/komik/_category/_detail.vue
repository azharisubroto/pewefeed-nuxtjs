<template>
  <Detail :respon="item"/>
</template>

<script>
import Detail from '@/components/comic/Detail';
import ComicService from '@/services/ComicService'

export default {
  components: {
    Detail,
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
    let item = await ComicService.getDetail(params.detail)
    .then(res => {
      return res.data.data
    })
    store.commit('SET_ITEM', item)
    console.log(JSON.parse(JSON.stringify(item)))
  },
  head () {
    let host = this.origin
    return {
      title: this.item.content.title,
      meta: [
        // Facebok
        {hid: 'og:title', name: 'og:title', content: this.item.content.title},
        {hid: 'og:description', name: 'og:description', content: this.item.content.title},
        {hid: 'og:type', name: 'og:type', content: 'website'},
        // {hid: 'og:url', name: 'og:url', content: url},
        {hid: 'og:description', name: 'og:description', content: this.item.content.description},
        {hid: 'og:image', name: 'og:image', content: this.item.content.thumbnail},
        {hid: 'og:locale', name: 'og:locale', content: 'id_ID'},
        {hid: 'og:site_name', name: 'og:site_name', content: 'Playworld'},

        // Twitter
        {hid: 'twitter:card', name: 'twitter:card', content: 'summary'},
        {hid: 'twitter:creator', name: 'twitter:creator', content: '@playworld'},
        {hid: 'twitter:site', name: 'twitter:site', content: '@playworld'},
        {hid: 'twitter:title', name: 'twitter:title', content: this.item.content.title},
        {hid: 'twitter:description', name: 'twitter:description', content: this.item.content.description},
        {hid: 'twitter:image', name: 'twitter:image', content: this.item.content.thumbnail},
      ]
    }
  }
};
</script>

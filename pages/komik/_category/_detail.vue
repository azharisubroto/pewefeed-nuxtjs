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
    var site_url = 'https://' + host + '/komik/' + this.$route.params.category + '/' + this.$route.params.detail
    return {
      title: this.item.content.title,
      meta: [
        // Facebok
        {hid: 'og:title', property: 'og:title', content: this.item.content.title},
        {hid: 'og:description', property: 'og:description', content: this.item.content.description},
        {hid: 'og:type', property: 'og:type', content: 'website'},
        {hid: 'og:url', property: 'og:url', content: site_url},
        {hid: 'og:image', property: 'og:image', content: this.item.content.thumbnail},
        {hid: 'og:locale', property: 'og:locale', content: 'id_ID'},
        {hid: 'og:site_name', property: 'og:site_name', content: 'Playworld'},
        {hid: 'fb:admins', property: 'fb:admins', content: '100006462279538'},
        {hid: 'fb:app_id', property: 'fb:app_id', content: '107188393464738'},

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

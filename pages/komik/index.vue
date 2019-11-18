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
    var site_url = 'https://' + host + '/komik'
    return {
      title: 'Komik',
      meta: [
        // Facebok
        {hid: 'og:title', property: 'og:title', content: 'Komik'},
        {hid: 'og:description', property: 'og:description', content: 'Bikin Kamu Ketawa Adalah Tujuan Kami'},
        {hid: 'og:type', property: 'og:type', content: 'website'},
        {hid: 'og:url', property: 'og:url', content: site_url},
        {hid: 'og:image', property: 'og:image', content: 'https://qomiqu.com/assets/frontend/logo.png'},
        {hid: 'og:locale', property: 'og:locale', content: 'id_ID'},
        {hid: 'og:site_name', property: 'og:site_name', content: 'Playworld'},
        {hid: 'fb:admins', property: 'fb:admins', content: '100006462279538'},
        {hid: 'fb:app_id', property: 'fb:app_id', content: '107188393464738'},

        // Twitter
        {hid: 'twitter:card', name: 'twitter:card', content: 'summary'},
        {hid: 'twitter:creator', name: 'twitter:creator', content: '@playworld'},
        {hid: 'twitter:site', name: 'twitter:site', content: '@playworld'},
        {hid: 'twitter:title', name: 'twitter:title', content: 'Komik'},
        {hid: 'twitter:description', name: 'twitter:description', content: 'Bikin Kamu Ketawa Adalah Tujuan Kami'},
        {hid: 'twitter:image', name: 'twitter:image', content: 'https://qomiqu.com/assets/frontend/logo.png'},
      ]
    }
  }
};
</script>
<template>
  <Detail :respon="item"/>
</template>

<script>
import Detail from '@/components/article/Detail';
import ArticleService from '@/services/ArticleService'

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
    let item = await ArticleService.getDetail(params.articleslug)
    .then(res => {
      return res.data.data
    })
    store.commit('SET_ITEM', item)
    console.log(JSON.parse(JSON.stringify(item)))
  },
  head () {
    let host = this.origin
    var url = 'https://' + host + '/' + this.item.article.type.toLowerCase() + '/' + this.item.article.reaction.toLowerCase() + '/' + this.item.article.slug
    return {
      title: this.item.article.title,
      meta: [
        // Facebok
        {hid: 'og:title', property: 'og:title', content: this.item.article.title},
        {hid: 'og:description', property: 'og:description', content: this.item.article.title},
        {hid: 'og:type', property: 'og:type', content: 'website'},
        {hid: 'og:url', property: 'og:url', content: url},
        {hid: 'og:image', property: 'og:image', content: this.item.article.image.medium},
        {hid: 'og:locale', property: 'og:locale', content: 'id_ID'},
        {hid: 'og:site_name', property: 'og:site_name', content: 'Playworld'},
        {hid: 'fb:admins', property: 'fb:admins', content: '100006462279538'},
        {hid: 'fb:app_id', property: 'fb:app_id', content: '107188393464738'},

        // Twitter
        {hid: 'twitter:card', name: 'twitter:card', content: 'summary'},
        {hid: 'twitter:creator', name: 'twitter:creator', content: '@playworld'},
        {hid: 'twitter:site', name: 'twitter:site', content: '@playworld'},
        {hid: 'twitter:title', name: 'twitter:title', content: this.item.article.title},
        {hid: 'twitter:description', name: 'twitter:description', content: this.item.article.title},
        {hid: 'twitter:image', name: 'twitter:image', content: this.item.article.image.medium},
      ]
    }
  }
};
</script>

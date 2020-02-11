<template>
  <Comic :respon="item" :title="meta.og_title" :description="meta.description"/>
</template>

<script>
import Comic from '@/components/comic/Comic';
import ComicService from '@/services/ComicService'
import ArticleService from '@/services/ArticleService';

export default {
  components: {
    Comic,
  },
  data() {
    return {
      item: this.$store.state.item,
      meta: this.$store.state.meta,
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
    let meta = await ArticleService.getDetailMeta('komik')
    .then(res => {
      return res.data.data
    })
    store.commit('SET_ITEM', {
		article:{
			title: meta.og_title,
			short_title: meta.description,
		}
	})
    store.commit('SET_META', meta)
    console.log(JSON.parse(JSON.stringify(item)))
  },
  head () {
    let host = this.origin
    var site_url = 'https://' + host + '/komik'
    return {
      title: this.meta.og_title,
      meta: [
        {hid: 'description', name: 'description', content: this.meta.description},
        {hid: 'keywords', name: 'keywords', content: this.meta.keywords},

        // Facebok
        {hid: 'og:title', property: 'og:title', content: this.meta.og_title},
        {hid: 'og:description', property: 'og:description', content: this.meta.og_description},
        {hid: 'og:type', property: 'og:type', content: this.meta.og_type},
        {hid: 'og:url', property: 'og:url', content: this.meta.og_url},
        {hid: 'og:image', property: 'og:image', content: this.meta.og_image},
        {hid: 'og:locale', property: 'og:locale', content: this.meta.og_locale},
        {hid: 'og:site_name', property: 'og:site_name', content: this.meta.og_site_name},
        {hid: 'fb:admins', property: 'fb:admins', content: '100006462279538'},
        {hid: 'fb:app_id', property: 'fb:app_id', content: '107188393464738'},

        // Twitter
        {hid: 'twitter:card', name: 'twitter:card', content: this.meta.twitter_card},
        {hid: 'twitter:creator', name: 'twitter:creator', content: this.meta.twitter_creator},
        {hid: 'twitter:site', name: 'twitter:site', content: this.meta.twitter_site},
        {hid: 'twitter:title', name: 'twitter:title', content: this.meta.twitter_title},
        {hid: 'twitter:description', name: 'twitter:description', content: this.meta.twitter_description},
        {hid: 'twitter:image', name: 'twitter:image', content: this.meta.twitter_image},
      ]
    }
  }
};
</script>

<template>
  <section>
    <Home/>
  </section>
</template>

<script>
import Home from '@/components/Home';
import ArticleService from '@/services/ArticleService';

export default {
  data(){
    return {
      article: true,
      pwpoin: false,
      item: this.$store.state.item
    }
  },
  async fetch ({ store, params }) {
    let item = await ArticleService.getDetailMeta('home')
    .then(res => {
      return res.data.data
    })
    store.commit('SET_ITEM', item)
    console.log(item)
  },
  head() {
    return{
      title: 'Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya!',
      meta: [
        {hid: 'description', name: 'description', content: this.item.description},
        {hid: 'keywords', name: 'keywords', content: this.item.keywords},

        // Facebok
        {hid: 'og:title', property: 'og:title', content: this.item.og_title},
        {hid: 'og:description', property: 'og:description', content: this.item.og_description},
        {hid: 'og:type', property: 'og:type', content: this.item.og_type},
        {hid: 'og:url', property: 'og:url', content: this.item.og_url},
        {hid: 'og:image', property: 'og:image', content: this.item.og_image},
        {hid: 'og:locale', property: 'og:locale', content: this.item.og_locale},
        {hid: 'og:site_name', property: 'og:site_name', content: this.item.og_site_name},
        {hid: 'fb:admins', property: 'fb:admins', content: '100006462279538'},
        {hid: 'fb:app_id', property: 'fb:app_id', content: '107188393464738'},

        // Twitter
        {hid: 'twitter:card', name: 'twitter:card', content: this.item.twitter_card},
        {hid: 'twitter:creator', name: 'twitter:creator', content: this.item.twitter_creator},
        {hid: 'twitter:site', name: 'twitter:site', content: this.item.twitter_site},
        {hid: 'twitter:title', name: 'twitter:title', content: this.item.twitter_title},
        {hid: 'twitter:description', name: 'twitter:description', content: this.item.twitter_description},
        {hid: 'twitter:image', name: 'twitter:image', content: this.item.twitter_image},
      ]
    }
  },
  components: {
    Home
  },
};
</script>

<style lang="scss">
  .v-slide-group__prev{
    display: none!important;
  }
</style>

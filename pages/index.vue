<template>
  <section>
    <Home/>
  </section>
</template>

<script>
import Home from '@/components/Home';

export default {
  data(){
    return {
      article: true,
      pwpoin: false
    }
  },
  head() {
    return{
      title: 'Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya!',
      meta: [
        {hid: 'description', name: 'description', content:'Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya!'}
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

<template>
  <section>
    <PwPoin/>
  </section>
</template>

<script>
import PwPoin from '@/components/TukarPoin/TukarPoin';
export default {
  data(){
    return {
      article: true,
      pwpoin: false
    }
  },
  head() {
    return{
      title: 'Tukar Poin',
      meta: [
        {hid: 'description', name: 'des', content:'Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya!'}
      ]
    }
  },
  components: {
    PwPoin
  },
};
</script>

<template>
  <section>
    <PwPoin/>
  </section>
</template>

<script>
import PwPoin from '@/components/article/PwPoin';


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
        {hid: 'description', name: 'des', content:'Sumber konten VIRAL dari beragam informasi seperti Film, Musik, Olahraga, Travel, Teknologi. Tidak hanya itu, PLAYWORLD.ID memberikan insentif dengan pengunjungnya dalam bentuk POIN. POIN bisa dikumpulkan atas interaksi memberikan Komentar, menjawab Quiz dan memberikan Star (Voting). Jumlah POIN yang cukup kemudian bisa ditukar dengan Reward.'}
      ]
    }
  },
  components: {
    PwPoin
  },
};
</script>

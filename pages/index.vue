<template>
  <section>
    <v-tabs grow color="deep-orange" class="pw-tab">
      <v-tab @click="article=true;pwpoin=false">Trending</v-tab>
      <v-tab @click="pwpoin=true;article=false">Tukar Poin</v-tab>
      <v-tab>Viral</v-tab>
      <v-tab>Lagu</v-tab>
      <v-tab>Nonton</v-tab>
      <v-tab>Piknik</v-tab>
      <v-tab>Tekno</v-tab>
      <v-tab>Sport</v-tab>
      <v-tab>Video</v-tab>
    </v-tabs>

    <div class="pw-tab-container">
      <Home v-if="article==true"/>
      <PwPoin v-if="pwpoin==true"/>
    </div>
  </section>
</template>

<script>
import Home from '@/components/Home';
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
    Home,
    PwPoin
  },
};
</script>

<style lang="scss">
  .v-slide-group__prev{
    display: none!important;
  }
  .pw-tab {
    position: fixed;
    top: 57px;
    z-index:10
  }
  .pw-tab-container {
    padding-top: 50px;
  }
</style>

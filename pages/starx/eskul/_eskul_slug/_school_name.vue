<template>
  <DetailEskul :respon="item"/>
</template>

<script>
import DetailEskul from '@/components/starx/DetailEskul';
import StarxService from '@/services/StarxService'

export default {
  components: {
    DetailEskul,
  },
  data() {
    return {
      item: this.$store.state.item,
      origin: this.$store.state.host,
    }
  },
  async fetch ({ store, params }) {
    ////console.log('fetch this')
    ////console.log(params.articleslug)
    let item = await StarxService.getDetailEskul(params.eskul_slug)
    .then(res => {
      return res.data.data
    })
    store.commit('SET_ITEM', item)
    // //console.log(JSON.parse(JSON.stringify(item)))
  }
};
</script>

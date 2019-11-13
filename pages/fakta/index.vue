<template>
  <FaktaHome/>
</template>
<script>
import FaktaHome from '@/components/fakta/FaktaHome'
export default {
  components: {
    FaktaHome
  },
  head() {
    return{
      title: 'Fakta',
      meta: [
        {hid: 'description', name: 'des', content:'Tonton video fakta 3 MENIT DAPAT HADIAH'}
      ]
    }
  },
}
</script>

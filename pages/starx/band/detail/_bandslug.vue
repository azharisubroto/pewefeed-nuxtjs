<template>
  <StarxSingleBand />
</template>

<script>
import StarxSingleBand from '@/components/starx/StarxSingleBand';

export default {
  components: {
    StarxSingleBand,
  },
  data(){
      return{
          reactive: true,
      }
  },
};
</script>

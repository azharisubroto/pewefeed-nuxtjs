<template>
  <section>
    <v-overlay :value="overlay">
        <v-progress-circular color="green" indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </section>
</template>

<script>
export default {
  data(){
    return {
      overlay: false,
    }
  },
  mounted() {
      //console.log('redirect . . .')
      this.$router.push('/member/status_transfer')
  }
};
</script>

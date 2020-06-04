<template>
  	<v-bottom-sheet v-model="intDialogVisible">
      <v-sheet height="100%">
        <v-toolbar :elevation="1">
          <!-- Arrow -->
          <v-btn
            dark
            icon
            tile
            style="border-right: 0px solid #717171"
            light
            @click="intDialogVisible = false;"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <!-- Title -->
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn dark text class="deep-orange--text pl-0">You've got 2 Point!</v-btn>
          </v-toolbar-items>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <div class="mx-2">
          <v-container class="text-center">
			  <img src="/img/poinextra.png" width="40" class="mt-5"/>
			  <br>
			  Kamu mendapat 10 Point karena sudah<br>
			  Komentar di Artikel
			  <br>
			  <v-btn to="/member/histori_penggunaan_poin" color="green" class="mt-2">Check Total Point</v-btn>
			  <br><br>
		  </v-container>
        </div>
      </v-sheet>
    </v-bottom-sheet>
</template>

<script>
export default {
  name: "KomentarPoin",
  props: {
    dialogVisible: Boolean,
    jawaban: Boolean,
    already: Boolean
  },
  data() {
    return{
        logo: 'https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png',
    }
  },
  computed: {
    /* Init Modal */
    intDialogVisible: {
      get: function () {
        if (this.dialogVisible) {
          // Some dialog initialization code could be placed here
          // because it is called only when this.dialogVisible changes
          this.$emit('open');
        }

        return this.dialogVisible
      },
      set: function (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    },
    notVipVisible: {
      get: function () {
        if (this.dialogVisible) {
          // Some dialog initialization code could be placed here
          // because it is called only when this.dialogVisible changes
          this.$emit('open');
        }

        return this.dialogVisible
      },
      set: function (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    closeIt() {
      this.$emit('close')
    }
  }
}
</script>


<style lang="scss">
  .gray--background {
    background: #f5f5f5!important;
  }
  .whitebox {
    background: #fff;
    padding: 30px;
  }
  .v-dialog {
    z-index:10000;
  }
</style>

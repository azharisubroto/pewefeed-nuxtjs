<template>
  <v-dialog
    v-model="intDialogVisible"
    max-width="290"
    persistent
    fullscreen hide-overlay transition="dialog-bottom-transition"
  >
    <!-- Header -->
    <v-toolbar light color="white">
      <!-- Arrow -->
      <v-btn icon tile style="border-right: 1px solid #d1d1d1" light @click="notVipVisible = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <!-- Logo -->
      <v-toolbar-title>
        <v-img
          src="/pl-logo.png"
          max-width="100"
        >
        </v-img>
      </v-toolbar-title>

      <!-- Title -->
      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <v-btn light text>You got poin</v-btn>
      </v-toolbar-items>
    </v-toolbar>


    <v-card>

      <v-card-text>
        <div class="text-center pt-5">
          <div class="whitebox pb-0">

            <div
            >
              <img src="/img/poinextra.png" width="80" class="mt-5"/>
              <br>
              <br>
              <h3 class="green--text">Extra POIN +2</h3>
              <v-alert
                border="left"
				dense
				colored-border
				type="info"
				class="text-left mt-3"
				style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
              >
                Kamu mendapat tambahan POIN karena telah memberikan KOMENTAR
              </v-alert>
            </div>
          </div>
        </div>
        <v-row>
          <v-col cols="12">
            <v-btn
              color="deep-orange darken-1"
              @click="closeIt()"
              dark
              block
              depressed
              large
            >
              Tutup
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
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

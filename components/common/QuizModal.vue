<template>
  <v-dialog
    v-model="intDialogVisible"
    max-width="290"
    persistent
  >
    <v-card>

      <v-card-text>
        <div class="text-center pt-5">
          <template v-if="already==true">
            <br>
            <br>
            <img src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/icon_infoBlue.png" width="120" alt="">
            <br>
            <br>
            <strong class="blue--text">Anda Telah mengikuti QUIZ ini</strong>
          </template>

          <template v-else>
            <img src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/redeemicon/icon-tiban.png" width="150" class="mt-5"/>
            <br>
            <br>
            <div
            v-if="jawaban==true"
            >
              <strong class="green--text">JAWABAN BENAR!</strong><br>
              <img src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/redeemicon/poinekstra222.png" width="20" alt=""> POIN Ekstra: <strong class="orange--text"></strong>
            </div>
            <div
            v-if="jawaban==false"
            >
              <strong class="red--text">JAWABAN SALAH!</strong><br>
            </div>
          </template>

          <v-btn
            depressed
            dark
            color="deep-orange darken-1"
            class="mt-4"
          >
            Lihat Poin
          </v-btn>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="deep-orange darken-1"
          text
          @click="closeIt()"
        >
          Tutup
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "QuizModal",
  props: {
    dialogVisible: Boolean,
    jawaban: Boolean,
    already: Boolean
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
  },
  methods: {
    closeIt() {
      this.$emit('close')
    }
  }
}
</script>

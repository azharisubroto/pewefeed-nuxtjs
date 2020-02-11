<template>
  <v-dialog
    v-model="intDialogVisible"
    max-width="290"
    persistent
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <!-- Header -->
    <v-toolbar light color="white">
      <!-- Arrow -->
      <v-btn icon tile style="border-right: 1px solid #d1d1d1" light @click="notVipVisible = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <!-- Logo -->
      <v-toolbar-title>
        <v-img :src="logo" max-width="100" max-height="40"></v-img>
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
          <div class="whitebox">
            <img src="/img/poinextra.png" width="80" class="mt-5" />
            <br />
            <br />
            <template v-if="already==true">
              <h3 class="red--text">No Extra POIN</h3>
              <v-alert
                border="left"
                dense
                colored-border
                type="info"
                class="text-14 text-left mt-4"
                style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
              >Kamu tidak mendapat tambahan POIN karena telah menjawab QUIZ sebelumnya</v-alert>
            </template>

            <template v-else>
              <div v-if="jawaban==true">
                <h3 class="green--text">Extra POIN +20</h3>
                <v-alert
                  border="left"
                  dense
                  colored-border
                  type="info"
                  class="text-14 text-left mt-4"
                  style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
                >Kamu mendapat tambahan POIN karena telah menjawab QUIZ dengan benar</v-alert>
              </div>
              <div v-if="jawaban==false">
                <h3 class="red--text">No Extra POIN</h3>
                <v-alert
                  border="left"
                  dense
                  colored-border
                  type="info"
                  class="text-14 text-left mt-4"
                  style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
                >Kamu tidak mendapat tambahan POIN karena salah menjawab QUIZ</v-alert>
              </div>
            </template>
          </div>
        </div>
        <v-row>
          <v-col cols="12">
            <v-btn color="deep-orange darken-1" @click="closeIt()" dark block depressed large>Tutup</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
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
  data() {
    return {
      logo: "/pl-logo.png"
    };
  },
  computed: {
    /* Init Modal */
    intDialogVisible: {
      get: function() {
        if (this.dialogVisible) {
          // Some dialog initialization code could be placed here
          // because it is called only when this.dialogVisible changes
          this.$emit("open");
        }

        return this.dialogVisible;
      },
      set: function(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    },
    notVipVisible: {
      get: function() {
        if (this.dialogVisible) {
          // Some dialog initialization code could be placed here
          // because it is called only when this.dialogVisible changes
          this.$emit("open");
        }

        return this.dialogVisible;
      },
      set: function(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },
  methods: {
    closeIt() {
      this.$emit("close");
    }
  }
};
</script>


<style lang="scss">
.gray--background {
  background: #f5f5f5 !important;
}
.whitebox {
  background: #fff;
  padding: 30px 30px 10px;
}
.v-dialog {
  z-index: 10000;
}
</style>

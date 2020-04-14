<template>
    <v-dialog
      v-model="ratingModal"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-card class="grey lighten-3" @makeloading="setloading" @notloading="notloading">
        <!-- Header -->
        <v-toolbar light color="white">
          <!-- Arrow -->
          <v-btn icon tile style="border-right: 1px solid #717171" light @click="ratingModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <!-- Logo -->
          <v-toolbar-title>
            <v-img
              :src="logo"
              :lazy-src="lazy"
              max-width="40"
              max-height="40"
            >
            </v-img>
          </v-toolbar-title>

          <!-- Title -->
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn light text>Rating Submission</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <!-- FORM -->
        <v-container>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-row no-gutters class="mt-5">
                    <v-col cols="12">
                        <strong class="subtitle-2">Berikan rating untuk komik ini</strong>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                            outlined
                            color="deep-orange"
                            value=""
                            counter
                            rows="3"
                            auto-grow
                            v-model="formdata.review"
                            :rules="reviewRules"
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <v-rating
                            v-model="formdata.rating"
                            :rules="ratingRules"
                            background-color="orange"
                            color="orange"
                            dense
                            half-increments
                            hover
                            size="23"
                        ></v-rating>
                    </v-col>
                    <v-col cols="12">
                        <recaptcha
                            class="mx-5 my-5"
                            @error="onError()"
                            @success="onSuccess()"
                            @expired="onExpired()"
                        />
                    </v-col>
                    <v-col cols="12" class="mt-5">
                        <v-btn @click="validate()" dark block color="orange accent-4">CONTINUE</v-btn>
                    </v-col>
                </v-row>
            </v-form>

            <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                top
            >
                {{ responsemessage }}
                <v-btn
                    color="primary"
                    text
                    icon
                    @click="snackbar = false"
                >
                <v-icon color="white">mdi-close-circle-outline</v-icon>
                </v-btn>
            </v-snackbar>
        </v-container>
      </v-card>
    </v-dialog>
</template>
<script>
import ComicService from '../../services/ComicService';
  export default {
    name:"MakeRating",
    props: {
      dialogVisible: Boolean,
      contentId: Number
    },
    data () {
      return {
        dialog: false,
        makeRatingVisible: false,
        lazy: 'https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png',
        logo: 'https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png',
        formdata : {
            review : '',
            rating : 5,
        },
        recaptchaToken: null,
        reviewRules: [
            v => !!v || 'Mohon isi kolom pesan'
        ],
        ratingRules: [
            v => !!v || 'Mohon input rating'
        ],
        overlay: false,
        snackbar: false,
        timeout: 3000,
        responsemessage: '',
        valid: false
      }
    },
    computed: {
      ratingModal: {
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
        myDialogClose () {
            this.makeRatingVisible = false
            // other code
        },
        /* Recaptcha */
        onError (error) {
            console.log('Error happened:', error)
            this.recaptchaToken = null
        },
        onSuccess (token) {
            this.recaptchaToken = 'success'
        },
        onExpired () {
            console.log('Expired')
            this.recaptchaToken = null
        },
        /* Validasi Form */
        validate () {
            if (this.$refs.form.validate()) {
                if (this.recaptchaToken != null) {
                    this.submit();
                } else {
                    this.snackbar = true;
                    this.responsemessage = 'Mohon Centang Recaptha';
                }
            }
        },

        /* Submit Form */
        async submit() {
            // send the form
            let vm = this;
            const sendform = {
                comic_id: this.contentId,
                review: this.formdata.review,
                rating: this.formdata.rating * 20
            };
            this.setloading();
            try {
                const res = await ComicService.makeRating(sendform)
                this.notloading();
                this.recaptchaToken = null;
                console.log(res)
                vm.snackbar = true
                vm.responsemessage = 'Sukses memberikan rating'
                this.$nextTick(function() {
                    setTimeout(() => {
                        this.ratingModal = false
                    }, 3000);
                });
                this.fetchRating()
            } catch (err) {
                console.log(err)
                this.notloading();
                vm.snackbar = true;
                vm.responsemessage = 'Maaf, Kamu hanya dapat memberi RATING hanya satu kali.'
            }
        },

        async fetchRating() {
            try {
                let res = await ComicService.getRating(this.$route.params.detail)
                this.ratings = res.data.data.review
                this.total_review = res.data.data.total_review
                this.totalRating = res.data.data.rate / 20
                // console.log(JSON.parse(JSON.stringify(res.data)))
                if (res.data.pagination.current_page == res.data.pagination.last_page) {
                    this.isMore = false;
                }
            } catch (error) {
                console.log(error)
            }
        },

        /* Loader */
        setloading () {
            this.overlay = true
        },
        notloading() {
            this.overlay = false
        },
    }
  }
</script>

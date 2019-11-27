<template>
    <v-container>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

        <v-card @makeloading="setloading" @notloading="notloading">
            <v-card-title class="title">
                Masukkan Kode PW
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-alert v-if="status_code" type="info">
                {{message_code}}
                </v-alert>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-text-field
                                label="PW ID"
                                v-model="formdata.msisdn"
                                :rules="pwIdRules"
                            ></v-text-field>
                        </v-col>
                        <v-col v-if="formsignin" cols="12" class="my-5">
                            <v-card>
                                <v-card-text>
                                    <strong class="subtitle-1">Jika belum memiliki PW ID, silahkan login.</strong>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <Login />
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                label="Kode PW"
                                v-model="formdata.code"
                                required
                                :rules="pwCodeRules"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="my-5">
                            <recaptcha
                              @error="onError()"
                              @success="onSuccess()"
                              @expired="onExpired()"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-btn @click="validate()" color="success" width="100%" >SUBMIT</v-btn>
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
            </v-card-text>
        </v-card>

        <!-- Dialog Success -->
        <v-row justify="center">
            <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            >
            <v-card class="grey lighten-3">
                <!-- Header -->
                <v-toolbar light color="white">
                <!-- Arrow -->
                <v-btn icon tile style="border-right: 1px solid #717171" light>
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
                    <v-btn light text>Information</v-btn>
                </v-toolbar-items>
                </v-toolbar>

                <v-row
                align="center"
                justify="center"
                >
                    <v-icon color="green" class="display-3" style="margin-top: 60px">mdi-check-circle</v-icon>
                </v-row>
                <v-row
                align="center"
                justify="center"
                >
                    <p class="title mt-4">{{responsemessage}}</p>
                </v-row>
                <v-row
                align="center"
                justify="center"
                class="mx-4"
                >
                    <p class="subtitle-1 text-center">Silahkan klik tombol dibawah ini untuk melanjutkan</p>
                </v-row>
                <v-row
                align="center"
                justify="center"
                class="mx-4"
                >
                    <div>
                        <v-btn
                        @click="lanjutkan()"
                        dark
                        color="deep-orange"
                        >
                            Lanjutkan
                        </v-btn>
                    </div>
                </v-row>
            </v-card>
            </v-dialog>
        </v-row>

    </v-container>
</template>

<script>
import VoucherService from '@/services/VoucherService';
import Login from "@/components/Login";
import UserService from "@/services/UserService";
export default {
    name: 'CodePWComponent',
    components: {
        Login
    },
    data: () => ({
        snackbar: false,
        overlay: false,
        timeout: 3000,
        msisdn : '',
        status_code : false,
        formsignin : false,
        message_code : '',
        responsemessage: '',
        responselink: '',
        dialog: false,
        valid: true,
        lazy: 'https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png',
        logo: 'https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png',
        formdata : {
            msisdn : null,
            code : null,
        },
        recaptchaToken: null,
        pwIdRules: [
            v => !!v || 'Input Valid Code'
        ],
        pwCodeRules: [
            v => !!v || 'Input Valid Code'
        ],
    }),
    methods: {
        /* Fetch Content */
        async fetchContent()  {
            /* Init Data User to Customer Detail */
            if (localStorage.getItem('loggedin')) {
                try {
                    const res = await UserService.getSingleUser()
                    console.log(res.data.status);
                    this.formdata.msisdn = res.data.data.msisdn
                } catch (err) {
                    console.log(err.response.data)
                }
            } else {
                this.formsignin = true
            }
            this.getCode();
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

        /* Loader */
        setloading () {
            this.overlay = true
        },
        notloading() {
            this.overlay = false
        },

        /* Get Code PW */
        async getCode() {
            this.setloading()
            if (this.$route.params.codepw == 'fail') {
                this.notloading();
                this.status_code = true
                this.message_code = 'Kode Tidak Valid'
            } else {
                try {
                    const res = await VoucherService.getCodePw( this.$route.params.codepw )
                    console.log(res.data.code)
                    this.notloading()
                    this.recaptchaToken = null
                    this.status_code = true
                    this.message_code = 'Ini Kode PW Anda ' + res.data.code.trx
                    this.formdata.code = res.data.code.trx
                } catch (err) {
                    console.log(err.response.data)
                    this.notloading()
                    this.status_code = true
                    this.message_code = err.response.data.message
                }
            }
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
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },

        /* Submit Form */
        async submit() {
            // send the form
            let vm = this;
            const sendform = this.formdata;
            this.setloading();
            vm.responsemessage = '';
            try {
                const res = await VoucherService.submitVoucher(sendform)
                this.notloading();
                this.recaptchaToken = null;
                console.log(res)
                this.status_code = false
                vm.snackbar = false
                vm.dialog = true
                vm.responsemessage = res.data.message
                vm.responselink = res.data.link
            } catch (err) {
                console.log(err)
                this.notloading();
                vm.snackbar = true;
                vm.responsemessage = 'Kode PW tidak ditemukan atau sudah expired'

            }
        },
        lanjutkan() {
            window.location.href = this.responselink
        }
    },
    mounted() {
        this.fetchContent()
    }
}
</script>
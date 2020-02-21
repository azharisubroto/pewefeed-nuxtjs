<template>
    <!-- SHARE BUTTON -->
    <div class="text-center mt-5">
        <v-bottom-sheet v-model="sheet">
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" dark color="orange accent-4" depressed>
                    <v-icon class="mr-1">mdi-share-variant</v-icon> Bagikan
                </v-btn>
            </template>
            <v-sheet height="100%" color="transparent">
                <div class="mx-2" style="background-color: #fff !important">
                    <div>
                        <v-container class="text-center">
                            <strong class="subtitle-1">SHARE (+1 POIN)</strong>
                        </v-container>
                    </div>
                    <v-divider></v-divider>
                    <v-container>
                        <v-row>
                            <v-col v-if="sharingImage" cols="8">
                                <strong class="subtitle-1 font-weight-bold">{{ sharingTitle }}</strong><br>
                                <strong class="caption grey--text">{{ sharingTime }}</strong>
                            </v-col>
                            <v-col v-else cols="8">
                                <strong class="subtitle-1">{{ sharingTitle }}</strong><br>
                                <strong class="caption grey--text">PlayworldID</strong>
                            </v-col>
                            <v-col v-if="sharingImage" cols="4">
                                <img width="100%" :src="sharingImage" alt="">
                            </v-col>
                            <v-col v-else cols="4">
                                <img width="100%" src="/img/playworld-logo-only.png" alt="">
                            </v-col>
                            <v-col cols="12">
                                <v-row align="center" no-gutters>
                                    <v-col cols="8">
                                        <socialSharing
                                            :url="sharingUrl"
                                            :title="sharingTitle"
                                            :description="sharingDescription"
                                            twitter-user="playworldID"
                                            inline-template
                                            @close="close()"
                                        >
                                            <div>
                                                <network network="facebook">
                                                    <i style="font-size:40px" aria-hidden="true" class="v-icon notranslate mdi mdi-facebook-box theme--light primary--text"></i>
                                                </network>
                                                <network network="twitter">
                                                    <i style="font-size:40px" aria-hidden="true" class="v-icon notranslate mdi mdi-twitter-box theme--light blue--text"></i>
                                                </network>
                                                <network network="whatsapp">
                                                    <i style="font-size:40px" aria-hidden="true" class="v-icon notranslate mdi mdi-whatsapp theme--light green--text"></i>
                                                </network>
                                                <network network="telegram">
                                                    <i style="font-size:40px" aria-hidden="true" class="v-icon notranslate mdi mdi-telegram theme--light blue--text"></i>
                                                </network>
                                                <network network="skype">
                                                    <i style="font-size:40px" aria-hidden="true" class="v-icon notranslate mdi mdi-skype theme--light blue--text"></i>
                                                </network>
                                            </div>
                                        </socialSharing>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-icon @click="copyToClipBoard()" size="30" style="margin-left: 3px;">mdi-content-copy</v-icon>
                                    </v-col>
                                </v-row>

                            </v-col>
                        </v-row>
                    </v-container>
                </div>
                <div class="mx-2 py-3">
                    <v-btn @click="sheet = !sheet" tile light depressed block style="background-color: #fff !important">Batal</v-btn>
                </div>
            </v-sheet>
        </v-bottom-sheet>
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

        <SharePoin :dialogVisible="SharePoinVisible" @close="myDialogClose"/>
    </div>
</template>
<script>
import * as socialSharing from 'vue-social-sharing'
import UserService from '@/services/UserService'
import SharePoin from '@/components/modal/SharePoin'
export default {
    name: "ShareButton",
    props: ["sharingUrl","sharingTitle","sharingDescription","sharingImage","sharingTime"],
    components: {
        socialSharing,
        SharePoin
    },
    data: () => ({
        sheet: false,
        timeout: 2000,
        snackbar: false,
        responsemessage: 'Copied to clipboard'
    }),
    methods: {
        close() {
            var vm = this
            setTimeout(() => {
                this.$root.$on('social_shares_close', function (network, url) {
                    let data = {
                        provider: network,
                        url: url
                    }
                    setTimeout(() => {
                        vm.saveShare(data);
                    }, 200);
                })
            }, 200);
        },
        async saveShare(data) {
            try {
                const res = await UserService.share(data)
                // console.log(res)
                if(res.data.point == 1) {
                    console.log('dapat poin')
                    this.SharePoinVisible = true
                } else {
                    console.log('tidak dapat poin')
                    this.SharePoinVisible = false
                }
            } catch (error) {
                console.log(error)
                this.SharePoinVisible = false
            }
        },
        copyToClipBoard() {
            const copy = require('clipboard-copy')
            copy(this.sharingUrl)
            this.snackbar = true
        }
    }
}
</script>

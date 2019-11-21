<template>
    <!-- SHARE BUTTON -->
    <div class="text-center mt-5">
        <v-bottom-sheet v-model="sheet">
            <template v-slot:activator="{ on }">
                <v-icon v-on="on">mdi-share-variant</v-icon>
            </template>
            <v-sheet height="100%" color="transparent">
                <div class="mx-2" style="background-color: #fff !important">
                    <div>
                        <v-container>
                            <strong class="subtitle-1">Bagikan Cerita</strong>
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
                                <socialSharing 
                                    :url="sharingUrl"
                                    :title="sharingTitle"
                                    :description="sharingDescription"
                                    twitter-user="playworldID"
                                    inline-template
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
                        </v-row>
                    </v-container>
                </div>
                <div class="mx-2 py-3">
                    <v-btn @click="sheet = !sheet" light depressed block style="background-color: #fff !important">Batal</v-btn>
                </div>
            </v-sheet>
        </v-bottom-sheet>
    </div>
</template>
<script>
import * as socialSharing from 'vue-social-sharing'
export default {
    name: "ShareButton",
    props: ["sharingUrl","sharingTitle","sharingDescription","sharingImage","sharingTime"],
    components: {
        socialSharing
    },
    data: () => ({
        sheet: false
    }),
    mounted() {
        console.log(this.sharingUrl)
    }
}
</script>
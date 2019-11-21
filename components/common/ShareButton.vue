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
                                            <v-icon size="40" color="primary">mdi-facebook-box</v-icon>
                                        </network>
                                        <network network="twitter">
                                            <v-icon size="40" color="blue">mdi-twitter-box</v-icon>
                                        </network>
                                        <network network="whatsapp">
                                            <v-icon size="40" color="green">mdi-whatsapp</v-icon>
                                        </network>
                                        <network network="telegram">
                                            <v-icon size="40" color="blue">mdi-telegram</v-icon>
                                        </network>
                                        <network network="skype">
                                            <v-icon size="40" color="blue">mdi-skype</v-icon>
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
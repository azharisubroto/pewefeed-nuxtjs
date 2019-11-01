<template>
    <v-container class="grey lighten-5" ma-0 pa-0>
        <v-tabs-items v-model="tab" class="adjusted-tab-items">
            <!-- oooooooooooooooooooooooooooooooooooooo
            IZON
            oooooooooooooooooooooooooooooooooooooo -->
            <v-tab-item
                value="izin-sekolah"
            >
                <StarxIzin />
            </v-tab-item>

            <!-- oooooooooooooooooooooooooooooooooooooo
            PROFILE BAND
            oooooooooooooooooooooooooooooooooooooo -->
            <v-tab-item
                value="profile-band"
            >
                <StarxProfile />
            </v-tab-item>

            <!-- oooooooooooooooooooooooooooooooooooooo
            UPLOAD
            oooooooooooooooooooooooooooooooooooooo -->
            <v-tab-item
                value="upload"
            >
                <StarxVideoSubmit/>
            </v-tab-item>

            <!-- oooooooooooooooooooooooooooooooooooooo
            SYARAT
            oooooooooooooooooooooooooooooooooooooo -->
            <v-tab-item
                value="syarat"
            >
                <v-container>
                    <v-row>
                        <v-col
                        cols="12"
                        >
                            <div v-html="syarat"></div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-tab-item>
        </v-tabs-items>

        <v-bottom-navigation
          fixed
          dark
          grow
          background-color="deep-orange accent-6"
        >
            <v-tabs 
                v-model="tab"
                background-color="deep-orange accent-6"
                dark
                grow
                class="fixed-tabs-bar"
            >
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#izin-sekolah">
                    Izin Sekolah
                </v-tab>

                <v-tab href="#profile-band">
                    Profile Band
                </v-tab>

                <v-tab href="#upload">
                    Upload
                </v-tab>

                <v-tab href="#syarat">
                    Syarat &amp; Ketentuan
                </v-tab>
            </v-tabs>
        </v-bottom-navigation>
        
    </v-container>
</template>


<script>
import StarxIzin from '@/components/starx/StarxIzin'
import StarxProfile from '@/components/starx/StarxProfile'
import StarxVideoSubmit from '@/components/starx/StarxVideoSubmit'

export default {
    name: "StarxForm",
    components: {
        StarxIzin,
        StarxProfile,
        StarxVideoSubmit
    },
    data(){
        return{
            tab: null,       
            syarat: '',     
        }
    },
    mounted() {
        var syarat = localStorage.getItem('syarat');
        this.syarat = syarat;
    }
};
</script>

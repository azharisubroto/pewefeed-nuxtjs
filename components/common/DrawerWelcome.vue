<template>
    <!-- MODAL -->
    <v-dialog
        v-model="intDialogVisible"
        width="500"
    >
        <v-card>
            <v-toolbar :elevation="1" light color="white">
                <!-- Arrow -->
                <v-btn icon tile style="border-right: 1px solid #717171" light @click="closeIt()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>

                <!-- Title -->
                <div class="flex-grow-1"></div>
                <v-toolbar-items>
                    <v-btn light text>You got poin</v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <div class="px-5 pt-10 text-center">
                <v-img src="/img/fun.png" max-width="100" class="mx-auto"></v-img>
                <div class="mt-10 mb-10 text-20">
                Selamat datang kembali, kamu dapat <strong class="deep-orange--text">10 POIN</strong>!
                </div>
            </div>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="deep-orange"
                class="font-weight-bold"
                text
                @click="$router.push('/member/histori_penggunaan_poin'); closeIt()"
                >
                Klaim Poin Sekarang
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>

            <v-overlay :value="overlay">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </v-card>
    </v-dialog>
</template>

<script>
import UserService from '../../services/UserService';
export default {
    name: "drawerwelcome",
    props: {
        dialogVisible: Boolean,
    },
    data() {
        return {
            overlay: false
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
        }
    },
    methods: {
        async claim() {
            this.overlay = true
            try {
                const res = await UserService.claimDailyPoint()
                this.overlay = false
                if (res.status == 201) {
                    var href = process.env.mobileUrl + 'member/histori_penggunaan_poin'
                    window.location.href = href
                    this.closeIt()
                }
            } catch (error) {
                this.overlay = false
                console.log(error)
            }
        },
        closeIt() {
            this.$emit("close");
        }
    }
}
</script>
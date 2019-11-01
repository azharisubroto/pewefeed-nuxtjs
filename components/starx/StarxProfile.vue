<template>
    <v-form id="profile-form" v-on:submit.prevent="onSubmit">
        <v-container class="grey lighten-5">
            <v-col
            cols="12"
            md="4"
            >
                <h4>PROFIL BAND</h4>
                <p class="caption">Lengkapi data profil band kamu di bawah ini, kamu juga bisa menambahkan data personel band.</p>
                
                <v-text-field
                label="Nama Band"
                color="deep-orange"
                v-model="bandData.name_band"
                ></v-text-field>
            </v-col>

            <v-col
            cols="12"
            md=12
            >
                <p class="mt-0">Photo Band</p>
                <div v-if="bandData.avatarband">
                    <v-img :aspect-ratio="16/9" :src="bandData.avatarband"></v-img>
                    <v-btn @click="bandData.avatarband=null" class="mt-2 grey lighten-1" depressed block dark color="grey">Ganti Gambar</v-btn>
                </div>

                <div v-if="!bandData.avatarband">
                    <vue-dropzone
                    ref="dropzone"
                    id="drop1"
                    :options="dropOptions"
                    @vdropzone-success="afterComplete"
                    ></vue-dropzone>
                    <br>
                    <a @click="bandData.avatarband=false">Remove File</a>
                </div>
            </v-col>

            
            <v-col
            cols="12"
            md="12"
            class="mt-3"
            >
                <v-input
                messages="Tambahkan data personel band kamu"
                prepend-icon="mdi mdi-account"
                >
                Daftar Personil
                </v-input>
                <br>
                <!-- <pre>{{$data.personels}}</pre> -->
                <v-expansion-panels class="mb-3" focusable>
                    <v-expansion-panel
                    v-for="(personel, i) in bandData.avatar" 
                    :key="i" 
                    >
                    <v-expansion-panel-header>
                        <v-row no-gutters>
                            <v-col cols="4">{{ bandData.nama_personil[i] }}</v-col>
                            <v-col cols="8 text--secondary">@{{ bandData.instagram[i] }}</v-col>
                        </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="pt-3">
                        <v-text-field
                        label="Nama"
                        placeholder="Nama Personel"
                        name="bandData.nama_personil[i]"
                        color="deep-orange"
                        v-model="bandData.nama_personil[i]"
                        ></v-text-field>

                        <v-text-field
                        label="Instagram"
                        placeholder="Tanpa '@'"
                        name="bandData.instagram[i]"
                        color="deep-orange"
                        v-model="bandData.instagram[i]"
                        ></v-text-field>

                        <v-select
                        :items="positions"
                        label="Position"
                        item-text="name"
                        item-value="id"
                        name="bandData.personil_posisi[i]"
                        color="deep-orange"
                        v-model="bandData.personil_posisi[i]"
                        solo
                        ></v-select>

                        <div v-if="bandData.avatar[i]">
                            <v-img :aspect-ratio="16/9" :src="bandData.avatar[i]"></v-img>
                            <v-btn @click="gantiGambar(i)" class="mt-2 grey lighten-1" depressed block dark color="grey">Ganti Gambar</v-btn>
                        </div>

                        <div v-if="!bandData.avatar[i]">
                            <vue-dropzone
                            :ref="i"
                            :id="'dropz-'+i"
                            :options="dropOptions"
                            color="orange"
                            @vdropzone-success="(file, response) => selesai(file, response, i)"
                            >
                            </vue-dropzone>
                        </div>

                        <v-btn 
                        @click="removePersonel(i)" 
                        color="red" 
                        dark 
                        small
                        depressed
                        class="mt-2 float-right">
                            <v-icon>mdi-trash-can-outline</v-icon>
                            Hapus
                        </v-btn>
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

                <v-btn @click="addPersonel()" depressed block medium dark color="blue-grey lighten-2">Tambah Personel +</v-btn>
                <!-- <pre>{{$data.bandData}}</pre> -->
                <v-divider class="my-2"></v-divider>
                <v-btn
                    color="green accent-6"
                    dark
                    x-large
                    block
                    depressed
                    class="mb-12"
                    @click="saveForm()"
                >
                    SAVE DATA BAND
                </v-btn>
            </v-col>
        </v-container>
        <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            top
        >
            Data Band Tersimpan
            <v-btn
                color="blue"
                text
                icon
                @click="snackbar = false"
            >
            <v-icon color="white">mdi-close-circle-outline</v-icon>
            </v-btn>
        </v-snackbar>
    </v-form>
</template>

<script>
import Vue from 'vue';
import StarxIzinService from '@/services/StarxIzinService';
export default {
    name: "StarxProfile",
    data(){
        return{
            snackbar: false,
            timeout: 5000,
            dropOptions: {
                url:"https://s1.playworld.id/api/member/program/starx/band/upload/photo",
                headers:{
                    "Authorization":"Bearer " + localStorage.getItem('access-token'),
                    "Cache-Control": "",
                },
                method: "POST",
                paramName: 'file',
                withCredentials: false,
                thumbnailWidth: 100,
                thumbnailHeight: 100
            },
            positions: [
                {
                    id: 3,
                    name: 'Guitaris'
                },
                {
                    id: 5,
                    name: 'Drummer'
                },
                {
                    id: 7,
                    name: 'Keyboardist'
                },
                {
                    id: 11,
                    name: 'Vocalist'
                },
                {
                    id: 13,
                    name: 'Bassist'
                },
                {
                    id: 15,
                    name: 'Other'
                },
            ],
            personels: [],
            personel: {
                nama_personil: '',
                instagram: '',
                avatar: '',
                personil_posisi: ''
            },
            bandData: {
                name_band: '',
                avatarband: '',
                nama_personil: [],
                instagram: [],
                avatar: [],
                personil_posisi: []
            }
        }
    },
    methods: {
        removeAllFiles() {
            this.$refs.dropzone.removeAllFiles();
        },
        afterComplete(file, response) {
            //console.log(response.link);
            this.bandData.avatarband = response.link;
        },
        // Tambah personel
        addPersonel() {
            this.bandData.nama_personil.push(Vue.util.extend(""));
            this.bandData.instagram.push(Vue.util.extend(""));
            this.bandData.avatar.push(Vue.util.extend(""));
            this.bandData.personil_posisi.push(Vue.util.extend(""));
            //console.log(JSON.parse(JSON.stringify(this.personels)));
        },
        // hapus personel
        removePersonel: function (index) {
            Vue.delete(this.bandData.nama_personil, index);
            Vue.delete(this.bandData.instagram, index);
            Vue.delete(this.bandData.avatar, index);
            Vue.delete(this.bandData.personil_posisi, index);
        },
        // ganti gambar personel individu
        gantiGambar(i) {
            Vue.set(this.bandData.avatar, i, "");
        },
        selesai(file, response, i) {
            // console.log(i);
            Vue.set(this.bandData.avatar, i, response.link)
        },
        async saveForm() {
            let vm = this
            var formdata = JSON.parse(JSON.stringify(vm.bandData))
            //console.log(formdata);
            try {
                const res = await StarxIzinService.submitBand(formdata)
                vm.snackbar = true;
            } catch (error) {
                console.log(error)
            }
        },
        async checkIzin() {
            try {
                const response = await StarxIzinService.checkIzin()
                // console.log(response.data.data.band.band);
                var band = response.data.data.band.band;
                if( band ) {
                    vm.bandData.name_band = band.band_name
                    vm.bandData.avatarband = band.avatar
                    var band_detail = band.band_detail
                    //console.log(band_detail);
                    for(var i = 0, j = band_detail.length; i < j; ++i) {
                        vm.bandData.nama_personil.push(Vue.util.extend(band_detail[i].personnel_name));
                        vm.bandData.instagram.push(Vue.util.extend(band_detail[i].instagram));
                        vm.bandData.avatar.push(Vue.util.extend(band_detail[i].avatar));
                        vm.bandData.personil_posisi.push(Vue.util.extend(band_detail[i].position.id));
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted() {
        this.checkIzin()
    }
}
</script>
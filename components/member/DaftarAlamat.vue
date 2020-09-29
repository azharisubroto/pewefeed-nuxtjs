<template>
  <v-container>
    <v-row>
      <v-col>

        <!-- =====================================================================================
        ALERT
        ===================================================================================== -->
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          top
        >
          {{ responseMessage }}
          <v-btn
              color="primary"
              text
              icon
              @click="snackbar = false"
          >
          <v-icon color="white">mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-snackbar>

        <template v-if="addressForm">
          <v-text-field
            label="Label"
            placeholder="Kantor, Rumah . . ."
            outlined
            v-model="dataAddress.title"
          ></v-text-field>

          <v-textarea
            label="Alamat"
            placeholder="Alamat"
            outlined
            v-model="dataAddress.address"
          ></v-textarea>

          <v-autocomplete
          outlined
          :items="source.provinsi"
          item-text="nama"
          item-value="id"
          label="Provinsi"
          placeholder="Ketik untuk mencari..."
          clearable
          :min-len="5"
          v-model="dataAddress.province"
          @change="kota(dataAddress.province)"
          >
          </v-autocomplete>

          <v-autocomplete
          outlined
          v-if="source.kota.length > 0"
          :items="source.kota"
          item-text="nama"
          item-value="id"
          hide-no-data
          hide-selected
          label="Kabupaten/Kota"
          placeholder="Ketik untuk mencari..."
          clearable
          v-model="dataAddress.district"
          @change="kecamatan(dataAddress.district)"
          >
          </v-autocomplete>

          <v-autocomplete
          outlined
          v-if="source.kecamatan.length > 0"
          :items="source.kecamatan"
          item-text="nama"
          item-value="id"
          hide-no-data
          hide-selected
          label="Kecamatan"
          placeholder="Ketik untuk mencari..."
          clearable
          v-model="dataAddress.sub_district"
          @change="kelurahan(dataAddress.sub_district)"
          >
          </v-autocomplete>

          <v-autocomplete
          outlined
          v-if="source.kelurahan.length > 0"
          :items="source.kelurahan"
          item-text="nama"
          item-value="id"
          hide-no-data
          hide-selected
          label="Kelurahan/Desa"
          placeholder="Ketik untuk mencari..."
          clearable
          v-model="dataAddress.village"
          >
          </v-autocomplete>

          <v-text-field
            label="Kode Pos"
            placeholder="Kode Pos"
            outlined
            v-model="dataAddress.zip_code"
          ></v-text-field>

          <v-btn
          @click="addressForm=false"
          color="grey"
          dark
          depressed>Cancel</v-btn>

          <v-btn
          @click="addAddress()"
          color="deep-orange"
          dark
          depressed>Save</v-btn>
        </template>

        <v-btn
        v-if="!addressForm"
        @click="addressForm=true"
        color="deep-orange"
        dark
		block
        depressed> <v-icon>mdi-plus</v-icon> Tambah Alamat Baru</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-expansion-panels v-if="!isLoading && addresses" class="mb-3" focusable>
            <v-expansion-panel
            v-for="(address, i) in addresses"
            :key="i"
            >
            <v-expansion-panel-header>
                <v-row no-gutters>
                    <v-col cols="4">{{ address.title }}</v-col>
                    <v-col cols="8 text--secondary">{{ address.district }}</v-col>
                </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pt-3">
                {{address.address}}, Kelurahan {{address.village}}, Kecamatan {{address.district}}, {{address.regency}}, {{address.province}} Kode Pos {{address.zip_code}}
                <div class="mb-5"></div>
                <v-divider class="mb-5"></v-divider>
                <v-text-field
                  label="Label"
                  placeholder="Label"
                  :value="address.title"
                  :id="'title-'+address.id"
                ></v-text-field>

                <v-textarea
                  label="Alamat"
                  placeholder="Alamat"
                  :value="address.address"
                  :id="'address-'+address.id"
                ></v-textarea>

                <v-autocomplete
                  :items="source.provinsi"
                  hide-no-data
                  hide-selected
                  item-text="nama"
                  item-value="id"
                  label="Provinsi"
                  placeholder="Ketik untuk mencari..."
                  clearable
                  :id="'province-'+address.id"
                  v-model="dataAddress.province"
                  @change="kota(dataAddress.province)"
                >
                </v-autocomplete>

                <v-autocomplete
                  :items="source.kota"
                  item-text="nama"
                  item-value="id"
                  hide-no-data
                  hide-selected
                  label="Kabupaten/Kota"
                  placeholder="Ketik untuk mencari..."
                  clearable
                  :id="'regency-'+address.id"
                  v-model="dataAddress.district"
                  @change="kecamatan(dataAddress.district)"
                >
                </v-autocomplete>

                <v-autocomplete
                  :items="source.kecamatan"
                  item-text="nama"
                  item-value="id"
                  hide-no-data
                  hide-selected
                  label="Kecamatan"
                  placeholder="Ketik untuk mencari..."
                  clearable
                  :id="'district-'+address.id"
                  v-model="dataAddress.sub_district"
                  @change="kelurahan(dataAddress.sub_district)"
                >
                </v-autocomplete>

                <v-autocomplete
                  :items="source.kelurahan"
                  item-text="nama"
                  item-value="id"
                  hide-no-data
                  hide-selected
                  label="Kelurahan/Desa"
                  placeholder="Ketik untuk mencari..."
                  clearable
                  :id="'village-'+address.id"
                  v-model="dataAddress.village"
                >
                </v-autocomplete>

                <v-text-field
                  label="Kode Pos"
                  placeholder="Kode Pos"
                  :id="'zip_code-'+address.id"
                ></v-text-field>

                <v-btn
                @click="editAddress(address.id)"
                color="deep-orange"
                dark
                depressed>Save</v-btn>

                <v-btn
                @click="deleteAddress(address.id)"
                color="red"
                dark
                depressed
                class="float-right">
                    <v-icon>mdi-trash-can-outline</v-icon>
                    Hapus
                </v-btn>

            </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <div v-if="isLoading" class="text-center pa-3">
          Memuat Daftar Alamat...
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import UserService from '@/services/UserService'
export default {
  name:"DaftarAlamat",
  data() {
    return  {
      isLoading: true,
      addressForm: false,
      addresses: null,
      snackbar: false,
      timeout: 3000,
      responseMessage: '',
      dataAddress: {
        title: '',
        address: '',
        province: '',
        district: '',
        sub_district: '',
        village: '',
        zip_code: ''
      },
      source: {
        provinsi: [],
        kota: [],
        kecamatan: [],
        kelurahan: [],
      }
    }
  },
  methods: {
    async getAddresses() {
      this.isLoading = true
      try {
        const res = await UserService.getAddresses()
        var items = res.data.data
        if( items && items.length > 0 ) {
          ////console.log(JSON.parse(JSON.stringify(items)))
          this.addresses = items
        }
        this.isLoading = false
      } catch (error) {
        console.log(error)
        this.isLoading = false
      }
    },
    async addAddress() {
      var params = this.dataAddress
      try {
        const res = await UserService.addAddress(params)
        this.snackbar = true
        this.responseMessage = 'Data Sukses Ditambahkan'
        ////console.log(res.data.data)
        this.addressForm = false
        this.getAddresses()
        this.dataAddress.title = ''
        this.dataAddress.address = ''
        this.dataAddress.province = ''
        this.dataAddress.district = ''
        this.dataAddress.sub_district = ''
        this.dataAddress.village = ''
        this.dataAddress.zip_code = ''
      } catch (error) {
        console.log(error)
        this.snackbar = true
        this.responseMessage = 'Maaf Terdapat Kesalahan :('
      }
    },
    async deleteAddress(id) {
      try {
        const res = await UserService.deleteAddress(id)
        this.snackbar = true
        this.responseMessage = 'Alamat Telah Dihapus'
        this.addressForm = false
        this.getAddresses()
      } catch (error) {
        console.log(error)
        this.snackbar = true
        this.responseMessage = 'Maaf Terdapat Kesalahan :('
      }
    },
    async editAddress(id) {
      var title = document.getElementById('title-'+id).value
      var address = document.getElementById('address-'+id).value
      var zip_code = document.getElementById('zip_code-'+id).value

      var params = {
        id: id,
        title: title,
        address: address,
        province: this.dataAddress.province,
        district: this.dataAddress.district,
        sub_district: this.dataAddress.sub_district,
        village: this.dataAddress.village,
        zip_code: zip_code
      }
      // //console.log(JSON.parse(JSON.stringify(params)))

      try {
        const res = await UserService.editAddress(params)
        // //console.log(res)
        this.snackbar = true
        this.responseMessage = 'Data Sukses Ditambahkan'
        this.getAddresses()
      } catch (error) {
        console.log(error)
        this.snackbar = true
        this.responseMessage = 'Maaf Terdapat Kesalahan :('
      }
    },
    async provinsi() {
      try {
        const res = await UserService.provinsi()
        ////console.log(res.data.data)
        this.source.provinsi = res.data.data
      } catch (error) {

      }
    },
    async kota(provinceID) {
      try {
        const res = await UserService.kota(provinceID)
        //console.log(JSON.parse(JSON.stringify(res.data.data)))
        this.source.kota = res.data.data
      } catch (error) {

      }
    },
    async kecamatan(kotaID) {
      try {
        const res = await UserService.kecamatan(kotaID)
        //console.log(res.data.data)
        this.source.kecamatan = res.data.data
      } catch (error) {

      }
    },
    async kelurahan(kecamatanID) {
      try {
        const res = await UserService.kelurahan(kecamatanID)
        //console.log(res.data.data)
        this.source.kelurahan = res.data.data
      } catch (error) {

      }
    },
  },
  mounted() {
    this.getAddresses()
    this.provinsi()
  }
}
</script>

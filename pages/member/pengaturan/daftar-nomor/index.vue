<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="gray--text">Pengaturan Akun</div>
        <h2>Daftar Nomor</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <template v-if="numberForm">
          <v-autocomplete
            outlined
            label="Type"
            :items="voucherTypes"
            item-text="name"
            item-value="name"
            v-model="payload.type"
          ></v-autocomplete>

          <v-autocomplete
            v-if="payload.type == 'Bank'"
            outlined
            label="Pilih Bank"
            :items="banks"
            item-text="name"
            item-value="name"
            v-model="payload.bank"
          ></v-autocomplete>

          <v-text-field
            label="Nama"
            placeholder="Nama"
            outlined
            v-model="payload.name"
          ></v-text-field>

          <v-text-field
            label="Nomor"
            placeholder="Nomor"
            outlined
            v-model="payload.number"
          ></v-text-field>

          <v-btn
          @click="numberForm=false"
          color="grey"
          dark
          depressed>Cancel</v-btn>

          <v-btn
          @click="addNumber()"
          color="deep-orange"
          dark
          depressed>Save</v-btn>
        </template>

        <v-btn
        v-if="!numberForm"
        @click="numberForm=true"
        color="deep-orange"
        dark
        depressed> <v-icon>mdi-plus</v-icon> Tambah Nomor Baru</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-expansion-panels class="mb-3" focusable>
            <v-expansion-panel
            v-for="(contact, i) in contacts"
            :key="i"
            >
            <v-expansion-panel-header>
                <v-row no-gutters>
                    <v-col cols="6">{{ contact.title }}</v-col>
                    <v-col cols="6 text--secondary">{{ contact.type }}</v-col>
                </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pt-3">
                <v-row>
                  <v-col>Jenis</v-col>
                  <v-col>{{contact.type}}</v-col>
                </v-row>
                <v-row>
                  <v-col>Nama</v-col>
                  <v-col>{{contact.title}}</v-col>
                </v-row>
                <v-row>
                  <v-col>Nomor</v-col>
                  <v-col>{{contact.number}}</v-col>
                </v-row>

                UBAH NOMOR<br><br>
                <v-autocomplete
                  label="Type"
                  :items="voucherTypes"
                  item-text="name"
                  item-value="name"
                  v-model="payload.type"
                ></v-autocomplete>

                <v-autocomplete
                  v-if="payload.type == 'Bank'"
                  label="Pilih Bank"
                  :items="banks"
                  item-text="name"
                  item-value="name"
                  v-model="payload.bank"
                ></v-autocomplete>

                <v-text-field
                  label="Nama"
                  placeholder="Nama"
                  v-model="payload.name"
                ></v-text-field>

                <v-text-field
                  label="Nomor"
                  placeholder="Nomor"
                  v-model="payload.number"
                ></v-text-field>

                <v-btn
                @click="editNumber(contact.id)"
                color="deep-orange"
                dark
                depressed>Save</v-btn>

                <v-btn
                @click="deleteNumber(contact.id)"
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
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import UserService from '@/services/UserService'
export default {
  name:"daftarNomorPage",
  data() {
    return  {
      numberForm: false,
      banks: [],
      payload: {
        type: '',
        bank: '',
        name: '',
        number: '',
      },
      voucherTypes: [],
      contacts: null,
    }
  },
  methods: {
    async getNumbers() {
      try {
        const res = await UserService.getContacts()
        var items = res.data.data
        if( items && items.length > 0 ) {
          //console.log(JSON.parse(JSON.stringify(items)))
          this.contacts = items
        }
      } catch (error) {
        console.log(res)
      }
    },
    async getVoucherType() {
      try {
        const res = await UserService.getVoucherType()
        //console.log(JSON.parse(JSON.stringify(res.data.data)))
        this.voucherTypes = res.data.data.type
      } catch (error) {

      }
    },
    async getBank() {
      try {
        const res = await UserService.getBank()
        //console.log(JSON.parse(JSON.stringify(res.data.data.bank)))
        this.banks = res.data.data.bank
      } catch (error) {

      }
    },
    async addNumber() {
      var params = this.payload
      try {
        const res = await UserService.addNumber(params)
        alert('Data sukses ditambahkan')
        this.numberForm = false
        this.getNumbers()
        this.payload.type = ''
        this.payload.bank = ''
        this.payload.name = ''
        this.payload.number = ''
      } catch (error) {
        alert("Terdapat Kesalahan :(")
      }
    },
    async deleteNumber(id) {
      try {
        const res = await UserService.deleteNumber(id)
        alert('Nomor telah dihapus')
        this.getNumbers()
      } catch (error) {
        alert("Terdapat Kesalahan :(")
      }
    },
    async editNumber(id) {
      var params = {
        id: id,
        type: this.payload.type,
        name: this.payload.name,
        number: this.payload.number,
        bank: this.payload.bank
      }
      console.log(JSON.parse(JSON.stringify(params)))

      try {
        const res = await UserService.editNumber(params)
        console.log(res)
        alert('Data Sukses Ditambahkan ')
        this.getNumbers()
      } catch (error) {
        //alert('error')
      }
    },
  },
  mounted() {
    this.getNumbers()
    this.getVoucherType()
    this.getBank()
  }
}
</script>

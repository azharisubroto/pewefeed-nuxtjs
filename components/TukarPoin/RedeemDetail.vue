<template>
  <section>
    <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container class="mb-5 pb-5">
      <!-- TITLE -->
      <h2 class="mb-0">{{detail.title}}</h2>
      <hr class="my-4">
      <!-- DETAIL REWWARD -->
      <template v-if="detailtab">
        <v-row>
          <v-col>

            <v-img :src="detail.image"></v-img>

            <v-row>
              <v-col cols="7">
                <strong>Status</strong>
                <div class="caption">
                  Tersedia hingga {{ [getTanggal(detail), 'YYYY-MM-DD'] | moment('DD MMM YYYY') }}
                </div>
              </v-col>
              <v-col cols="5" class="text-right">
                <v-btn small outlined color="deep-orange" v-if="detail.active">Open Batch</v-btn>
                <v-btn small outlined color="red" v-else>Closed</v-btn>
              </v-col>
            </v-row>
            <hr>
            <v-row>
              <v-col cols="6">
                <strong>Poin Diperlukan</strong>
              </v-col>
              <v-col cols="6" class="text-right">
                <v-btn outlined rounded small color="deep-orange">
                  <img src="/img/poin.png" alt="" width="16" class="mr-1"> <strong>{{detail.point}}</strong>
                </v-btn>
              </v-col>
            </v-row>
            <hr>
            <v-row>
              <v-col cols="6">
                <strong>Sisa Hadiah</strong>
              </v-col>
              <v-col cols="6" class="text-right">
                <v-btn small text color="deep-orange">{{detail.stock ? detail.stock.remaining : '-'}} dari {{detail.stock ? detail.stock.qty : '-'}}</v-btn>
              </v-col>
            </v-row>
            <hr>
            <v-row>
              <v-col cols="12">
                <strong>Deskripsi</strong>
              </v-col>
              <v-col>
                <div v-html="detail.description"></div>
                <v-btn block dark depressed color="deep-orange" tile @click="tukarPoin()">
                  Tukarkan Poin
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>

      <!-- HISTORY -->
      <template v-if="hitoritab">
        <h4>Penukar Poin</h4>
        <div
          class="comment-item mb-2"
          v-for="history in histories"
          :key="history.id"
          :id="'history'+history.redeem_id"
        >
          <v-row>
            <v-col cols="2">
              <v-avatar size="30">
                <img
                  :src="history.customer.avatar ? history.customer.avatar : '/img/user.jpeg'"
                  onerror="this.src='/img/user.jpeg';"
                >
              </v-avatar>
            </v-col>
            <v-col cols="10">
              <strong>{{ history.customer.name }}</strong><br>
              <div class="mt-2 caption text--gray">
                {{history.date}} - Balas
              </div>
            </v-col>
          </v-row>
        </div>
        <br>
      </template>

      <!-- SYARAT -->
      <template v-if="syarattab">
        <div v-html="detail.term"></div>
      </template>
    </v-container>

    <v-bottom-navigation
      fixed
      dark
      grow
      color="white"
      background-color="black"
    >
      <v-btn @click="detailtab=true;hitoritab=false;syarattab=false">
        <span>Detail<br>Reward</span>
      </v-btn>
      <v-btn @click="detailtab=false;hitoritab=true;syarattab=false;fetchHistory()">
        <span>Histori<br>Penukaran</span>
      </v-btn>
      <v-btn @click="detailtab=false;hitoritab=false;syarattab=true">
        <span>Syarat &amp;<br>Ketentuan</span>
      </v-btn>
    </v-bottom-navigation>
  </section>
</template>

<script>
import TukarPoinService from '@/services/TukarPoinService'
import UserService from '@/services/UserService'

export default {
  name:"RedeemDetail",
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },
  data() {
    return {
      overlay: false,
      title: '',
      detail:'',
      detailtab: true,
      hitoritab: false,
      syarattab: false,
      histories: []
    }
  },
  methods: {
    async fetchDetail() {
      try {
        let res = await TukarPoinService.getRedeemDetail(this.$route.params.detail)
        this.detail = res.data.data
        this.title = res.data.data.title
        console.log(JSON.parse(JSON.stringify(res.data.data)))
      } catch (error) {
        console.log(error)
      }
    },
    async fetchHistory() {
      try {
        let res = await TukarPoinService.getRedeemHistory(this.$route.params.detail)
        this.histories = res.data.data
        console.log(JSON.parse(JSON.stringify(res.data.data)))
      } catch (error) {
        console.log(error)
      }
    },
    async tukarPoin() {
      var params = {
        redeem_id: this.detail.id,
        target_point: this.detail.point,
      }
      this.overlay = true
      console.log(params)
      try {
        const res = await UserService.tukarPoin(params)
        console.log(res)
        this.overlay = false
      } catch (error) {
        console.log(error)
        this.overlay = false
        alert('an error occured')
      }
    },
    getTanggal(detail) {
      var detailtanggal = detail.periode ? detail.periode.end_at : ''
      var tanggal = detailtanggal.replace('00:00:00', '');
          tanggal = tanggal.replace(' ', '');
      return tanggal
    }
  },
  created() {
    this.fetchDetail()
  }
}
</script>

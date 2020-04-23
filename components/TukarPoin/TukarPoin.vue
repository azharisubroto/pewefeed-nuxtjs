<template>
  <section class="pb-5">
    <!-- PENAWARAN -->
    <v-container>
      <v-row align="center" v-if="discounts">
        <v-col cols="6" class="py-0">
          <strong class="text-14">PENAWARAN TERBATAS</strong>
        </v-col>
        <v-col cols="6" class="text-right py-0" v-if="expire">
          <no-ssr>
            <flip-countdown :deadline="expire" :labels="labels"></flip-countdown>
          </no-ssr>
        </v-col>
      </v-row>
    </v-container>

    <!-- LATEST -->
    <flickity v-if="discounts" ref="flashPoin" :options="flickityOptions">
      <div v-for="item in discounts" :key="item.id" class="featured-item-2">
        <div class="py-5 px-7 jeruk">
          <v-row>
            <v-col cols="4">
              <v-img :contain="true" :src="item.image ? item.image : ''"></v-img>
            </v-col>
            <v-col cols="8">
              <v-row no-gutters>
                <v-col cols="1">&nbsp;</v-col>
                <v-col cols="11">
                  <strong
                    style="text-decoration:line-through"
                    class="text-14 red--text"
                  >{{item.promoted_price}}</strong>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="1">
                  <img
                    src="/img/poin.png"
                    alt
                    width="16"
                    class="mr-1 mt-1"
                    style="vertical-align:top"
                  />
                </v-col>
                <v-col cols="11">
                  <strong class="text-14" style="line-height:1">{{item.price}}</strong>
                  <h1 class="mb-2">{{item.title}}</h1>
                  <v-btn
                    color="deep-orange"
                    depressed
                    dark
                    small
                    @click="$router.push('/tukarpoin/redeem/'+item.id)"
                  >Tukar Poin</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </div>
    </flickity>

    <div class="devider-small"></div>

    <v-container class="mt-5 pt-5 mb-5 pb-5">
      <template v-if="tukarpointab">
        <v-row>
          <v-col cols="12" class="py-0">
            <h4 class="text-uppercase">Rewards Lainnya</h4>
          </v-col>
        </v-row>
        <v-row
          class="topview-item"
          v-for="(article, i) in redeems"
          :key="'topview-'+article.id+'-'+i"
          @click="$router.push('/tukarpoin/redeem/'+article.id)"
        >
			<v-col cols="12" v-if="i%5 == 0">
				<!-- ADSENSE -->
				<InFeedAdsense
				data-ad-layout-key="-fb+5w+4e-db+86"
				data-ad-client="ca-pub-6581994114503986"
				data-ad-slot="7916120444"
				></InFeedAdsense>
			</v-col>
          <v-col cols="4">
            <div class="jeruk pa-3">
              <v-img contain :src="article.image" aspect-ratio="1" class="jeruk"></v-img>
            </div>
          </v-col>
          <v-col cols="8" class="d-flex align-content-space-between flex-wrap">
            <div class="d-block mb-2 w-100">
              <h2 class="mb-2" style="width:100%;">{{article.reward}}</h2>
              <img src="/img/poin.png" alt width="16" class="mr-1 mt-1" style="vertical-align:top" />
              <strong class="text-14" style="line-height:1">{{article.point}}</strong>
            </div>
            <div class="self-align-end meta text--gray" style="font-size:16px;">
              <v-btn
                color="deep-orange"
                depressed
                dark
                small
                @click="$router.push('/tukarpoin/redeem/'+item.redeem.id)"
              >Tukar Poin</v-btn>
            </div>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col>
            <v-pagination v-model="page" :length="totalpage" color="orange" @input="next"></v-pagination>
          </v-col>
        </v-row>
      </template>

      <template v-if="syarattab">
        <v-row class="mt-0">
          <v-col>
            <h2 class="mb-4">Syarat &amp; Ketentuan</h2>
            <p>Untuk mendapatkan barang cukup menukarkan POIN sesuai dengan jumlah POIN YANG DIPERLUKAN</p>

            <p>Untuk mendapatkan POIN lakukan SHARE, COMMENT, jawab QUIZ disetiap Artikel {{ domainTitle }} atau mainkan GAME nya.</p>

            <p>Cek videonya disini :</p>

            <iframe
              width="320"
              height="315"
              src="https://www.youtube.com/embed/_gbe_xq27pE"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </v-col>
        </v-row>
      </template>
    </v-container>

    <v-bottom-navigation fixed dark grow color="white" background-color="black">
      <v-btn @click="tukarpointab=true;syarattab=false">
        <span>Tukar Poin</span>
      </v-btn>

      <v-btn @click="tukarpointab=false;syarattab=true">
        <span>Syarat &amp; Ketentuan</span>
      </v-btn>
    </v-bottom-navigation>
  </section>
</template>

<script>
import TukarPoinService from "@/services/TukarPoinService";
import FlipCountdown from "vue2-flip-countdown";
export default {
  name: "PwPoin",
  components: {
    FlipCountdown
  },
  data() {
    return {
      domainTitle: process.env.domainTitle,
      tukarpointab: true,
      syarattab: false,
      toppoinbanner:
        "http://b16e2bab9e94a9d05089-aa7428b954372836cd8898750ce2dd71.r41.cf6.rackcdn.com/assets/frontend/images/banner-toppoin.jpg",
      model: null,
      redeems: null,
      discounts: null,
      garfik: "",
      tukarpoin: "",
      totalpage: 1,
      page: 1,
      expire: null,
      flickityOptions: {
        groupCells: 1,
        prevNextButtons: false,
        pageDots: true,
        wrapAround: true
      },
      labels: {
        days: "Days",
        hours: "Hr",
        minutes: "Min",
        seconds: "Sec"
      }
    };
  },
  methods: {
    async fetchRedeemItems(n) {
      var n = n ? n : 1;
      var params = {
        page: 1
      };
      try {
        const res = await TukarPoinService.getRedeemItems(n);
        // console.log(JSON.parse(JSON.stringify(res)));
        this.redeems = res.data.data;
        this.totalpage = res.data.pagination.last_page;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDiscounts() {
      try {
        const res = await TukarPoinService.getDiscount();
        const items = res.data.redeem_discount.item;
        this.expire = res.data.redeem_discount.expire;
        //console.log("kontol", JSON.parse(JSON.stringify(items)));
        if (items) {
          this.discounts = items;
        }
      } catch (error) {
        console.log(error);
      }
    },
    next(num) {
      this.fetchRedeemItems(num);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  },
  mounted() {
    this.fetchRedeemItems();
    this.fetchDiscounts();
  }
};
</script>

<style lang="scss">
.featured-item-2 {
  width: 100%;
  height: 200px;
}
.poinbutuh {
  position: absolute;
  z-index: 100;
  right: 10px;
  top: 10px;
}
.flip-clock.container {
  text-align: right;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.flip-clock__piece,
.flip-clock__card .flip-card,
.flip-card {
  text-align: center !important;
}
.flip-card__top {
  color: #fba627;
}
.flip-card {
  font-size: 20px !important;
}
.flip-clock__slot {
  font-size: 10px !important;
}
.w-100 {
  width: 100%;
}
.jeruk {
	background: #ff9800
}
</style>

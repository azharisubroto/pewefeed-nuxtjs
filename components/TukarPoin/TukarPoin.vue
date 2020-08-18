<template>
  <section class="pb-5">
	<template v-if="tukarpointab">
		<v-container>
			<v-row align="center" v-if="discounts">
				<v-col cols="6" class="py-0">
				<h4 class="text-uppercase deep-orange--text">Rewards Terbatas</h4>
				</v-col>
				<v-col cols="6" class="text-right py-0" v-if="expire">
				<no-ssr>
					<flip-countdown :deadline="expire" :labels="labels"></flip-countdown>
				</no-ssr>
				</v-col>
			</v-row>
		</v-container>

		<!-- LATEST -->
		<client-only>
			<div class="slidewrapper  my-5">
				<flickity
				class="tukarpoinslide"
				v-if="discounts"
				ref="tukarpointslideeee"
				:options="flickityOptions"
				>
				<div
					v-for="item in discounts"
					:key="item.id"
					class="featured-item-2"
					@click="$router.push('/tukarpoin/redeem/'+item.id)"
				>
					<div class="pt-5 px-3 jeruk">
						<v-row>
							<v-col cols="5" class="pt-0 pr-0">
								<img :src="item.image ? item.image : ''" alt=""/>
							</v-col>
							<v-col cols="7">
								<v-row no-gutters>
									<v-col cols="2" clas="pr-4">
										<img
										src="/img/icons/poin-black.svg"
										alt
										class="mr-1 mt-1"
										style="vertical-align:top"
									/>
									</v-col>
									<v-col cols="10">
										<strong
											style="text-decoration:line-through"
											class="text-16 black--text"
										>{{item.promoted_price}} Poin</strong>
											<div></div>
										<strong class="text-18" style="line-height:1">{{item.price}} Poin</strong>
									</v-col>
								</v-row>
								<div class="devider-small my-3" style="border-color:#000"></div>

								<div class="mb-2 text-20">{{item.title}}</div>
								<v-btn
								color="deep-orange"
								depressed
								dark
								block
								small
								@click="$router.push('/tukarpoin/redeem/'+item.id)"
								>Tukar Poin</v-btn>
							</v-col>
						</v-row>
					</div>
				</div>
				</flickity>
			</div>
		</client-only>

		<v-container>
			<v-row>
				<v-col cols="12" class="py-0">
				<h4 class="text-uppercase mt-4 deep-orange--text">Rewards Lainnya</h4>
				</v-col>
			</v-row>
			<v-row
				class="topview-item py-4"
				style="border-bottom:1px solid #FFECEC"
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
					<v-col cols="4" :class="article.expired ? 'expired': 'active'">
						<v-img contain :src="article.image" aspect-ratio="1"></v-img>
					</v-col>
					<v-col
					cols="8"
					:class="article.expired ? 'expired': 'active'"
					class="d-flex align-content-space-between flex-wrap"
					>
					<div class="d-block mb-2 w-100">
						<img src="/img/icons/poin-p.svg" alt width="20" class="mr-1 mt-0" style="vertical-align:top" />
						<strong class="text-18" style="line-height:1">{{article.point}} Poin</strong>

						<div class="devider-small my-4"></div>

						<h2 class="mb-2" style="width:100%;">{{article.reward}}</h2>
					</div>
					<div class="d-block w-100">
						<v-btn
						color="deep-orange"
						depressed
						dark
						block
						small
						@click="$router.push('/tukarpoin/redeem/'+article.id)"
						>{{article.expired ? 'Lihat' : 'Tukar Poin'}}</v-btn>
					</div>
				</v-col>
			</v-row>

			<v-row class="mt-4">
				<v-col>
				<v-pagination v-model="page" :length="totalpage" color="orange" @input="next"></v-pagination>
				</v-col>
			</v-row>
		</v-container>
	</template>

	<template v-if="syarattab">
		<section class="toppoin-acc" v-if="term">
			<v-expansion-panels v-for="(item,index) in term" :key="index">
			<v-expansion-panel class="mb-0">
				<v-expansion-panel-header class="py-5 text-uppercase">{{item.title}}</v-expansion-panel-header>
				<v-expansion-panel-content class="caption">
				<div v-html="item.content"></div>
				</v-expansion-panel-content>
			</v-expansion-panel>
			</v-expansion-panels>
      	</section>
	</template>

    <v-bottom-navigation
      fixed
      dark
      grow
      color="white"
      background-color="#2C2C2D"
      height="80"
      class="pwmenubottom"
      v-model="hehe"
    >
      <v-btn @click="tukarpointab=true;syarattab=false">
        <span>Rewards</span>
        <img src="/img/tukarpoin/tukarpoin-orange.png" class="mb-1 d-block" width="20" height="20" />
      </v-btn>

      <v-btn @click="tukarpointab=false;syarattab=true">
        <span>How to</span>
        <img src="/img/tukarpoin/howto-orange.png" class="mb-1 d-block" width="20" height="20" />
      </v-btn>
      <ShareButton2 />
    </v-bottom-navigation>
  </section>
</template>

<script>
import TukarPoinService from "@/services/TukarPoinService";
import FlipCountdown from "vue2-flip-countdown";
import ShareButton2 from "@/components/common/ShareButton2";
export default {
  name: "TukarPoin",
  components: {
    FlipCountdown,
    ShareButton2
  },
  data() {
    return {
      hehe: 0,
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
	  term: null,
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
	},
	async fetchDetail() {
      try {
        let res = await TukarPoinService.getRedeemDetail(608);
        this.term = res.data.data.term;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.fetchRedeemItems();
	this.fetchDiscounts();
	this.fetchDetail();
  },
  beforeRouteLeave (from, to, next) {
	const slider = this.$refs.tukarpointslideeee.$el
	slider.style.transition = 'opacity .25s ease'
	slider.style.opacity = 0
	setTimeout(() => {
		next()
	}, 250)
  }
};
</script>

<style lang="scss">
.slidewrapper {
	height: 280px;
	overflow: hidden;
	position: relative;
}
.tukarpoinslide {
  height: 280px !important;
  background: #FE9800;
  .featured-item-2 {
    width: 100%;
    height: 280px !important;
    .jeruk {
      height: 280px !important;
    }
  }
  .flickity-page-dots {
	  bottom: 16px !important;
  }
}
.flip-card__top[data-v-72281230], .flip-card__bottom[data-v-72281230], .flip-card__back-bottom[data-v-72281230], .flip-card__back[data-v-72281230]::before, .flip-card__back[data-v-72281230]::after{
	color: #fff!important;
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
  color: #fff;
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
  background: #FE9800;
  color: #000;
}
.expired {
  filter: grayscale(100%);
}
.tukarpoin-content p {
  font-size: 16px !important;
}
</style>

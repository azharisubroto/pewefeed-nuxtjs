<template>
  <section class="pb-5">
	<template v-if="tukarpointab">

		<!-- LATEST -->
		<client-only>
			<div class="slidewrapper  mt-5 mb-0">
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
					<div class="pt-5 px-3" :style="'color:#000!important;background: radial-gradient(circle, '+item.category.color_base_1+' 0%, '+item.category.color_base_2+' 100%);'">
						<v-row>
							<v-col cols="5" class="pt-0 pr-0">
								<v-img contain :src="item.image ? item.image : ''" alt="" max-height="200"></v-img>
							</v-col>
							<v-col cols="7">
								<!-- Title -->
								<div class="mb-2 text-20"><strong>{{item.title}}</strong></div>
								
								<!-- Poin needed -->
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

								<!-- Button -->
								<v-btn
								color="deep-orange"
								class="mt-4"
								depressed
								dark
								@click="$router.push('/tukarpoin/redeem/'+item.id)"
								>Tukar Poin</v-btn>
							</v-col>
						</v-row>
					</div>
				</div>
				</flickity>
			</div>
		</client-only>

		<template v-if="groupedItems!=null">
			<template v-for="(item, i) in groupedItems">
				<div 
				v-if="item.item.length>0"
				:key="'sectiontp-'+i"
				:style="'height:auto;padding-bottom:30px;color:#000!important;background: radial-gradient(at top left, '+item.attributes.color_base_1+' 0%, '+item.attributes.color_base_2+' 100%);overflow:hidden;'"
				class="py-5 mb-4"
				>
					<div class="plainslide-wrapper">
						<div
						class="plainslide"
						v-if="discounts"
						>
							<div class="pt-4 text-18 lh-21 px-4" style="display: block; white-space: inherit; min-width: 123px;max-width:123px;height:200px;background:transparent;">
								<div class="d-block" style="width:100%;white-space: unset;break-word:break-all;white-space: break-spaces;">
									<strong>{{item.category}}</strong>
									<div class="mt-2" style="width:27px;height:4px;background:#FF4200"></div>
								</div>
							</div>

							<div
							v-for="cool in item.item"
							:key="'insideoout-'+cool.id"
							:class="[cool.expired == true ? 'expired' : '']"
							style="min-width: 123px;max-width:123px"
							@click="$router.push('/tukarpoin/redeem/'+cool.id)"
							>
								<v-img :src="cool.image" alt="" contain color="deep-orange" height="145"></v-img>
								<div class="text-12 mt-2" style="height:40px;word-wrap: break-all">
									{{cool.title}}
								</div>
								<div class="mt-1 text-12">
									<img src="/img/icons/poin-p.svg" alt="" class="mr-1" width="10" style="vertical-align:middle"/>
									<strong>{{cool.point}}</strong>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</template>
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
        wrapAround: false
	  },
	  flickityOptions2: {
        groupCells: 4,
        prevNextButtons: false,
        pageDots: false,
		wrapAround: false,
		cellAlign: 'left'
      },
      labels: {
        days: "Days",
        hours: "Hr",
        minutes: "Min",
        seconds: "Sec"
	  },
	  groupedItems: null
    };
  },
  methods: {
	async fetchGrouped(){
		try {
			const res = await TukarPoinService.getGrouped()

			if( res.data.data != null && res.data.data.length > 0 ) {
				this.groupedItems = res.data.data
			}
			//var data = res.data.data
		} catch (error) {
			console.log(error)
		}
	},
    async fetchRedeemItems(n) {
      var n = n ? n : 1;
      var params = {
        page: 1
      };
      try {
        const res = await TukarPoinService.getRedeemItems(n);
        // //console.log(JSON.parse(JSON.stringify(res)));
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
        ////console.log("kontol", JSON.parse(JSON.stringify(items)));
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
    //this.fetchRedeemItems();
	this.fetchDiscounts();
	this.fetchDetail();
	this.fetchGrouped();
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


<style lang="scss" scoped>
	.expired {
		filter: grayscale(1)
	}
</style>
<style lang="scss">
.slidewrapper {
	overflow: hidden;
	position: relative;
}
.tukarpoinslide {
  background: #1C1C1C;
  .featured-item-2 {
    width: 100%;
    height: 230px !important;
  }
  .flickity-page-dots {
	  bottom: 0px !important;
	  position: relative!important;
	  background: transparent;
	  height: 48px;
	  line-height: 48px;
	  padding: 0 10px!important;
	  text-align: left;

	  .dot {
		  width: 10px!important;
		  height: 10px!important;
		  border-radius: 90px!important;
		  opacity: 1!important;
	  }
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

.plainslide-wrapper {
	overflow-x: hidden;
}
.plainslide {
	overflow-x: scroll;
    overflow-y: hidden;
    white-space:nowrap;
	display: flex;
	padding-right: 10px;

	& > div {
		white-space: initial;
		height: 235px;
		color:#fff;
		width: 123px;
		background:#000;
		padding:10px;
		margin:0 5px;
		border-radius:5px;
	}
}
</style>

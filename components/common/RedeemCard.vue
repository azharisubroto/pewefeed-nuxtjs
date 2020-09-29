<template>
  <v-card
    class="mt-4"
    elevation="0"
    v-if="data"
    @click="$router.push('/tukarpoin/redeem/'+data.redeem.id)"
  >
    <div>
      <div :class="['orange jangan lighten-1 py-1', 'px-4']">
        <v-row align="center">
          <v-col cols="3">
            <img :src="data.redeem.image" contain>
          </v-col>
          <v-col cols="9" class="pr-4">
            <v-row no-gutters class="mx-0">
              <v-col cols="2" class="pr-2">
                <img
                  src="/img/icons/poin-black.svg"
                  alt
                  class="mr-1 mt-1"
				  width="26"
                  style="vertical-align:top"
                />
              </v-col>
              <v-col cols="10">
                <strong class="text-20 black--text d-block mt-1" style="line-height:1">{{data.redeem.price}} Poin</strong>
              </v-col>
            </v-row>
            <div class="devider-small my-3" style="border-color:#000"></div>

            <div class="text-18 black--text mb-2">{{data.redeem.title}}</div>

			<v-btn
			color="deep-orange"
			depressed
			dark
			block
			small
			@click="$router.push('/tukarpoin/redeem/'+data.redeem.id)"
			>Tukar Poin</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-card>
</template>

<script>
import RedeemService from "@/services/RedeemService";
export default {
  name: "RedeemCard",
  data() {
    return {
      data: null,
    };
  },
  methods: {
    numberWithCommas(x) {
      // //console.log(x)
      // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async getRedeem() {
      try {
        const res = await RedeemService.getRedeem();
        // //console.log(res.data.data.redeem)
        this.data = res.data.data.redeem;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getRedeem();
  },
};
</script>

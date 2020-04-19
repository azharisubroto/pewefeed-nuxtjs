<template>
    <v-card class="mt-4" elevation="0" v-if="data" @click="$router.push('/tukarpoin/redeem/'+data.redeem.id)">
        <div>
            <div :class="['orange jangan lighten-1 py-1', 'px-4']">
              <v-row align="center" class="py-0">
                  <v-col cols="4">
                      <v-img :aspect-ratio="2/3" :src="data.redeem.image" contain></v-img>
                  </v-col>
                  <v-col cols="8">
                      <v-row>
                          <v-col cols="3" style="margin-top: -5px !important" justify="center" align="center">
                              <v-img
                                  src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/m-menu2/p.png"
                                  width="20"
                              >
                              </v-img>
                          </v-col>
                          <v-col cols="9" style="margin-left: -15px" justify="center" align="left" class="pt-0">
                                <div class="text-20">
                                  <strong class="text-14">{{ data.redeem.price }}</strong>
                                </div>
                                <template>
                                  <strong class="text-18">{{ data.redeem.title }}</strong>
                                  <div></div>
                                  <v-btn class="mt-3" small color="deep-orange" dark depressed>TUKAR POIN</v-btn>
                                </template>
                          </v-col>
                      </v-row>
                  </v-col>
              </v-row>
            </div>
        </div>
    </v-card>
</template>

<script>
import RedeemService from "@/services/RedeemService";
export default {
    name:"RedeemCard",
    data() {
        return {
            data: null      
        }
    },
    methods:{
        numberWithCommas(x) {
            // console.log(x)
            // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        async getRedeem() {
            try {
                const res = await RedeemService.getRedeem();
                console.log(res.data.data.redeem)
                this.data = res.data.data.redeem;
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        this.getRedeem();
    }
  }
</script>

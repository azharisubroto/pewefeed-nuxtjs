<template>
    <div>
        <!-- PERINGKAT -->
        <v-skeleton-loader v-if="garfik==''"
          class="mx-auto mt-5"
          type="list-item-avatar-three-line, image, article"
        ></v-skeleton-loader>
        <div class="py-3 white" v-else>
            <v-container>
                <v-row>
                    <v-col cols="12"><h4>TOP POIN</h4></v-col>
                    <v-col cols="12">
                        <BannerStatic slug="toppoin"/>
                    </v-col>
                </v-row>
            </v-container>
            <v-list three-line>
                <template v-for="(item, index) in garfik">
                    <v-list-item
                    :key="item.name+'-'+index"
                    >
                    <v-btn class="mr-4 juara" fab dark small color="deep-orange">
                        {{ index + 1 }}
                    </v-btn>

                    <v-list-item-content>
                        <v-list-item-title v-html="item.name"></v-list-item-title>
                        <v-list-item-subtitle>Total Poin: <strong class="text--green">{{ item.total_poin }}</strong></v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>

            <v-container>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-btn block outlined color="deep-orange">
                            Lihat Peringkat Kamu
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>

        </div>

        <!-- TUKAR POIN -->
        <v-container>
            <v-row>
                <v-col cols="12"><h4>TUKAR POIN</h4></v-col>
            </v-row>
        </v-container>
        <v-skeleton-loader v-if="tukarpoin==''"
          class="mx-auto mt-5"
          type="list-item-avatar-three-line, image, article"
        ></v-skeleton-loader>
        <div class="scroller mb-5" v-else>
          <div
          v-for="item in tukarpoin"
          :key="item.id"
          style="width:300px"
          class="carousel-cell mr-3">
            <v-card
              width="350"
            >
              <v-img
                :aspect-ratio="16/9"
                :src="item.redeem.image"
              ></v-img>
              <v-card-text>
                <h3>{{item.title}}</h3>
                <br>
                <v-btn depressed dark block color="deep-orange">
                  Dapatkan Sekarang
                </v-btn>
              </v-card-text>
            </v-card>
          </div>
        </div>
    </div>
</template>

<script>
import ArticleService from '@/services/ArticleService.js';
import BannerStatic from '@/components/common/BannerStatic';
export default {
    name:"PwPoin",
    components: {
        BannerStatic,
    },
    data() {
        return {
            toppoinbanner: 'http://b16e2bab9e94a9d05089-aa7428b954372836cd8898750ce2dd71.r41.cf6.rackcdn.com/assets/frontend/images/banner-toppoin.jpg',
            model: null,
            garfik: '',
            tukarpoin: ''
        }
    },
    methods: {
      async fetchTopPoin() {
        try {
            const res = await ArticleService.getTopPoin()
            ////console.log(JSON.parse(JSON.stringify(res.data.data.ranked.garfik)))
            this.toppoinbanner = res.data.data.periode.banner.desktop
            this.garfik = res.data.data.ranked.garfik
        } catch (error) {
            console.log(error)
        }
      },
      async fetchTukarPoin() {
        try {
          const res = await ArticleService.getTukarPoin()
          //console.log(JSON.parse(JSON.stringify(res.data.data.redeem)))
          this.tukarpoin = res.data.data.redeem
        } catch (error) {
          console.log(error)
        }
      }
    },
    mounted(){
      this.fetchTopPoin()
      this.fetchTukarPoin()
    }
}
</script>

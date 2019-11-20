<template>
  <section>
    <v-container v-if="userdata" class="highlight">
      <v-row>
        <v-col>
          <div class="text-center">
            <div class="text-dark">Total Poin</div>
            <div class="text-40">
              <strong>{{ userdata ? kFormatter(userdata.point_total, 1) : '0' }}</strong>
            </div>
          </div>
        </v-col>
      </v-row>

      <div class="text-center text-dark devider">
        <span>Statistik Bulan Ini</span>
      </div>

      <v-row class="text-center">
        <v-col>
          <strong class="text-dark">Poin</strong>
          <div class="text-20">
            <strong>{{ userdata ? userdata.point_by_month : '0' }}</strong>
          </div>
        </v-col>
        <v-col>
          <strong class="text-dark">Comment</strong>
          <div class="text-20">
            <strong>{{ userdata ? userdata.point_comment : '0' }}</strong>
          </div>
        </v-col>
        <v-col>
          <strong class="text-dark">Quiz</strong>
          <div class="text-20">
            <strong>{{ userdata ? userdata.point_quiz : '0' }}</strong>
          </div>
        </v-col>
        <v-col>
          <strong class="text-dark">Star</strong>
          <div class="text-20">
            <strong>{{ userdata ? userdata.point_star : '0' }}</strong>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="mutasi.length > 0">
      <v-row
        v-for="(item, i) in mutasi"
        :key="'item-'+i"
      >
        <v-col cols="9">
          <div class="caption">
            {{item.status}}/{{item.created_at}}
          </div>
          <div class="text-16">
            <strong>{{item.type}}</strong>
          </div>
          <div>
            <a v-if="item.link" :href="item.link">{{item.description}}</a>
            <span v-else>{{item.description}}</span>
          </div>
        </v-col>
        <v-col class="text-20 text-right" cols="3">
          <strong>{{item.point}}</strong>
        </v-col>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-pagination
            v-model="page"
            class="my-4"
            :length="last_page"
            @input="next"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
    <v-skeleton-loader
      v-else-if="mutasi.length == 0"
      class="mb-6"
      type="list-item-three-line,list-item-three-line,list-item-three-line"
    ></v-skeleton-loader>


    <!-- PROFIL MENU -->
    <v-bottom-navigation
      grow
      dark
      fixed
      color="dark"
    >
      <v-btn
      @click="fethMutasi(1, 'all')"
      >
        <span>All</span>
      </v-btn>
      <v-btn
      @click="fethMutasi(1, 'dapat')"
      >
        <span>Dapat</span>
      </v-btn>
      <v-btn
      @click="fethMutasi(1, 'tukar')"
      >
        <span>Tukar</span>
      </v-btn>
      <v-btn
      @click="fethMutasi(1, 'fraud')"
      >
        <span>Fraud</span>
      </v-btn>
    </v-bottom-navigation>
  </section>
</template>
<script>
import UserService from '@/services/UserService'
export default {
  name:"historiPoinPage",
  data() {
    return {
      userdata: null,
      mutasi: [],
      page:1,
      last_page: 1
    }
  },
  methods: {
    async fetchUserdata() {
      try {
        const res = await UserService.getSingleUser()
        //console.log(res)
        this.userdata = res.data
      } catch (error) {
        console.log(error)
        // if (error.response.status == 401) {
        //   this.$router.push('/')
        // }
      }
    },
    async fethMutasi(page, filter) {
      this.mutasi = []
      var n = page ? page : 1
      var fil = filter ? filter : 'all'
      try {
        const res = await UserService.mutasiPoin(n, fil)
        const items = res.data.data
        this.last_page = res.data.paginations.last_page
        var arrays = []
        items.forEach(el => {
          var link = el.link
          var path = link.replace('https://playworld.id', '')
          var obj = {
            status: el.status,
            created_at: el.created_at,
            type: el.type,
            description: el.description,
            point: el.point,
            link: path
          }
          arrays.push(obj)
        });

        this.mutasi = arrays

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });

        console.log(JSON.parse(JSON.stringify(res)))
      } catch (error) {
        console.log('error')
        this.fethMutasi(1,'all')
      }
    },
    next(num) {
      this.fethMutasi(num)
    },
    kFormatter(number, decPlaces) {
        decPlaces = Math.pow(10,decPlaces);

        var abbrev = [ "K", "M", "B", "T" ];

        for (var i=abbrev.length-1; i>=0; i--) {

            var size = Math.pow(10,(i+1)*3);

            if(size <= number) {
                number = Math.round(number*decPlaces/size)/decPlaces;

                if((number == 1000) && (i < abbrev.length - 1)) {
                    number = 1;
                    i++;
                }

                number += abbrev[i];

                break;
            }
        }

        return number;
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'K' : Math.sign(num)*Math.abs(num)
    },
  },
  created() {
    this.fetchUserdata()
    this.fethMutasi()
  }
}
</script>

<style lang="scss">
  .highlight {
    background: #c9f1fd;
    color: #1a6af6;
  }
  .text-dark {
    color: #000;
  }
  .devider {
    position: relative;
    text-align: center;
    z-index: 0;
    &:before {
      content:"";
      width: 100%;
      z-index: -1;
      height: 1px;
      background: #000;
      opacity: .1;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto 0;
    }
    span {
      padding: 0 10px;
      background: #c9f1fd;
    }
  }
</style>

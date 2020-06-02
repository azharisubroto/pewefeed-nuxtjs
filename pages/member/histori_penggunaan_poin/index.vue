<template>
  <section>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-container v-if="userdata" class="highlight">
      <v-row>
        <v-col>
          <div class="text-center">
            <div class="text-40">
              <strong>{{ userdata.point_total ? numberWithCommas(userdata.point_total) : '0' }}</strong>
            </div>
          </div>
        </v-col>
      </v-row>

      <div class="text-center row pb-0">
        <v-col cols="12" class="pb-0">
          <v-btn @click="fethMutasi(1, 'all')" text dark small>
            <span>All</span>
          </v-btn>
          <v-btn @click="fethMutasi(1, 'dapat')" text dark small>
            <span>Received</span>
          </v-btn>
          <v-btn @click="fethMutasi(1, 'tukar')" text dark small>
            <span>Exchange</span>
          </v-btn>
          <v-btn @click="fethMutasi(1, 'fraud')" text dark small>
            <span>Fraud</span>
          </v-btn>
        </v-col>
      </div>
    </v-container>

    <v-container v-if="mutasi.length > 0">
      <v-row v-for="(item, i) in mutasi" :key="'item-'+i">
        <v-col cols="9">
          <div class="caption">{{item.status}}/{{item.created_at}}</div>
          <div class="text-16">
            <strong>{{item.type}}</strong>
          </div>
          <div>
            <a
              class="blue--text"
              v-if="item.link"
              @click="$router.push(item.link)"
            >{{item.description}}</a>
            <span v-else>{{item.description}}</span>
          </div>
          <div v-if="item.daily_point" class="mt-2">
            <v-btn v-if="item.daily_point == 'claim'" @click="claim()" small color="success">KLAIM</v-btn>
            <v-btn v-if="item.daily_point == 'success'" small disabled color="success">SUCCESS</v-btn>
            <v-btn v-if="item.daily_point == 'expire'" small disabled color="success">EXPIRED</v-btn>
          </div>
        </v-col>
        <v-col class="text-20 text-right" cols="3">
          <strong v-if="item.daily_point == 'expire'">0</strong>
          <strong v-else>{{item.point}}</strong>
        </v-col>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-pagination v-model="page" class="my-4" :length="last_page" @input="next"></v-pagination>
        </v-col>
      </v-row>
    </v-container>
    <v-skeleton-loader
      v-else-if="mutasi.length == 0 && available == false"
      class="mb-6"
      type="list-item-three-line,list-item-three-line,list-item-three-line"
    ></v-skeleton-loader>

    <div v-else>
      <v-alert prominent text type="info" success>Tidak ada data yang tersedia</v-alert>
    </div>
  </section>
</template>
<script>
import UserService from "@/services/UserService";
export default {
  middleware: "auth",
  name: "historiPoinPage",
  data() {
    return {
      userdata: null,
      mutasi: [],
      page: 1,
      last_page: 1,
      available: false,
      overlay: false
    };
  },
  methods: {
    fetchUserdata() {
      // this.$auth.fetchUser()

      var res = []
      // res.data = this.$auth.user
      res.data = JSON.parse(localStorage.getItem('userdata'));

      this.userdata = res.data;
    },
    async fethMutasi(page, filter) {
      this.mutasi = [];
      var n = page ? page : 1;
      var fil = filter ? filter : "all";
      this.available = false;
      try {
        const res = await UserService.mutasiPoin(n, fil);
        const items = res.data.data;
        this.last_page = res.data.paginations.last_page;
        console.log(items);
        var arrays = [];
        items.forEach(el => {
          var link = el.link;
          var path = link.replace(process.env.baseUrl, "/");
          var obj = {
            status: el.status,
            created_at: el.created_at,
            type: el.type,
            description: el.description,
            point: el.point,
            link: path,
            daily_point: el.daily_point
          };
          arrays.push(obj);
        });

        this.mutasi = arrays;

        this.available = true;

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });

        // console.log(JSON.parse(JSON.stringify(res)))
      } catch (error) {
        console.log("error");
        this.fethMutasi(1, "all");
      }
    },
    next(num) {
      this.fethMutasi(num);
    },
    kFormatter(number, decPlaces) {
      decPlaces = Math.pow(10, decPlaces);

      var abbrev = ["K", "M", "B", "T"];

      for (var i = abbrev.length - 1; i >= 0; i--) {
        var size = Math.pow(10, (i + 1) * 3);

        if (size <= number) {
          number = Math.round((number * decPlaces) / size) / decPlaces;

          if (number == 1000 && i < abbrev.length - 1) {
            number = 1;
            i++;
          }

          number += abbrev[i];

          break;
        }
      }

      return number;
      return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K"
        : Math.sign(num) * Math.abs(num);
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async claim() {
      this.overlay = true;
      let vm = this
      try {
        const res = await UserService.claimDailyPoint();
        this.overlay = false;
        
        this.$auth.fetchUser().then(() => {
          localStorage.setItem('userdata', JSON.stringify(vm.$auth.user))
        })
        
        this.fetchUserdata();
        this.fethMutasi();
        location.reload()
      } catch (error) {
        this.overlay = false;
        console.log(error);
      }
    }
  },
  mounted() {
    this.fetchUserdata();
    this.fethMutasi();
  }
};
</script>

<style lang="scss">
.highlight {
  background: #303030;
  color: #fff;
}
.text-dark {
  color: #000;
}
.devider {
  position: relative;
  text-align: center;
  z-index: 0;
  &:before {
    content: "";
    width: 100%;
    z-index: -1;
    height: 1px;
    background: #000;
    opacity: 0.1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto 0;
  }
  span {
    padding: 0 10px;
    background: #303030;
  }
}
</style>

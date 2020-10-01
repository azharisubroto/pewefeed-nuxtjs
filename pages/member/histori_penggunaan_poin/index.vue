<template>
  <section>
    <v-overlay :value="overlay">
      <v-progress-circular color="green" indeterminate size="64"></v-progress-circular>
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

      <div class="statusquo text-center row" style="background-color:#000;border-top:1px solid #fff;border-bottom:1px solid #fff;">
        <v-col cols="12" class="px-0">
          <v-btn @click="fethMutasi(1, 'all')" :class="[position == 'all' ? 'active' : null]" text dark small>
            <span class="text-14">Semua</span>
          </v-btn>
          <v-btn @click="fethMutasi(1, 'dapat')" :class="[position == 'dapat' ? 'active' : null]" text dark small>
            <span class="text-14">Diterima</span>
          </v-btn>
          <v-btn @click="fethMutasi(1, 'tukar')" :class="[position == 'tukar' ? 'active' : null]" text dark small>
            <span class="text-14">Ditukar</span>
          </v-btn>
          <v-btn @click="fethMutasi(1, 'fraud')" :class="[position == 'fraud' ? 'active' : null]" text dark small>
            <span class="text-14">Fraud</span>
          </v-btn>
        </v-col>
      </div>
    </v-container>

    <v-container v-if="mutasi.length > 0">
      <v-row v-for="(item, i) in mutasi" :key="'item-'+i">
        <v-col cols="9">
          <div class="caption">{{item.created_at}}</div>
          <div class="text-16">
            <strong>{{item.type}}</strong>
          </div>
          <div>
            <a
              class="deep-orange--text"
              v-if="item.link"
              :href="item.link"
            >Article</a>
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
          <strong v-else>{{ item.status == 'DAPAT' ? '+' : ''  }}{{ item.status == 'FRAUD' ? '-' : ''  }}{{item.point}}</strong>
        </v-col>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn
          color="#ff4200"
          @click="next(page);moreloading=true"
          dark
          v-if="page != last_page"
          >
            {{ moreloading ? 'Loading...' : 'Show More' }}
          </v-btn>
          <!-- <v-pagination v-model="page" class="my-4" :length="last_page" @input="next"></v-pagination> -->
        </v-col>
      </v-row>
    </v-container>

    <div v-else-if="mutasi.length == 0 && mutasi != null && !mainloading">
      <v-alert prominent text type="info" success>Tidak ada data yang tersedia</v-alert>
    </div>
    
    <v-overlay v-if="mainloading">
			<v-progress-circular
				indeterminate
				color="green"
				size="64"
			></v-progress-circular>
		</v-overlay>
  </section>
</template>
<script>
import UserService from "@/services/UserService";
import LoadingBar from "@/components/sing/LoadingBar";

export default {
  middleware: "auth",
  name: "historiPoinPage",
  components: {
    LoadingBar
  },
  data() {
    return {
      mainloading: true,
      userdata: null,
      mutasi: [],
      page: 1,
      last_page: 1,
      available: false,
      overlay: false,
      position: 'all',
      moreloading: false,
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
    async fethMutasi(page, filter, ismore) {
		this.position = filter;
      
      if( !ismore ) {
        this.mutasi = [];
        this.available = false;
      }

      var n = page ? page : 1;
      var fil = filter;
      
      try {
        const res = await UserService.mutasiPoin(n, fil);
        const items = res.data.data;
        this.page = res.data.paginations.current_page;
        this.last_page = res.data.paginations.last_page;
        //console.log(items);
        if( items.length > 0 ) {
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
            this.mutasi.push(obj)
            //arrays.push(obj);
          });
          if( ismore ) {
            this.moreloading = false
          }
        }

        this.available = true;
        this.mainloading = false

        // window.scrollTo({
        //   top: 0,
        //   left: 0,
        //   behavior: "smooth"
        // });

        // //console.log(JSON.parse(JSON.stringify(res)))
      } catch (error) {
        this.mainloading = false
        this.available = false
        //console.log("error");
        //this.fethMutasi(1, "all");
	  }
    },
    next(num) {
      let pos = this.position
      let target = parseInt(num + 1);
      this.fethMutasi(target, pos, true);
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

        this.$auth.fetchUser().then(() => {
          localStorage.setItem('userdata', JSON.stringify(vm.$auth.user))
          this.fetchUserdata()
        })

        this.fethMutasi();

        setTimeout(() => {
          this.overlay = false;
          location.reload()
        }, 1000);
      } catch (error) {
        this.overlay = false;
        console.log(error);
      }
    }
  },
  mounted() {
    this.fetchUserdata();
	  this.fethMutasi();
	  this.position = 'all'
  }
};
</script>

<style lang="scss">
.highlight {
  background: transparent;
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
.statusquo {
	.v-btn.active {
		color: var(--primary) !important;
	}
}
</style>

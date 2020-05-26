<template>
  <div class="bg-dark fill-height">
    <client-only>
      <!-- HIGHLIGHTS -->
      <v-container>
        <h4 class="deep-orange--text text-20 mb-4">Highlights</h4>
        <template v-if="highlights != null">
          <v-btn
            v-for="(highlight, i) in highlights"
            :key="i"
            @click="$router.push('/highlight/'+highlight.title); drawer = false"
            depressed
            rounded
            color="#2f2f2f"
            dark
            class="mr-1 mb-1"
          >{{highlight.title}}</v-btn>
        </template>
        <template v-else-if="highlights == 'loading'">
          <span class="caption">Loading data...</span>
        </template>
      </v-container>

      <!-- CATEGORIES -->
      <v-container>
        <h4 class="deep-orange--text text-20 mb-4">Categories</h4>
        <v-row>
          <v-col cols="12" class="py-0" v-for="(cat, i) in categories" :key="'cat-'+i">
            <a class="pl-0" text dark @click="$router.push(cat.link); drawer = false">{{cat.title}}</a>
            <div class="devider-small my-3"></div>
          </v-col>
        </v-row>
      </v-container>

      <!-- PROGRAM -->
      <v-container>
        <h4 class="deep-orange--text text-20 mb-4">Program</h4>
        <v-row>
          <v-col cols="12" class="py-0" v-for="(program, i) in programs" :key="'program-'+i">
            <a class="pl-0" text dark :href="program.link">{{program.title}}</a>
            <div class="devider-small my-3"></div>
          </v-col>
        </v-row>
      </v-container>

      <!-- BANTUAN -->
      <v-container class="d-none">
        <h4 class="deep-orange--text text-20">Help</h4>
        <v-row>
          <v-col cols="12">
            <a class="pl-0" small text dark to="/bantuan/?tab=2">Point &amp; Rewards</a>
            <div class="devider-small"></div>
          </v-col>
          <v-col cols="12">
            <a class="pl-0" small text dark to="/bantuan/">Lainnya...</a>
            <div class="devider-small"></div>
          </v-col>
        </v-row>
      </v-container>

      <!-- CONTACT -->
      <v-container class="d-none">
        <h4 class="deep-orange--text text-20">Contact</h4>
        <v-row class="pt-0">
          <v-col cols="6">
            <v-list two-line color="#232323" dark class="pt-0">
              <v-list-item-group v-model="contact">
                <v-list-item class="pl-0" v-for="(con, i) in contacts" :key="'consdf-'+i">
                  <v-list-item-content class="pt-0 menu">
                    <v-list-item-title>
                      <a
                        v-if="con.isWhatsapp"
                        style="text-decoration: none; color: #fff;font-size:14px"
                        target="blank"
                        :href="'https://api.whatsapp.com/send?phone=' + con.phone"
                      >{{ con.title }}</a>
                      <a
                        v-else
                        style="text-decoration: none; color: #fff;font-size:14px"
                        :href="'tel:' + con.phone"
                      >{{ con.title }}</a>
                    </v-list-item-title>
                    <v-list-item-subtitle v-html="con.subtitle" class="caption"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col cols="6">
            <v-list two-line color="#232323" dark class="pt-0 pb-0">
              <v-list-item-group v-model="contacttwo">
                <v-list-item class="pl-0" v-for="(con, i) in contactstwo" :key="'cons-'+i">
                  <v-list-item-content class="pt-0 menu">
                    <v-list-item-title>
                      <a
                        v-if="con.isPhone"
                        style="text-decoration: none; color: #fff;font-size:14px"
                        target="blank"
                        :href="'https://api.whatsapp.com/send?phone=' + con.phone"
                      >{{ con.title }}</a>
                    </v-list-item-title>
                    <v-list-item-subtitle v-html="con.subtitle" class="caption"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-list two-line color="#232323" dark class="pt-0">
              <v-list-item-group v-model="contactmail">
                <v-list-item class="pl-0" v-for="(con, i) in contactsmail" :key="'email-'+i">
                  <v-list-item-content class="pt-0 menu">
                    <v-list-item-title>
                      <a
                        v-if="!con.isPhone"
                        style="text-decoration: none; color: #fff;font-size:14px"
                        :href="'mailto:' + con.mail"
                      >{{ con.title }}</a>
                    </v-list-item-title>
                    <v-list-item-subtitle v-html="con.subtitle" class="caption"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-container>

      <!-- SOCIAL -->
      <v-container class="d-none text-center social justify-space-between">
        <a
          target="blank"
          style="text-decoration: none;"
          :href="'https://www.facebook.com/' + facebook"
        >
          <img src="/img/icons/icon-facebook.png" width="40" alt />
        </a>
        <a target="blank" style="text-decoration: none;" :href="'https://twitter.com/' + twitter">
          <img src="/img/icons/icon-twitter.png" width="40" alt />
        </a>
        <a
          target="blank"
          style="text-decoration: none;"
          :href="'https://www.instagram.com/' + instagram"
        >
          <img src="/img/icons/icon-instagram.png" width="40" alt />
        </a>
        <a target="blank" style="text-decoration: none;" :href="youtubeUrl">
          <img src="/img/icons/icon-youtube.png" width="40" alt />
        </a>
      </v-container>
    </client-only>
  </div>
</template>

<script>
import MenuService from "@/services/MenuService";
export default {
  name: "categories",
  data() {
    return {
      highlights: null,
      facebook: process.env.facebook,
      instagram: process.env.instagram,
      twitter: process.env.twitter,
      youtube: process.env.youtube,
      youtubeUrl: process.env.youtubeUrl,
      categories: [
        {
          title: "TRENDING",
          link: "/"
        },
        {
          title: "Entertaiment",
          link: "/viral"
        },
        {
          title: "MUSIK",
          link: "/lagu"
        },
        {
          title: "NONTON",
          link: "/nonton"
        },
        {
          title: "PIKNIK",
          link: "/piknik"
        },
        {
          title: "TEKNO",
          link: "/tekno"
        },
        {
          title: "SPORT",
          link: "/sport"
        },
        {
          title: "VIDEO",
          link: "/video"
        }
      ],
      programs: [
        {
          title: "TUKAR POIN",
          link: "/tukarpoin"
        },
        {
          title: "REZEKI BEDUK",
          link: "https://www.instagram.com/tv/B_vLd92JPmv/?igshid=bqnq34q1fikx"
        }
      ],
      contact: 2,
      contacts: [
        {
          title: "(021) 293 85 381",
          phone: "02129385381",
          isWhatsapp: false,
          subtitle: "(Business Hour)"
        },
        {
          title: "0815 1906 0929",
          phone: "6281519060929",
          isWhatsapp: true,
          subtitle: "(24 Hour)"
        }
      ],
      contacttwo: 2,
      contactmail: 2,
      contactstwo: [
        {
          title: "0817 1717 3029",
          phone: "6281717173029",
          isPhone: true,
          subtitle: "(24 Hour)"
        }
      ],
      contactsmail: [
        {
          title: "halo@playworld.id",
          mail: "halo@playworld.id",
          isSubtitle: false,
          subtitle: "(Official Email Address)"
        }
        // {
        //   title: process.env.email,
        //   mail: process.env.email,
        //   isSubtitle: true,
        //   subtitle: "(Official Email Address)"
        // }
      ]
    };
  },
  methods: {
    async fetchHighlight() {
      this.highlights = "loading";
      try {
        const res = await MenuService.getHighlight();
        const data = res.data.data;
        // console.log("Highlights", JSON.parse(JSON.stringify(data)));
        this.highlights = data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.fetchHighlight();
  }
};
</script>
<style lang="scss">
.fill-height {
  min-height: 100vh;
}
.bg-dark {
  .devider-small {
    opacity: 0.3;
  }
}
</style>

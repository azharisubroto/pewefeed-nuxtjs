<template>
  <div class="bg-dark fill-height">
    <client-only>
      <!-- HIGHLIGHTS -->
      <v-container>
        <h4 class="deep-orange--text text-20 mb-4 mt-5">Highlights</h4>
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

        <h4 class="deep-orange--text text-20 mb-4 px-4 mt-5">Categories</h4>
		<template  v-for="(cat, i) in categories">
			<div v-if="i==0" class="devider-small my-4" :key="'catsx-'+i"></div>
			<div cols="12" class="px-4" :key="'cat-'+i">
				<a class="pl-0" text dark :href="cat.link">{{cat.title}}</a>
			</div>
			<div class="devider-small my-4" :key="'cats-'+i"></div>
		</template>

      <!-- PROGRAM -->
        <h4 class="deep-orange--text text-20 mb-4 px-4 mt-8">Program</h4>
		<template  v-for="(program, i) in programs" >
			<div v-if="i==0" class="devider-small my-4" :key="'catsxxx-'+i"></div>
          <div class="px-4" :key="'program-'+i">
            <a class="pl-0 d-block" text dark :href="program.link">{{program.title}}</a>
          </div>
        	<div class="devider-small my-4" :key="'programas-'+i"></div>
		</template>

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
        // {
        //   title: "TRENDING",
        //   link: "/"
        // },
        {
          title: "ENTERTAINMENT",
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
        // {
        //   title: "VIDEO",
        //   link: "/video"
        // }
      ],
      programs: [
        {
          title: "TUKAR POIN",
          link: "/tukarpoin"
        },
        {
          title: "TOP POIN",
          link: "/toppoin"
        },
        // {
        //   title: "SING",
        //   link: "/sing"
        // },
        // {
        //   title: "REZEKI BEDUK",
        //   link: "https://www.instagram.com/tv/B_vLd92JPmv/?igshid=bqnq34q1fikx"
        // }
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
          title: "halo@pewefeed.com",
          mail: "halo@pewefeed.com",
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
    opacity: 1!important;
  }
}
</style>

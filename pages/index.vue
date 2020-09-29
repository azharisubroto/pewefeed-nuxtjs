<template>
  <section>
    <client-only placeholder="Loading...">
      <Home />
    </client-only>
  </section>
</template>

<script>
import Home from "@/components/Home";
import ArticleService from "@/services/ArticleService";

export default {
  data() {
    return {
      article: true,
      pwpoin: false,
      meta: this.$store.state.meta
    };
  },
  async fetch({ store, params }) {
    let meta = await ArticleService.getDetailMeta("home").then(res => {
      return res.data.data;
    });
    store.commit("SET_META", meta);
    store.commit("SET_ITEM", {
      article: {
        title: meta.og_title,
        short_title: meta.description
      }
    });
    //console.log(meta);
  },
  head() {
    return {
      title: this.meta.og_title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.meta.description
        },
        { hid: "keywords", name: "keywords", content: this.meta.keywords },

        // Facebok
        { hid: "og:title", property: "og:title", content: this.meta.og_title },
        {
          hid: "og:description",
          property: "og:description",
          content: this.meta.og_description
        },
        { hid: "og:type", property: "og:type", content: this.meta.og_type },
        { hid: "og:url", property: "og:url", content: this.meta.og_url },
        { hid: "og:image", property: "og:image", content: this.meta.og_image },
        {
          hid: "og:locale",
          property: "og:locale",
          content: this.meta.og_locale
        },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: this.meta.og_site_name
        },
        { hid: "fb:admins", property: "fb:admins", content: "100006462279538" },
        { hid: "fb:app_id", property: "fb:app_id", content: "107188393464738" },

        // Twitter
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: this.meta.twitter_card
        },
        {
          hid: "twitter:creator",
          name: "twitter:creator",
          content: this.meta.twitter_creator
        },
        {
          hid: "twitter:site",
          name: "twitter:site",
          content: this.meta.twitter_site
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.meta.twitter_title
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.meta.twitter_description
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.meta.twitter_image
        }
      ]
    };
  },
  components: {
    Home
  }
};
</script>

<style lang="scss">
.v-slide-group__prev {
  display: none !important;
}
</style>

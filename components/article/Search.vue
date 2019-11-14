<template>
    <div>
        <v-skeleton-loader v-if="isLoading"
            class="mx-auto mt-5"
            type="list-item-avatar-three-line"
        ></v-skeleton-loader>
        <div v-if="articles.length > 0">
            <v-container>
                <strong class="title">{{totalArticles}} Artikel Ditemukan</strong>
                <v-divider class="my-4"></v-divider>
                <NewsLoop :items="articles"/>
                <v-row v-if="isMore">
                    <v-col cols="12">
                        <v-btn
                        tile
                        block
                        depressed
                        dark
                        color="deep-orange"
                        @click="loadMore(next)">
                            Load More
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <div v-else class="text-center mt-10">
            <strong class="grey--text">Maaf artikel yang anda cari tidak ditemukan.</strong>
        </div>
    </div>
</template>

<script>
import NewsLoop from "@/components/common/NewsLoop";
import ArticleService from "@/services/ArticleService";
export default {
    name: "Search",
    data: () => ({
        isLoading: true,
        totalArticles: 0,
        articles: [],
        isMore: true,
        next: 2
    }),
    components: {
        NewsLoop
    },
    methods: {
        async search() {
			try {
				const res = await ArticleService.searchArticle(this.$route.params.keywords)
                const items = res.data.data
				this.articles = []
				items.forEach(article => {
                    var slug = article.link
                        slug = slug.replace('https://playworld.id/', '')
                    var obj = {
                        image: article.image,
                        link: '/'+slug,
                        title: article.title,
                        type: article.type,
                        published_at: article.publish_at
                    }
                    this.articles.push(obj)
                });
                this.isLoading = false
                if (res.data.pagination.current_page == res.data.pagination.last_page) {
                  this.isMore = false;
                }
				this.totalArticles = res.data.pagination.total
			} catch (error) {
				this.articles = []
                console.log(error)
                this.isLoading = false
			}
		},
		async loadMore(n) {
          	try {
                const res = await ArticleService.searchArticleMore(this.$route.params.keywords, n)
                //console.log(JSON.parse(JSON.stringify(res.data.data)))
                var newData = res.data.data
                newData.forEach(element => {
                  this.articles.push(element)
                });
                this.next += 1
                if (res.data.pagination.current_page == res.data.pagination.last_page) {
                  this.isMore = false;
                }
            } catch (error) {
                console.log(error)
            }
		},
    },
    created() {
        this.search()
    }
}
</script>
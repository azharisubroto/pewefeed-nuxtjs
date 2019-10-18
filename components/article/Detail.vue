<template>
    <section>
        <v-skeleton-loader v-if="article==''"
          class="mx-auto mt-5"
          type="list-item-avatar-three-line, image, article"
        ></v-skeleton-loader>

        <v-breadcrumbs v-if="article" :items="items" class="text-orange" divider=">"></v-breadcrumbs>
        <v-container v-if="article">
            <v-row>
                <v-col cols="12">
                    <!-- META 1 -->
                    <div class="mb-1">
                        <div class="d-inline-block mr-2">
                            <a @click="$router.push('/'+article.type+'/'+article.reaction)">{{article.reaction}}</a>
                        </div>
                    </div>

                    <!-- TITLE -->
                    <h2 class="mb-3">{{article.title}}</h2>

                    <!-- META 2 -->
                    <div class="mb-4">
                        <div class="d-inline-block mr-3 grey--text text--small">
                            <v-icon small>
                                mdi-clock-outline
                            </v-icon>
                            {{article.published_at}}
                        </div>
                        <div class="d-inline-block mr-3 grey--text text--small">
                            <v-icon small>
                                mdi-eye-outline
                            </v-icon>
                            {{article.total_view}}
                        </div>
                        <div class="d-inline-block mr-3 grey--text text--small">
                            <v-icon small>
                                mdi-message-reply
                            </v-icon>
                            {{article.total_comment}}
                        </div>
                    </div>
                    <v-img :src="article.image" :aspect-ratio="4/3" class="thumbnailmain mb-4">
                    </v-img>

                    <!-- CONTENT -->
                    <div v-html="article.content"></div>

                    <hr>

                    <!-- WRITER -->
                    <div class="mt-4">
                        <span class="grey--text">Article ini dibuat oleh tim Playworld Indonesia</span><br>
                        <v-row>
                            <v-col cols="2">
                                <v-avatar>
                                    <v-img :src="writer.avatar"></v-img>
                                </v-avatar>
                            </v-col>
                            <v-col cols="10">
                                <strong>{{writer.name}}</strong><br>
                                <span class="grey--text">{{article.created_at}}</span>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </v-container>

    </section>
</template>

<script>
import ArticleService from '@/services/ArticleService'
export default {
    data() {
        return {
            title: '',
            article: '',
            writer: '',
            items: [
                {
                    text: this.$route.params.cat,
                    disabled: false,
                    href: this.$route.params.cat
                },
                {
                    text: this.$route.params.subcat,
                    disabled: false,
                    href: this.$route.params.subcat
                },
                {
                    text: this.$route.params.articleslug,
                    disabled: true,
                    href: this.$route.params.subcat
                }
            ]
        }
    },
    head () {
      return {
        title: this.title,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          { hid: 'description', name: 'description', content: 'My custom description' }
        ]
      }
    },
    methods: {
        async fetchContent() {
            console.log(this.$route.params.articleslug)
            try {
                let res = await ArticleService.getDetail(this.$route.params.articleslug)
                console.log(JSON.parse(JSON.stringify(res.data.data)))
                this.article = res.data.data.article
                this.title = res.data.data.article.title
                this.writer = res.data.data.article.writer
                this.items[2].href = res.data.data.article.title
            } catch (error) {
                console.log(error)
            }
        }
    },
    created() {
        this.fetchContent()
    }
}
</script>

<style lang="sass">
    .news-related
        ul
            margin: 0!important
            list-style: none
            padding: 0
            li
                margin: 0
                display: block
                overflow: hidden
                background: #f9f9f9
                padding: 10px
                font-size: 14px
                border-bottom: 1px solid #e5e5e5
                &:last-of-type
                    border: 0
                a
                    display: block
                    text-decoration: none
                    color: #000
                .thumbnail
                    width: 60px
                    height: 60px
                    float: left
                    margin-right: 10px
                    background-size: cover
    .v-breadcrumbs__item:not(.v-breadcrumbs__item--disabled)
        color: #ff9800!important
    .thumbnailmain
      margin: 0 -20px
      display: block
      width: auto
      max-width: unset
</style>

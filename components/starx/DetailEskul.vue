<template>
    <section>
        <v-skeleton-loader v-if="respon==''"
			class="mx-auto mt-5"
			type="list-item-avatar-three-line, image, article"
		></v-skeleton-loader>
        <v-container v-else class="mb-5 pb-5">
            <v-row>
                <v-col cols="12">
                    <!-- META 1 -->
				    <div class="mb-1">
                        <div class="d-inline-block mr-2" style="line-height:1;font-size:12px">
                            STARX : {{$route.params.eskul_slug.toUpperCase()}}
                        </div>
                        <div class="d-inline-block" style="font-size:12px">
                            <div class="d-inline-block mr-3 text--small">
                                <v-icon small size="12">
                                    mdi-clock-outline
                                </v-icon>
                                {{article.date}}
                            </div>
                            <div class="d-inline-block mr-3 text--small">
                                <v-icon small size="12">
                                    mdi-calendar-blank
                                </v-icon>
                                {{article.created_at}}
                            </div>
                            <div class="d-inline-block mr-3 text--small">
                                <v-icon small size="12">
                                    mdi-eye-outline
                                </v-icon>
                                {{article.viewers}}
                            </div>
                            <!-- <div class="d-inline-block mr-3 text--small">
                                <v-icon small size="12">
                                    mdi-message-text-outline
                                </v-icon>
                                {{article.total_comment ? article.total_comment : 0}}
                            </div> -->
                        </div>
				    </div>

                    <!-- TITLE -->
                    <h2 class="mb-0">{{article.eskul_name}}</h2>
                    <div>
                        <ShareButton
                            style="text-align: left !important"
                            :sharingUrl="'https://m.playworld.id/starx/eskul/' + $route.params.eskul_slug + '/' + $route.params.school_name"
                            :sharingTitle="article.eskul_name"
                            :sharingDescription="'Starx : ' + article.eskul_name"
                            :sharingImage="article.img"
                            :sharingTime="article.created_at"
                        />
                    </div>
                </v-col>
            </v-row>
            <!-- ARTICLE -->
			<template v-if="respon">
                <v-row class="pb-5">
                    <v-col cols="12">
                        <div class="article-thumb">
							<v-img :src="article.img" :aspect-ratio="4/2" class="thumbnailmain mb-4"></v-img>
						</div>

						<!-- CONTENT -->
						<div v-html="article.content"></div>

                        <div class="devider-small my-4"></div>
                    </v-col>
                </v-row>
			</template>
        </v-container>
    </section>
</template>

<script>
import ShareButton from '@/components/common/ShareButton'
export default {
    name: "DetailEskul",
    props: ["respon"],
    data: () => ({
        article: '',
    }),
    components: {
        ShareButton
    },
    methods: {
        fetchContent() {
            this.article = this.respon.eskuls
            console.log(this.respon)
        }
    },
    mounted() {
        this.fetchContent()
    }
}
</script>
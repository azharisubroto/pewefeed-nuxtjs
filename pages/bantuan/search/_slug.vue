<template>
	<div>
		<BantuanNavBar title="Pencarian" />
		<v-main class="pt-10 pb-5">
			<v-container>
				<ProductCard :title="'Kata Kunci: ' + $route.params.slug">
					<v-card
						class="help-menu"
						v-for="(item, i) in items"
						:key="'help-' + i"
						:to="'/bantuan/detail/' + item.slug"
					>
						<div class="d-flex align-center justify-space-between">
							<div>
								<h4 class="text-14">
									{{ item.name }}
								</h4>

								<div
									class="text-12"
									v-html="item.short_content"
								></div>
							</div>
							<div>
								<v-icon>mdi-chevron-right</v-icon>
							</div>
						</div>
					</v-card>
				</ProductCard>
			</v-container>
		</v-main>
		<BantuanFooter />
	</div>
</template>

<script>
import ProductCard from "@/components/ProductCard"
import BantuanNavBar from "@/components/BantuanNavBar"
import ArticleService from "@/services/ArticleService"
import BantuanFooter from "@/components/BantuanFooter"
export default {
	layout: "blank",
	components: {
		ProductCard,
		BantuanNavBar,
		BantuanFooter,
	},
	data() {
		return {
			loading: true,
			items: [],
		}
	},
	methods: {
		async fetchSearch(keyword) {
			try {
				const response = await ArticleService.bantuanSearch(keyword)
				const items = await response.data.data[0].children
				this.items = items
				this.loading = false
			} catch (error) {
				console.log(error)
				this.loading = false
			}
		},
	},
	mounted() {
		this.fetchSearch(this.$route.params.slug)
	},
}
</script>

<style lang="scss">
.help-menu {
	padding: 19px 13px;
	border-bottom: 1px solid #bababa !important;
}
</style>

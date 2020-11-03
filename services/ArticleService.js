import Api from "./Api"
import AuthApi from "./AuthApi"
// import ApiLocal from './ApiLocal'

export default {
	getPromotedNews() {
		return Api().get("/article/promoted/")
	},
	getLatest() {
		return Api().get("/article/latest")
	},
	getRelated(slug) {
		return Api().get("/article/latest/" + slug)
	},
	getRelatedMore(slug, page) {
		return Api().get("/article/latest/" + slug + "?page=" + page)
	},
	getTopPoin() {
		return Api().get("/poin/top-poin/")
	},
	getTukarPoin() {
		return Api().get("/redeem/promoted/")
	},
	getTopViews(n) {
		return Api().get("/article/top-views/?page=" + n)
	},
	getSpecials() {
		return Api().get("/article/top-views-category")
	},
	getSixty(section, i) {
		var increment = i ? i : 1
		return Api().get("/sixty/" + section + "?page=" + increment)
	},
	getRandomVideo() {
		return Api().get("/content/rand")
	},
	getDetail(slug) {
		return Api().get("/article/" + slug)
	},
	getQuiz(slug) {
		return Api().get("/article/quiz/multiple/" + slug)
	},
	getRand() {
		return Api().get("/article/random")
	},
	getSixtyDetail(slug) {
		return Api().get("/sixty/detail/" + slug)
	},
	getTrendingArticleByCategory(slug) {
		return Api().get("/article/category/trending/" + slug)
	},
	getListArticleByCategory(slug) {
		return Api().get("/article/category/list/" + slug)
	},
	searchArticle(keywords) {
		return Api().get("/article/search/" + keywords)
	},
	searchArticleMore(keywords, page) {
		return Api().get("/article/search/" + keywords + "?page=" + page)
	},
	getDetailMeta(slug) {
		return Api().get("/meta/detail/" + slug)
	},
	getBantuan() {
		return Api().get("/help/how-to")
	},
	bantuandetail(slug) {
		return Api().get("/help/sub/" + slug)
	},
	searchHighlight(keywords) {
		return Api().get("/article/highlight/" + keywords)
	},
	searchHighlightMore(keywords, page) {
		return Api().get("/article/highlight/" + keywords + "?page=" + page)
	},
	getComments(type, slug, page) {
		return Api().get("/comment/" + type + "/" + slug + "?page=" + page)
	},
	aboutDailyLimit() {
		return Api().get("/help/sub/apa-itu-vip-daily-limit")
	},
	setLike(params) {
		return AuthApi().post("/member/articles/likes", params)
	},
	checkLike(id) {
		return AuthApi().get("/member/articles/check/likes/" + id)
	},
	checkAnswered(type, slug) {
		return AuthApi().get(
			"https://s1.playworld.id/api/member/check-answered-multiple-quiz/" +
				type +
				"/" +
				slug
		)
	},
}

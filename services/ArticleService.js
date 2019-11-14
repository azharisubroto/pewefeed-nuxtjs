import Api from './Api'

export default {
    getPromotedNews(){
        return Api().get('/article/promoted/')
    },
    getLatest(){
      return Api().get('/article/latest')
    },
    getRelated(slug) {
      return Api().get('/article/latest/'+slug)
    },
    getRelatedMore(slug, page) {
      return Api().get('/article/latest/' + slug + '?page=' + page)
    },
    getTopPoin() {
        return Api().get('/poin/top-poin/')
    },
    getTukarPoin() {
      return Api().get('/redeem/promoted/')
    },
    getTopViews(n) {
      return Api().get('/article/top-views/?page='+n)
    },
    getSixty(section, i) {
      var increment = i ? i : 1
      return Api().get('/sixty/' + section + '?page=' + increment)
    },
    getRandomVideo() {
      return Api().get('/content/rand')
    },
    getDetail(slug) {
      return Api().get('/article/'+slug)
    },
    getSixtyDetail(slug) {
      return Api().get('/sixty/detail/'+slug)
    },
    getTrendingArticleByCategory(slug) {
      return Api().get('/article/category/trending/' + slug)
    },
    getListArticleByCategory(slug) {
      return Api().get('/article/category/list/' + slug)
    },
    searchArticle(keywords) {
      return Api().get('/article/search/' + keywords)
    },
    searchArticleMore(keywords, page) {
      return Api().get('/article/search/' + keywords + '?page=' + page)
    }
}

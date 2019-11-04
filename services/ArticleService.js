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
    getTopPoin() {
        return Api().get('/poin/top-poin/')
    },
    getTukarPoin() {
      return Api().get('/redeem/promoted/')
    },
    getTopViews(n) {
        return Api().get('/article/top-views/?page='+n)
    },
    getSixty(section) {
        return Api().get('/sixty/'+section)
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
  }
}

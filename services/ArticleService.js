import Api from './Api'

export default {
    getPromotedNews(){
        return Api().get('/article/promoted/')
    },
    getLatest(){
      return Api().get('/article/latest')
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
    getSixty() {
        return Api().get('/article/category/sixty-widget/viral/')
    },
    getDetail(slug) {
        return Api().get('/article/'+slug)
    },
    getSixtyDetail(slug) {
      return Api().get('/sixty/detail/'+slug)
    }
}

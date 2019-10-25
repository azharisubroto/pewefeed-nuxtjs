import Api from './Api'

export default {
    getPromotedNews(){
        return Api().get('/article/promoted/')
    },
    getTopPoin() {
        return Api().get('/poin/top-poin/')
    },
    getTukarPoin() {
      return Api().get('/redeem/promoted/')
    },
    getTopViews() {
        return Api().get('/article/top-views/')
    },
    getSixty() {
        return Api().get('/article/category/sixty-widget/viral/')
    },
    getDetail(slug) {
        return Api().get('/article/'+slug)
    }
}

import Api from './Api'

export default {
    getAll(slug) {
        return Api().get('/comic/bottom/' + slug)
    },
    getTrending() {
        return Api().get('/comic/up')
    },
    getAllCategory() {
        return Api().get('/comic/category')
    },
    getDetail(slug) {
        return Api().get('/comic/' + slug)
    },
}

import Api from './Api'
import AuthApi from './AuthApi'

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
    getRating(slug) {
        return Api().get('/comic/review/' + slug)
    },
    getComment(slug) {
        return Api().get('/comic/comment/' + slug)
    },
    getImages(slug) {
        return Api().get('/comic/image/' + slug)
    },
    makeRating(formData) {
        return AuthApi().post('/comic/review', formData)
    }
}

import Api from '@/services/Api'
import AuthApi from '@/services/AuthApi'

export default {
  getSlide() {
    return Api().get('/content/up/')
  },
  getLatest(cat) {
    var category = cat ? cat : 0
    return Api().get('/content/bottom/' + category)
  },
  getCategory() {
    return Api().get('/content/category/')
  },
  getDetail(slug) {
    return Api().get('/content/'+slug)
  }
}

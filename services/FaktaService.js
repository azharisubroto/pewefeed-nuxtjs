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
  },
  getReview(slug, page) {
    var p = page ? page : 1
    return AuthApi().get('/content/review/' + slug + '?page=' + p)
  },
  /**
   * Add Review
   * @param {'content_id', 'rating', 'review'}
   */
  addReview(param) {
    return AuthApi().post('/content/review/', param)
  },
  getComment(slug, n) {
    var p = n ? n : 1
    return Api().get('/content/comment/' + slug + '?page=' + p)
  },
  /**
   * Add Comment
   * @param {id, msg, type} params
   */
  postComment(params) {
    return AuthApi().post('/member/comment', params)
  }
}

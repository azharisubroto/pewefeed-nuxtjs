import AuthApi from '@/services/AuthApi'
// import AuthApiLocal from '@/services/AuthApiLocal'

export default {
    getSingleUser() {
        return AuthApi().get('/member/get-single-member')
    },
    postComment(params) {
      return AuthApi().post('/member/comment', params)
    },
    answerQuiz(params) {
      return AuthApi().post('/member/post-quiz', params)
    },
    /**
     * TUKAR POIN
     * @param {redeem_id,target_point} params
     */
    tukarPoin(params) {
      return AuthApi().post('/member/change-point', params)
    },
    getHistoryVip() {
      return AuthApi().get('/member/vip-history')
    }
}

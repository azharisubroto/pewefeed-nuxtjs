import AuthApi from '@/services/AuthApi'
// import AuthApiLocal from '@/services/AuthApiLocal'

export default {
    getSingleUser() {
        return AuthApi().get('/member/get-single-member')
    }
}
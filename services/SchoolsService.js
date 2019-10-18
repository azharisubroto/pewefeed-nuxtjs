import Api from '@/services/Api'

export default {
    getSchools() {
        return Api().get('/master/schools')
    },
}
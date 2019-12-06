import Api from '@/services/Api'
import AuthApi from '@/services/AuthApi'

export default {
    getStarx() {
        return Api().get('/program/starx')
    },
    getBand() {
        return Api().get('/program/starx/band/latests')
    },
    finalist() {
        return Api().get('/program/starx/band/finalist')
    },
    winners() {
        return Api().get('/program/starx/band/winners')
    },
    BandDetail(bandname) {
        return Api().get('/program/starx/band/detail/'+ bandname )
    },
    SchoolDetail(schoolslug) {
        return Api().get('/program/starx/band/school/'+ schoolslug )
    },
    VideoDetail(video) {
        return Api().get('/program/starx/band/video/' + video)
    },
    makeStar(data) {
        return AuthApi().post('/member/program/makestar/band', data)
    },
    checkStar(data) {
        return AuthApi().post('/member/program/check-star/band', data)
    },
    getBandByPage(page) {
        return Api().get('/program/starx/band/latests?page=' + page)
	},
	fetchComment(slug) {
		return Api().get('/program/starx/band/comment/' + slug)
	}
}

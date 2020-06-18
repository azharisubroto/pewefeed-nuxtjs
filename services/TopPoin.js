import Api from '@/services/Api'
import AuthApi from '@/services/AuthApi'

export default {
    topPoinAll() {
        return Api().get('/poin/top/all');
	},
	lastRanked(n) {
		return Api().get('/poin/top/last-ranked?page='+n);
	},
	winners(n) {
		return Api().get('/poin/top/winner-previous?page='+n);
	},
	periodeDetail(slug){
		return Api().get('/poin/top/winner-detail/'+slug)
	}
}

import AuthApi from '@/services/AuthApi'
import Api from './Api';

export default {

    getStage() {
        return Api().get('/program/sing-with/stage');
	},
	getPromoted() {
		return Api().get('/program/sing-with/promoted-video');
	},
	getStageDetail(slug,page) {
		return Api().get(`/program/sing-with/stage/detail/${slug}?page=${page}`);
	},
	getDetailVideo(id) {
		return Api().get(`/program/sing-with/video/detail/${id}`);
	},
	getDetailVideo(id) {
		return Api().get(`/program/sing-with/video/detail/${id}`);
	},
	getComments(videoid) {
		return Api().get(`/program/sing-with/comments/${videoid}`);
	},
	postComment(params){
		return AuthApi().post(`member/program/sing-with/post-comment`, params)
	},
	winnersHome() {
		return Api().get(`program/sing-with/winners/all`);
	},
	winnersDetail(id) {
		return Api().get(`/program/sing-with/winners/detail/${id}`);
	},
	winnerVideoDetail(customer_video_id) {
		return Api().get(`/program/sing-with/winners/video/detail/${customer_video_id}`);
	},
	sendVote(params) {
		return AuthApi().post('/member/program/sing-with/make-vote', params);
	},
	uploadVideo(params) {
		return AuthApi().post('/member/program/sing-with/upload', params)
	},
	getHelp() {
		return Api().get('/program/sing-with/helps/all')
	},
	getHelpDetail(slug) {
		return Api().get('/program/sing-with/helps/detail/'+slug)
	},
	checkAvail(slug) {
		return AuthApi().get('/member/program/sing-with/check-upload/'+slug)
	},
	searchItem(stage_slug, keyword, page) {
		return Api().get(`/program/sing-with/stage/detail/${stage_slug}/search/${keyword}?page=${page}`)
	},
	getPrizes() {
		return Api().get(`program/sing-with/prizes`)
	}
}

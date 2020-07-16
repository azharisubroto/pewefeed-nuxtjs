import AuthApi from '@/services/AuthApi'
import Api from './Api';

export default {

    getStage() {
        return Api().get('/program/sing-with/stage');
	},
	getPromoted() {
		return Api().get('/program/sing-with/promoted-video');
	},
	getStageDetail(slug) {
		return Api().get(`/program/sing-with/stage/detail/${slug}`);
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
	winnersHome() {
		return Api().get(`program/sing-with/winners/all`);
	},
	winnersDetail(id) {
		return Api().get(`/program/sing-with/winners/video/detail/${id}`);
	},
	sendVote(params) {
		return AuthApi().post('/member/program/sing-with/make-vote', params);
	},
	getComments(params) {
		return Api().get('/program/sing-with/comments/', params)
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
	}
}

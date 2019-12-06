import AuthApi from '@/services/AuthApi'
import Api from './Api';

export default {
    /**
     * UPLOAD DOCUMENT
     * @params {file}
     */
    uploadIzin(params) {
        return AuthApi().post('/member/program/starx/band/upload/document', params)
    },

    /**
     * SUBMIT IZIN
     * @params { asal_sekolah, skp }
     */
    submitIzin(params) {
        return AuthApi().post('/member/program/starx/band/submit/permission', params);
    },

    /**
     * Retrieve Program Data
     */
    checkIzin() {
        return AuthApi().get('/member/program/starx/band');
    },

    /**
     * Submit Band
     * @params {avatarband, name_band, nama_personil[], instagram[], avatar[], personil_posisi[]}
     */
    submitBand(params) {
        return AuthApi().post('/member/program/starx/band/submit/band', params);
    },

    submitVideo(params) {
        return AuthApi().post('/member/program/starx/band/upload/video', params);
	}
}

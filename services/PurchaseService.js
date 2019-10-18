import AuthApi from '@/services/AuthApi'
// import AuthApiLocal from '@/services/AuthApiLocal'

export default {
    /**
     * UPLOAD DOCUMENT
     * @params {voucher_id & nomorhandphone} 
     */
    BuyVip(params) {
        return AuthApi().post('/member/purchase/vip/buy', params)
    },

    /**
     * Midtrans
     * @params {voucher_id} 
     */
    midtrans(params) {
        return AuthApi().post('/member/purchase/payment/buy', params)
    },
}
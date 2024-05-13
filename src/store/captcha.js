import { createStore } from 'vuex'

export default createStore({
    state: {
        captcha: '', // 添加这个状态，初始值为 ''
        status: false
    },
    mutations: {
        setCaptcha(state, captcha) {
            state.captcha += captcha
        },

        resetCaptcha(state, status) {
            state.status = status
        },

        reset(state) {
            state.captcha = ''
        },

        checkCaptcha(state, captcha) {
            return state.captcha === captcha;
        }
    }
})
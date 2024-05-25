import { createStore } from 'vuex'

export default createStore({
    // Vuex 状态
    state: {
        captcha: '', // 验证码
        status: false // 状态
    },
    mutations: {
        // 设置验证码
        setCaptcha(state, captcha) {
            state.captcha += captcha
        },
        // 重置验证码状态
        resetCaptcha(state, status) {
            state.status = status
        },
        // 重置验证码
        reset(state) {
            state.captcha = ''
        },
        // 检查验证码
        checkCaptcha(state, captcha) {
            return state.captcha === captcha;
        }
    }
})

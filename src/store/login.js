import { createStore } from 'vuex'

export default createStore({
    state: {
        loginstatus: true,
        registerstatus: false
    },
    mutations: {
        setLoginWindow(state, login) {
            state.loginstatus = login
        },

        setRegisterWindow(state, register) {
            state.registerstatus = register
        }
    }
})
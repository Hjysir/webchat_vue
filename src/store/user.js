import { createStore } from 'vuex'

export default createStore({
    state: {
        username: null,
        useravatar: null,
        status: false,
    },
    mutations: {
        setUsername(state, username) {
            state.username = username
        },

        setLogin(state, status) {
            state.status = status
        },

        setUseravatar(state, useravatar) {
            state.useravatar = useravatar
        },

        userLogout(state) {
            state.username = null
            state.status = false
        }
    },
    actions: {
        userLogout({ commit }) {
            commit('userLogout')
        },

        setLogin({ commit }, status) {
            commit('setLogin', status)
        },

        setUsername({ commit }, username) {
            commit('setUsername', username)
        },

        setUseravatar({ commit }, useravatar) {
            commit('setUseravatar', useravatar)
        }
    }
})
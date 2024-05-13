import { createStore } from 'vuex'
import chatlist from './chatlist'

export default createStore({
    state: {
        isSelected: false,
        username: null,
        messages: [],
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        setIsSelected(state, status) {
            state.isSelected = status;
        },
        addMessage(state, message) {
            state.messages.push(message);
        },
        clearMessages(state) {
            state.messages = [];
        }
    }
})
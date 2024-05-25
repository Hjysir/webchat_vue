import { createStore } from 'vuex'
import chatlist from './chatlist'

export default createStore({
    state: {
        // 是否选中状态
        isSelected: false,
        // 用户名
        username: null,
        // 消息列表
        messages: [],
    },
    mutations: {
        // 设置用户名
        setUsername(state, username) {
            state.username = username;
        },
        // 设置是否选中状态
        setIsSelected(state, status) {
            state.isSelected = status;
        },
        // 添加消息到消息列表
        addMessage(state, message) {
            state.messages.push(message);
        },
        // 清空消息列表
        clearMessages(state) {
            state.messages = [];
        }
    }
})

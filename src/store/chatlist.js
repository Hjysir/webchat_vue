import { createStore } from 'vuex'

export default createStore({
    state: {
        hasChatList: false,
        chatList: [{
            id: null, name: null, avatar: null,
            messages: [],
            hasNewMessage: false, unreadCount: 0, isSelected: false
        }]
    },
    mutations: {
        setChatList(state, data) {
            state.chatList = data
        },
        setChatListHasNewMessage(state, data) {
            state.chatList[data.index].hasNewMessage = data.hasNewMessage
        },
        setChatListUnreadCount(state, data) {
            state.chatList[data.index].unreadCount = data.unreadCount
        },
        setChatListLastMessage(state, data) {
            state.chatList[data.index].lastMessage = data.lastMessage
        },
        addChatList(state, data) {
            state.chatList.push(data)
        },
        removeChatList(state, data) {
            state.chatList.splice(data.index, 1)
        },
        setHasChatList(state, data) {
            state.hasChatList = data
        },
        setHasNewMessageTrue(state, data) {
            state.chatList[data].hasNewMessage = true
        },
        setHasNewMessageFalse(state, data) {
            state.chatList[data].hasNewMessage = false
        },
        addChatRoomMessage(state, data) {
            state.chatList[data.index].messages.push(data.getMessages)
        },
        addUnreadCount(state, data) {
            state.chatList[data].unreadCount += 1
        }
    },
    actions: {
        setChatList({ commit }, data) {
            commit('setChatList', data)
        },
        setChatListHasNewMessage({ commit }, data) {
            commit('setChatListHasNewMessage', data)
        },
        setChatListUnreadCount({ commit }, data) {
            commit('setChatListUnreadCount', data)
        },
        setChatListIsSelected({ commit }, data) {
            commit('setChatListIsSelected', data)
        },
        addChatList({ commit }, data) {
            commit('addChatList', data)
        },
        removeChatList({ commit }, data) {
            commit('removeChatList', data)
        },
        setHasChatList({ commit }, data) {
            commit('setHasChatList', data)
        },
        setHasNewMessage({ commit }, data) {
            commit('setHasNewMessage', data)
        },
        findChatListIndex({ commit }, data) {
            return commit('findChatListIndex', data)
        }
    }
})
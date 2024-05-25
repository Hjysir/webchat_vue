import { createStore } from 'vuex'

export default createStore({
    state: {
        // 是否有聊天列表
        hasChatList: false,
        // 聊天列表
        chatList: [{
            id: null, name: null, avatar: null,
            messages: [],
            hasNewMessage: false, unreadCount: 0, isSelected: false
        }]
    },
    mutations: {
        // 设置聊天列表
        setChatList(state, data) {
            state.chatList = data
        },
        // 设置聊天列表中是否有新消息
        setChatListHasNewMessage(state, data) {
            state.chatList[data.index].hasNewMessage = data.hasNewMessage
        },
        // 设置聊天列表中未读消息数
        setChatListUnreadCount(state, data) {
            state.chatList[data.index].unreadCount = data.unreadCount
        },
        // 设置聊天列表中最后一条消息
        setChatListLastMessage(state, data) {
            state.chatList[data.index].lastMessage = data.lastMessage
        },
        // 添加聊天列表项
        addChatList(state, data) {
            state.chatList.push(data)
        },
        // 移除聊天列表项
        removeChatList(state, data) {
            state.chatList.splice(data.index, 1)
        },
        // 设置是否有聊天列表
        setHasChatList(state, data) {
            state.hasChatList = data
        },
        // 设置聊天列表中是否有新消息为真
        setHasNewMessageTrue(state, data) {
            state.chatList[data].hasNewMessage = true
        },
        // 设置聊天列表中是否有新消息为假
        setHasNewMessageFalse(state, data) {
            state.chatList[data].hasNewMessage = false
        },
        // 添加聊天室消息
        addChatRoomMessage(state, data) {
            state.chatList[data.index].messages.push(data.getMessages)
        },
        // 增加未读消息计数
        addUnreadCount(state, data) {
            state.chatList[data].unreadCount += 1
        }
    },
    actions: {
        // 设置聊天列表
        setChatList({ commit }, data) {
            commit('setChatList', data)
        },
        // 设置聊天列表中是否有新消息
        setChatListHasNewMessage({ commit }, data) {
            commit('setChatListHasNewMessage', data)
        },
        // 设置聊天列表中未读消息数
        setChatListUnreadCount({ commit }, data) {
            commit('setChatListUnreadCount', data)
        },
        // 设置聊天列表中是否选中
        setChatListIsSelected({ commit }, data) {
            commit('setChatListIsSelected', data)
        },
        // 添加聊天列表项
        addChatList({ commit }, data) {
            commit('addChatList', data)
        },
        // 移除聊天列表项
        removeChatList({ commit }, data) {
            commit('removeChatList', data)
        },
        // 设置是否有聊天列表
        setHasChatList({ commit }, data) {
            commit('setHasChatList', data)
        },
        // 设置是否有新消息
        setHasNewMessage({ commit }, data) {
            commit('setHasNewMessage', data)
        },
        // 查找聊天列表索引
        findChatListIndex({ commit }, data) {
            return commit('findChatListIndex', data)
        }
    }
})

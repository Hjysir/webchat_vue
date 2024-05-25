import { createStore } from 'vuex'
import chatlist from './chatlist'

export default createStore({
    state: {
        // 是否选中聊天室
        isSelectChatRoom: false,
        // 当前聊天室信息
        chatRoom: {
            id: null, // 聊天室ID
            name: null, // 聊天室名称
            avatar: null, // 聊天室头像
            messages: [], // 聊天消息列表
            hasNewMessage: false, // 是否有新消息
            unreadCount: 0, // 未读消息数
            isSelected: false // 是否选中状态
        },
    },
    mutations: {
        // 设置当前聊天室信息
        setChatRoom(state, chatRoomId) {
            for (let i = 0; i < chatlist.state.chatList.length; i++) {
                if (chatlist.state.chatList[i].id === chatRoomId) {
                    state.chatRoom = chatlist.state.chatList[i];
                    break;
                }
            }
        },
        // 设置是否选中聊天室
        setIsSelectChatRoom(state, status) {
            state.isSelectChatRoom = status;
            state.chatRoom.hasNewMessage = false;
        },
        // 添加消息到当前聊天室
        addMessage(state, message) {
            state.chatRoom.hasNewMessage = true;
            state.chatRoom.messages.push(message);
        },
        // 设置当前聊天室ID
        setChatRoomId(state, id) {
            state.chatRoom.id = id;
        },
        // 设置当前聊天室有新消息为真
        setHasNewMessageTrue(state) {
            state.chatRoom.hasNewMessage = true;
        },
        // 设置当前聊天室有新消息为假
        setHasNewMessageFalse(state) {
            state.chatRoom.hasNewMessage = false;
        },
    },
    actions: {
        // 添加消息
        addMessage({ commit }, message) {
            commit('addMessage', message);
        },
        // 设置当前聊天室信息
        setChatRoom({ commit }, chatRoomId) {
            commit('setChatRoom', chatRoomId);
        },
        // 设置是否选中聊天室
        setIsSelectChatRoom({ commit }, status) {
            commit('setIsSelectChatRoom', status);
        },
    }
})

import { createStore } from 'vuex'
import chatlist from './chatlist'

export default createStore({
    state: {
        isSelectChatRoom: false,
        chatRoom: {
            id: null, name: null, avatar: null,
            messages: [],
            hasNewMessage: false, unreadCount: 0, isSelected: false
        },
    },
    mutations: {
        setChatRoom(state, chatRoomId) {
            for (let i = 0; i < chatlist.state.chatList.length; i++) {
                if (chatlist.state.chatList[i].id === chatRoomId) {
                    state.chatRoom = chatlist.state.chatList[i];
                    break;
                }
            }
        },
        setIsSelectChatRoom(state, status) {
            state.isSelectChatRoom = status;
            state.chatRoom.hasNewMessage = false;
        },
        addMessage(state, message) {
            state.chatRoom.hasNewMessage = true;
            state.chatRoom.messages.push(message);
        },
        setChatRoomId(state, id) {
            state.chatRoom.id = id;
        },
        setHasNewMessageTrue(state) {
            state.chatRoom.hasNewMessage = true;
        },
        setHasNewMessageFalse(state) {
            state.chatRoom.hasNewMessage = false;
        },
    },
    actions: {
        addMessage({ commit }, message) {
            commit('addMessage', message);
        },
        setChatRoom({ commit }, chatRoomId) {
            commit('setChatRoom', chatRoomId);
        },
        setIsSelectChatRoom({ commit }, status) {
            commit('setIsSelectChatRoom', status);
        },
    }
})
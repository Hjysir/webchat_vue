import { createStore } from 'vuex'
import chatroom from "@/store/chatroom.js";
import chatuser from "@/store/chatuser.js";

export default createStore({
    state: {
        sendMessage: false,
        sendUrl: '',
        stompClient: null,
        websocketConnected: false,
        subscriptionRoomId: [],
        subscriptionRoomUsers: [],
    },
    mutations: {
        setWebsocketStatus(state, status) {
            state.websocketConnected = status;
        },
        setSubscriptionRoomId(state, id) {
            state.subscriptionRoomId = id;
        },
        setSubscriptionRoomUsers(state, users) {
            state.subscriptionRoomUsers = users;
        },
        addSubscriptionRoomUsers(state, user) {
            state.subscriptionRoomUsers.push(user);
        },
        removeSubscriptionRoomUsers(state, user) {
            state.subscriptionRoomUsers = state.subscriptionRoomUsers.filter(u => u !== user);
        },
        clearSubscriptionRoomUsers(state) {
            state.subscriptionRoomUsers = [];
        },
        removeSubscriptionRoomId(state, id) {
            state.subscriptionRoomId = state.subscriptionRoomId.filter(i => i !== id);
        },
        clearSubscriptionRoomId(state) {
            state.subscriptionRoomId = [];
        },
        addSubscriptionRoomId(state, id) {
            state.subscriptionRoomId.push(id);
        },
        setStompClient(state, client) {
            state.stompClient = client;
        },
        clearStompClient(state) {
            state.stompClient = null;
        },
        setSendMessage(state, status) {
            state.sendMessage = status;
        },
        clearSendMessage(state) {
            state.sendMessage = false;
        },
        setSendUrl(state, url) {
            state.sendUrl = url;
        },
        clearSendUrl(state) {
            state.sendUrl = '';
        }
    },
    actions: {
        setWebsocketStatus({ commit }, status) {
            commit('setWebsocketStatus', status);
        },
        setSubscriptionRoomId({ commit }, id) {
            commit('setSubscriptionRoomId', id);
        },
        setSubscriptionRoomUsers({ commit }, users) {
            commit('setSubscriptionRoomUsers', users);
        },
        addSubscriptionRoomUsers({ commit }, user) {
            commit('addSubscriptionRoomUsers', user);
        },
        removeSubscriptionRoomUsers({ commit }, user) {
            commit('removeSubscriptionRoomUsers', user);
        },
        clearSubscriptionRoomUsers({ commit }) {
            commit('clearSubscriptionRoomUsers');
        },
        removeSubscriptionRoomId({ commit }, id) {
            commit('removeSubscriptionRoomId', id);
        },
        clearSubscriptionRoomId({ commit }) {
            commit('clearSubscriptionRoomId');
        },
        addSubscriptionRoomId({ commit }, id) {
            commit('addSubscriptionRoomId', id);
        },
        setStompClient({ commit }, client) {
            commit('setStompClient', client);
        },
        clearStompClient({ commit }) {
            commit('clearStompClient');
        },
        setSendMessage({ commit }, status) {
            commit('setSendMessage', status);
        },
        clearSendMessage({ commit }) {
            commit('clearSendMessage');
        },
        setSendUrl({ commit }, url) {
            commit('setSendUrl', url);
        },
        clearSendUrl({ commit }) {
            commit('clearSendUrl');
        }
    },
    watch: {
        subscriptionRoomId: {
            handler: function (val) {
                for (let i = 0; i < val.length; i++) {
                    this.state.stompClient.subscribe('/topic/' + val[i], function (data) {
                        const id = chatroom.state.chatRoom.messages.length + 1;
                        const senderId = data.headers.senderId;
                        const content = data.body;
                        const chatRoomId = this.chat.id;
                        const timestamp = new Date().toLocaleString();
                        const avatar = this.chat.avatar;
                        const filename = "";
                        const type = "text";
                        const messageObj = {
                            id,
                            senderId,
                            content,
                            chatRoomId,
                            timestamp,
                            avatar,
                            filename,
                            type
                        }
                        chatroom.commit("addMessage", messageObj);
                    })
                }
            },
            deep: true
        },
        subscriptionRoomUsers: {
            handler: function (val) {
                for (let i = 0; i < val.length; i++) {
                    this.state.stompClient.subscribe('/user/' + val[i] + '/queue/private', function (data) {
                        const id = chatuser.state.messages.length + 1;
                        const senderId = val[i];
                        const content = data.body;
                        const timestamp = new Date().toLocaleString();
                        const avatar = this.chat.avatar;
                        const filename = "";
                        const type = "text";
                        const messageObj = {
                            id,
                            senderId,
                            content,
                            chatRoomId,
                            timestamp,
                            avatar,
                            filename,
                            type
                        }
                        chatuser.commit("addMessage", messageObj)
                    })
                }
            },
            deep: true
        }
    }
})
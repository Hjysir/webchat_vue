import { createStore } from 'vuex'
import chatroom from "@/store/chatroom.js";
import chatuser from "@/store/chatuser.js";

export default createStore({
    state: {
        // 发送消息状态
        sendMessage: false,
        // 发送的URL
        sendUrl: '',
        // Stomp客户端
        stompClient: null,
        // WebSocket连接状态
        websocketConnected: false,
        // 订阅的聊天室ID列表
        subscriptionRoomId: [],
        // 订阅的聊天室用户列表
        subscriptionRoomUsers: [],
    },
    mutations: {
        // 设置WebSocket连接状态
        setWebsocketStatus(state, status) {
            state.websocketConnected = status;
        },
        // 设置订阅的聊天室ID列表
        setSubscriptionRoomId(state, id) {
            state.subscriptionRoomId = id;
        },
        // 设置订阅的聊天室用户列表
        setSubscriptionRoomUsers(state, users) {
            state.subscriptionRoomUsers = users;
        },
        // 添加订阅的聊天室用户
        addSubscriptionRoomUsers(state, user) {
            state.subscriptionRoomUsers.push(user);
        },
        // 移除订阅的聊天室用户
        removeSubscriptionRoomUsers(state, user) {
            state.subscriptionRoomUsers = state.subscriptionRoomUsers.filter(u => u !== user);
        },
        // 清空订阅的聊天室用户列表
        clearSubscriptionRoomUsers(state) {
            state.subscriptionRoomUsers = [];
        },
        // 移除订阅的聊天室ID
        removeSubscriptionRoomId(state, id) {
            state.subscriptionRoomId = state.subscriptionRoomId.filter(i => i !== id);
        },
        // 清空订阅的聊天室ID列表
        clearSubscriptionRoomId(state) {
            state.subscriptionRoomId = [];
        },
        // 添加订阅的聊天室ID
        addSubscriptionRoomId(state, id) {
            state.subscriptionRoomId.push(id);
        },
        // 设置Stomp客户端
        setStompClient(state, client) {
            state.stompClient = client;
        },
        // 清空Stomp客户端
        clearStompClient(state) {
            state.stompClient = null;
        },
        // 设置发送消息状态
        setSendMessage(state, status) {
            state.sendMessage = status;
        },
        // 清空发送消息状态
        clearSendMessage(state) {
            state.sendMessage = false;
        },
        // 设置发送的URL
        setSendUrl(state, url) {
            state.sendUrl = url;
        },
        // 清空发送的URL
        clearSendUrl(state) {
            state.sendUrl = '';
        }
    },
    actions: {
        // 设置WebSocket连接状态
        setWebsocketStatus({ commit }, status) {
            commit('setWebsocketStatus', status);
        },
        // 设置订阅的聊天室ID列表
        setSubscriptionRoomId({ commit }, id) {
            commit('setSubscriptionRoomId', id);
        },
        // 设置订阅的聊天室用户列表
        setSubscriptionRoomUsers({ commit }, users) {
            commit('setSubscriptionRoomUsers', users);
        },
        // 添加订阅的聊天室用户
        addSubscriptionRoomUsers({ commit }, user) {
            commit('addSubscriptionRoomUsers', user);
        },
        // 移除订阅的聊天室用户
        removeSubscriptionRoomUsers({ commit }, user) {
            commit('removeSubscriptionRoomUsers', user);
        },
        // 清空订阅的聊天室用户列表
        clearSubscriptionRoomUsers({ commit }) {
            commit('clearSubscriptionRoomUsers');
        },
        // 移除订阅的聊天室ID
        removeSubscriptionRoomId({ commit }, id) {
            commit('removeSubscriptionRoomId', id);
        },
        // 清空订阅的聊天室ID列表
        clearSubscriptionRoomId({ commit }) {
            commit('clearSubscriptionRoomId');
        },
        // 添加订阅的聊天室ID
        addSubscriptionRoomId({ commit }, id) {
            commit('addSubscriptionRoomId', id);
        },
        // 设置Stomp客户端
        setStompClient({ commit }, client) {
            commit('setStompClient', client);
        },
        // 清空Stomp客户端
        clearStompClient({ commit }) {
            commit('clearStompClient');
        },
        // 设置发送消息状态
        setSendMessage({ commit }, status) {
            commit('setSendMessage', status);
        },
        // 清空发送消息状态
        clearSendMessage({ commit }) {
            commit('clearSendMessage');
        },
        // 设置发送的URL
        setSendUrl({ commit }, url) {
            commit('setSendUrl', url);
        },
        // 清空发送的URL
        clearSendUrl({ commit }) {
            commit('clearSendUrl');
        }
    },
    // 监听状态变化
    watch: {
        // 订阅的聊天室ID列表
        subscriptionRoomId: {
            handler: function (val) {
                for (let i = 0; i < val.length; i++) {
                    // 订阅聊天室消息
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
                        // 添加消息到聊天室
                        chatroom.commit("addMessage", messageObj);
                    })
                }
            },
            deep: true
        },
        // 订阅的聊天室用户列表
        subscriptionRoomUsers: {
            handler: function (val) {
                for (let i = 0; i < val.length; i++) {
                    // 订阅用户私信
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
                        // 添加私信消息到用户
                        chatuser.commit("addMessage", messageObj)
                    })
                }
            },
            deep: true
        }
    }
})

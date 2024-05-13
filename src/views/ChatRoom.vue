<template>
  <el-container>
    <el-header><TopBar /></el-header>
    <el-divider></el-divider>
    <el-container>
      <el-aside width="330px"><SideBar /></el-aside>
      <el-container>
        <el-main>
          <MessageWindow />
          <InputWindow />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import TopBar from '@/components/chatcom/TopBar.vue'
import SideBar from '@/components/chatcom/SideBar.vue'
import MessageWindow from '@/components/chatcom/MessageWindow.vue'
import InputWindow from "@/components/chatcom/InputWindow.vue";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import websocket from "@/store/websocket.js";
import chatlist from "@/store/chatlist.js";
import {computed, ref, watch} from "vue";
import chatroom from "@/store/chatroom.js";

export default {
  components: {
    TopBar,
    SideBar,
    MessageWindow,
    InputWindow
  },
  setup() {
    const condition = computed(() => {
      return websocket.state.stompClient !== null && chatlist.state.hasChatList === true;
    });

    const isExcuted = ref(false);

    watch(condition, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        if (newVal === true && isExcuted.value === false) {
          for (let i = 0; i < chatlist.state.chatList.length; i++) {
            const res = chatlist.state.chatList;
            websocket.commit("addSubscriptionRoomId", res[i].id);
            websocket.state.stompClient.subscribe(`/topic/${res[i].id}`, message => {
              const index = chatlist.state.chatList.findIndex(item => item.id === res[i].id);
              console.log(index);
              const id = chatlist.state.chatList[index].messages.length + 1;
              const senderId = message.headers;
              const content = message.body;
              const chatRoomId = res[i].id;
              const timestamp = new Date().toLocaleString();
              const avatar = res[i].avatar;
              const filename = "";
              const type = "text";
              const messageObj = {
                index,
                getMessages: {
                  id,
                  senderId,
                  content,
                  chatRoomId,
                  timestamp,
                  avatar,
                  filename,
                  type
                }
              }
              chatlist.commit("addChatRoomMessage", messageObj);
              chatlist.commit("addUnreadCount", index);
              chatlist.commit("setHasNewMessageTrue", index);
              chatroom.commit("addUnreadCount");
            });
          }
          isExcuted.value = true;
        }
      }
    });
  },
  created() {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
      websocket.commit("setWebsocketStatus", true);
      websocket.commit("setStompClient", stompClient);
    });
  }
}
</script>

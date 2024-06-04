<template>
  <!-- 主容器 -->
  <el-container>
    <!-- 头部栏 -->
    <el-header><TopBar /></el-header>
    <!-- 分隔线 -->
    <el-divider></el-divider>
    <!-- 内容容器 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="330px"><SideBar @selectChat="selectChat" /></el-aside>
      <!-- 内容区域 -->
      <el-container>
        <el-main>
          <!-- 消息窗口 -->
          <MessageWindow />
          <!-- 输入窗口 -->
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
import {getHistoryMsg} from "@/api/axios" 

export default {
  components: {
    TopBar,
    SideBar,
    MessageWindow,
    InputWindow
  },
  setup() {
    const selectChat=data=>{



      // const historyFlag=chatlist.state.chatList.find(i=>i.chatname===data.id).historyFlag
      // historyFlag && getHistoryMsg(data.chatname).then(res=>{
      //
      const historyFlag=chatlist.state.chatList.find(i=>i.chatid===data.chatid).historyFlag

      !historyFlag && getHistoryMsg(data.chatname).then(res=>{
        chatlist.commit("updateHistoryFlag", data.chatid);
        res.forEach(item=>{
          const index = chatlist.state.chatList.findIndex(i => i.chatid === item.chatid);
          console.log('index',index,chatlist.state.chatList[index]);
          const id = chatlist.state.chatList[index].messages.length + 1;
          const senderId = item.id;
          const content = `${item.id}:${item.content}`;
          const chatRoomId = item.chatid;
          const timestamp = item.timestamp;
          const avatar = item.avatar||'';
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
          // 添加消息到聊天室
          chatlist.commit("addChatRoomMessage", messageObj);
        })


        //渲染

      })






    }
    // 计算属性：检查条件是否满足
    const condition = computed(() => {
      return websocket.state.stompClient !== null && chatlist.state.hasChatList === true;
    });

    // 是否已执行
    const isExcuted = ref(false);

    // 监听条件变化
    watch(condition, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        if (newVal === true && isExcuted.value === false) {
          // 遍历聊天室列表，订阅消息
          for (let i = 0; i < chatlist.state.chatList.length; i++) {
            const res = chatlist.state.chatList;
            // console.log(res[i]);
            websocket.commit("addSubscriptionRoomId", res[i].chatname);
            // 订阅消息
            websocket.state.stompClient.subscribe(`/topic/${res[i].chatname}`, message => {
              const index = chatlist.state.chatList.findIndex(item => item.chatname === res[i].chatname);
              // console.log(index);
              const id = chatlist.state.chatList[index].messages.length + 1;
              const senderId = message.headers;
              const content = message.body;
              const chatRoomId = res[i].chatname;
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
              // 添加消息到聊天室
              chatlist.commit("addChatRoomMessage", messageObj);
              // 增加未读消息计数
              chatlist.commit("addUnreadCount", index);
              // 设置聊天室有新消息
              chatlist.commit("setHasNewMessageTrue", index);
              // 增加未读消息计数到聊天室
              chatroom.commit("addUnreadCount");
            });
          }
          // 标记已执行
          isExcuted.value = true;
        }
      }
    });
    return {
    selectChat
  }
  },
  created() {
    // 创建 WebSocket 连接
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);
    // 连接成功回调
    stompClient.connect({}, frame => {
      websocket.commit("setWebsocketStatus", true);
      websocket.commit("setStompClient", stompClient);
    });
  },

}
</script>

<template>
  <div class="chat-list">
    <el-scrollbar height="800px" v-if="hasChat">
        <chat-item
            v-for="chat in chats"
            :key="chat.id"
            :chat="chat"
            :class="selected === chat.id ? 'selected' : ''"
            @click="selectChat(chat.id)"
            class="chat-item"
            style="margin-bottom: 10px"
        />
    </el-scrollbar>
    <div v-else class="no-chat">
      <h1>暂无聊天室</h1>
    </div>
  </div>
</template>

<script>
import ChatItem from './SideBarItem.vue';
import chatroom from "@/store/chatroom.js";
import chatlist from "@/store/chatlist.js";

export default {
  components: {
    ChatItem
  },
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    chats(newVal, oldVal) {
      if (newVal !== oldVal) {
        return chatlist.state.chatList;
      }
    },
    hasChat(newVal, oldVal) {
      if (newVal !== oldVal) {
        return chatlist.state.chatList.length > 0;
      }
    },
  },
  methods: {
    selectChat(chat) {
      this.selected = chat
      chatroom.commit("setChatRoom", chat);
      chatroom.commit("setIsSelectChatRoom", true);
      chatroom.commit("setUnreadCount", 0);
      chatroom.commit("setHasNewMessageFalse");
      const index = chatlist.state.chatList.findIndex(item => item.id === chat.id);
      chatlist.commit("setHasNewMessageTrue", index);
    },
  },
  created() {
    console.log(chatlist.state.chatList)
  }
};
</script>

<style scoped>
.chat-item {
  margin-right: 20px;
}

.no-chat {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 3em;
}

</style>

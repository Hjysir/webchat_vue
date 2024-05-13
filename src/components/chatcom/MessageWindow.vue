<template>
  <el-container class="chat-interface">
    <el-scrollbar v-if="chatRoomSelected" class="message-area" max-height="600px">
      <message-box :messages="allMessages" />
    </el-scrollbar>
    <div class="NoMessage" v-else>
      <h1>请选择聊天室</h1>
    </div>
  </el-container>
</template>

<script>
import MessageBox from '@/components/chatcom/MessageType.vue'
import chatroom from '@/store/chatroom.js'

export default {
  components: {
    MessageBox
  },
  computed: {
    allMessages(newVal, oldVal) {
      if (newVal !== oldVal) {
        return chatroom.state.chatRoom.messages;
      }
    },
    chatRoomSelected(newVal, oldVal) {
      if (newVal !== oldVal) {
        return chatroom.state.isSelectChatRoom;
      }
    }
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$el.querySelector('.message-area');
        container.scrollTop = container.scrollHeight;
      });
    }
  }
};
</script>

<style scoped>
.chat-interface {
  height: 660px;
  width: 100%;
}

.message-area {
  width: 100%;
  height: 600px;
}

.emoji-picker img {
  width: 30px;
  height: 30px;
  margin: 5px;
  cursor: pointer;
}

.NoMessage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 5em;
  margin-left: 450px;
}
</style>

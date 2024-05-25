<template>
  <!-- 聊天界面容器 -->
  <el-container class="chat-interface">
    <!-- 如果已选择聊天室，显示消息区域 -->
    <el-scrollbar v-if="chatRoomSelected" class="message-area" max-height="600px">
      <!-- 消息盒子组件，传递所有消息 -->
      <message-box :messages="allMessages" />
    </el-scrollbar>
    <!-- 如果未选择聊天室，显示提示 -->
    <div class="NoMessage" v-else>
      <h1>请选择聊天室</h1>
    </div>
  </el-container>
</template>

<script>
import MessageBox from '@/components/chatcom/MessageType.vue' // 引入消息盒子组件
import chatroom from '@/store/chatroom.js' // 引入聊天室状态管理

export default {
  components: {
    MessageBox
  },
  computed: {
    // 计算属性：获取所有消息
    allMessages() {
      return chatroom.state.chatRoom.messages;
    },
    // 计算属性：检查是否选择了聊天室
    chatRoomSelected() {
      return chatroom.state.isSelectChatRoom;
    }
  },
  methods: {
    // 方法：滚动到消息底部
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

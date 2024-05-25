<template>
  <!-- 聊天室项模板 -->
  <div id="chatroom" class="chat-item" :class="{ 'selected': isSelected, 'hover': isHover }" @mouseenter="isHover = true" @mouseleave="isHover = false">
    <!-- 聊天室头像 -->
    <el-avatar :src="chat.avatar"></el-avatar>
    <div class="chat-info">
      <!-- 聊天室名称 -->
      <div class="chat-title">{{ chat.name }}</div>
      <div class="chat-message">
        <!-- 最新消息内容 -->
        <span v-if="chat.messages.length > 0" class="message-content" >{{ chat.messages[chat.messages.length - 1].content }}</span>
      </div>
    </div>
    <!-- 聊天室详细信息 -->
    <div id="chatdetail" class="chat-details">
      <!-- 最新消息时间戳 -->
      <div class="chat-timestamp" v-if="chat.messages.length > 0">{{ chat.messages[chat.messages.length - 1].timestamp }}</div>
      <!-- 未读消息计数 -->
      <div v-if="chat.unreadCount > 0 && chat.unreadCount <= 99" class="unread-count">{{ chat.unreadCount }}</div>
      <div v-else-if="chat.unreadCount > 99" class="unread-count">99+</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 聊天室属性
    chat: {
      type: Object,
      required: true
    },
    // 是否选中状态
    isSelected: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      // 鼠标悬停状态
      isHover: false,
    };
  },
  methods: {
    // 暂无方法
  },
};
</script>

<style scoped>
/* 样式仅对当前组件生效 */
.chat-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
  height: 60px;
  color: #868686;
}

.chat-item.selected {
  background-color: #4370f5;
}

.chat-item.selected .chat-title {
  color: white;
}

.chat-item.selected {
  color: white;
}

.chat-item.selected.hover {
  background-color: #4370f5;
}

.chat-item.hover {
  background-color: #e0e0e0;
}

.chat-title {
  font-size: 1.1em;
  font-weight: bold;
  color: black;
}

.chat-info {
  margin-left: 10px;
  flex-grow: 1;
}

.chat-details {
  margin-left: auto;
  text-align: right;
}

.chat-title {
  font-size: 1.1em;
  font-weight: bold;
}

.chat-title.selected {
  color: white;
}

.unread-count {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff0f0f;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 0.8em;
  margin-top: 15px;
}

.message-content {
  width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>

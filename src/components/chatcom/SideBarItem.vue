<template>
  <div id="chatroom" class="chat-item" :class="{ 'selected': isSelected, 'hover': isHover }" @mouseenter="isHover = true" @mouseleave="isHover = false">
    <el-avatar :src="chat.avatar"></el-avatar>
    <div class="chat-info">
      <div class="chat-title">{{ chat.name }}</div>
      <div class="chat-message">
        <span v-if="chat.messages.length > 0" class="message-content" >{{ chat.messages[chat.messages.length - 1].content }}</span>
      </div>
    </div>
    <div id="chatdetail" class="chat-details">
      <div class="chat-timestamp" v-if="chat.messages.length > 0">{{ chat.messages[chat.messages.length - 1].timestamp }}</div>
      <div v-if="chat.unreadCount > 0 && chat.unreadCount <= 99" class="unread-count">{{ chat.unreadCount }}</div>
      <div v-else-if="chat.unreadCount > 99" class="unread-count">99+</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chat: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      isHover: false,
    };
  },
  methods: {
  },
};
</script>

<style scoped>
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

<template>
  <div class="message-box">
    <div v-for="message in messages" :key="message.id" class="message" :class="{'message-sent': message.content.split(':')[0] === username, 'message-received': !(message.content.split(':')[0] === username)}">
      <el-avatar :src="message.avatar" size="default"></el-avatar>
      <div class="message-content">
        <div class="message-text">{{ message.content.split(":")[1] }}</div>
      </div>
      <div class="name">{{ message.content.split(":")[0] }}</div>
      <div class="message-time">{{ message.timestamp }}</div>
    </div>
  </div>
</template>

<script>

import user from "@/store/user.js";

export default {
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      Count: 0,
      username: user.state.username
    };
  },
};

</script>

<style scoped>
.name {
  font-size: 0.8em;
  color: #888;
  text-align: left;
}

.message-box {
  margin: 20px;
}

.message {
  display: flex;
  margin-bottom: 10px;
}

.message-sent {
  flex-direction: row-reverse;
}

.message-received .el-avatar {
  margin: 0 10px;
}
.message-sent .el-avatar {
  margin: 0 10px;
}

.message-content {
  max-width: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: #ffffff;
  position: relative;
}

.message-sent .message-content {
  background-color: #3fde2b;
}

.message-sent .name {
  margin-right: 10px;
}

.message-received .name {
  margin-left: 10px;
}

.message-text {
  margin-bottom: 5px;
}

.message-time {
  font-size: 1em;
  color: #888;
  text-align: right;
}

.message-sent .message-time {
  position: relative;
  bottom: -12px;
  right: 10px;
}

.message-received .message-time {
  position: relative;
  bottom: -12px;
  left: 10px;
}
</style>
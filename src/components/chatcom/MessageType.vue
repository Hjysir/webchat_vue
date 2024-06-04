<template>
  <!-- 消息盒子容器 -->
  <div class="message-box">
    <!-- 循环渲染消息 -->
    <div 
      v-for="message in messages" 
      :key="message.id" 
      class="message" 
      :class="{
        'message-sent': message.content.split(':')[0] === username, // 如果消息发送者是当前用户，添加 'message-sent' 类
        'message-received': !(message.content.split(':')[0] === username) // 否则添加 'message-received' 类
      }"
    >
      <!-- 消息头像 -->
      <el-avatar :src="message.avatar ||'https://userpic.codeforces.org/no-title.jpg' " size="default"></el-avatar>
      <!-- 消息内容 -->
      <div class="message-content">
        <div class="message-text">{{ message.content.split(":")[1] }}</div> <!-- 显示消息内容 -->
      </div>
      <!-- 消息发送者名字 -->
      <div class="name">{{ message.content.split(":")[0] }}</div>
      <!-- 消息发送时间 -->
      <div class="message-time">{{ message.timestamp }}</div>
    </div>
  </div>
</template>
<!---->
<script>
import user from "@/store/user.js"; // 引入用户状态管理

export default {
  props: {
    messages: {
      type: Array, // 定义消息属性的类型为数组
      required: true // 该属性为必传
    }
  },
  data() {
    return {
      Count: 0, // 计数器（此处未使用）
      username: user.state.username // 获取当前用户名
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

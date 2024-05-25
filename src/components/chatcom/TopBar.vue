<template>
  <!-- 顶部导航栏模板 -->
  <div class="top-bar">
    <div class="center">
      <!-- 用户头像和名称 -->
      <el-avatar :src="user.avatar"></el-avatar>
      <el-text size="large" class="user-name">{{ user.name }}</el-text>
    </div>
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        更多操作
        <el-icon class="el-icon--right">
          <!-- 下拉箭头 -->
          <arrow-down />
        </el-icon>
      </span>
      <!-- 下拉菜单内容 -->
      <template #dropdown>
        <el-dropdown-menu>
          <!-- 修改密码 -->
          <el-dropdown-item>
            <el-button type="text" icon="el-icon-plus" @click="handleCommand('change-password')">修改密码</el-button>
          </el-dropdown-item>
          <!-- 添加聊天室 -->
          <el-dropdown-item>
            <el-button type="text" icon="el-icon-plus" @click="handleCommand('add-chat-room')">添加聊天室</el-button>
          </el-dropdown-item>
          <!-- 创建聊天室 -->
          <el-dropdown-item>
            <el-button type="text" icon="l-icon-close" @click="handleCommand('create-chat-room')">创建聊天室</el-button>
          </el-dropdown-item>
          <!-- 登出 -->
          <el-dropdown-item>
            <el-button type="text" icon="el-icon-switch-button" @click="handleCommand('logout')">登出</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
// 导入 Element Plus 的消息提示组件和用户 Vuex store
import {ElMessage, ElMessageBox} from "element-plus";
import User from "@/store/user.js";
// 导入 API 函数和路由
import {addChatMember, changePassword, createChat, getChatRoom, removeChatMember} from "@/api/axios.js";
import Router from "@/router/index.js";
import chatlist from "@/store/chatlist.js";

export default {
  data() {
    return {
      // 用户信息
      user: {
        name: User.state.username,
        avatar: User.state.useravatar
      }
    };
  },
  methods: {
    // 处理下拉菜单命令
    handleCommand: function (command) {
      if (command === 'add-chat-room') {
        // 添加聊天室操作
        ElMessageBox.prompt('想要加入的聊天名名称', '添加聊天', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        })
        .then(({value}) => {
          addChatMember(User.state.username, value)
          getChatRoom(value).then(res => {
            if (res === null) {
              ElMessage({
                type: 'error',
                message: `聊天室 ${value} 不存在`,
              })
            } else {
              console.log(res)
              chatlist.commit("addChatList", res);
              chatlist.commit("setHasChatList", true);
              ElMessage({
                type: 'success',
                message: `聊天室 ${value} 已加入`,
              })
            }
          })
        })
      } else if (command === 'logout') {
        // 登出操作
        User.commit('logout');
        Router.push('/login')
      } else if (command === 'create-chat-room') {
        // 创建聊天室操作
        ElMessageBox.prompt('聊天室名称', '创建聊天室', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        })
        .then(({value}) => {
          createChat(User.state.username, value).then(res => {
            chatlist.commit("addChatList", res);
            chatlist.commit("setHasChatList", true);
            ElMessage({
              type: 'success',
              message: `聊天室 ${value} 创建成功`,
            })
          })
        })
      } else if (command === 'exit-chat-room') {
        // 退出聊天室操作
        ElMessageBox.prompt('退出聊天室名称', '退出聊天室', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        })
        .then(({value}) => {
          removeChatMember(User.state.username, value).then(res => {
            if (res.code === 500) {
              ElMessage({
                type: 'error',
                message: `聊天室 ${value} 不存在`,
              })
            } else {
              chatlist.commit("removeChatList", value);
              ElMessage({
                type: 'success',
                message: `聊天室 ${value} 已退出`,
              })
            }
          })
        })
        chatlist.commit("removeChatList", value);
        ElMessage({
          type: 'success',
          message: `聊天室 ${value} 已退出`,
          })
        } else if (command === 'add-chat') {
        // 添加聊天用户操作
        ElMessageBox.prompt('添加聊天用户', '添加聊天用户', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        })
        .then(({value}) => {
          addChatMember(User.state.username, value).then(res => {
            if (res.code === 500) {
              ElMessage({
                type: 'error',
                message: `用户 ${value} 不存在`,
              })
            } else {
              chatlist.commit("addChatList", res);
              chatlist.commit("setHasChatList", true);
              ElMessage({
                type: 'success',
                message: `用户 ${value} 已添加`,
              })
            }
          })
        })
      } else if (command === 'update-avatar') {
        // 更新用户头像操作
        ElMessageBox.prompt('上传用户图片', '上传用户图片', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        })
        .then(({value}) => {
          User.commit("setUseravatar", value)
          ElMessage({
            type: 'success',
            message: `用户图片已上传`,
          })
        })
      } else if (command === 'change-password') {
        // 修改密码操作
        ElMessageBox.prompt('修改密码', '修改密码', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        })
        .then(({value}) => {
          if (value === '') {
            ElMessage({
              type: 'error',
              message: `密码不能为空`,
            })
            return
          }
          changePassword(User.state.username, value)
          User.commit("setPassword", value)
          ElMessage({
            type: 'success',
            message: `密码已修改`,
          })
        })
      }
    }
  },
};

</script>

<style scoped>
/* 样式仅对当前组件生效 */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.user-name {
  margin-left: 10px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>

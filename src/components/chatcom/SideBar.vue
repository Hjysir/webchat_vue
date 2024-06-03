<template>
  <!-- 聊天列表模板 -->
  <div class="chat-list">
    <!-- 使用 Element UI 的滚动条组件 -->
    <el-scrollbar height="800px" v-if="hasChat">
       <div class="chat-collapse">
         <el-collapse v-model="activeNames" >
           <el-collapse-item title="群聊" name="1">
             <div  v-for="chat in chats"
                   :key="chat.chatid">
               <chat-item
                   v-if="chat.chattype==='1'"
                   :chat="chat"
                   :class="selected === chat.chatid ? 'selected' : ''"
                   @click="selectChat(chat.chatid,chat)"
                   class="chat-item"
                   style="margin-bottom: 10px"
               />
             </div>
           </el-collapse-item>
           <el-collapse-item title="私聊" name="2">
             <div  v-for="chat in chats"
                   :key="chat.chatid">
               <chat-item
                   v-if="chat.chattype==='0'"
                   :chat="chat"
                   :class="selected === chat.chatid ? 'selected' : ''"
                   @click="selectChat(chat.chatid,chat)"
                   class="chat-item"
                   style="margin-bottom: 10px"
               />
             </div>

           </el-collapse-item>
         </el-collapse>
       </div>
        <!-- 遍历聊天列表，生成聊天项 -->

    </el-scrollbar>
    <!-- 如果没有聊天，则显示暂无聊天室 -->
    <div v-else class="no-chat">
      <h1>暂无聊天室</h1>
    </div>
  </div>
</template>

<script>
// 导入侧边栏聊天项组件和聊天室、聊天列表的 Vuex store
import ChatItem from './SideBarItem.vue';
import chatroom from "@/store/chatroom.js";
import chatlist from "@/store/chatlist.js";

export default {
  components: {
    ChatItem
  },
  data() {
    return {
      // 当前选中的聊天室
      selected: null,
      activeNames:['1','2']
    };
  },
  computed: {
    // 计算属性：获取聊天列表
    chats(newVal, oldVal) {
      if (newVal !== oldVal) {
        console.log(newVal,oldVal)
        return chatlist.state.chatList;
      }
    },
    // 计算属性：检查是否有聊天室
    hasChat(newVal, oldVal) {
      if (newVal !== oldVal) {
        return chatlist.state.chatList.length > 0;
      }
    },
  },
  methods: {
    // 选择聊天室
    selectChat(chat,item) {
      this.selected = chat
      chatroom.commit("setChatRoom", chat);
      chatroom.commit("setIsSelectChatRoom", true);
      chatroom.commit("setUnreadCount", 0);
      chatroom.commit("setHasNewMessageFalse");
      // const index = chatlist.state.chatList.findIndex(item => item.id === chat.id);
      // chatlist.commit("setHasNewMessageTrue", index);
      this.$emit('selectChat',item)
    },
  },
  created() {
    // 在组件创建时打印聊天列表状态
    // console.log(chatlist.state.chatList)
  }
};
</script>

<style scoped>
/* 样式仅对当前组件生效 */
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

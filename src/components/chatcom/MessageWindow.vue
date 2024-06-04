<template>
  <!-- 聊天界面容器 -->
  <el-container class="chat-interface">
     <div class="btn" v-if="chatRoomSelected">
      <el-button type="primary" @click="dialogTableVisible=true">搜索历史</el-button>
     </div>
    <!-- 如果已选择聊天室，显示消息区域 -->
    <el-scrollbar v-if="chatRoomSelected" class="message-area" max-height="600px">
      <!-- 消息盒子组件，传递所有消息 -->
      <message-box :messages="allMessages" />
    </el-scrollbar>
    <!-- 如果未选择聊天室，显示提示 -->
    <div class="NoMessage" v-else>
      <h1>请选择聊天室</h1>
    </div>
    <el-dialog style="background: #f4f4f4" v-model="dialogTableVisible" title="搜索历史记录" @close="dialogTableVisible=false" width="800">
      <div class="u-flex">
        <el-input v-model="param.keyword" placeholder="输入关键词进行搜索" clearable 
          @keyup.enter.native="handleSearch" class="g-flex-1" />
          <el-button type="primary" @click="handleSearch" style="margin-left: 20px" class="g-flex-0">搜索</el-button>
      </div>
      <message-box :messages="searchMessages" />
    </el-dialog>
  </el-container>
</template>

<script>
import MessageBox from '@/components/chatcom/MessageType.vue' // 引入消息盒子组件
import chatroom from '@/store/chatroom.js' // 引入聊天室状态管理
import {getHistoryMsg} from "@/api/axios" 
export default {
  data(){
    return {
      dialogTableVisible:false,
      param:{
        keyword:''
      },
      searchMessages:undefined
    }
  },
  components: {
    MessageBox
  },
  computed: {
    // 计算属性：获取所有消息
    allMessages() {
      console.log('allMessages',chatroom.state.chatRoom.messages)
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
    },
    handleSearch(){
     // return console.log(chatroom.state.chatRoom.chatname);
      getHistoryMsg(chatroom.state.chatRoom.chatname,this.param.keyword).then(res=>{
        res.forEach(item=>{
          item.content=`${item.id}:${item.content}`
          item.avatar=item.avatar||''
        })
        this.searchMessages=res
        console.log('搜索结果',res);
      })
      
    }
  }
};
</script>

<style scoped>
.u-flex{
  display: flex
}
.g-flex-0{
flex: 0;
}
.g-flex-1{
flex: 1;
}
.chat-interface {
  height: 660px;
  width: 100%;
  position: relative;
}
.chat-interface .btn{
  position: absolute;
  right:10px;
  top: -20px;
  z-index: 10;
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

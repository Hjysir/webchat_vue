<template>
  <!-- 聊天输入容器 -->
  <div class="chat-input-container">
    <!-- 按钮容器 -->
    <div class="button-container">
      <!-- Emoji选择器按钮 -->
      <EmojiPicker @emoji-selected="inputText += $event" />
      <!-- 文件选择按钮 -->
      <el-button type="text" @click="selectFile">
        <img src="@/assets/fileicon.svg" alt="file" class="file-icon" />
      </el-button>
      <!-- 图片选择按钮 -->
      <el-button type="text" @click="selectImage">
        <img src="@/assets/photoicon.svg" alt="image" class="pic-icons" />
      </el-button>
    </div>
    <!-- 输入文本框 -->
    <el-input
        type="textarea"
        v-model="inputText"
        class="chat-input"
        placeholder="请输入文本"
        rows="2"
        @keyup.enter="sendMessage"
        @keyup.ctrl.enter="inputText += '\n'"
    >
      <!-- 发送按钮 -->
      <template #append>
        <el-button icon="el-icon-send" @click="sendMessage"></el-button>
      </template>
    </el-input>
    <!-- 文件输入框，隐藏 -->
    <input type="file" ref="fileInput" hidden @change="handleFileUpload" />
    <!-- 图片输入框，隐藏 -->
    <input type="file" ref="imageInput" accept="image/*" hidden @change="handleImageUpload" />
  </div>
</template>

<script>
import EmojiPicker from "@/components/chatcom/emojipicker.vue";
import websocket from "@/store/websocket.js";
import chatroom from "@/store/chatroom.js";
import user from "@/store/user.js";

export default {
  data() {
    return {
      inputText: '', // 输入的文本内容
    };
  },
  components: {
    EmojiPicker, // 引入 EmojiPicker 组件
  },
  methods: {
    selectFile() {
      // 触发文件输入框点击事件
      this.$refs.fileInput.click();
    },
    selectImage() {
      // 触发图片输入框点击事件
      this.$refs.imageInput.click();
    },
    handleFileUpload(event) {
      // 处理文件上传
      const file = event.target.files[0]; // 获取选中的文件
      console.log(file)
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileData = e.target.result; // 获取文件数据
      };

      reader.onerror = (e) => {
        console.error('File reading error', e); // 处理文件读取错误
      };

      reader.readAsDataURL(file); // 将文件读取为 data URL
      this.inputText = reader.result; // 设置输入文本为文件数据
      console.log(reader.result);
    },
    handleImageUpload(event) {
      // 处理图片上传
      console.log(event.target.files[0])
      const image = event.target.files[0]; // 获取选中的图片
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileData = e.target.result; // 获取图片数据
      };

      reader.onerror = (e) => {
        console.error('Image reading error', e); // 处理图片读取错误
      };

      reader.readAsDataURL(image); // 将图片读取为 data URL
      this.inputText = reader.result; // 设置输入文本为图片数据
      console.log(reader.result);
    },
    sendMessage() {
      // 发送消息
      if (this.inputText === '') {
        console.log("发送空消息") // 如果输入文本为空，提示发送空消息
      } else {
        console.log("发送消息" + this.inputText) // 输出发送的消息
        console.log(chatroom.state.chatRoom.chatname)
        const sendUrl = `/app/ws/${chatroom.state.chatRoom.chatname}/${user.state.username}`; // 生成发送消息的URL

        const message = {
          // 用户名字
          id: user.state.username,
          // 聊天室的名字
          chatid: chatroom.state.chatRoom.chatid,
          // 聊天的形式，是群聊还是私聊
          messagetype: 0,
          // 消息的内容
          content: this.inputText,
          // 时间戳
          timestamp: new Date().getTime(),
          //如果有文件，文件的URL，不然为空
          URL: ''
        };

        var JSON_message = JSON.stringify(message)
        websocket.state.stompClient.send(sendUrl, {}, JSON_message); // 通过websocket发送消息
        this.inputText = ''; // 清空输入框
      }
    },
  },
};
</script>

<style scoped>
.chat-input-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px;
  background: #ffffff;
  border-radius: 8px;
  width: 98%;
}

.button-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.chat-input {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.file-icon {
  width: 30px;
  height: 30px;
  margin-bottom: 2px;
  margin-left: 2px;
}

.pic-icons {
  width: 30px;
  height: 30px;
}

</style>

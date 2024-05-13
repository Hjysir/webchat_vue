<template>
  <div class="chat-input-container">
    <div class="button-container">
      <EmojiPicker @emoji-selected="inputText += $event" />
      <el-button type="text" @click="selectFile">
        <img src="@/assets/fileicon.svg" alt="file" class="file-icon" />
      </el-button>
      <el-button type="text" @click="selectImage">
        <img src="@/assets/photoicon.svg" alt="image" class="pic-icons" />
      </el-button>
    </div>
    <el-input
        type="textarea"
        v-model="inputText"
        class="chat-input"
        placeholder="请输入文本"
        rows="2"
        @keyup.enter="sendMessage"
        @keyup.ctrl.enter="inputText += '\n'"
    >
      <template #append>
        <el-button icon="el-icon-send" @click="sendMessage"></el-button>
      </template>
    </el-input>
    <input type="file" ref="fileInput" hidden @change="handleFileUpload" />
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
      inputText: '',

    };
  },
  components: {
    EmojiPicker,
  },
  methods: {
    selectFile() {
      this.$refs.fileInput.click();
    },
    selectImage() {
      this.$refs.imageInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      console.log(file)
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileData = e.target.result;
      };

      reader.onerror = (e) => {
        console.error('File reading error', e);
      };

      reader.readAsDataURL(file); // read file as data url
      this.inputText = reader.result;
      console.log(reader.result);
    },
    handleImageUpload(event) {
      console.log(event.target.files[0])
      const image = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileData = e.target.result;
      };

      reader.onerror = (e) => {
        console.error('Image reading error', e);
      };

      reader.readAsDataURL(image); // read file as data url
      this.inputText = reader.result;
      console.log(reader.result);
    },
    sendMessage() {
      if (this.inputText === '') {
        console.log("发送空消息")
      } else {
        console.log("发送消息" + this.inputText)
        const sendUrl = `/app/ws/${chatroom.state.chatRoom.id}/${user.state.username}`;
        websocket.state.stompClient.send(sendUrl, {}, this.inputText);
        this.inputText = '';
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

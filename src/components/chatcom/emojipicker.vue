<template>
  <div class="emoji-container">
    <el-collapse-transition>
      <div class="emoji-picker" v-show="showEmojiPicker">
        <span v-for="emoji in emojis" :key="emoji" class="emoji" @click="selectEmoji(emoji)">{{ emoji }}</span>
      </div>
    </el-collapse-transition>
    <el-button type="text" @click="toggleEmojiPicker">
      <img src="@/assets/emojiicon.svg" alt="emoji" class="emoji-icon"/>
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showEmojiPicker: false,
      emojis: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '☹️', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '😳', '🤪', '😵', '😡', '😠', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠', '🤡', '🥳', '🥺', '🤥', '🤫', '🤭', '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '🤖', '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾']
    };
  },
  methods: {
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },
    selectEmoji(emoji) {
      this.$emit('emoji-selected', emoji);
      this.showEmojiPicker = false;
    }
  }
};
</script>

<style scoped>
.emoji-picker {
  position: absolute;
  bottom: 50px;
  width: 800px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.emoji {
  font-size: 24px;
  margin: 5px;
  cursor: pointer;
}

.emoji-container {
  position: relative;
}

.emoji-icon {
  width: 30px;
  height: 30px;
  margin: 0 10px;
}

</style>

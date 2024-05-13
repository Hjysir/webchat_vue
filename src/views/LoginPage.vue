<template>
  <el-container>
    <el-main>
      <transition name="el-zoom-in-bottom">
        <div v-show="isLogin"><LoginWindow /></div>
      </transition>
      <transition name="el-zoom-in-top">
        <div v-show="isRegister"><RegisterWindow /></div>
      </transition>
    </el-main>
  </el-container>
</template>

<script setup>
import LoginWindow from "../components/logincom/LoginWindow.vue"
import RegisterWindow from "@/components/logincom/RegisterWindow.vue";
import {computed} from "vue";
import login from "@/store/login.js";

const isLogin = computed( () => {
  return login.state.loginstatus
})

const isRegister = computed( () => {
  return login.state.registerstatus
})

</script>

<style scoped>
.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

body, #app {
  margin: 0;
  padding: 0;
}

</style>
<template>
  <div class="OperationWindow">
    <el-form>
      <el-form-item>
        <el-input placeholder="用户名/邮箱" prefix-icon="User" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" placeholder="密码" prefix-icon="Lock" show-password v-model="form.pass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row gutter={20}>
          <el-col :span="12">
            <el-input placeholder="验证码" v-model="form.cacha"></el-input>
          </el-col>
          <el-col :span="12">
            <Captcha />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="getLogin()">登录</el-button>
        <el-button @click="Register()" size="large">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import Captcha from "./Captcha.vue";
import Login from "@/store/login.js";
import User from "@/store/user.js";
import { sendLogin } from "@/api/axios.js";
import { useRouter } from "vue-router";
import captchastatus from "@/store/captcha.js";
import { getChatList } from "@/api/axios.js";
import chatlist from "@/store/chatlist.js";

const router = useRouter()
const captcha = ref('')

const form = reactive({
  username: '',
  pass: '',
  cacha: ''
})

const getLogin = async () => {
  if (form.username === '') alert("请输入用户名")
  else if (form.pass === '') alert("请输入密码")
  else if (form.cacha === '') alert("请输入验证码")

  if (form.cacha !== captchastatus.state.captcha) {
    alert("验证码错误")
    captchastatus.commit("reset")
    captchastatus.commit("resetCaptcha", true)
    return
  }

  console.log(form);

  const data = await sendLogin(form.username, form.pass)

  if (data.code === 200) {
    alert("登录成功")
    User.commit("setUsername", form.username)
    User.commit("setLogin", true)
    User.commit("setUseravatar", "https://userpic.codeforces.org/no-title.jpg")
    console.log(User.state)
    getChatList(User.state.username).then(res => {
      if (res.length > 0) {
        chatlist.commit("setChatList", res);
        chatlist.commit("setHasChatList", true);
      }

    });
    await router.push("/chatroom")
  } else {
    alert("登录失败")
    console.log(data)
  }
}

const Register = () => {
  Login.commit("setLoginWindow", false)
  // 等待动画结束
  setTimeout(() => {
    Login.commit("setRegisterWindow", true)
  }, 290)
}


</script>

<style scoped>
.OperationWindow {
  width: 350px;
  height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e1e1e1;
  box-shadow: 0 0 10px #4f4f4f;
  border-radius: 10px;
}
</style>
<template>
  <div class="OperationWindow">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="user">
        <el-input v-model="ruleForm.user"/>
      </el-form-item>
      <el-form-item label="注册密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
        <el-button @click="Register()">返回登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

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

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { sendRegister } from "@/api/axios.js";
import Login from "@/store/login.js";

const ruleFormRef = ref<FormInstance>()

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("两次密码不一致!"))
  } else {
    callback()
  }
}

const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else callback()
}

const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else if (ruleForm.email !== '') {
  //   正则表达式判断邮箱格式
    const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
    if (!reg.test(ruleForm.email)) {
      callback(new Error('邮箱格式不正确'))
    } else callback()
  }
}

const ruleForm = reactive({
  user: '',
  pass: '',
  checkPass: '',
  email: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
  user: [{ required: true, validator: validateUsername, trigger: 'blur' }],
  pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
  checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
  email: [{ required: true, validator: validateEmail, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      sendRegister(ruleForm.user, ruleForm.pass, ruleForm.email)
      alert("注册成功")
      resetForm(formEl)
      Login.commit("setLogin", true)
      return true
    } else {
      alert("请检查输入信息是否正确")
      resetForm(formEl)
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const Register = () => {
  Login.commit("setRegisterWindow", false)
  // 等待动画结束
  setTimeout(() => {
    Login.commit("setLoginWindow", true)
  }, 290)
}

</script>
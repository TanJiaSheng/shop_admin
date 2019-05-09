<template>
  <div class="login-wrapper">
    <!--
      el-form
        label-position="top" 设置label的位置
        :model 用来设置表单数据模型(对象)
        :rules 用来设置表单验证规则
        ref 用来引用当前的表单组件
      el-form-item
        label 当前表单项名称
        prop  他的值时 model 对象中的一个属性
              当使用表单验证或者表单重置功能时，必须要提高该属性
      el-input
        v-model 实现双向数据绑定
     -->
     <!-- row 表示一行 -->
    <el-row type="flex" class="loginForm" justify="center" align="middle">
      <!-- col 表示一列 span 表示占用几份（共24份） -->
      <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4" class="login-content">
        <el-form label-position="top" :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入 axios
import axios from 'axios'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          // require 是否为必填项
          // message 当前规则校验失败时的提示
          // trigger 表单验证的触发时机，blur表示失去焦点时触发
          { required: true, message: '用户名为必填项', trigger: 'blur' },
          // min 最小长度
          // max 最大长度
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录功能的实现
    login() {
      // 使用axios
      // http://localhost:8888/api/private/v1/login
      axios
        .post('http://localhost:8888/api/private/v1/login', this.loginForm)
        .then(res => {
          // console.log(res)
          // const data = res.data.data
          // const meta = res.data.meta

          // ES6中的结构，意思就是从 res.data 中取出属性 data 和 meta
          const { data, meta } = res.data
          if (meta.status === 200) {
            console.log('success')
            // 登录成功，需要跳转到后台管理首页
            this.$router.push('/home')
          } else {
            // this.$message.error(meta.msg)
            this.$message({
              type: 'error',
              message: meta.msg,
              duration: 1000
            })
          }
        })
    },
    submitForm() {
      // ref 用在组件中，表示当前组件
      this.$refs.loginForm.validate((valid) => {
        // valid 表示是否校验成功，如果成功就为 true
        // 如果失败就为 false
        if (valid) {
          // 成功：调用登录接口
          // 获取用户名和密码
          // console.log(this.loginForm)
          this.login()
        } else {
          // 校验失败
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style>
.login-wrapper, .loginForm {
  height: 100%;
}
.loginForm {
  background-color: #2D434C;
}
.login-content {
  min-width: 240px;
  padding: 20px 35px;
  border-radius: 10px;
  background-color: #fff;
}
</style>

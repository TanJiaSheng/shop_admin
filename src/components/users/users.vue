<template>
  <div>
    <!--
      el-table 表格组件
        data 用来给表格组件提供数据
        stripe 添加该属性后，启用隔行变色效果
      el-table-column 表格中的每一列
        label 每一列的标题名称
        width 每一列的宽度
        prop 表示数据中的属性名(字段名)
     -->
    <el-table :data="userList" stripe>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  created () {
    // 发送请求，获取数据
    this.getUesrList()
  },
  data() {
    return {
      userList: []
    }
  },
  methods: {
    // 获取用户列表数据
    getUesrList() {
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          // 当前页
          pagenum: 1,
          // 每页展示多少条
          pagesize: 3
        },
        // 将 token 作为请求头，转递给服务器接口
        // 这样，才能正确的调用这个接口
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
        .then(res => {
          // console.log(res)
          const { data, meta } = res.data
          if (meta.status === 200) {
            console.log(data.users)
            // 获取数据成功
            this.userList = data.users
          }
        })
    }
  }
}
</script>

<style>

</style>

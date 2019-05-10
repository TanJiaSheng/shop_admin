<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="user-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入搜索关键字" v-model="queryStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="queryUser"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" plain  @click="showUserAddDialog">添加用户</el-button>
      </el-col>
    </el-row>
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
      <el-table-column prop="mobile" label="电话"  width="180"></el-table-column>
      <el-table-column label="用户状态">
        <!-- scope.row 表示当前行的数据 -->
        <template slot-scope="scope">
          <!--
            v-model 用来绑定数据
            active-color="#13ce66" 启用时的颜色
            inactive-color="#ff4949"  禁用时的颜色
             -->
          <el-switch v-model="scope.row.mg_state" @change="changeUserState(scope.row.id, scope.row.mg_state)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
          <el-button type="danger" plain size="mini" icon="el-icon-delete"></el-button>
          <el-button type="success" plain size="mini" icon="el-icon-check">角色分配</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
      el-pagination 分页组件
        background  背景色
        layout 分页组件显示内容
        total 总条数
        给 current-page 属性添加 .sync 修饰符后，就可以设置当前页了
     -->
    <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
    :current-page.sync="curPage"
    @current-change="changePage">
    </el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="userAddDialog" @close="closeUserAddDialog" width="30%">
      <el-form :model="userAddForm" :rules="userAddRules" ref="userAddForm">
        <el-form-item label="用户名" prop="username" :label-width="labelWidth">
          <el-input v-model="userAddForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="labelWidth">
          <el-input v-model="userAddForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="labelWidth">
          <el-input v-model="userAddForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" :label-width="labelWidth">
          <el-input v-model="userAddForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  created () {
    // 发送请求，获取数据
    this.getUesrList()
  },

  data() {
    return {
      userList: [],
      // 每页大小
      pageSize: 3,
      // 当前页
      curPage: 1,
      // 总条数
      total: 10,
      // 搜索内容
      queryStr: '',
      // 控制用户添加对话框的显示隐藏
      userAddDialog: false,
      labelWidth: '120px',
      userAddForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },

      userAddRules: {
        username: [
          { required: true, message: '用户名为必填项', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱为必填项', trigger: 'blur' },
          { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' },
          { pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, message: '输入的邮箱不合法', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          { length: 11, message: '长度为 11 个字符', trigger: 'blur' },
          { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 获取用户列表数据
    // curPage = 1 给参数设置默认值
    getUesrList(curPage = 1) {
      this.$http.get('/users', {
        params: {
          // 当前页
          pagenum: curPage,
          // 每页展示多少条
          pagesize: this.pageSize,
          // 查询条件
          query: this.queryStr || ''
        }
        // 将 token 作为请求头，转递给服务器接口
        // 这样，才能正确的调用这个接口
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      })
        .then(res => {
          // console.log(res)
          const { data, meta } = res.data
          if (meta.status === 200) {
            // 获取数据成功
            this.userList = data.users
            this.total = data.total
          }
        })
    },

    /**
     * 分页获取数据
     * @param {curPage} curPage 当前页页码
    */
    changePage(curPage) {
      this.getUesrList(curPage)
    },

    // 搜索
    queryUser() {
      this.curPage = 1
      this.getUesrList()
    },

    // 启用或禁用用户
    changeUserState(id, curState) {
      this.$http
        .put(`/users/${id}/state/${curState}`)
        .then(res => {
          const { data, meta } = res.data
          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: data.mg_state === 0 ? '禁用成功' : '启用成功',
              duration: 1000
            })
          } else {
            this.$message({
              type: 'error',
              message: meta.msg,
              duration: 1000
            })
          }
        })
    },

    // 展示用户添加对话框
    showUserAddDialog() {
      this.userAddDialog = true
    },

    // 关闭对话框重置表单数据数据
    closeUserAddDialog() {
      this.$refs.userAddForm.resetFields()
    },

    // 添加用户
    addUser() {
      this.$refs.userAddForm.validate(valid => {
        if (valid) {
          // 成功
          this.$http.post('/users', this.userAddForm).then(res => {
            // console.log(res)
            const { meta } = res.data
            // 1. 关闭对话框
            // 2. 重置表单(只要关闭对话框，就会触发对话框的关闭事件来重置对话框)
            if (meta.status === 201) {
              this.userAddDialog = false
              // 3. 重新获取列表数据
              this.getUesrList()
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
  .user-breadcrumb {
    line-height: 40px;
    background-color: #D4DAE0;
    font-size: 18px;
    padding-left: 10px;
  }
</style>

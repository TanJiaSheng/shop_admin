<template>
  <el-container class="home-wrapper">
    <el-header>
      <el-row>
        <el-col :span="8" class="logo">
          <img src="@/assets/logo.png" alt="魔方">
        </el-col>
        <el-col :span="8">
          <h1 class="title">电商后台管理系统</h1>
        </el-col>
        <el-col :span="8">
          <div class="logout">
            <span>欢迎使用魔方电商管理系统</span>
            <a href="javascript:;" @click.prevent="logout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!--
          el-menu 表示菜单组件
            default-active 当前激活菜单的 index值
            @open 菜单展开事件
            @close 菜单收起事件
          el-sumenu 表示一组菜单
            index 是唯一的，不能重复
         -->
        <el-menu
          :router="true"
          default-active="1-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <!--
              template: 用来包裹一级菜单，内部指定菜单的图标和菜单名
              如果要给菜单添加小图标，应该使用 temnplate 来包裹整个内容
             -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <!-- 启用路由模式后，index就相当于 远离啊 router-link 中的to属性，用来指定导航的路径(哈希值) -->
            <!-- 可以使用/home/users 或者 home/users -->
            <el-menu-item index="home/users">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="2-1">用户列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 子路由出口 -->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    // 退出功能
    logout() {
      // 1. 弹出确认对话框
      // 2. 用户点击确认
      //    2.1 清除token
      //    2.2 跳转到登录页
      this.$confirm('你是否确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // 点击确认框
        .then(() => {
          // 清除token
          localStorage.removeItem('token')
          // 跳转登录页
          this.$router.push('/login')
        })
        // 点击取消
        // .catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   })
        // })
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="less">
.home-wrapper {
    height: 100%;
  .el-header {
    padding: 0;
    background-color: #cbd4dd;
    color: #333;
    text-align: center;
    .logo {
      text-align: left;
      img {
        height: 60px;
      }
    }
    .title {
      margin: 0;
      line-height: 60px;
      color: #fff;
      font-size: 36px;
    }
    .logout {
      line-height: 60px;
      font-weight: bold;
      text-align: right;
      padding-right: 30px;
      a {
        color: #b07a17;
        text-decoration: none;
      }
    }
  }
  .el-aside {
    background-color: #545c64;
    color: #333;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>

import Vue from 'vue'
import Router from 'vue-router'

// 导入 Login 组件，(注意，不要添加，vue 后缀)
import Login from '@/components/login/Login'
// 导入首页组件
import Home from '@/components/home/Home'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/home', component: Home },
    { path: '/login', component: Login }
  ]
})

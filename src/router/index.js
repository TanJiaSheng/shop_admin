import Vue from 'vue'
import Router from 'vue-router'

// 导入 Login 组件，(注意，不要添加，vue 后缀)
import Login from '@/components/login/Login'
// 导入首页组件
import Home from '@/components/home/Home'
// 导入用户列表组件
import Users from '@/components/users/users'
// 导入权限列表组件
import Rights from '@/components/rights/Rights'
// 导入角色管理列表组件
import Roles from '@/components/roles/Roles'

Vue.use(Router)

const router = new Router({
  routes: [
    // children 用来配置子路由，将来匹配的组件会展示在 Home 组件的router-view 中
    {
      path: '/home',
      component: Home,
      children: [
        { path: 'users', component: Users },
        { path: 'rights', component: Rights },
        { path: 'roles', component: Roles }
      ]
    },
    { path: '/login', component: Login }
  ]
})

// 全局导航守卫
// 所有的路由都会先走守卫
// 添加导航守卫之后，不管是防卫那个路由，都会执行beforeEach回调函数中的代码
// 因为所有的路由，都会经过该导航守卫，所哟，就可以在守卫函数的回调中判断有没有登录了
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // 如果访问的是login页面，直接放行，也就是任何人不管有没有登录
    // 都可以直接访问的登录页
    // 直接调用 next() 方法，表示：访问的是哪个页面，就展示这个页面的内容
    next()
  } else {
    // 访问的不是登录页面

    // 判断用户是否登录成功
    // 1. 当前用户登录成功，直接调用 next() 方法就行
    // 2. 当用户没有登录，应该调用 next('/login') 跳转到登录页，让用户登录

    // 通过登录成功时候保存的token，来作为有没有登录成功的条件
    const token = localStorage.getItem('token')
    if (token) {
      // 有，登录成功
      next()
    } else {
      // 没有，登录失败
      next('/login')
    }
  }
})
export default router

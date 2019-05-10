// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入全局样式
import '@/assets/index.css'

// 导入elementui - js
import ElementUI from 'element-ui'
// 导入elementui - css
import 'element-ui/lib/theme-chalk/index.css'
// 导入axios
import axios from 'axios'

// 配置公共路径
// 配置好公共路径后，每次使用费axios发送请求，只需要写当前接口的路径（比如：/users） 就可以了
// axios 在发送请求之前，会将 baseURL +'/users' 得到完整路径，才会发送请求
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

// 只要配置拦截器，那么所有的请求都会走拦截器
// 因此，可以在拦截器中统一处理 headers

// 请求拦截
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做一些事情
  // endWith 字符串的方法，用来判断是不是以参数结尾，如果是则返回 true
  if (!config.url.endsWith('/login')) {
    config.headers['Authorization'] = localStorage.getItem('token')
  }
  return config
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 在获取到响应数据的时候做一些事情
  if (response.data.meta.status === 401) {
    // 因为现在不是在组件中，也因此无法通过 this.$router 来访问到路由实例
    // 但是，可以直接通过上面都如的路由模块的 router （路由实例）来访问到路由对象
    router.push('/login')
    localStorage.removeItem('token')
  }
  return response
})

// 将 axios 添加到Vue的原型中
// 实例对象可以直接使用原型对象中的属性和方法
// 所有的组件都是Vue的实例
// 说明：只要是项 axios 这样的第三方符(与Vue没有任何关系)，都应该通过这种方式来统一导入
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

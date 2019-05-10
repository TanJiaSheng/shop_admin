# Vue 项目

- [项目地址 https://gitee.com/zqran/shop_admin_25](https://gitee.com/zqran/shop_admin_25)

## 项目功能

- 1 登录
- 2 首页
- 3 退出
- 4 用户管理
  - 4.1 列表展示
  - 4.2 分页
  - 4.3 查询
  - 4.4 启用/禁用用户
  - 4.5 添加用户
  - 4.6 编辑用户
  - 4.7 删除用户
- 5 权限管理

## 项目搭建

- 1 `vue init webpack shop_admin`

```html
Project name                            ：默认
Project description                     ：默认
Author                                  ：默认
Vue build                               ：选择 Runtime + Compiler
Install vue-router?                     ：Y
Use ESLint to lint your code?           ：Y 选择 Standard
Set up unit tests                       ：n
Setup e2e tests with Nightwatch?        : n
Should we run `npm install` for you after the project has been created? (recommended) : Yes, use NPM
```

- 2 进入项目：cd shop_admin
- 3 运行项目：npm run dev

- 将脚手架默认生成的内容去掉，然后，添加了一个 Login 组件

## 如何添加一个新的功能？？？

- 1 在 `components` 中新建一个文件夹（login），在文件中创建组件(Login.vue)
- 2 在 `router/index.js` 中导入组件（Login.vue）
- 3 配置路由规则

## 在项目中使用 element-ui

- [ElementUI 文档](http://element-cn.eleme.io/#/zh-CN/component/installation)
- 安装：`npm i element-ui -S`

```js
// main.js

// 导入elementui - js
import ElementUI from 'element-ui'
// 导入elementui - css
import 'element-ui/lib/theme-chalk/index.css'
// 安装插件
Vue.use(ElementUI)
```

---

## 项目启动做了什么

- 1 在终端中运行：`npm run dev`，实际上就是运行了：`webpack-dev-server ...`
- 2 使用 webpack-dev-server 开启一个服务器
- 3 根据指定的入口 `src/main.js` 开始分析入口中使用到的模块
- 4 当遇到 `import` 的时候，webpack 就会加载这些模块内容（如果有重复模块，比如：Vue，实际上将来只会加载一次），遇到代码就执行这些代码
- 5 创建 Vue 实例，将 App 组件作为模板进行编译，并且将 App 组件中 template 的内容渲染在页面 #app 的位置

## 登录功能

- 1 安装：`npm i -S axios`
- 2 在 `Login.vue` 组件中导入 axios
- 3 使用 axios 根据接口文档来发送请求，完成登录

## 编程式导航

- 就是通过 JS 代码来实现路由的跳转功能

```js
// 注意：是 router 不是 route
// router用来实现路由跳转，route用来获取路由参数
// push 方法的参数为：要跳转到的路由地址（path）
this.$router.push('/home')
```

## 密码

- 给输入框组件添加 type="password" 就变为密码框状态了

```html
<el-input type="password" v-model="loginForm.password"></el-input>
```

## 登录拦截

- 说明：在没有登录的情况不应该让用户来访问除登录以外的任何页面

### 登录和拦截的整个流程说明

- 1 在登录成功以后，将 token 存储到 localStorage 中
- 2 在 导航守卫 中先判断当前访问的页面是不是登录页面
- 3 如果是登录页面，直接放行（next()）
- 4 如果不是登录页面，就从 localStorage 中获取 token，判断有没有登录
- 5 如果登录了，直接放行（next()）
- 6 如果没有登录，就跳转到登录页面让用户登录（next('/login')）

## token 机制的说明

- 在项目中，如果登录成功了，那么，服务器会给我们返回一个 token
- 这个 token 就是登录成功的标识
- 这个 token 就相当于使用 cookie+session 机制中的 sessionid

## 公司人员和项目开发流程

- 1 产品经理定制项目的需求
- 2 分配任务：先将所有的任务分配到项目组，然后，再由项目组具体分配给每个开发人员
- 3 开发：拿到 产品原型 + 需求文档 + UI 设计稿 资料，转化为 HTML 页面，完成功能
- 4 功能完成后，自己测试有没有 Bug
- 5 由测试人员来测试你的功能，当测试出 Bug 后，就会通过 禅道 这样的项目管理系统，来提出 Bug
- 6 由 自己 修改 测试人员提出来的 bug
- 7 最终，没有 bug 了，项目才会上线

```html
产品经理（Product Manager）
  提需求
  产出： 产品原型 + 需求文档
  原型设计软件：Axure 、墨刀

UI（设计）
  将 产品经理 给的 原型图 设计为 好看的UI稿

FE（前端）front-end
  产品原型 + 需求文档 + UI设计稿 ===> HTML页面

BE（后端） back-end
  给前端提供数据接口

测试人员
  产品原型 + 需求文档 + UI设计稿 来测试我们写的功能
  发现你的功能 与 需求 不一致，那就说明除Bug了，那么，测试人员就会提Bug
  Bug系统： 禅道

项目经理（管理技术）
  技术攻坚，与其他项目组人员沟通，分配任务 等
```

## vue 单文件组件中的 scoped

- 作用：给 `style` 标签添加 `scoped` 属性以后，样式只会对当前组件中的结构生效，而不会影响到其他组件

## vue 单文件组件中的 lang

- 作用：添加 `lang="less"` 后，就可以使用 less 语法了
- 但是需要自己安装：`npm i -D less less-loader`

## VSCode 中使用 Vetur 插件格式化单文件组件的 template

- 打开设置，配置：`"vetur.format.defaultFormatter.html": "js-beautify-html"`

## 接口调用的说明

- 注意：**所有接口都需要传递 token，只有传递了正确的 token，服务器才会将数据返回给前端**
- 如果没有传递`token`，服务器会返回 `401` ，告诉接口调用者，没有权限来访问这个接口

---

## cookie+session VS token

- [干掉状态：从 session 到 token](https://github.com/zqran/blog/issues/2)

## Git 使用

- [远程分支](https://blog.csdn.net/u012701023/article/details/79222731)

```html
刚进入公司，一般都是先通过 git 将项目 clone 到本地：git clone

实现一些功能后，需要将本地写完的代码，提交到git服务器中：git push 仓库地址

每天去公司开发前，都会使用 git pull 仓库地址 来获取下最新的代码
```

```bash
# 克隆仓库
git clone [仓库地址]

# 推送
git push [仓库地址] master

# 简化推送地址
git remote add shop_admin [仓库地址]
git push -u shop_admin master
# 第一次执行上面两条命令，以后只需要输入以下命令即可
git push shop_admin

# 拉取
git pull [仓库地址] master
git pull shop_admin master
```

## 分页

- 当前页 curPage
- 每页大小 pageSize
- 总条数 total

```js
总页数 = Math.ceil(total / pageSize)
```

## 用户管理

### 启用或禁用用户

- 注意：如果用户状态是禁用状态，那么这个用户是无法登录的
- 新添加的用户是禁用的状态
- 注意：**不要将 admin 用户禁用！！！否则会导致无法操作**

### 添加用户

- [表单验证规则](https://github.com/yiminghe/async-validator)

### 打开添加用户对话框的步骤

- 1 给添加用户按钮绑定单击事件，事件中让控制对话框展示的数据为 true
- 2 在 dialog 对话框中添加一个 form 表单
  - form 表单的数据（userAddForm）
  - form 表单的验证规则（userAddRules），还要给每个表单项添加 prop
  - 等等
- 3 点击用户添加对话框中的确定按钮，进行表单验证（this.$refs.userAddForm.validate...）
- 4 点击取消按钮，重置表单（this.$refs.userAddForm.resetFields()）

### 打开编辑用户对话框的步骤

- 1 给表格中的编辑按钮添加单击事件，事件中完成两件事情：
  - 1.1 将控制对话框展示的数据设置为 true
  - 1.2 获取到当前用户数据，并展示在对话框中
- 2 在 dialog 对话框中添加一个 form 表单
  - 编辑用户表单数据 + 验证规则
- 3 点击编辑用户对话框中的确定按钮，进行表单验证
- 4 点击取消按钮，重置表单

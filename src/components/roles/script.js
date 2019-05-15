export default {
  data() {
    return {
      rolesList: [],
      // 编辑对话框的展示和隐藏
      dialogTableVisible: false,
      roleEditDialog: false,
      roleEditFrom: {
        id: -1,
        roleName: '',
        roleDesc: ''
      },
      formLabelWidth: '120px',

      // 分配权限对话框展示和隐藏
      rightsDialog: false,
      // 所有的权限(树形结构)
      allRights: [],
      defaultProps: {
        // children 用来指定使用那个属性来指定子节点
        children: 'children',
        // label 用来指定使用数据中的那个属性展示树形控件中的，每个节点
        label: 'authName'
      },
      // 当前分配权限的角色id
      curRoleId: -1
    }
  },

  created () {
    this.getRolesList()
    this.getAllRightsTree()
  },

  methods: {
    /**
     * 获取到所有的权限树形结构数据
     */
    async getAllRightsTree() {
      const res = await this.$http.get('rights/tree')
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.allRights = data
      }
    },
    // 获取角色管理列表
    async getRolesList() {
      const res = await this.$http.get('/roles')
      // console.log(res)
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.rolesList = data
      }
    },

    /**
     * 根据角色id删除角色
     * @param {number} id 需要删除的角色id
     */
    async delRole(id) {
      try {
        await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 点击确认按钮，执行以下代码
        // 发送请求，删除当前角色
        const res = await this.$http.delete(`roles/${id}`)
        const { meta } = res.data
        if (meta.status === 200) {
          const index = this.rolesList.findIndex(item => item.id === id)
          this.rolesList.splice(index, 1)
          this.$message({
            type: 'success',
            message: meta.msg
          })
        }
      } catch (err) {
        // 点击取消按钮，执行以下代码
        // 相当于处理 Promise 的 cathc()
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },

    /**
     * 展示对话框
     */
    showRoleEditDialog(curRole) {
      this.roleEditDialog = true

      // 获取当前角色的数据
      for (let key in this.roleEditFrom) {
        this.roleEditFrom[key] = curRole[key]
      }
    },

    /**
     * 编辑角色信息
     */
    async editRole() {
      const { id, roleName, roleDesc } = this.roleEditFrom

      const res = await this.$http.put(`roles/${id}/`, {
        roleName,
        roleDesc
      })
      const { data, meta } = res.data
      if (meta.status === 200) {
        // 关闭对话框
        this.roleEditDialog = false
        // 更新当前项数据
        const editRole = this.rolesList.find(item => item.id === id)
        editRole.roleName = data.roleName
        editRole.roleDesc = data.roleDesc
      }
    },

    /**
     * 删除指定角色的权限
     * @param {number} roleId 角色id
     * @param {number} rightId 权限id
     */
    async delRoleRightById(roleId, rightId) {
      const res = await this.$http.delete(`/roles/${roleId}/rights/${rightId}`)
      const { data, meta } = res.data
      if (meta.status === 200) {
        const curRole = this.rolesList.find(item => item.id === roleId)
        curRole.children = data
        this.$message({
          message: '删除权限成功！',
          type: 'success'
        })
      }
    },

    showRightsDialog(curRoleRights, id) {
      // 显示权限分配对话框
      this.rightsDialog = true
      // 暂存id
      this.curRoleId = id
      // 因为tree是包裹在 dialog 中的，而 dialog 一开始是隐藏的
      // 并且，dialog 隐藏的时候， Vue 是不会渲染这个 dialog 组件
      // 因此，无法直接通过 $refs 来获取tree

      // 如何获取？？？
      // 在 $nextTick 回调函数中，就可以获取到tree
      // 因为对话框通过: visible.sync="rightsDialog"(类似v-if) 来控制显示和隐藏，
      // 但是，Vue中DOM更新是异步的，所哟，不行等到DOM更新完成后，才能获取得到 tree
      // 当 nextTick 的回调函数执行的时候，DOM就已经更新完成
      this.$nextTick(() => {
        // 三级菜单id数组
        const level3Ids = []
        curRoleRights.forEach(level1 => {
          level1.children.forEach(level2 => {
            level2.children.forEach(level3 => {
              level3Ids.push(level3.id)
            })
          })
        })
        // 指定选中节点的id数组
        this.$refs.allRights.setCheckedKeys(level3Ids)
      })
    },

    /**
     * 给角色分配权限
     */
    async assignRights() {
      // 1.获取到当前角色选中的权限id数组
      const checkedKeys = this.$refs.allRights.getCheckedKeys()
      const halfCheckedKeys = this.$refs.allRights.getHalfCheckedKeys()
      const allCheckedIds = [...checkedKeys, ...halfCheckedKeys]
      const res = await this.$http.post(`roles/${this.curRoleId}/rights/`,
        { rids: allCheckedIds.join(',') })
      const { meta } = res.data
      if (meta.status === 200) {
        this.rightsDialog = false
        // 重新获取角色列表
        this.getRolesList()
        this.$message({
          message: meta.msg,
          type: 'success'
        })
      }
    }
  }
}

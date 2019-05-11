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
      formLabelWidth: '120px'
    }
  },

  created () {
    this.getRolesList()
  },

  methods: {
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
    }
  }
}

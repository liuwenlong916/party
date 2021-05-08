<template>
  <div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="1">
        <i class="el-icon-location" />
        <span slot="title">党员信息</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location" />
          <span>党员管理</span>
        </template>
        <el-menu-item index="2-1">
          申请人信息
        </el-menu-item>
        <el-menu-item index="2-2">
          积极分子信息
        </el-menu-item>
        <el-menu-item index="2-3">
          发展对象信息
        </el-menu-item>
        <el-menu-item index="2-4">
          预备党员信息
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location" />
          <span>配置功能</span>
        </template>
        <el-menu-item index="3-1">
          管理员维护
        </el-menu-item>
        <el-menu-item index="3-2">
          组织机构维护
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // isCollapse: this.$store.state.isCollapse
    }
  },
  computed: {
    isCollapse () {
      return this.$store.state.isCollapse
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
  }
  .el-menu-item, .el-submenu {
    width:200px;
  }
</style>

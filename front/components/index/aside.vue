<template>
  <div>
    <el-menu
      :collapse="$store.state.isCollapse"
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location" />
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">
            分组一
          </template>
          <el-menu-item index="1-1">
            选项1
          </el-menu-item>
          <el-menu-item index="1-2">
            选项2
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">
            选项3
          </el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">
            选项4
          </template>
          <el-menu-item index="1-4-1">
            选项1
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-menu" />
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="4" disabled>
        <i class="el-icon-document" />
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting" />
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: this.$store.state.isCollapse
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
    min-height: 400px;
  }
</style>

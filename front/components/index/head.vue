<template>
  <div class="header">
    <el-row>
      <el-col :span="16" style="text-align:left;">
        <span class="el-dropdown-link" @click="$store.commit('collapse')">党员管理系统</span>
      </el-col>
      <el-col :span="8">
        <el-dropdown>
          <span class="el-dropdown-link">
            系统管理员<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided>
              注销
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  }
}
</script>

<style>
  .header{
    height:60px;
    /* text-align:center; */
    line-height: 60px;
    background:#545c64;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #ffd04b;
    font-size: 18px;
  }
  .el-icon-arrow-down {
    font-size: 18px;
  }
</style>

<template>
  <div class="header">
    <el-row>
      <el-col :span="16" style="text-align:left;">
        <span class="el-dropdown-link" @click="$store.commit('collapse')">新华保险共产党员信息管理平台</span>
      </el-col>
      <el-col :span="8">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ username }}<i class="el-icon-arrow-down el-icon--right" />
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  computed: {
    ...mapState(['username'])
  },
  created () {
    // if (localStorage.getItem('username')) {
    //   this.$store.commit('setUsername', localStorage.getItem('username'))
    // } else {
    //   localStorage.setItem('username', this.username)
    // }
    localStorage.getItem('username')
      ? this.$store.commit('setUsername', localStorage.getItem('username'))
      : localStorage.setItem('username', this.username)
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
    padding:0px 20px;
  }
  .el-icon-arrow-down {
    font-size: 18px;
  }
</style>

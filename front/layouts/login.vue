<template>
  <div>
    <el-container>
      <el-header>
        <loginHead />
      </el-header>
      <el-main class="back">
        <Nuxt />
      </el-main>
      <el-footer>footer</el-footer>
    </el-container>
  </div>
</template>
<script>
import loginHead from '../components/login/head'
export default {
  components: {
    loginHead
  }
}
</script>
<style>
.back{
  background-image: url(/image/logoBg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  height:450px;
}
</style>

<template>
  <div>
    <el-container>
      <el-header style="height:90px;">
        <login-head />
      </el-header>
      <el-main class="back">
        <Nuxt />
      </el-main>
      <el-footer>
        <login-footer />
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import loginHead from '../components/login/head'
import loginFooter from '../components/login/foot'
export default {
  components: {
    loginHead,
    loginFooter
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

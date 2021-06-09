<template>
  <div>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <index-header />
      </el-header>
      <el-container>
        <el-aside style="width:auto;">
          <index-aside />
        </el-aside>
        <el-main>
          <Nuxt />
        </el-main>
      </el-container>
      <el-footer>
        <index-footer />
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import indexHeader from '../components/index/head'
import indexFooter from '../components/index/foot'
import indexAside from '../components/index/aside'

export default {
  components: {
    indexHeader,
    indexAside,
    indexFooter
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.el-header, .el-footer {
    background-color: white;
    color: #333;
    text-align: center;
    /* line-height: 90px; */
    height:90px;
    padding:0px;
  }

  .el-aside {
    background-color:#545c64;
    color: #333;
    /* text-align: center; */
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center;
    line-height: 160px; */
    height: 100%;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .container {
    margin: 0 auto;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    /* justify-content: center;
    align-items: center;
    text-align: center; */
  }
  .search{
    height: 80px;
    width: 100%;
  }
  .table{
    height: auto;
    width: 100%;
  }
  .left{
    text-align:left;
  }

  .center{
    text-align:center;
  }

  .right{
    text-align:right;
  }
</style>

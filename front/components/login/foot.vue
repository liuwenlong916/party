<template>
  <div class="page-login-footer">
    <div class="footer-content-right">
      <div class="options">
        <span>关于新锐在线</span>
        <span>新闻动态</span>
        <span>联系我们</span>
        <span>加入我们</span>
        <span>法律说明</span>
      </div>
      <div>
        <span class="copy-left">Copyright © 2015 北京新锐在线股份有限公司 All rights reserved.</span>
      </div>
    </div>
    <div class="footer-content-left">
      <span class="copy-right">京ICP备14028076号-1 京公网安备11010502023287号</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .page-login-footer {
    height: 100px;
    display: flex;
    justify-content: space-around;
  }
  .footer-content-right {
    margin-top: 46px;
    margin-bottom: 24px;
  }
  .options span {
    border-left: 1px solid #909090;
    display: inline-block;
    padding: 0 11px;
    font-size: 12px;
    line-height: 1;
  }
  .footer-content-left span{
    font-size: 12px;
    color: #595959;
    line-height: 100px;
  }
</style>

<template>
  <div class="container">
    <div class="search">
      <h2 class="center">
        {{ reportName }}
      </h2>
    </div>
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6" :offset="9">
          <p class="center">
            统计时间：{{ startInterval }}-{{ endInterval }}
          </p>
        </el-col>
        <el-col :span="6" :offset="3">
          <el-button @click="handleViewDetail">
            查看报表详情
          </el-button>
          <el-button>返回</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table :data="viewList" width="100%" row-key="resultId">
        <el-table-column prop="rowTitle" label="转入组织关系人数" align="center" />
        <el-table-column prop="rowTitle" label="转出组织关系人数" align="center" />
        <el-table-column prop="rowTitle" label="出党人数" align="center" />
        <el-table-column prop="rowTitle" label="停止党籍人数" align="center" />
        <el-table-column prop="rowTitle" label="收到组织关系介绍回执份数" align="center" />
        <el-table-column prop="rowTitle" label="死亡人数" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      reportId: '',
      reportName: '',
      startInterval: '',
      endInterval: '',
      viewList: []
    }
  },
  async mounted () {
    this.reportId = this.$route.query.reportId
    const res = await this.$http.get('/report/getInfo', { reportId: this.reportId })
    if (res.errCode >= 0) {
      this.startInterval = this.dateFormat(res.data.startInterval)
      this.endInterval = this.dateFormat(res.data.endInterval)
      this.reportName = res.data.reportName
    }
    // 获取所有分公司填报数据。
  },
  methods: {
    handleViewDetail () {
      this.$router.push(`/report/viewOrgsDetail/${this.reportId}`)
    },
    dateFormat (date) {
      if (date) {
        date = new Date(date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return [year, month, day].join('-')
      }
      return date
    }
  }
}
</script>

<style scoped>

</style>

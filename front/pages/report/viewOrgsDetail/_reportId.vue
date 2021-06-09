<template>
  <div class="container">
    <div class="search">
      <el-row>
        <el-col :span="4" :offset="20">
          <el-button @click="$router.go(-1)">
            返回
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="OrgList" row-key="orgId" border>
        <el-table-column label="公司" prop="orgName" align="center" />
        <el-table-column label="填报人" prop="modifie" align="center" />
        <el-table-column label="填报进度" prop="statusType" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row.orgId)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.reportId)
  },
  data () {
    return {
      reportId: '',
      OrgList: []

    }
  },
  async mounted () {
    this.reportId = this.$route.params.reportId
    const res = await this.$http.get('/report/getOrgList', { reportId: this.reportId })
    console.log(res)
    if (res.errCode >= 0) {
      this.OrgList = res.data
    }
  },
  methods: {
    handleView () {

    }
  }
}
</script>

<style>

</style>

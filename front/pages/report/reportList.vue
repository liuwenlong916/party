<template>
  <div class="container">
    <div class="search">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline left">
        <el-form-item label="报表类型">
          <el-select v-model="searchForm.typeId" placeholder="请选择">
            <template v-for="type in typeList">
              <el-option :key="type.typeId" :value="type.typeId" :label="type.typeName" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.year" placeholder="请选择">
            <template v-for="(year,index) in yearList">
              <el-option :key="index" :label="year.year" :value="year.year" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="search">
      <el-row class="left">
        <el-button type="success" @click="handleAdd">
          添加
        </el-button>
        <el-button type="primary" @click="handleEdit">
          修改
        </el-button>
        <el-button type="danger" @click="handleDelete">
          删除
        </el-button>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="reportList" width="100%" border row-key="reportId" @selection-change="handleSelectionChange">
        <el-table-column type="index" width="55" align="center" />
        <el-table-column type="selection" prop="reportId" width="55" align="center" />
        <el-table-column prop="year" label="年度" width="100" align="center" />
        <el-table-column prop="typeName" label="报表类型" width="180" align="center" />
        <el-table-column prop="reportName" label="报表名称" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleViewReport(scope.row)">
              {{ scope.row.reportName }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="startEdit" label="开始时间" width="150" align="center" :formatter="dateFormat" />
        <el-table-column prop="endEdit" label="结束时间" width="150" align="center" :formatter="dateFormat" />
        <el-table-column prop="stateDesc" label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.row.state !== 0" @click="handleStart(scope.row)">
              {{ scope.row.stateDesc }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="reportId" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.row.state !== 1" @click="handleEnd(scope.row)">
              结束
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <edit-form ref="editForm" @updateTable="handleSearch" />
  </div>
</template>

<script>
import editForm from '../../components/report/editDialog'
export default {
  components: {
    editForm
  },
  data () {
    return {
      searchForm: {
        typeId: '',
        year: ''
      },
      reportList: [],
      typeList: [],
      yearList: [],
      checkedList: []
    }
  },
  computed: {
    currYear () {
      return new Date().getFullYear()
    }
  },
  mounted () {
    this.getYears()
    this.getTypeList()
    this.searchForm.year = this.currYear
    this.getReportList()
  },
  methods: {
    handleSearch () {
      this.getReportList()
    },
    handleAdd () {
      this.$refs.editForm.showDialog({ typeList: this.typeList })
    },
    handleEdit () {
      if (this.checkedList.length !== 1) {
        this.$alert('请选择所需修改的报表，只单选！', '提示', {
          type: 'warning'
        }).then(() => {})
        return
      }
      const reportId = this.checkedList[0].reportId
      this.$refs.editForm.showDialog({ typeList: this.typeList, reportId })
    },
    handleDelete () {
      if (this.checkedList.length < 0) {
        this.$alert('请选择要删除的记录！', '提示', {
          type: 'warning'
        }).then(() => {})
        return
      }
      const end = this.checkedList.filter(item => item.state === 2)
      if (end.length > 0) {
        this.$alert('已结束状态的报表不能删除！', '提示', {
          type: 'warning'
        }).then(() => {})
        return
      }
      this.$confirm('删除后将无法恢复，请您确认是否要继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warnging'
      }).then(async () => {
        const reportIds = this.checkedList.map(item => item.reportId)
        const res = await this.$http.post('/report/deleteByIds', { reportIds: reportIds.join(',') })
        if (res.errCode >= 0) {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        }
        console.log(res)
        this.getReportList()
      }).catch(() => {})
    },
    handleSelectionChange (val) {
      this.checkedList = val
    },
    handleViewReport ({ reportId, reportName }) {
      // 跳转查看页面
      // this.$router.push({ path: `/report/viewOrgsDetail/${reportId}` })
      // params需要 name跳转 params: { reportId, reportName }
      this.$router.push({ path: '/report/view', query: { reportId } })
    },
    handleStart ({ reportId, reportName }) {
      // 开始报表
      this.$confirm(`确认开始${reportName}报表？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(async () => {
        const res = await this.$http.post('/report/updateState', { reportId, state: 1 })
        this.getReportList()
        console.log(res)
      }).catch(() => {})
    },
    handleEnd ({ reportId }) {
      // 结束报表
      this.$confirm('请确认是否结束当前报表，结束后不能再进行填报！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.post('/report/updateState', { reportId, state: 2 })
        this.getReportList()
        console.log(res)
      }).catch(() => {})
    },
    async getTypeList () {
      const res = await this.$http.get('/reportType/list')
      if (res.errCode >= 0) {
        this.typeList = res.data
      }
    },
    async getYears () {
      const res = await this.$http.get('/report/getYears')
      if (res.errCode >= 0) {
        this.yearList = res.data
      }
      if (this.yearList.length === 0) {
        this.yearList.push({
          year: this.currYear
        })
      }
      this.searchForm.year = this.currYear
    },
    async getReportList () {
      const res = await this.$http.get('/report/list', this.searchForm)
      if (res.errCode >= 0) {
        this.reportList = res.data
      }
    },
    dateFormat (row, column) {
      let date = row[column.property]
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

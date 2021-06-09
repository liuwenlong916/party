<template>
  <div class="container">
    <div class="search">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline left">
        <el-form-item label="姓名：">
          <el-input
            v-model="searchForm.appName"
            placeholder="姓名"
            style="width:120px;"
          />
        </el-form-item>
        <el-form-item label="申请入党日期：">
          <el-date-picker
            v-model="searchForm.applyDateBegin"
            type="date"
            placeholder="请选择"
            style="width:150px;"
          />
          -
          <el-date-picker
            v-model="searchForm.applyDateEnd"
            type="date"
            placeholder="请选择"
            style="width:150px;"
          />
        </el-form-item>
        <el-form-item label="入党成熟度：">
          <el-select
            v-model="searchForm.maturityType"
            placeholder="请选择"
            style="width:150px"
          >
            <el-option
              v-for="item in types"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
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
          <i class="el-icon-plus" />
          添加
        </el-button>
        <el-button type="danger" @click="handleDelete">
          <i class="el-icon-delete" />
          删除
        </el-button>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="appList" width="100%" border row-key="appId" @selection-change="handleSelectionChange">
        <el-table-column type="index" width="55" align="center" />
        <el-table-column prop="appId" type="selection" width="55" align="center" />
        <el-table-column prop="appName" label="姓名" width="150" align="center" />
        <el-table-column prop="appSexDesc" label="性别" width="100" align="center" />
        <el-table-column prop="applyDate" label="申请入党日期" width="150" align="center" />
        <el-table-column prop="maturityName" label="入党成熟度" width="100" align="center" />
        <el-table-column prop="societypName" label="党委" align="center" />
        <el-table-column prop="societyName" label="党支部" align="center" />
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click.native.prevent="handleEdit(scope.row)">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block left">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="prev, pager, next, jumper, total, sizes"
          :total="pageCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <editDialog ref="editDialog" @updateTable="handleSearch" />
  </div>
</template>

<script>
import editDialog from '../../components/applicant/editDialog'
export default {
  components: {
    editDialog
  },
  data () {
    return {
      tableData: null,
      currentPage: 1,
      pageSize: 20,
      searchForm: {
        appName: null,
        applyDateStart: null,
        applyDateEnd: null,
        maturityType: null
      },
      types: [
        { value: '1', label: '申请人' },
        { value: '2', label: '积极分子' },
        { value: '3', label: '发展对象' },
        { value: '4', label: '预备党员' }
      ],
      appList: [],
      pageCount: 1,
      checkedList: []
    }
  },
  mounted () {
    this.handleSearch()
  },
  methods: {
    async handleSearch () {
      const obj = Object.assign(this.searchForm, { currentPage: this.currentPage, pageSize: this.pageSize })
      const res = await this.$http.get('applicants/queryPageList', obj)
      this.appList = res.data.data
      this.pageCount = res.data.pageCount
    },
    handleAdd () {
      this.$refs.editDialog.showDialog()
    },
    handleEdit ({ appId }) {
      this.$refs.editDialog.showDialog(appId)
    },
    handleDelete () {
      const appId = []
      this.checkedList.forEach((item) => {
        appId.push(item.appId)
      })
      if (appId.length === 0) {
        this.$alert('请选择需要操作的数据!', '提示', {
          type: 'warn',
          confirmButtonText: '确定'
        })
        return
      }
      this.$confirm('删除后将无法恢复，请您确认是否要继续？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.post('applicants/deleteById', { appIds: appId.join(',') })
        console.log(res)
        if (res.data > 0) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.handleSearch()
        }
      }).catch(() => {
        console.log('取消')
      })
    },
    handleCurrentChange () {},
    handleSizeChange () {},
    handleSelectionChange (val) {
      this.checkedList = val
    }

  }
}
</script>

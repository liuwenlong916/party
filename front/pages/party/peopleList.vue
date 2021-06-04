<template>
  <div class="container">
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline left">
        <el-form-item label="姓名：">
          <el-input v-model="formInline.name" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="formInline.card" placeholder="身份证号" />
        </el-form-item>
        <el-form-item label="党组织：">
          <el-input v-model="formInline.card" placeholder="党组织" :disabled="true" style="width:80%" />
          <el-link type="primary" :underline="false" @click.prevent="openSocList">
            选择
          </el-link>
          <!-- <el-select v-model="formInline.socNo" placeholder="党组织">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="search">
      <el-row class="left">
        <el-button type="success">
          <i class="el-icon-plus" />
          添加
        </el-button>
        <el-button type="danger">
          <i class="el-icon-delete" />
          删除
        </el-button>
        <el-button type="primary">
          <i class="el-icon-upload2" />
          导入
        </el-button>
        <el-button type="primary">
          <i class="el-icon-download" />
          导出
        </el-button>
      </el-row>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
      </el-table>
      <div class="block left">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[20, 50]"
          :page-size="20"
          layout="prev, pager, next, jumper, total, sizes"
          :total="100"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage4: 4,
      formInline: {
        name: '',
        card: '',
        socNo: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mounted () {
    this.handleSearch()
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    async handleSearch () {
      // const obj = Object.assign(this.searchForm, { currentPage: this.currentPage, pageSize: this.pageSize })
      const res = await this.$http.get('partyinfo/queryPageList', { currentPage: 1, pageSize: 20 })
      console.log(res)
    }
  }
}
</script>

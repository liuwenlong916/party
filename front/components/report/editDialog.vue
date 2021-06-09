<template>
  <div>
    <el-dialog :title="title" :visible.sync="show" left @close="handleClose">
      <el-form
        ref="editForm"
        :model="report"
        :rules="rules"
        class="demo-ruleForm"
        :label-width="formLabelWidth"
      >
        <el-form-item label="年度：" prop="year" label-position="right" style="text-align: left;">
          <el-select v-model="report.year" placeholder="请选择">
            <template v-for="year in years">
              <el-option :key="year" :label="year" :value="year" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="报表类型：" prop="typeId" style="text-align: left;">
          <el-select v-model="report.typeId" placeholder="请选择">
            <template v-for="type in typeList">
              <el-option :key="type.typeId" :label="type.typeName" :value="type.typeId" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="填报截至日期：" prop="deadline" style="text-align: left;">
          <el-date-picker v-model="report.deadline" type="date" placeholder="请选择" />
        </el-form-item>
        <el-form-item label="报表名称：" prop="reportName" style="text-align: left;">
          <el-input v-model="report.reportName" autocomplete="off" style="width:100%;" />
        </el-form-item>
        <el-form-item v-show="isInterval" label="统计时间：" style="text-align: left;" required>
          <el-col :span="11">
            <el-form-item prop="startInterval">
              <el-date-picker v-model="report.startInterval" placeholder="请选择" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" align="middle">
            -
          </el-col>
          <el-col :span="11">
            <el-form-item prop="endInterval">
              <el-date-picker v-model="report.endInterval" placeholder="请选择" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item v-show="!isInterval" label="截至时间：" prop="endInterval1" style="text-align: left;">
          <el-date-picker v-model="report.endInterval" type="date" placeholder="请选择" />
        </el-form-item>

        <el-form-item label="填报说明：" prop="description" style="text-align: left; ">
          <el-input v-model="report.description" type="textarea" rows="6" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">
          取 消
        </el-button>
        <el-button type="primary" @click="handleSave">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reportId: null,
      formLabelWidth: '120px',
      show: false,
      isInterval: true,
      b: true,
      title: '添加',
      report: {},
      typeList: [],
      rules: {
        typeId: [{ required: true, message: '报表类型不能为空', trigger: 'blur' }],
        deadline: [{ required: true, message: '填报截止日期不能为空', trigger: 'blur' }],
        reportName: [{ required: true, message: '报表名称不能为空', trigger: 'blur' }, { max: 30, message: '最多录入30字' }],
        endInterval1: [{ required: true, message: '截止日期不能为空', trigger: 'blur' }],
        startInterval: [{ required: true, message: '统计时间不能为空', trigger: 'blur' }],
        endInterval: [{ required: true, message: '统计时间不能为空', trigger: 'blur' }],
        description: [
          { required: true, message: '描述不能为空', trigger: 'blur' },
          { max: 500, message: '最多录入500字' }]
      }
    }
  },
  computed: {

    currYear () {
      return new Date().getFullYear()
    },
    years () {
      let currYear = this.currYear
      // TODO: 修改五年之前报表时处理
      const years = new Array(5)
      for (let i = 4; i >= 0; i--) {
        years[i] = currYear--
      }
      return years
    }
  },
  watch: {
    'report.typeId' (newValue) {
      const arr = [10, 11, 12, 13]
      this.isInterval = !(arr.includes(newValue))
    }
  },
  mounted () {
    // todo get desc
    this.report = {
      reportId: '',
      year: this.currYear,
      reportName: '',
      typeId: '',
      deadline: '',
      startInterval: '',
      endInterval: '',
      description: ''
    }
  },
  methods: {
    async handleSave () {
      let saveUrl = '/report/create'
      if (this.reportId) {
        saveUrl = '/report/update'
      }
      const res = await this.$http.post(saveUrl, this.report)
      if (res.errCode >= 0) {
        this.$message({
          type: 'success',
          message: '保存成功！'
        })
        this.$emit('updateTable')
        this.show = false
      }
    },
    handleClose () {
      this.$refs.editForm.resetFields()
    },
    showDialog ({ typeList, reportId }) {
      this.typeList = typeList
      this.show = true

      if (reportId) {
        this.getReportInfo(reportId)
        this.reportId = reportId
      }
    },
    async getReportInfo (reportId) {
      const res = await this.$http.get('/report/getInfo', { reportId })
      if (res.errCode >= 0) {
        Object.keys(this.report).forEach((prop) => {
          res.data[prop] && (this.report[prop] = res.data[prop])
        })
      }
    }
  }
}
</script>

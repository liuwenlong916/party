<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="show"
      width="60%"
      @close="handleClose"
    >
      <el-form
        ref="editForm"
        :model="app"
        style="display:flex"
        :label-width="formLabelWidth"
        :rules="rules"
        class="demo-ruleForm"
      >
        <div style="flex:1">
          <el-form-item label="姓名" prop="appName">
            <el-input v-model="app.appName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="身份证号" prop="appCard">
            <el-input v-model="app.appCard" autocomplete="off" :disabled="cardDisable" />
          </el-form-item>
          <el-form-item label="民族" prop="appNationality">
            <el-select v-model="app.appNationality" placeholder="请选择">
              <el-option label="汉族" :value="1" />
              <el-option label="少数民族" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="app.appId" label="入党成熟度" prop="maturityType">
            <el-select v-model="app.maturityType" placeholder="请选择">
              <template v-for="item in matList">
                <el-option :key="item.value" :label="item.label" :value="item.value" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="入党申请日期" prop="applyDate">
            <el-date-picker v-model="app.applyDate" placeholder="选择日期" type="date" />
          </el-form-item>
          <!--maturityType 显示隐藏日期-->
          <el-form-item v-show="app.maturityType > 1" label="列为入积极分子日期" prop="actDate">
            <el-date-picker v-model="app.actDate" placeholder="选择日期" type="date" />
          </el-form-item>
          <el-form-item v-show="app.maturityType > 2" label="列为发展对象日期" prop="devDate">
            <el-date-picker v-model="app.devDate" placeholder="选择日期" type="date" />
          </el-form-item>
          <el-form-item v-show="app.maturityType > 3" label="列为预备党员日期" prop="probatDate">
            <el-date-picker v-model="app.probatDate" placeholder="选择日期" type="date" />
          </el-form-item>
        </div>
        <div style="flex:1">
          <el-form-item label="性别" prop="appSexDesc">
            <el-input v-model="app.appSexDesc" autocomplete="off" :disabled="true" />
          </el-form-item>
          <el-form-item label="出生日期" prop="appBirthday">
            <el-input v-model="app.appBirthday" autocomplete="off" :disabled="true" />
          </el-form-item>
          <el-form-item label="学历" prop="appEducation">
            <el-select v-model="app.appEducation" placeholder="请选择">
              <template v-for="item in eduList">
                <el-option :key="item.value" :label="item.label" :value="item.value" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="工作岗位" prop="appJobPosition">
            <el-select v-model="app.appJobPosition" placeholder="请选择">
              <template v-for="item in jobPosList">
                <el-option :key="item.value" :label="item.label" :value="item.value" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="所属机构" prop="appMechanism">
            <el-select v-model="app.appMechanism" placeholder="请选择">
              <template v-for="item in mechList">
                <el-option :key="item.value" :label="item.label" :value="item.value" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="所在公司" prop="orgId">
            <el-select v-model="app.orgId" placeholder="请选择" @change="handleChangeOrg">
              <template v-for="item in orgList">
                <el-option :key="item.orgId" :label="item.orgName" :value="item.orgId" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="所在党支部" prop="societyNo">
            <el-select v-model="app.societyNo" placeholder="请选择">
              <template v-for="item in societyList">
                <el-option :key="item.socNo" :label="item.socName" :value="item.socNo" />
              </template>
            </el-select>
          </el-form-item>
        </div>
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
      show: false,
      cardDisable: false,
      title: '修改申请人信息',
      app: {},
      formLabelWidth: '170px',
      rules: {
        appName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { max: 10, message: '最多录入10字' }
        ],
        appCard: [
          { required: true, message: '请填写证件号码', trigger: 'blur' },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '请输入正确的身份证号码!',
            trigger: 'blur'
          }
        ],
        appNationality: [{ required: true, message: '民族不能为空', trigger: 'change' }],
        appEducation: [{ required: true, message: '学历不能为空', trigger: 'change' }],
        applyDate: [{ required: true, message: '入党日期不能为空', trigger: 'blur' }],
        devDate: [{ required: true, message: '列为发展对象日期不能为空', trigger: 'blur' }],
        probatDate: [{ required: true, message: '列为预备党员日期不能为空', trigger: 'blur' }],
        confirmDate: [{ required: true, message: '转正日期不能为空', trigger: 'blur' }],
        actDate: [{ required: true, message: '列为入党积极分子日期不能为空', trigger: 'blur' }],
        appMechanism: [{ required: true, message: '所选机构不能为空', trigger: 'change' }],
        maturityType: [{ required: true, message: '入党成熟度不能为空', trigger: 'change' }],
        appJobPosition: [{ required: true, message: '工作岗位不能为空', trigger: 'change' }],
        partyType: [{ required: true, message: '人员类别不能为空', trigger: 'change' }],
        orgId: [{ required: true, message: '所在公司不能为空', trigger: 'change' }],
        societyNo: [{ required: true, message: '所在党支部不能为空', trigger: 'change' }]
      },
      matList: [
        { value: 1, label: '申请人' },
        { value: 2, label: '发展对象' },
        { value: 3, label: '积极分子' },
        { value: 4, label: '预备党员' }
      ],
      eduList: [
        { value: 1, label: '研究生' },
        { value: 2, label: '大学本科' },
        { value: 3, label: '大学专科' },
        { value: 4, label: '中专' },
        { value: 5, label: '高中、中技' },
        { value: 6, label: '初中及以下' }
      ],
      jobPosList: [
        { value: 1, label: '公有制单位企业管理人员' },
        { value: 2, label: '公有制单位企事业专业技术人员' },
        { value: 3, label: '工勤技能人员' },
        { value: 4, label: '离退休人员' },
        { value: 5, label: '其他' }
      ],
      mechList: [
        { value: 1, label: '本部' },
        { value: 2, label: '中支及营业部' },
        { value: 3, label: '子公司' }
      ],
      orgList: [],
      societyList: []
    }
  },
  watch: {
    'app.appCard' (newValue) {
      if (!newValue || newValue.length !== 18) {
        this.app.appSex = ''
        this.app.appSexDesc = ''
        this.app.appBirthday = ''
        return
      }
      const sex = newValue.substring(16, 17)
      this.app.appSex = sex % 2 === 0 ? '1' : '0'
      this.app.appSexDesc = sex % 2 === 0 ? '女' : '男'

      const year = newValue.substring(6, 10)
      const mounth = newValue.substring(10, 12)
      const day = newValue.substring(12, 14)
      this.app.appBirthday = year + '-' + mounth + '-' + day
    }
  },
  mounted () {
    this.getOrgList()
    this.app = {
      appId: '',
      appName: '',
      appSexDesc: '',
      appSex: '',
      appCard: '',
      appBirthday: '',
      appEducation: '',
      appNationality: '',
      appJobPosition: '',
      orgId: '',
      appMechanism: '',
      maturityType: '1',
      societyNo: '',
      applyDate: '',
      actDate: '',
      devDate: '',
      probatDate: ''
    }
  },
  methods: {
    handleClose () {
      console.log('close')
      // TODO清空无效
      this.$refs.editForm.resetFields()
      // this.app = {}
      this.societyList = []
      this.cardDisable = false
      this.app.appId = ''
    },
    handleChangeOrg () {
      this.getSocietyList(this.app.orgId)
    },
    async handleSave () {
      let saveUrl = '/applicants/insert'
      if (this.app.appId) {
        saveUrl = 'applicants/update'
      }
      const res = await this.$http.post(saveUrl, this.app)
      if (res.errCode === 0) {
        this.show = false
        this.$message({
          type: 'success',
          message: res.errMsg
        })
        this.$emit('updateTable')
      } else {
        this.$alert({
          type: 'warning',
          message: res.errMsg
        })
      }
    },
    loadingShow () {
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      return loading
    },
    async showDialog (appId = null) {
      const loading = this.loadingShow()
      if (appId) {
        await this.getAppInfo(appId)
        await this.getSocietyList(this.app.orgId)
      }

      this.show = true
      loading.close()
    },
    async getAppInfo (appId) {
      const res = await this.$http.get('/applicants/getInfo', { appId })
      const data = res.data.data[0]
      data && (this.cardDisable = true)
      // this.app = data
      Object.keys(this.app).forEach((prop) => {
        data[prop] && (this.app[prop] = data[prop])
        if (prop === 'appSexDesc') {
          this.app[prop] = data.appSex === 0 ? '女' : '男'
        }
      })
    },
    async getOrgList () {
      const res = await this.$http.get('/org/getOrgList')
      this.orgList = res.data
    },
    // http://{}/api/wtdf/json/dy/society/gettreedatabyparentid
    async getSocietyList (orgId) {
      const res = await this.$http.get('/society/gettreedatabyparentid', { parentId: 0, orgId })
      this.societyList = res.data
    }
  }
}
</script>

<style scoped>

</style>

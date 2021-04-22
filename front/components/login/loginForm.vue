<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="16">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="0px"
          class="demo-ruleForm"
          style="background:white;padding:20px;width:300px;"
        >
          <el-form-item prop="pass">
            <el-input
              v-model="input4"
              placeholder="请输入账号"
            >
              <i
                slot="prefix"
                class="el-input__icon el-icon-user"
              />
            </el-input>
          </el-form-item>

          <el-form-item prop="checkPass">
            <el-input
              v-model="ruleForm.checkPass"
              type="password"
              autocomplete="off"
              placeholder="请输入密码"
            >
              <i
                slot="prefix"
                class="el-input__icon el-icon-lock"
              />
            </el-input>
          </el-form-item>
          <el-form-item style="text-align:left; height:10px;">
            <el-form-label>忘记密码?</el-form-label>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%" @click="submitForm('ruleForm')">
              登陆
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>

export default {
  data () {
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else if (value < 18) {
          callback(new Error('必须年满18岁'))
        } else {
          callback()
        }
      }, 1000)
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
        //   console.log('error submit!!')
          return false
        }
      })
    }
  }

}
</script>

<style>
.NuxtLogo {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>

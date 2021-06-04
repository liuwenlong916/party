<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="16">
        <el-form
          ref="form"
          :model="form"
          status-icon
          :rules="rules"
          label-width="0px"
          class="demo-form"
          style="background:white;padding:20px;width:300px;"
        >
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入账号"
            >
              <i
                slot="prefix"
                class="el-input__icon el-icon-user"
              />
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <!-- <div class="captcha">
              <img :src="code.captcha" @click="resetCaptcha">
            </div> -->
            <el-input v-model="form.password" type="password" placeholder="请输入密码">
              <i
                slot="prefix"
                class="el-input__icon el-icon-lock"
              />
            </el-input>
          </el-form-item>
          <!-- <el-form-item style="text-align:left; height:10px;">
            <label>忘记密码?</label>
          </el-form-item> -->
          <el-form-item>
            <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" style="width:100%" @click="submitForm('form')">
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
    return {
      fullscreenLoading: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }// validator校验方法
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
      // code: {
      //   captcha: '/api/captcha'
      // }
    }
  },
  methods: {
    // resetCaptcha () {
    //   this.code.captcha = '/api/captcha?_t' + new Date().getTime()
    // },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          console.log('error submit!!', valid)
          return false
        }
        this.fullscreenLoading = true
        // alert('submit!')
        const obj = {
          username: this.form.username,
          password: this.form.password
        }
        const ret = await this.$http.post('/user/login', obj)
        if (ret.errCode === 0) {
          localStorage.setItem('token', ret.data.token)
          this.$store.commit('setUsername', ret.data.userName)
          this.$router.push('/')
          // this.fullscreenLoading = false
        } else {
          this.fullscreenLoading = false
          this.$message({
            showClose: true,
            message: ret.errMsg,
            type: 'error'
          })
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
.el-input--prefix span{
  padding:0px;
}
</style>

import Vue from 'vue'
import axios from 'axios'
import { MessageBox } from 'element-ui'

const service = axios.create({
  baseURL: '/api'
})
const TOKEN_KEY = 'token'

export default ({ store, redirect }) => {
  // 请求拦截
  // token管理
  service.interceptors.request.use(
    (config) => {
      const token = window.localStorage.getItem(TOKEN_KEY)
      if (token) {
        config.headers.common.Authorization = 'Bearer ' + token
      }
      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )
  // 相应拦截
  service.interceptors.response.use((response) => {
    const { data } = response
    if (data.code === '-2') {
      MessageBox.confirm('登陆过期了', '登陆', {
        confirmButtonText: '登陆',
        showCancelButton: true,
        type: 'warning'
      }).then(() => {
        localStorage.removeItem(TOKEN_KEY)
        redirect({ path: 'login' })
      })
    }
    return data
  })
}

Vue.prototype.$http = service
export const http = service

import Vue from 'vue'
import axios from 'axios'
import { MessageBox } from 'element-ui'
import qs from 'qs'

const service = axios.create({
  baseURL: '/api/wtdf/json/dy/'
})
const TOKEN_KEY = 'token'

export default ({ store, redirect }) => {
  // 请求拦截
  // token管理
  service.interceptors.request.use(
    (config) => {
      const token = window.localStorage.getItem(TOKEN_KEY)
      if (token) {
        // config.headers.common.Authorization = 'Bearer ' + token
        config.headers.accessToken = token
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
    if (data.errCode === -4) {
      MessageBox.confirm('未登陆', '登陆', {
        confirmButtonText: '登陆',
        showCancelButton: true,
        type: 'warning'
      }).then(() => {
        localStorage.removeItem(TOKEN_KEY)
        redirect({ path: '/login' })
      })
    }
    return data
  })
}

// 重写post
const _post = service.post
service.post = function (url, params) {
  return _post(url, qs.stringify(params))
}
// 重写get
const _get = service.get
service.get = function (url, params = {}) {
  // return _get(url, qs.stringify(params))
  return _get(url, { params })
}

Vue.prototype.$http = service
export const http = service

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = () => new Vuex.Store({
  state: {
    isCollapse: false,
    username: ''
  },
  mutations: {
    collapse (state) {
      state.isCollapse = !state.isCollapse
    },
    setUsername (state, payload) {
      state.username = payload
    }
  }
})

export default store

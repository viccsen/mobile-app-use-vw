import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import auth from './auth'
import house from './house'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    router,
    auth,
    house
  }
})

export default store

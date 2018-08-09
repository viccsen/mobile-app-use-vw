import AuthCache from '../cache/auth'
import { AuthCheck, AuthCallback } from '../services/auth'

export default {
  namespaced: true,
  state: {
    ...AuthCache()
  },
  getters: {
    auditStatus: state => {
      let result = state.result || {}
      return result.status || 0
    }
  },
  mutations: {
    fetchTokenSuccess (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
      AuthCache(state)
    }
  },
  actions: {
    check ({commit, dispatch}, {redirect_uri}) {
      const auth = AuthCache()
      if (auth && auth.result && auth.result.sc_tk) {
        return Promise.resolve(auth)
      } else {
        return AuthCheck({redirect_uri: redirect_uri || window.location.href}).then(data => {
          console.log('data', data)
          const { result = {} } = data || {}
          if (result.code === 301) {
            window.location.href = result.url
            return Promise.reject()
          } else {
            commit({type: 'fetchTokenSuccess', ...result})
          }
        })
      }
    },
    token ({commit}, {code, state}) {
      // const auth = AuthCache()
      // if (auth && auth.cp) {
      //   return Promise.resolve(auth)
      // } else {

      // }

      return AuthCallback({code, state}).then(data => {
        commit({type: 'fetchTokenSuccess', ...data})
        // 去除code与state,防止用户刷新页面后继续调用
        if (window.history.replaceState) {
          window.history.replaceState({}, '', window.location.pathname + window.location.hash)
        } else {
          window.location.href = window.location.pathname + window.location.hash
        }
      })
    }
  }
}

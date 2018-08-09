import Vue from 'vue'
import QueryString from 'qs'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '房产信息'
      },
      component: function (resolve) {
        require(['../pages/Home.vue'], resolve)
      },
      children: [
        {
          path: '',
          name: 'infos',
          meta: {
            title: '房产信息'
          },
          component: resolve => require(['../pages/Infos.vue'], resolve)
        },
        {
          path: '/about',
          name: 'about',
          meta: {
            title: '关于我们'
          },
          component: resolve => require(['../pages/About.vue'], resolve)
        },
      ]
    },
    {
      path: '/unauthenticated',
      name: 'unauthenticated',
      meta: {
        title: '未授权'
      },
      component: function (resolve) {
        require(['../pages/Unauthenticated.vue'], resolve)
      }
    },
    {
      path: '/house-detail/:id',
      name: 'houseDetail',
      meta: {
        title: '详情'
      },
      component: function (resolve) {
        require(['../pages/HouseDetail.vue'], resolve)
      }
    }
  ]
})

// let updateLoadingStatusSid

router.beforeEach((to, from, next) => {
  // updateLoadingStatusSid = setTimeout(() => {
  //   store.commit('router/updateLoadingStatus', { isLoading: true })
  //   updateLoadingStatusSid = null
  //   console.log('beforeEach')
  // }, 100)
    // const redirect_uri = location.protocol + '//' + location.host + location.pathname + '#' + to.path
    const query = QueryString.parse(location.search, { ignoreQueryPrefix: true })
    const {code, state} = query
    if (!code && !state) {
      const redirect_uri = location.protocol + '//' + location.host + (location.port ? ':' + location.port : '') + location.pathname + '#' + to.path
      store.dispatch({type: 'auth/check', redirect_uri}).then(() => {
        next()
      })
    }
})

router.afterEach((to) => {
  // console.log('afterEACH')
  // if (updateLoadingStatusSid) {
  //   clearTimeout(updateLoadingStatusSid)
  // }
  // setTimeout(() => {
  //   store.commit('router/updateLoadingStatus', { isLoading: false })
  // }, 500)
  if (to && to.meta && to.meta.title) {
    document.title = to.meta.title
    console.log('after each', document.title)
  }
})

export default router

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import FastClick from 'fastclick'

import Vue from 'vue'
import Vant from 'vant'
import App from './App'
import QueryString from 'qs'
import store from './store'
import router from './router'
import 'es6-promise'

Vue.use(Vant)

// FastClick.attach(document.body)
Vue.config.productionTip = false

 /* eslint-disable */
 const query = QueryString.parse(location.search, { ignoreQueryPrefix: true })
 console.log(query.state)
 console.log(query.code)
 if (query.code && query.state && query.state !== 'undefined') {
   store.dispatch('auth/token', {code: query.code, state: query.state}).then(()=>{
     /* eslint-disable no-new */
     new Vue({
       router,
       store,
       render: h => h(App)
     }).$mount('#app')
   })
 }else{
   /* eslint-disable no-new */
   new Vue({
     router,
     store,
     render: h => h(App)
   }).$mount('#app')
 }
 
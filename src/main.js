import Vue from 'vue'
import Router from 'vue-router'
import App from '@/app'
import index from '@/components/index'
Vue.use(Router)
Vue.config.productionTip = false

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', component: index},
  ]
})

new Vue({
  el: '#app',
  router,
  render:h => h(App)
})


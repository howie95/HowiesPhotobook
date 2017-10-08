import Vue from 'vue'
import Router from 'vue-router'
import App from '@/app'

import index from '@/components/index'
import photo from '@/components/photo'

Vue.use(Router)

Vue.config.productionTip = false

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', component: index},
    {path: '/photo', component: photo},
  ]
})

new Vue({
  el: '#app',
  router,
  render:h => h(App)
})

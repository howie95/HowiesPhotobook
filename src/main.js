import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import App from '@/app'

import index from '@/components/index'
import photo from '@/components/photo'
import mainHeader from '@/components/header'
import mainFooter from '@/components/footer'

Vue.use(Router)
Vue.prototype.$http = Axios

Vue.config.productionTip = false

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', components: {default:index}},
    {path: '/photo', components: {default:photo,mainheader:mainHeader,mainfooter:mainFooter}},
  ]
})

new Vue({
  el: '#app',
  router,
  render:h => h(App)
})

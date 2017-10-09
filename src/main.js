import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import scrollLoad from 'vue-infinite-scroll'

import App from '@/app'
import index from '@/components/index'
import photo from '@/components/photo'
import upload from '@/components/upload'
import signin from '@/components/signin'

Vue.use(Router)
Vue.use(scrollLoad)
Vue.prototype.$http = Axios

Vue.config.productionTip = false

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', components: {default:index}},
    {path: '/photo', components: {default:photo}},
    {path: '/upload', components: {default:upload},meta: { requiresAuth: true }},
    {path: '/signin', components: {default:signin}}
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
      if (!document.cookie.match("admin")) {
          next({
              path: '/signin',
          })
      } else {
          next()
      }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  render:h => h(App)
})


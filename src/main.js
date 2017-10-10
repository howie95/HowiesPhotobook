import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import scrollLoad from 'vue-infinite-scroll'
import lazyload from 'vue-lazyload'

import App from '@/app'
import index from '@/components/index'
import photo from '@/components/photo'
import upload from '@/components/upload'
import signin from '@/components/signin'

Vue.use(Router)
Vue.use(scrollLoad)
Vue.use(lazyload,{
  loading:'/static/loading.svg',
  attempt:5000
})
Vue.prototype.$http = Axios

Vue.config.productionTip = false

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', component: index},
    {path: '/index.html', component: index},
    {path: '/photo', component: photo},
    {path: '/upload', component: upload,meta: { requiresAuth: true }},
    {path: '/upload/:id', component: upload,meta: { requiresAuth: true }},
    {path: '/signin', component: signin,meta: { alreadyIn: true }},
    {path: '*', component: photo}
  ]
})

//如果未登录 拦截upload路由 如果已登陆 拦截signin路由
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
  if (to.meta.alreadyIn) {
    if (document.cookie.match("admin")) {
      next({
          path: '/photo',
      })
  } else {
      next()
  }
  }else{
    next()
  }
})

new Vue({
  el: '#app',
  router,
  render:h => h(App)
})


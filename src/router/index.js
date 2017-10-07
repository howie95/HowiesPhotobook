import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Photo from '@/views/photo'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/photo/',
      name: 'Photo',
      component: Photo
    }
  ]
})

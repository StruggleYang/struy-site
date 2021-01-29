import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/Root'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Root
    }
  ]
})

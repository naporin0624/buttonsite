import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Main from "@/components/MainPage"

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})

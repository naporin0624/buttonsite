import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Main from "@/components/MainPage"
import Test from "@/components/TestPage"

import rLink from "../components/molecules/ListTileLink.vue"

Vue.use(Router)
Vue.component('r-link', rLink)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      meta:{
        name: "home",
        icon: "home"
      },
    },
    {
      path: "/test",
      name: "test",
      component: Test
    }
  ]
})

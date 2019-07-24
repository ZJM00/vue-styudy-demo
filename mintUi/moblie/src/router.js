import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import app from './App.vue'
Vue.use(Router)

import home from './components/tabbar/home.vue'
import member from './components/tabbar/member.vue'
import shop from './components/tabbar/shop.vue'
import search from './components/tabbar/search.vue'

import newslist from './components/home/newList.vue'
import news from './components/home/newsInfo.vue'
export default new Router({
  routes: [
    {
      path:'/',
      component:home,
      name:"home",
      redirect:'/home',
    },
    {
      path:'/home',
      component:home,
      name:"home",
    },
    {
      path:'/home/newslist',
      component:newslist,
    },
    {
      path:'/home/newsList/:id',
      component:news,
      name:"newsInfo"
    },
    {
      path:'/shop',
      component:shop,
      name:"shop",
    },
    {
      path:'/member',
      component:member,
      name:"member",
    },
    {
      path:'/search',
      component:search,
      name:"search",
    }
  ],
  mode:"history"
})

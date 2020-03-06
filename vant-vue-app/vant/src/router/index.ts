import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redircet: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'category',
    component: () => import  ('../views/Category.vue')
  },
  {
    path: '/categoryList/:id',
    name: 'category',
    component: () => import  ('../views/CategoryList.vue'),
    props:true,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import  ('../views/Product.vue'),
    props:true,
  },
  {
    path: '/buycard',
    name: 'buycard',
    component: () => import  ('../views/BuyCard.vue'),
    props:true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

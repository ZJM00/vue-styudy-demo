import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import("../components/Home.vue")
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 挂载 路由守卫
router.beforeEach((to,from,next) => {
  // to 将要访问的路径
  // from 代表哪个路径跳转而来
  // next  是一个函数，表示放行
        //  next() 放行  next("./login") 强制跳转

  if(to.path == "/login")  return next();
  if(!window.sessionStorage.getItem("token"))  return next("./login");
  next();
})

export default router

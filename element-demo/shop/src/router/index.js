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
    component:  () => import("../components/Home.vue"),
    redirect: "/home/welcome",
    meta: {
      'upperLevel':'',
      'title': '首页',
    },
    children: [
      {
        path:'welcome',
        component: () => import("../components/Welcome.vue"),
        meta: {
          'upperLevel':'',
          'title': '首页',
        },
      },
      {
        path:'users',
        name: "users",
        component: () => import("../components/Users.vue"),
        meta: {
          'upperLevel':'用户管理',
          'title': '用户列表'
        }
      },
      {
        path:'rights',
        name: "rights",
        component: () => import("../components/Rights.vue"),
        meta: {
          'upperLevel':'权限管理',
          'title': '权限列表'
        }
      },
      {
        path:'roles',
        name: "roles",
        component: () => import("../components/Roles.vue"),
        meta: {
          'upperLevel':'权限管理',
          'title': '角色列表'
        }
      },
      {
        path:'categories',
        name: "categories",
        component: () => import("../components/goods/Categories.vue"),
        meta: {
          'upperLevel':'商品管理',
          'title': '商品分类'
        }
      },
      {
        path:'params',
        name: "params",
        component: () => import("../components/goods/Params.vue"),
        meta: {
          'upperLevel':'商品管理',
          'title': '分类参数'
        }
      },
      {
        path:'goods',
        name: "goods",
        component: () => import("../components/goods/List.vue"),
        meta: {
          'upperLevel':'商品管理',
          'title': '商品列表'
        },
      },
      {
        path:'add',
        name: "addgoods",
        component: () => import("../components/goods/AddGoods.vue"),
        meta: {
          'upperLevel':'商品管理',
          'father': {
            title:'商品列表',
            link:"/home/goods"
          },
          'title': '添加商品'
        },
      },
      {
        path:'editor',
        name: "editorgoods",
        component: () => import("../components/goods/AddGoods.vue"),
        meta: {
          'upperLevel':'商品管理',
          'father': {
            title:'商品列表',
            link:"/home/goods"
          },
          'title': '编辑商品'
        },
      },
      {
        path:'orders',
        name: "ordersgoods",
        component: () => import("../components/Orders.vue"),
        meta: {
          'upperLevel':'订单管理',
          'title': '订单列表'
        },
      },
      {
        path:'reports',
        name: "reports",
        component: () => import("../components/Reports.vue"),
        meta: {
          'upperLevel':'数据中心',
          'title': '数据报表'
        },
      },
    ]
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

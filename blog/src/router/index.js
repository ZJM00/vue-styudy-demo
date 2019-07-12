import Vue from 'vue'
import Router from 'vue-router'
//@ 在webpack中配置好的 ，代表 'src'
import HelloWorld from '@/components/HelloWorld'
import addBlog from '@/components/addBlog'
import showBlog from '@/components/showBlogs'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',

    
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path:'/add',
      name:"addBlog",
      component: addBlog
    },
    {
      path:'/',
      name:"showBlog",
      component: showBlog
    },
    {
      path:'/',
      name:"showBlog",
      component: showBlog
    }
  ],
  //去掉#
  mode:'history',

})

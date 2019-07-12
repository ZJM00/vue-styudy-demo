import Vue from 'vue'
import Router from 'vue-router'
//@ 在webpack中配置好的 ，代表 'src'
import HelloWorld from '@/components/HelloWorld'
import addBlog from '@/components/addBlog'
import showBlog from '@/components/showBlogs'
import singleBlog from '@/components/singleBlog'
import editorBlog from '@/components/editorBlog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:"Blog",
      component: showBlog,
      redirect:'/blog/show'
    },
    {
      path:'/blog/add',
      name:"addBlog",
      component: addBlog
    },
    {
      path:'/blog/show',
      name:"showBlog",
      component: showBlog
    },
    {
      path:'/blog/single/:id',
      name:"singleBlog",
      component: singleBlog
    },
    {
      path:"/blog/editor/:id",
      name:"editor",
      component:editorBlog
    }
  ],
  //去掉#
  mode:'history',

})

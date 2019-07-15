import Vue from 'vue'
import Router from 'vue-router'
//@ 在webpack中配置好的 ，代表 'src'
import HelloWorld from '@/components/HelloWorld'
import addBlog from '@/components/addBlog'
import showBlog from '@/components/showBlogs'
<<<<<<< HEAD
import singleBlog from '@/components/singleBlog'
import editorBlog from '@/components/editorBlog'
=======
>>>>>>> 72f934c8bd661a5e7996c4c8ed863d1f34a705c8

Vue.use(Router)

export default new Router({
  routes: [
<<<<<<< HEAD
    {
      path: '/',
      name:"Blog",
      component: showBlog,
      redirect:'/blog/show'
    },
    {
      path:'/blog/add',
=======
    // {
    //   path: '/',

    
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path:'/add',
>>>>>>> 72f934c8bd661a5e7996c4c8ed863d1f34a705c8
      name:"addBlog",
      component: addBlog
    },
    {
<<<<<<< HEAD
      path:'/blog/show',
=======
      path:'/',
>>>>>>> 72f934c8bd661a5e7996c4c8ed863d1f34a705c8
      name:"showBlog",
      component: showBlog
    },
    {
<<<<<<< HEAD
      path:'/blog/single/:id',
      name:"singleBlog",
      component: singleBlog
    },
    {
      path:"/blog/editor/:id",
      name:"editor",
      component:editorBlog
=======
      path:'/',
      name:"showBlog",
      component: showBlog
>>>>>>> 72f934c8bd661a5e7996c4c8ed863d1f34a705c8
    }
  ],
  //去掉#
  mode:'history',

})

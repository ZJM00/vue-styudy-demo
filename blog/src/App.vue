<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->

    <!-- <add-blog></add-blog> -->
    <!-- <show-blog></show-blog> -->
    <blogHeader></blogHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import addBlog from './components/addBlog';
import showBlog from './components/showBlogs';
import blogHeader from './components/blogHeader';
export default {
  name: 'App',
  components:{
    addBlog,showBlog,blogHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-top: 60px;
}
</style>

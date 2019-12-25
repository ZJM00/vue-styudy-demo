<template>
  <div id="app">
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
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

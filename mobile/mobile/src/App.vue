<template>
  <div id="app">
   <nav-header></nav-header>
   <transition >
     <router-view></router-view>
   </transition>
   
  </div>
</template>
<script>
import navHeader from '@/components/nav.vue'
export default {
  name:"app",
  components:{
    navHeader,
  },

}
</script>
<style lang="less" >

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;

}
button{
  outline: none;
  border:none;
}
input{
  outline-color:#969fdaab;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &:router-link-exact-active {
      color: #42b983;
    }
  }
}
*{
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
a{
  text-decoration: none;
  outline: none;
}
// a:active{
//   color: #000;
//   background: transparent;
// }
.v-enter{
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to{
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
 
}
.v-enter-active,.v-leave-active{
  transition: all 0.5s ease;
}
</style>

<template>
  <div id='app'>
    <tabbar v-if='product'></tabbar>
    <transition name='route'>
      <router-view />
    </transition>
   
    
  </div>
</template>

<script lang='ts'>
import {Vue,Component ,Watch} from 'vue-property-decorator';
import Tabbar from './components/Tabbar.vue'

@Component({
  components:{
    Tabbar,
  }
})
export default class App extends Vue{
  private routeActive = '';
  private product:boolean = true;
  @Watch('$route.path')  private routeChanged(val:any) {
    if(val.includes('product')){
      this.product = false;
    }else{
      this.product = true;
    }
  }
  created() {
    this.$router.push('/home');
    this.routeActive = this.$route.path
  }
}
</script>

<style lang="less">
@import "./less/index.less";
html,body{
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  line-height: 1;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  --tab-width: 50px;
   background-color: #eee;
   
}
#app {
  width: 100%;
  height: 100%;
  background-color: #eee;
  margin-bottom: 50px;
  overflow: hidden;
}

.route-enter-active {
  transition: all .2s ease;
}
.route-leave-active {
  transition: all .2s 
}
.route-enter, .route-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
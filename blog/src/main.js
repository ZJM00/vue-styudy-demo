// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';

Vue.config.productionTip = false

//Vue.use(VueResource)  使用以前的ajax
Vue.prototype.$ajax = axios   //新版的ajax

//自定义指令
// Vue.directive("rainbow",{
//   bind(el,binding,vnode){
//     el.style.color =  `#${Math.random().toString().slice(2,8)}`;
//   }
// });
Vue.directive("theme",{
  bind(el,binding,vnode){
    if(binding.value == 'wide'){
      el.style.maxWidth = '1260px';
    }else if(binding.value == 'narrow'){
      el.style.maxWidth = '560px';
    }
    //arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
    if(binding.arg == 'column'){
      el.style.background = '#6677cc';
    }
  }
});

//自定义过滤器
Vue.filter('to-uppercase',function(val){
  return val.toUpperCase();
});
Vue.filter('sinppet',val=>{
  return val.slice(0,100) + '...';
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

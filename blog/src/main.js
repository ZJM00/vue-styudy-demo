// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';

Vue.config.productionTip = false

//Vue.use(VueResource)  使用以前的ajax
Vue.prototype.$ajax = axios   //新版的ajax

// axios的全局配置
    //默认 URL
axios.defaults.baseURL = 'https://blog-2f8f5.firebaseio.com';
// axios.defaults.headers.common['Authorization'] = 'Token';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Accepts'] = 'application/json';

//跨域  
  //proxytable是vuejs-templates官方唯一提到的有关跨域方面的解决方案，也就是vue-cli的使用的模板插件里的config/index.js,在proxyTableconfig文件里有一个参数叫proxyTable
//   proxyTable: {
//     '/api': {
//          target: 'http://jsonplaceholder.typicode.com',   //源地址 
//          changeOrigin: true,      //是否跨域
//          pathRewrite: {
//            '^/api': ''    //路径重写 
//          }
//      }
//  }
//ES6.0的 fetch 进行跨域
      // fetch("/api/test/testToken.php",{
      //   method:"post",
      //   headers:{
      //     "Content-type":"application/json",
      //   },
      //   body:JSON.stringify({发送数据})
      // }).then(result=>{
      //   return result.json()
      // }).then(data=>{
      //   console.log(data);
      // })

// axios 跨域,配置 axios 即可跨域
    //axios.defaults.headers.post["Content-type"]="application/json";



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
// Vue.filter('to-uppercase',function(val){
//   return val.toUpperCase();
// });
Vue.filter('sinppet',val=>{
  return val.slice(0,100) + '...';
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

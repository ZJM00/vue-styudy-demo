
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import "./assets/global.css"

// 抽离出 公共组件 Breadcrumb，并全局引用
import breadcrumb from './components/Breadcrumb.vue'
Vue.component("breadcrumb",breadcrumb);

/*
解决 路由路径 重复报错，vue-router3.1 后 push 和 replace 方法返回 promise，
promise 被 reject 但是你没有catch，所以报错 Uncaught。
*/
import Router from 'vue-router' 
const routerPush = Router.prototype.push 
Router.prototype.push = function push(location) {   
return routerPush.call(this, location).catch(error=> error)
}

// 引入 ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import { Message } from 'element-ui';
Vue.prototype.$message = Message;

// axios 的 默认url
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http= axios;

//使用 vue-table-with-tree-grid 
import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable)

Vue.config.productionTip = false

//
var EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

axios.interceptors.request.use( config => {
  config.headers.Authorization = window.sessionStorage.getItem("token")
  // 最后必须return config
  return config;
},err => {
    return Promise.reject(err)
  }
);
// axios.interceptors.response.use( res => {
//   if(res.data.meta.status != 200) this.$message.error('获取数据失败')
//   return res;
// },err => {
//   return Promise.reject(err)
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

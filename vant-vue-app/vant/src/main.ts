import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


import axios from 'axios'

// 全局引入 vant
import Vant from 'vant';
// 引入Vant UI组件的样式
import 'vant/lib/index.css'
Vue.use(Vant);

//引入配置好的 路径
import  apiUrl from './assets/config/api.t';

// 引入 所需要的模块。写成接口
declare module 'vue/types/vue' {
  interface Vue {
    $http: any;
    api: any;
  }
}
// 挂载到 vue 上
Vue.prototype.api = apiUrl;
Vue.prototype.$http = axios;

// vant 的指令
import { Lazyload } from 'vant';
Vue.use(Lazyload);
Vue.use(Lazyload, {
  lazyComponent: true
});
Vue.config.productionTip = false

import Router from 'vue-router'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

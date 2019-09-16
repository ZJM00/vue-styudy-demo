import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import "./assets/js/rem.js"

import './assets/style/iconfont.css'
import './assets/js/iconfont.js'

//样式重置文件,移动端 1px 
import "./assets/style/reset.css"
import "./assets/style/border.css"
//移动端300ms问题
import fastClick from 'fastclick'
fastClick.attach(document.body);



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



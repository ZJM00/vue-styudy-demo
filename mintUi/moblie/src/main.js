import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.$ajax = axios;
axios.defaults.headers.post["Content-type"]="application/json";

//引入移动端事件
import touch from "vue-touch"
Vue.use(touch);
// 全部导入 mint-ui
    // 库里的 vue 模板需要 Vue.componten 来全局注册，库里面带的方法（如：Toast）,直接import 就行，但是如果在 mian.js 内全局引用了，组件内部是不可以使用的，只能在组件内部引用，才可使用
    //导入mint-ui
    //import MintUi from 'mint-ui'
    //这里可以省略 node_modules
    //import 'mint-ui/lib/style.css'
    //Vue.use(MintUi);
//按需导入
    //借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。首先，安装 babel-plugin-component：
    // 然后修改babel.config.js加上 plugins
import './ui.js'
Vue.config.productionTip = false;


Vue.filter(
  'time',val=>{
    let t = new Date(val);
    return t.toLocaleString();
  });
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import Loading from 'wk-vue-loading'
Vue.use(ElementUI) //使用elementUI
Vue.use(Loading)
Vue.config.productionTip = false
console.log(App)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  // template: '<div>2222</div>',
  store
})

import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 添加事件总线$bus
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 安装VueLazyLoad插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

// 解决移动端的300ms延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

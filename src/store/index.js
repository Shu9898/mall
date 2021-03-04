import Vuex from 'vuex'
import Vue from 'vue'

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import moduleA from "./modules/moduleA";

// 1.安装Vuex插件
Vue.use(Vuex)

const state = {
  // cartList: [商品1，商品2，商品3...]
  cartList: [],
  isAllChecked: false,
}

// 2.创建store对象
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    moduleA,
  },
})

// 3.导出store对象，并将其挂载到Vue实例中
export default store

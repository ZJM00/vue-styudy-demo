import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roleList: '',
  },
  getters: {
    getData(state) {
      return  state.roleList;
    }
  },
  mutations: {
    getList(state,arr) {
      state.roleList = arr;
      return state.roleList;
    }
  },
  actions: {
    async getRoles(context) {
      let {data: res} = await axios.get(`roles`);
      context.commit('getList',res);

    }
  },
  modules: {
  }
})

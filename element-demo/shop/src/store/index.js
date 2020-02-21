import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roleList: '',
    categories: '',
  },
  getters: {
    getData(state) {
      return state.roleList;
    },
    getStatus(state) {
      return state.roleList.meta;
    },
    getCeInfo(state) {
      return state.categories;
    }
  },
  mutations: {
    getList(state, arr) {
      state.roleList = arr;
    },
    setList(state, list) {
      state.roleList.data = list;
    },
    getCg(state,ob) {
      state.categories = ob;
    }
  },
  actions: {
    async getRoles(context) {
      let { data: res } = await axios.get(`roles`);
      context.commit('getList', res);
    },
    async getCategories({ commit },info={}) {
      let { data: res } = await axios.get("categories", {
        params: info
      });
      commit("getCg",res);
      return res;

    }
  },
  modules: {
  }
})

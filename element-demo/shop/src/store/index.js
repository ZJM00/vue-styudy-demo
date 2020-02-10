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
    },
    getStatus(state){
      return state.roleList.meta;
    }
  },
  mutations: {
    getList(state,arr) {
      state.roleList = arr;
    },
    setList(state,list) {
      state.roleList.data = list;
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

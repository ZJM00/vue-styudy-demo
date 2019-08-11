import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    car: [],
  },
  mutations: {
    getCount(state,info){
      let flag =  false;
      state.car.some((e,i)=>{
        if(e.id == info.id){
          e.count += parseInt(info.count);
          flag = true;
          return true;
        }
      });
      if(!flag){
        state.car.push(info);
      }
    }
  },
  getters:{
    getAllCount(state){
      let c = 0;
      state.car.forEach(e=>{
        c += e.count;
      });
      return c;
    }
  },
  actions: {

  }
})

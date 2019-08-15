import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    car: JSON.parse(localStorage.getItem('car')) || [],
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
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    updateCount(state,update){
      state.car.some(item=>{
        if(item.id == update.id){
          item.count = update.count;
          return true;
        }
      });
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    updateSelect(state,update){
      state.car.some(item=>{
        if(item.id == update.id){
          item.select = update.select;
          return true;
        }
      });
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    remove(state,ind){
      state.car.find((item,i)=>{
        if(item.id == ind){
          state.car.splice(i,1);
        }
      });
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    
  },
  getters:{
    getAllCount(state){
      let c = 0;
      state.car.forEach(e=>{
        c += e.count;
      });
      return c;
    },
    getInfo:(state)=>(id)=>{
      return state.car.find( e => e.id == id);
    },
    getId:(state)=>{
      let arr = []; 
      if( state.car.length > 0){
        state.car.forEach( e => arr.push(e.id));
        return arr.join(",");
      }else{
         return arr;
      }
    },
    getGoodsCount(state){
      let count = 0;
      let allPrice = 0;
      state.car.find(item=>{
        if(item.select){
          count += item.count;
          allPrice += item.price * item.count;
        }
      });
      return {count,allPrice}
    }
  },
  actions: {

  }
})

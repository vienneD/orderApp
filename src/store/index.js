import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classlist: [],
  },
  mutations: {
    changelist(state, params) {
      for (var obj of params) {
        for (let i = 0; i < obj.foods.length; i++) {
          obj.foods[i].imgUrl = obj.foods[i].imgUrl.slice(
            obj.foods[i].imgUrl.indexOf("15"),

          );
          obj.foods[i].num = 0
        }
      }
      state.classlist = params
    },
    changeordernum(state, params) {
      for (let obj of state.classlist) {
        for (let child of obj.foods) {
          if (child.id == params.id) {
            child.num += params.num
          }
        }
      }
    },

  },
  getters: {
    checkgoodslist(state) {
      var arr = []
      for (let obj of state.classlist) {
        for (let child of obj.foods) {
          if (child.num > 0) {
            arr.push(child)
          }
        }
      }

      return arr
    },
    totalgoods(state){
      var totalobj={
          num:0,
          total:0,
      }
      for (let obj of state.classlist) {
        for (let child of obj.foods) {
          if (child.num > 0) {
            
            totalobj.num+=child.num,
            totalobj.total+=child.num*child.price
       
          }
        }
      }
     
      return totalobj

    }

  }
})

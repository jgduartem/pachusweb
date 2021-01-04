import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },
    state:{
      items: [],
      item: null,
      itemPrice: 0
    },
    mutations: {
      addItem(state, itemToAdd){
        state.item = itemToAdd
        state.itemPrice += parseInt(itemToAdd.precio);
        console.log(state.itemPrice)
        state.items = [state.item,...state.items]
      },
      deleteItem(state, itemToAdd){
        let index = 0
        let priceToSubstract = 0
        state.items.map(e => {
          if(e.id == itemToAdd.id){
            index = state.items.indexOf(e);
            priceToSubstract = e.precio
          }
        })
        state.items.splice(index, 1);
        state.itemPrice -= parseInt(priceToSubstract);
        console.log(state.itemPrice)
      }
    },
    actions:{
      addItemAction(context, item){
        context.commit('addItem', item);
      },
      deleteItemAction(context, id){
        context.commit('deleteItem', id);
      }
    },
    getters:{

    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
}

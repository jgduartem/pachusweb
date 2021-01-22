import Vue from 'vue'
import Vuex from 'vuex'
import { db, usersRef } from "src/firebase/firebaseConfig";

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
    state: {
      items: [],
      item: null,
      itemPrice: 0,
      actualUser: {
        uid: '',
        name: '',
        email: '',
        phone: '',
        shoppingCart: [],
        cartPrice: ''
      }
    },
    mutations: {
      async addItem(state, itemToAdd) {
        const userRef = db.ref("users/" + state.actualUser.uid);
        state.item = itemToAdd
        state.itemPrice += parseInt(itemToAdd.precio);
        console.log(state.itemPrice)
        state.items = [state.item, ...state.items]
        await userRef.update({
          shoppingCart: [state.items],
          cartPrice: state.itemPrice
        })
      },
      async deleteItem(state, itemToAdd) {
        const userRef = db.ref('users/' + state.actualUser.uid)
        let index = 0
        let priceToSubstract = 0
        state.items.map(e => {
          if (e.id == itemToAdd.id) {
            index = state.items.indexOf(e);
            priceToSubstract = e.precio
          }
        })
        state.items.splice(index, 1);
        state.itemPrice -= parseInt(priceToSubstract);
        await userRef.update({
          shoppingCart: [state.items],
          cartPrice: state.itemPrice
        })
        console.log(state.itemPrice)
      },
      openItem(state, item) {
        state.item = item
      },
      getUserId(state, id){
        state.actualUser.uid = id;
      },
      getUserData(state, user){
        state.actualUser.phone = user.phone
        state.actualUser.name = user.name;
        state.actualUser.email = user.email
        console.log(state.actualUser)
      }
    },
    actions: {
      addItemAction(context, item) {
        context.commit('addItem', item);
      },
      deleteItemAction(context, id) {
        context.commit('deleteItem', id);
      },
      openItemAction(context, item) {
        context.commit('openItem', item);
      },
      getUserIdAction(context, id){
        context.commit('getUserId', id);
      },
      getUserDataAction(context, user){
        context.commit('getUserData', user);
      }
    },
    getters: {

    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
}

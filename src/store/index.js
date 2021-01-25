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
        let exist = false;
        let repeatedItem = null;
        let repeatedIndex = null
        state.item = itemToAdd
        if (state.items.length > 0) {
          if (state.item.item == 'Ropa') {
            state.items.map((i, index) => {
              if (i.id == state.item.id && i.talla[0].talla == state.item.talla[0].talla) {
                exist = true;
                repeatedItem = i;
                repeatedIndex = index;
                console.log('yes')
              }
            })
            if (exist == true) {
              state.items[repeatedIndex].talla[0].cantidad += state.item.talla[0].cantidad
            } else {
              state.items.push(state.item)
            }
            console.log(state.items)
          } else {
            state.items.map((i, index) => {
              if (i.id == state.item.id) {
                exist = true;
                repeatedIndex = index;
              }
            })
            if(exist == true){
              state.items[repeatedIndex].cantidad += state.item.cantidad;
            }else{
              state.items.push(state.item)
            }
            console.log(state.items)
          }
        } else {
          state.items.push(state.item)
        }
      },
      async deleteItem(state, itemToDelete) {
        const userRef = db.ref('users/' + state.actualUser.uid)
        let index = 0
        let priceToSubstract = 0
        state.items.map(e => {
          if (e.id == itemToDelete.id) {
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
      getUserId(state, id) {
        state.actualUser.uid = id;
      },
      getUserData(state, user) {
        console.log(user)
        state.actualUser.phone = user.phone;
        state.actualUser.name = user.name;
        state.actualUser.email = user.email;
        if (user.shoppingCart) {
          state.items = user.shoppingCart;
          state.actualUser.shoppingCart = user.shoppingCart;
        }
        if (user.itemPrice) {
          state.itemPrice = user.itemPrice;
          state.actualUser.cartPrice = user.itemPrice;
        }
        console.log(state.actualUser)
      },
      cleanUserData(state) {
        state.items = []
        state.item = null
        state.itemPrice = 0;
        state.actualUser = {
          uid: '',
          name: '',
          email: '',
          phone: '',
          shoppingCart: [],
          cartPrice: ''
        };
      }
    },
    actions: {
      addItemAction(context, item) {
        context.commit('addItem', item);
      },
      deleteItemAction(context, item) {
        context.commit('deleteItem', item);
      },
      openItemAction(context, item) {
        context.commit('openItem', item);
      },
      getUserIdAction(context, id) {
        context.commit('getUserId', id);
      },
      getUserDataAction(context, user) {
        context.commit('getUserData', user);
      },
      cleanUserDataAction(context) {
        context.commit('cleanUserData');
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

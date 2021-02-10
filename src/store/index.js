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
              }
            })
            if (exist == true) {
              state.items[repeatedIndex].talla[0].cantidad += state.item.talla[0].cantidad
              state.itemPrice += parseInt(state.item.precio * state.item.talla[0].cantidad)
              await userRef.update({
                shoppingCart: state.items,
                cartPrice: state.itemPrice
              })
            } else {
              state.items.push(state.item)
              state.itemPrice += parseInt(state.item.precio * state.item.talla[0].cantidad)
              await userRef.update({
                shoppingCart: state.items,
                cartPrice: state.itemPrice
              })
            }
            console.log(state.items)
          } else {
            state.items.map((i, index) => {
              if (i.id == state.item.id) {
                exist = true;
                repeatedIndex = index;
              }
            })
            if (exist == true) {
              state.items[repeatedIndex].cantidad += state.item.cantidad;
              state.itemPrice += parseInt(state.item.precio * state.item.cantidad)
              await userRef.update({
                shoppingCart: state.items,
                cartPrice: state.itemPrice
              })
            } else {
              state.items.push(state.item)
              state.itemPrice += parseInt(state.item.precio * state.item.cantidad)
              await userRef.update({
                shoppingCart: state.items,
                cartPrice: state.itemPrice
              })
            }
          }
        } else {
          state.items.push(state.item)
          state.itemPrice += parseInt(state.item.precio * state.item.cantidad)
          await userRef.update({
            shoppingCart: state.items,
            cartPrice: state.itemPrice
          })
        }
      },
      async deleteAll(state) {
        const userRef = db.ref('users/' + state.actualUser.uid)
        state.items = [];
        state.item = null;
        state.itemPrice = 0;
        state.actualUser.shoppingCart = [];
        state.actualUser.cartPrice = 0;
        await userRef.update({
          shoppingCart: [],
          cartPrice: 0,
        })
      },
      async modifyQuantity(state, item) {
        const userRef = db.ref('users/' + state.actualUser.uid)
        let addItem = false
        let repeatedItem = null
        let repeatedIndex = null
        let toAdd = 0;
        let toSubstract = 0;
        if (item.item == 'Ropa') {
          state.items.map((i, index) => {
            if (i.id == item.id && i.talla[0].talla == item.talla[0].talla) {
              if (item.talla[0].cantidad > i.talla[0].cantidad) {
                addItem = true;
              }
              repeatedItem = i
              repeatedIndex = index
            }
          })
          if (addItem == true) {
            toAdd = parseInt(item.talla[0].cantidad) - parseInt(repeatedItem.talla[0].cantidad)
            state.itemPrice += parseInt(item.precio * toAdd)
            state.items[repeatedIndex].talla[0].cantidad = item.talla[0].cantidad
            state.items[repeatedIndex].cantidad = item.talla[0].cantidad
          }
          else {
            toSubstract = parseInt(repeatedItem.talla[0].cantidad) - parseInt(item.talla[0].cantidad)
            state.itemPrice -= parseInt(item.precio * toSubstract)
            state.items[repeatedIndex].talla[0].cantidad = item.talla[0].cantidad
            state.items[repeatedIndex].cantidad = item.talla[0].cantidad
          }
          await userRef.update({
            shoppingCart: state.items,
            cartPrice: state.itemPrice
          })
        } else {
          state.items.map((i, index) => {
            if (i.id == item.id) {
              if (item.cantidad >= i.cantidad) {
                addItem = true;
              }
              repeatedItem = i;
              repeatedIndex = index;
            }
          })
          if (addItem == true) {
            toAdd = parseInt(item.cantidad) - parseInt(repeatedItem.cantidad)
            state.itemPrice += parseInt(item.precio * toAdd);
            state.items[repeatedIndex].cantidad = item.cantidad
          } else {
            toSubstract = parseInt(repeatedItem.cantidad) - parseInt(item.cantidad)
            state.itemPrice -= parseInt(item.precio * toSubstract);
            state.items[repeatedIndex].cantidad = item.cantidad;
          }
          await userRef.update({
            shoppingCart: state.items,
            cartPrice: state.itemPrice
          })
        }
      },
      async deleteItem(state, itemToDelete) {
        const userRef = db.ref('users/' + state.actualUser.uid)
        if (itemToDelete.item == 'Ropa') {
          state.items.map((i, index) => {
            if (itemToDelete.id == i.id && itemToDelete.talla[0].talla == i.talla[0].talla) {
              state.itemPrice -= parseInt(state.items[index].talla[0].cantidad) * parseInt(state.items[index].precio)
              state.items.splice(index, 1);
            }
          })
          await userRef.update({
            shoppingCart: state.items,
            cartPrice: state.itemPrice
          })
        } else {
          state.items.map((i, index) => {
            if (i.id == itemToDelete.id) {
              state.itemPrice -= parseInt(state.items[index].precio) * parseInt(state.items[index].cantidad)
              state.items.splice(index, 1);
            }
          })
          await userRef.update({
            shoppingCart: state.items,
            cartPrice: state.itemPrice
          })
        }
      },
      openItem(state, item) {
        state.item = item
      },
      getUserId(state, id) {
        state.actualUser.uid = id;
      },
      getUserData(state, user) {
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
      },
      deleteAllAction(contex) {
        contex.commit('deleteAll')
      },
      modifyQuantityAction(contex, item) {
        contex.commit('modifyQuantity', item)
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

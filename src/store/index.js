import { createStore } from "vuex";
import axios from "axios";

const resource_uri = "http://localhost:8081/";

export default createStore({
  state: {
    places: [],
    types: [],
  },
  mutations: {
      setPlace(state, places) {
          state.places = places
      },
      listTag(state, types) {
        state.types = types
    }
    // addCartItem(state, item) {
    //   item.quantity = 1;
    //   state.cart.push(item);
    // },
    // updateCartItem(state, updatedItem) {
    //   state.cart = state.cart.map((cartItem) => {
    //     if (cartItem.id == updatedItem.id) {
    //       return updatedItem;
    //     }

    //     return cartItem;
    //   });
    // },
    // removeCartItem(state, item) {
    //   state.cart = state.cart.filter((cartItem) => {
    //     return cartItem.id != item.id;
    //   });
    // }
  },
  actions: {
    //   addCartItem({commit}, item){
    //     commit('addCartItem',item)
    //   },
    //   updateCartItem({commit}, item){
    //     commit('updateCartItem',item)
    //   },
    //   removeCartItem({commit}, item){
    //       commit('removeCartItem',item)
    //   }
        async listPlace({commit}){
            const response = await axios.get(`${resource_uri}place`);
            commit('setPlace',response.data);
        },
        async listTag({commit}){
            const response = await axios.get(`${resource_uri}types`);
            commit('listTag',response.data);
        }
  }
});
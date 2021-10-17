import { createStore } from "vuex";
import axios from "axios";

const resource_uri = "http://localhost:8081/";

export default createStore({
  state: {
    places: [],
    types: [],
    hotels: [],
    reviews: [],
    provinces: [],
    etc: [],
    user: {
      userId: 2
    },
    myHotel: [],
    url: resource_uri

    
  },
  mutations: {
      setPlace(state, places) {
          state.places = places
      },
      listType(state, types) {
        state.types = types
      },
      listTag(state, tags) {
        state.tags = tags
      },
      listProvince(state, provinces) {
        state.provinces = provinces
      },
      listEtc(state, etc) {
        state.etc = etc
      },
      getPlace(state, place) {
        state.place = place
      },
      setHotel(state, hotels) {
        state.hotels = hotels
      },
      setMyHotel(state, myHotel) {
        state.myHotel = myHotel
      },
      getHotel(state, hotels) {
        state.hotels = hotels
      },
      listReview(state, reviews) {
        state.reviews = reviews
      },
      addNewReview(state, review) {
        state.reviews.push(review)
      },
      addNewPlace(state, place) {
        state.places.push(place)
      },
      addNewHotel(state, hotel) {
        state.hotels.push(hotel)
      },
      deleteReview(state,uid){
        state.reviews = state.reviews.filter(r => r.user.userId !== uid)
      },
      deletePlace(state,pid){
        state.places = state.place.filter(p => p.place.placeId !== pid)
      },
      deleteNearByHotel(state,hid){
        state.hotels = state.hotels.filter(h => h.hotel.hotelId !== hid)
      },
      addNearByHotel(state, nearby){
        state.hotels.push(nearby.hotel)
      },
      editReview(state,review){
        const index = state.reviews.findIndex(r => r.user.userId == review.user.userId);
        if(index !== -1){
          state.reviews = state.reviews.splice(index,1,review);
        }
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
        async onstart(){
        await axios.get(`${resource_uri}onstart`);
        },
        async listPlace({commit}){
            const response = await axios.get(`${resource_uri}places`);
            await axios.get(`${resource_uri}onstart`);
            commit('setPlace',response.data);
        },
        async getPlaceById({commit}, pid){
          const response = await axios.get(`${resource_uri}place/${pid}`);
          await axios.get(`${resource_uri}onstart`);
          commit('getPlace',response.data);
        },
        async listType({commit}){
            const response = await axios.get(`${resource_uri}types`);
            commit('listType',response.data);
        },
        async listTag({commit}){
          const response = await axios.get(`${resource_uri}tags`);
          commit('listTag',response.data);
        },
        async listProvinceTag({commit}){
          const response = await axios.get(`${resource_uri}tags/province`);
          commit('listProvince',response.data);
        },
        async listEtcTag({commit}){
          const response = await axios.get(`${resource_uri}tags/etc`);
          commit('listEtc',response.data);
        },
        async getHotelById({commit}, pid){
          const response = await axios.get(`${resource_uri}hotel/${pid}`);
          commit('getHotel',response.data);
        },
        async listReview({commit}, pid){
            const response = await axios.get(`${resource_uri}review/${pid}`);
            commit('listReview', response.data);
        },
        async addReview({commit}, formData){
          const response = await axios.post(`${resource_uri}review/add/${formData.pid}`,formData.data);
          await axios.get(`${resource_uri}onstart`);
          commit('addNewReview',response.data);
        },
        async addPlace({commit},formData){
          const response = await axios.post(`${resource_uri}place/add`,formData);
          await axios.get(`${resource_uri}onstart`);
          commit('addNewPlace',response.data);
        },
        async addHotel({commit},formData){
          const response = await axios.post(`${resource_uri}hotel/add`,formData);
          await axios.get(`${resource_uri}onstart`);
          commit('addNewHotel',response.data);
        },
        async listPlaceByTag({commit},value){
          const response = await axios.get(`${resource_uri}place/tag/${value}`);
          await axios.get(`${resource_uri}onstart`);
          commit('setPlace',response.data);
        },
        async listPlaceByName({commit},value){
          const response = await axios.get(`${resource_uri}place/name/${value}`);
          await axios.get(`${resource_uri}onstart`);
          commit('setPlace',response.data);
        },
        async removeReview({commit},deleted){
          await axios.delete(`${resource_uri}review/delete/${deleted.pid}/${deleted.uid}`);
          await axios.get(`${resource_uri}onstart`);
          commit('deleteReview',deleted.uid);
        },
        async removePlace({commit},deleted){
          await axios.delete(`${resource_uri}place/delete/${deleted.pid}`);
          await axios.get(`${resource_uri}onstart`);
          commit('deletePlace',deleted.pid);
        },
        async editReview({commit}, formData){
          const response = await axios.put(`${resource_uri}review/edit/${formData.pid}`,formData.data);
          await axios.get(`${resource_uri}onstart`);
          commit('editReview',response.data);
        },
        async getMyHotel({commit}, userId){
          const response = await axios.get(`${resource_uri}hotel/user/${userId}`);
          commit('setMyHotel',response.data);
        },
        async addNearBy({commit}, formData){
          const response = await axios.post(`${resource_uri}nearby/add/${formData.pid}`,formData.data);
          commit('addNearByHotel',response.data);
       },
       async deleteNearby({commit}, value){
        const response = await axios.delete(`${resource_uri}nearby/delete/${value.pid}/${value.hid}`);
        commit('deleteNearByHotel',response.data);
     },
}
});
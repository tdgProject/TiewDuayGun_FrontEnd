import axios from "axios";

const resource_uri = "http://localhost:8081/";
//const resource_uri = "https://www.tiewduaygun.team/api/";
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null };



export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, loginData) {
      return axios.post(`${resource_uri}auth/signin`,{
        email: loginData.email,
        password: loginData.password
      }).then(
        user => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
          }
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      )
    },
    logout({ commit }) {
      localStorage.removeItem('user');
      commit('logout');
    },
    register({ commit }, signupData) {
      return axios.post(`${resource_uri}auth/signup`,{
        email : signupData.email,
        password : signupData.password,
        username : signupData.username,
        tel : signupData.tel,
        role : null
    }).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
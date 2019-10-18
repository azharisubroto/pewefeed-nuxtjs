import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

export const state = () => ({
  // isLoggedIn: !!localStorage.getItem('access-token'),
  // isUserdata: !!localStorage.getItem('user-data')
  isLoggedIn: false,
  isUserdata: false
})

export const mutations = {
  [LOGIN](state) {
    state.pending = true;
  },
  [LOGIN_SUCCESS](state) {
    state.isLoggedIn = true;
    state.isUserdata = true;
    state.pending = false;
  },
  [LOGOUT](state) {
    state.isLoggedIn = false;
  }
}

export const actions = {
  login({
    commit,
  }, userdata) {
    //console.log("token...", token);
    commit(LOGIN); // show spinner
    return new Promise(resolve => {
      setTimeout(() => {
        localStorage.setItem("user-data", userdata);
        commit(LOGIN_SUCCESS);
        resolve();
      }, 1000);
    });
  },
  logout({ commit }) {
    localStorage.removeItem("access-token")
    localStorage.removeItem("user-data")
    commit(LOGOUT)
  }
}

export const getters = {
  isLoggedIn(state) {
    return state.isLoggedIn
  },
  isUserdata(state) {
    return state.isUserdata
  }
}


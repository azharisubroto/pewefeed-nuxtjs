import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = () => ({
  isLoggedIn: false
})

export const mutations = {
  login(state, login) {
    state.isLoggedIn = login
  }
}

export const getters = {
  isLoggedIn(state) {
    return state.isLoggedIn
  }
}


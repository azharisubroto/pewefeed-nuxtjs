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

const createStore = () => {
  return new Vuex.Store({
    state: {
      item: {}
    },
    mutations: {
      SET_ITEM(state, item) {
        state.item = item
      },
      SET_HOST(state, host) {
        state.host = host
      }
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        if (req.headers.host) {
          commit('SET_HOST', req.headers.host)
        }
      }
    }
  })
}

export default createStore

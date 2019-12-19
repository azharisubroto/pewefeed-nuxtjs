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
      item: {},
      meta: {}
    },
    mutations: {
      SET_USER(state, item) {
        state.item = item
      },
      SET_ITEM(state, item) {
        state.item = item
      },
      SET_META(state, meta) {
        state.meta = meta
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

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = () => ({
  isLoggedIn: false,
})

export const mutations = {
  login(state, login) {
    state.isLoggedIn = login
  },
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
	  meta: {},
	  storehelpStep: false,
	  storehelpStepRewards: false,
	  sing_video: null,
	  sing_video_data: null,
	  sing_detail: null,
	  sing_voters: null,
	  promoted_video_id: 4,
	  judge_num: null
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
	  },
	  SET_HELP(state, val) {
		state.storehelpStep = val
	  },
	  SET_HELP_REWARDS(state, val) {
		state.storehelpStepRewards = val
	  },
	  SET_SING_VIDEO(state, val) {
		  state.sing_video = val
	  },
	  SET_SING_PROMOTED(state, val) {
		state.promoted_video_id = val
	  },
	  SET_SING_VIDEO_DATA(state, val) {
		state.video_data = val
	  },
	  SET_SING_SINGLE(state, val) {
		  state.sing_detail = val
	  },
	  SET_SING_VOTERS(state, val) {
		  state.sing_voters = val
	  },
	  SET_JUDGE_NUMBER(state, val) {
		  state.judge_num = val
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

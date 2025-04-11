import { createStore } from 'vuex'

export default createStore({
  state: {
    currentMode: 'crew', // 'admin' or 'crew'
    isAuthenticated: false,
    user: null
  },
  mutations: {
    setMode(state, mode) {
      state.currentMode = mode
    },
    setUser(state, user) {
      state.user = user
      state.isAuthenticated = !!user
    }
  },
  actions: {
    switchMode({ commit }, mode) {
      commit('setMode', mode)
    },
    login({ commit }, user) {
      commit('setUser', user)
    },
    logout({ commit }) {
      commit('setUser', null)
    }
  },
  getters: {
    isAdminMode: state => state.currentMode === 'admin',
    isCrewMode: state => state.currentMode === 'crew',
    currentUser: state => state.user
  }
}) 
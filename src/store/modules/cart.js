const state = {
    count: 0,

}

// getters
const getters = {
  detail: state => {
      return state.count+10
  }
}

// actions
const actions = {
 adds({commit},payload){
     commit('add',payload)
 }
}

// mutations
const mutations = {
  add (state, id ) {
    state.count += id
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
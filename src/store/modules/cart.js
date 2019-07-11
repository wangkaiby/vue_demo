const state = {
    count: 0,
}

// getters


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
  mutations
}
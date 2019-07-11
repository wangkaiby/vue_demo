const state = {
    count: 2,
}

// getters


// actions


// mutations
const mutations = {
  delete (state,  id ) {
    state.count += id
  },
}

export default {
  namespaced: true,
  state,
  mutations
}
export default {
  namespaced: true,
  state: {
    isLoading: false,
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
  }

}

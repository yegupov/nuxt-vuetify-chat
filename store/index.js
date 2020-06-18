export const state = () => ({
  user: {},
  messages: [],
  users: []
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  emptyData(state) {
    state.user = {}
    state.messages = []
    state.users = []
  },
  addMessage(state, message) {
    state.messages.push(message)
  },
  upgradeUsers(state, users) {
    state.users = users
  }
}

export const actions = {
  clearData({ commit }) {
    commit("emptyData")
  },
  SOCKET_newMessage({ commit }, data) {
    commit("addMessage", data)
  },
  SOCKET_updateUsers({ commit }, users) {
    commit("upgradeUsers", users)
  }
}

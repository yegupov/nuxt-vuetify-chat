// Nuxt.js позволяет использовать каждый файл в директории store как отдельный модуль хранилища.
//  https://ru.nuxtjs.org/guide/vuex-store/
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
  // Данная мутация будет вызвана автоматически тем пакетом, который мы подключали:
  // Не сработал такой подход без использования actions!
  // SOCKET_newMessage(state, message) {
  //   state.messages.push(message)  // actions теперь не нужны!
  //   console.log('Messages: ', state.messages);
  // }
  addMessage(state, message) {
    state.messages.push(message)
  },
  upgradeUsers(state, users) {
    state.users = users
  }
}

export const actions = {
  // Отладка:
  // SOCKET_newMessage(ctx, data) {
  //   console.log('Message received', data)
  // }
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

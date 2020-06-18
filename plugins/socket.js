import Vue from 'vue'
// import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io-extended'

export default ({ store }) => {
  Vue.use(VueSocketIO, io('https://yegupov.github.io/nuxt-vuetify-chat/'),
    {
      store,
      debug: false,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    })
}

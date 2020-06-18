import Vue from 'vue'
// import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io-extended'

export default ({ store }) => {
  Vue.use(VueSocketIO, io('http://localhost:3000'),
    {
      store,
      debug: false,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    })
}
// Код ниже - от автора. С ним получался баг!
// export default function({ store }) {
//   Vue.use(
//     new VueSocketIO({
//       debug: false,
//       connection: 'http://localhost:3000',
//       vuex: {
//         store,
//         actionPrefix: 'SOCKET_',
//         mutationPrefix: 'SOCKET_'
//       }
//     })
//   )
// }

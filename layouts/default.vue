<template lang="pug">
  v-app(app)
    v-navigation-drawer(app v-model="drawer" mobile-breakpoint="650")
      v-list(subheader)
        v-subheader Список людей в комнате:
        v-list-item(v-for="(customer, index) in users" :key="`user-${index}`" @click.prevent)
          v-list-item-content
            v-list-item-title {{customer.name}}
          v-list-item-icon
            v-icon(:color="customer.id === user.id ? 'primary' : 'grey'") mdi-account-circle-outline
    v-app-bar(app)
      v-app-bar-nav-icon(@click='drawer = !drawer')
      //- v-btn(icon @click="exit")
      //-   v-icon arrow_back
      v-toolbar-title Чат комнаты: {{user.room}}
      v-spacer
      v-btn(
        icon
        @click="exit"
        title="Выйти"
      ).mx-1
        v-icon mdi-exit-to-app
    //- v-navigation-drawer(v-model='drawer', absolute, temporary)
    //-   v-list(nav, dense)
    //-     v-list-item-group(v-model='group', active-class='deep-purple--text text--accent-4')
    //-       v-list-item
    //-         v-list-item-icon
    //-           v-icon mdi-home
    //-         v-list-item-title Home
    //-       v-list-item
    //-         v-list-item-icon
    //-           v-icon mdi-account
    //-         v-list-item-title Account
    v-main
      nuxt
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data: () => ({
    drawer: true
  }),
  computed: mapState(["user", "users"]),
  methods: {
    ...mapActions(["clearData"]),
    exit() {
      // Вызываем событие userLeft
      this.$socket.client.emit('userLeft', this.user.id, () => {
        this.$router.push("/?message=leftChat");
        this.clearData();
      })
    }
  }
}
</script>

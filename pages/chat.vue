<template lang="pug">
  .chat
    .chat-messages(ref="chatcontainer")
      Message(
        v-for="(mess, index) in messages"
        :key="index"
        :name="mess.name"
        :text="mess.text"
        :isOwner="mess.id === user.id"
        )
    .chat-form
      ChatForm
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Chat',

  middleware: ["chat"],
  head() {
    return {
      title: `Комната ${this.user.room}`
    }
  },

  components: {
    Message: () => import('../components/Message.vue'),
    ChatForm: () => import('../components/ChatForm.vue')
  },

  computed: mapState(["user", "messages"]),

  watch: {
    messages() {
      let chatContainer = this.$refs.chatcontainer
      setTimeout( () => {
        if (this.$refs.chatcontainer !== undefined) {
          this.$refs.chatcontainer.scrollTop = this.$refs.chatcontainer.scrollHeight
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chat {
  height: 100%;
  position: relative;
  overflow: hidden;
  .chat-messages {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 100px;
    padding: 1rem;
    overflow-y: auto;
    &::-webkit-scrollbar  {
    	width: 8px;
    	background-color: #F5F5F5;
    }
    &::-webkit-scrollbar-thumb {
    	border-radius: 4px;
    	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.1);
    	background-color: #acbece;
    }
    &::-webkit-scrollbar-track {
    	border-radius: 4px;
    	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
    	background-color: #F5F5F5;
    }
  }
  .chat-form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 22px 1rem 0;
    height: 100px;
    background: #212121;
  }
}
</style>

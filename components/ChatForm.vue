<template lang="pug">
  //- v-flex(xs12)
  v-form(@submit.prevent="send")
    v-text-field(
      v-model="text"
      label="Сообщение..."
      outlined
      append-icon="mdi-send-circle-outline"
      @click:append="send"
    )
</template>

<script>
export default {
  data: () => ({
    text: ""
  }),
  methods: {
    send() {
      this.$socket.client.emit(
        'createMessage',
        {
          text: this.text,
          id: this.$store.state.user.id
        },
        data => {
          if (typeof data === 'string') {
            console.error(data);
          } else {
            this.text = ""
          }
        }
      );
    }
  }
}
</script>

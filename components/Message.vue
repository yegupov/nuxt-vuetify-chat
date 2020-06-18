<template lang="pug">
  .message
    .message-text.admin(v-if="name === 'admin'")
      p {{text}}
    .message-text(v-else :class="{owner: isOwner}")
      strong {{name}}
      span {{ date | formatDate }}
      p {{text}}
</template>

<script>
export default {
  props: {
    name: String,
    text: String,
    isOwner: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    date: new Date()
  }),
  filters: {
    formatDate: d => [
      [
        `0${d.getHours()}`.slice(-2),
        `0${d.getMinutes()}`.slice(-2),
        `0${d.getSeconds()}`.slice(-2)
      ].join(':'),
    ].join(' '),
  }
}
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  flex-direction: column;
  .message-text {
    margin: 0 1rem 1rem;
    padding: 1rem;
    width: 60%;
    box-shadow: 0 1px 0 0 rgba(50,50,50,0.3);
    border-radius: 4px;
    background-color: #1976d2;
    // border-bottom: 1px solid #ccc;
    p {
      // display: inline-block;
      margin: 0;
      width: 80%;
    }
    span {
      float: right;
      font-family: 'Lucida Console';
      font-size: 0.8rem;
    }
    &.admin {
      background-color: transparent;
      border: 1px solid #363636;
    }
    &.owner {
      background-color: #fff;
      color: #000;
      align-self: flex-end;
    }
  }
}
</style>

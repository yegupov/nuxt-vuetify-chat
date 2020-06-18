<template lang="pug">
	v-layout(column justify-center align-center)
		v-flex(xs12 sm8)
			//- v-btn(@click="message") NEW MESSAGE
			v-card(min-width="400")
				v-snackbar.popup-message(v-model="snackbar" :timeout="4000" top)
					span {{ message }}
					v-btn.float-right(color="grey darken-2" text @click="snackbar = false") Закрыть
				v-card-title
					h1 Nuxt chat
				v-card-text
					v-form(ref='form', v-model='valid', lazy-validation)
						v-text-field(v-model='name', :counter='16', :rules='nameRules', label='Ваше имя', required)
						v-text-field(v-model='room', :rules='roomRules', label='Название комнаты', required)
						v-btn.mr-4(:disabled='!valid', color='primary', @click='submit') Войти
</template>

<script>
	import {mapMutations} from 'vuex'
  export default {
		name: 'Index',

		layout: 'empty',

		head: {
			title: 'Чат на Vue, Socket.io, Nuxt, Vuetify'
		},

    data: () => ({
			snackbar: false,
			message: '',
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Введите имя',
        v => (v && v.length <= 16) || 'Имя не должно превышать 16 символов',
      ],
      room: '',
      roomRules: [
        v => !!v || 'Введите комнату',
      ],
    }),

		sockets: {
	    connect: function() {
	      console.log("Socket connected");
	    }
	  },

		mounted() {
			const {message} = this.$route.query
			if (message === 'noUser') {
				this.message = 'Введите данные!'
			} else if (message === 'leftChat'){
				this.message = 'Вы вышли из чата!'
			}
			this.snackbar = !!this.message
		},

    methods: {
			...mapMutations(["setUser"]),
      submit () {
        if (this.$refs.form.validate()) {
					const user = {
						name: this.name,
						room: this.room
					}
					// Отправка данных по сокетам на сервер
					// чтобы получить уникальный ID соединения, которым обладает данный пользователь
					this.$socket.client.emit('userJoined', user, data => {
						if (typeof data === 'string') {
							console.error(data);
						} else {
							user.id = data.userId
							this.setUser(user)
							this.$router.push('/chat')
						}
					})
				}
      }
    }
  }
</script>

<style lang="scss" scoped>
	.v-card {
		margin-top: 10vh;
	}
	.popup-message {
		span {
			display: inline-block;
			margin-top: 9px;
		}
	}
</style>

// подключение express
// Ф-ция require получает пакеты
const app = require('express')()
// создаем объект приложения
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

// Ф-ция для удобства формирования новых сообщений
const m = (name, text, id) => ({name, text, id})

// Событие “connection” вызывается, когда пользователь получает соединение с сервером.
io.on('connection', socket => {
  // Начало отладки сервера:
  // console.log('A user connected')
  // socket.emit('newMessage', {
  //   text: 'What?'
  // })
  // Создаем нового пользователя
  socket.on('userJoined', (data, callback) => {
    if (!data.name || !data.room) {
      return callback('Данные некорректны!')
    }
    // Программно добаляем этого созданного пользователя в данную комнату:
    socket.join(data.room)
    // Добавляем Пользователя в массив this.users = [] (что в srver/users.js). Это есть наша импровизированная БД :-)
    users.remove(socket.id) // Чтоб не было ошибок, предварительно его удалим
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    })

    callback({userId: socket.id})

    io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
    socket.emit('newMessage', m('admin', `Добро пожаловать, ${data.name}!`))

    // Отправляем всем Пользователям, кроме данного, сообщение, что зашёл Пользователь с таким-то именем
    // broadcast - как бы вычеркивает из всех Пользователей данного Пользователя
    socket.broadcast
      .to(data.room)
      .emit('newMessage', m('admin', `Пользователь ${data.name} зашел в чат.`))
  })
  // Далее мы подписываемся на событие, полученное от клиента, с помощью socket.on(). (Прослушка события)
  socket.on('createMessage', (data, callback) => {
    // Отладка:
    // setTimeout(() => {
    //   socket.emit('newMessage', {
    //     text: data.text + ' SERVER'
    //   })
    // }, 500)
    if (!data.text) {
      return callback('Текст не может быть пустым!')
    }
    // Получаем Пользователя
    const user = users.get(data.id)

    // Отправить сообщение всем Пользователям в текущей Комнате
    if (user) {
      io.to(user.room).emit('newMessage', m(user.name, data.text, data.id)) // При помощи data.id мы определяем, кто яв-ся владельцем данного сообщения
    }
    callback()
  })

  socket.on('userLeft', (id, callback) => {
    const user = users.remove(id)
    if (user) {
      // Обновляем список Пользователей в данной комнате
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      // Отправляем всем Пользователям сообщение, что этот Пользователь вышел
      io.to(user.room).emit('newMessage', m('admin', `Пользователь ${user.name} вышел.`))
    }
    callback()
  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit('newMessage', m('admin', `Пользователь ${user.name} вышел.`))
    }
  })
})

module.exports = {
  app,
  server
}

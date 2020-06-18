class Users {
  constructor() {
    this.users = []
  }

  add(user) {
    this.users.push(user)
  }

  get(id) {
    return this.users.find(user => user.id === id)
  }

  remove(id) {
    const user = this.get(id)

    if (user) {
      this.users = this.users.filter(user => user.id !== id)
    }

    return user
  }

  getByRoom(room) {
    return this.users.filter(user => user.room = room)
  }
}

// Из данного модуля экспортируем ф-цию, возвращающую новый экземпляр класса Users
// module.exports = function() {
//   return new Users()
// }
module.exports = () => {
  return new Users()
}

// const User = require('./user.model')

let DB = [
  {id: 1, name: 'Test', login: 'test', password: 'test'},
  {id: 2, name: 'Admin', login: 'admin', password: 'admin'},
  {id: 3, name: 'Test12', login: 'test12', password: 'test12'},
]

const getAll = () => DB;

const get = async id => {
  const user = await DB.filter(us => us.id === id)
  if (!user) {
    console.log('Error');
  }
  return user[0]
}

const save = async user => {
  DB = [...DB, user]
  return user
}

const remove = async id => {
  DB = await DB.filter(us => us.id !== id)

  return 'Seccess'
}

module.exports = { getAll, get, save, remove };

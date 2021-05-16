const User = require('./user.model')
const DBTASK = require('../tasks/tasks.memory.repository')


let DB = [
  new User({ id:'1', name: 'Test', login: 'test', password: 'test'}),
  new User({name: 'Admin', login: 'admin', password: 'admin'}),
  new User({name: 'Test12', login: 'test12', password: 'test12'}),
]

const getAll = () => DB;

const get = async id => {
  const user = await DB.filter(us => us.id === id)
  return user[0]
}

const save = async user => {
  DB = [...DB, user]
  return user
}

const remove = async id => {
  DB = await DB.filter(us => us.id !== id)
  DBTASK.removeUserTasks(id)
}



const update = async (id, user) => {
  const newList = DB.map(o => {
    if (o.id === id) {
      return {id, ...user};
    }
    return o
  })
  
  DB = newList
  return get(id)
}

module.exports = { getAll, get, save, remove, update };

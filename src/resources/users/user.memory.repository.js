// const User = require('./user.model')
const DBTASK = require('../tasks/tasks.memory.repository')


let DBUsers = []

const getAll = () => DBUsers;

const get = async id => {
  const user = await DBUsers.filter(us => us.id === id)
  return user[0]
}

const save = async user => {
  DBUsers = [...DBUsers, user]
  return user
}

const remove = async id => {
  DBUsers = await DBUsers.filter(us => us.id !== id)
  DBTASK.removeUserTasks(id)
}

const update = async (id, user) => {
  DBUsers = DBUsers.map(o => {
    if (o.id === id) {
      return {id, ...user};
    }
    return o
  })
  return get(id)
}

module.exports = { getAll, get, save, remove, update };

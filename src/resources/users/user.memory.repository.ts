export {}
const User = require('./user.model.ts')
const DBTASK = require('../tasks/tasks.memory.repository.ts')

let DBUsers: typeof User[] = []

const getAll = async (): Promise<object> => DBUsers;

const get = async (id: string): Promise<object> => {
  const user = await DBUsers.filter(us => us.id === id)
  return user[0]!
}

const save = async (user: object): Promise<object> => {
  const newUser = new User(user)
  DBUsers = [...DBUsers, newUser]
  return newUser
}

const update = async (id: string, userUp: object): Promise<object> => {
  DBUsers = DBUsers.map(user => {
    if (user.id === id) {
      return {...user, ...userUp};
    }
    return user
  })
  return get(id)
}

 const remove = async (id: string): Promise<object> => {
  const delUser = get(id)
  DBUsers = await DBUsers.filter(user => user.id !== id)
  DBTASK.AssignmentUserTasks(id)
  return delUser
}

module.exports = { getAll, get, save, remove, update };

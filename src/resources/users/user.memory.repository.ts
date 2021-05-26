export {}
const User = require('./user.model.ts')
const DBTASK = require('../tasks/tasks.memory.repository')

let DBUsers: {id: string, name: string, login: string, password: string}[] = []

/**
 * Get all users with DBUsers
 * @async
 * @returns {Promise<object>} Array of objects(user)
 */
const getAll = async (): Promise<object> => DBUsers;

/**
 * Get by id user with DBUsers
 * @async
 * @param {string} id The user id
 * @returns {Promise<object>} The user
 */
const get = async (id: string): Promise<object> => {
  const user = await DBUsers.filter(us => us.id === id)
  return user[0]!
}

/**
 * Add new user in DBUsers
 * @async
 * @param {Object} user The user object
 * @returns {Promise<object>} The new user
 */
const save = async (user: object) => {
  const newUser = new User(user)
  DBUsers = [...DBUsers, newUser]
  return newUser
}

/**
 * Update by id user with DBUsers
 * @async
 * @param {string} id The user id
 * @param {Object} userUp The new date user
 * @returns {Promise<object>} The update user
 */
const update = async (id: string, userUp: object): Promise<object> => {
  DBUsers.map(user => {
    if (user.id === id) {
      return {id, ...userUp};
    }
    return user
  })
  return get(id)
}

/**
 * Remove by id user with DBUsers
 * @async
 * @param {string} id The user id
 * @returns {Promise<object>} The remove user
 */
 const remove = async (id: string): Promise<object> => {
  const delUser = get(id)
  DBUsers = await DBUsers.filter(user => user.id !== id)
  DBTASK.AssignmentUserTasks(id)
  return delUser
}

module.exports = { getAll, get, save, remove, update };

const User = require('./user.model')
const DBTASK = require('../tasks/tasks.memory.repository')

let DBUsers = []

/**
 * Get all users with DBUsers
 * @async
 * @returns {Promise<Array>} Array of objects(user)
 */
const getAll = async () => DBUsers;

/**
 * Get by id user with DBUsers
 * @async
 * @param {string} id The user id
 * @returns {Promise<Object>} The user
 */
const get = async id => {
  const user = await DBUsers.filter(us => us.id === id)
  return user[0]
}

/**
 * Add new user in DBUsers
 * @async
 * @param {Object} user The user object
 * @returns {Promise<Object>} The new user
 */
const save = async user => {
  const newUser = new User(user)
  DBUsers = [...DBUsers, newUser]
  return newUser
}

/**
 * Update by id user with DBUsers
 * @async
 * @param {string} id The user id
 * @param {Object} userUp The new date user
 * @returns {Promise<Object>} The update user
 */
const update = async (id, userUp) => {
  DBUsers = DBUsers.map(user => {
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
 * @returns {Promise<Object>} The remove user
 */
 const remove = async id => {
  const delUser = get(id)
  DBUsers = await DBUsers.filter(user => user.id !== id)
  DBTASK.AssignmentUserTasks(id)
  return delUser
}

module.exports = { getAll, get, save, remove, update };

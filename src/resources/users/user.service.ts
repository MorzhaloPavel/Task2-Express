export {}
const usersRepo = require('./user.memory.repository.ts');

/**
 * Get all users 
 * @returns {Promise<object>} Array of objects(user)
 */
const getAll = (): Promise<object> => usersRepo.getAll();

/**
 * Get by id user 
 * @param {string} id The user id
 * @returns {Promise<object>} The user
 */
const get = (id: string): Promise<object> => usersRepo.get(id);

/**
 * Add new user 
 * @param {Object} user The user object
 * @returns {Promise<object>} The new user
 */
const save = (user: object): Promise<object> => usersRepo.save(user)

/**
 * Update by id user
 * @param {string} id The user id
 * @param {Object} userUp The new date user
 * @returns {Promise<object>} The update user
 */
const update = (id: string, user: object): Promise<object> => usersRepo.update(id, user)

/**
 * Remove by id user
 * @param {string} id The user id
 * @returns {Promise<object>} The remove user
 */
const remove = (id: string): Promise<object> => usersRepo.remove(id)

module.exports = { getAll, get, remove, save, update};

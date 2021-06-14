export {}
const boardsRepo = require('./boards.memory.repository.ts');

/**
 * Get all boards 
 * @returns {Promise<object>} Array of objects(board)
 */
const getAll = (): Promise<object> => boardsRepo.getAll();

/**
 * Get by id board 
 * @param {string} id The board id
 * @returns {Promise<object>} The board
 */
const get = (id: string): Promise<object> => boardsRepo.get(id);

/**
 * Add new board 
 * @param {Object} board The board object
 * @returns {Promise<object>} The new board
 */
const save = (board: object): Promise<object> => boardsRepo.save(board)

/**
 * Update by id board 
 * @param {string} id The board id
 * @param {Object} boardUp The new date board
 * @returns {Promise<object>} The update board
 */
const update = (id: string, board: object): Promise<object> => boardsRepo.update(id, board)

/**
 * Remove by id board 
 * @param {string} id The board id
 * @returns {Promise<object>} The remove board
 */
const remove = (id: string): Promise<object> => boardsRepo.remove(id)

module.exports = { getAll, get, remove, save, update};

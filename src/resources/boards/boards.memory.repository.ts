export {}
const Board = require('./boards.model.ts')
const DBTASK = require('../tasks/tasks.memory.repository.ts')

let DBBoards: {id: string, title: string, columns: Array<object>}[] = []

/**
 * Get all boards with DBBoards
 * @async
 * @returns {Promise<object>} Array of objects(board)
 */
const getAll = async (): Promise<object> => DBBoards;

/**
 * Get by id board with DBBoards
 * @async
 * @param {string} id The board id
 * @returns {Promise<object>} The board
 */
const get = async (id: string): Promise<object> => {
  const board = await DBBoards.filter(bd => bd.id === id)[0]
  return board!
}

/**
 * Add new board in DBBoards
 * @async
 * @param {Object} board The board object
 * @returns {Promise<object>} The new board
 */
const save = async (board: object): Promise<object> => {
  const newBoard = new Board(board)
  DBBoards = [...DBBoards, newBoard]
  return newBoard
}

/**
 * Update by id board with DBBoards
 * @async
 * @param {string} id The board id
 * @param {Object} boardUp The new date board
 * @returns {Promise<object>} The update board
 */
const update = async (id: string, boardUp: object) => {
  DBBoards.map(board => {
    if (board.id === id) {
      return {id, ...boardUp};
    }
    return board
  })
  return get(id)
}

/**
 * Remove by id board with DBBoards
 * @async
 * @param {string} id The board id
 * @returns {Promise<object>} The remove board
 */
const remove = async (id: string): Promise<object> => {
  const delBoard = get(id)
  DBBoards = await DBBoards.filter(board => board.id !== id)
  DBTASK.removeTasksBoard(id)
  return delBoard
}

module.exports = { getAll, get, save, remove, update };

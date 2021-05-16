// const Board = require('./boards.model')
const DBTASK = require('../tasks/tasks.memory.repository')

let DB = []

const getAll = () => DB;

const get = async id => {
  const board = await DB.filter(bd => bd.id === id)
  return board[0]
}

const save = async board => {
  DB = [...DB, board]
  return board
}

const remove = async id => {
  DB = await DB.filter(bd => bd.id !== id)
  DBTASK.removeTasksBoard(id)
}

const update = async (id, board) => {
  DB = DB.map(obj => {
    if (obj.id === id) {
      return {id, ...board};
    }
    return obj
  })
  return get(id)
}

module.exports = { getAll, get, save, remove, update };

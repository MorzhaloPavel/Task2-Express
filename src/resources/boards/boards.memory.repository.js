// const Board = require('./boards.model')
const DBTASK = require('../tasks/tasks.memory.repository')

let DBBoards = []

const getAll = () => DBBoards;

const get = async id => {
  const board = await DBBoards.filter(bd => bd.id === id)
  return board[0]
}

const save = async board => {
  DBBoards = [...DBBoards, board]
  return board
}

const remove = async id => {
  DBBoards = await DBBoards.filter(bd => bd.id !== id)
  DBTASK.removeTasksBoard(id)
}

const update = async (id, board) => {
  DBBoards = DBBoards.map(obj => {
    if (obj.id === id) {
      return {id, ...board};
    }
    return obj
  })
  return get(id)
}

module.exports = { getAll, get, save, remove, update };

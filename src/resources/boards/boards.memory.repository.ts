export {}
const Board = require('./boards.model.ts')
const DBTASK = require('../tasks/tasks.memory.repository.ts')

let DBBoards: typeof Board[] = []

const getAll = async (): Promise<object> => DBBoards;

const get = async (id: string): Promise<object> => {
  const board = await DBBoards.filter(bd => bd.id === id)[0]
  return board!
}

const save = async (board: object): Promise<object> => {
  const newBoard = new Board(board)
  DBBoards = [...DBBoards, newBoard]
  return newBoard
}

const update = async (id: string, boardUp: object): Promise<object> => {
  DBBoards = DBBoards.map(board => {
    if (board.id === id) {
      return {...board, ...boardUp};
    }
    return board
  })
  return get(id)
}

const remove = async (id: string): Promise<object> => {
  const delBoard = get(id)
  DBBoards = await DBBoards.filter(board => board.id !== id)
  DBTASK.removeTasksBoard(id)
  return delBoard
}

module.exports = { getAll, get, save, remove, update };

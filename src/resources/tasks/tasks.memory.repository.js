// const Task = require('./tasks.model')

let DB = []

const getAll = (boardId) => DB.filter(all => all.boardId === boardId);

const get = async (boardId, id) => {
  const task = await DB.find(ts => ts.boardId === boardId && ts.id === id)
  return task
}

const save = async (task) => {
  DB = [...DB, task]
  return task
}

const remove = async (boardId, id) => {
  DB = await DB.filter(ts => ts.id !== id && ts.boardId === boardId  )
}

const removeTasksBoard = async (boardId) => {
  DB = await DB.filter(ts => ts.boardId !== boardId)
}

const removeUserTasks =  (userId) => {
  DB =  DB.map(obj => {

    // obj.userId = obj.userId === userId ? null : obj.userId ;

    if (obj.userId === userId) {
      return {...obj, userId: null};
    }
    return obj
  })
}

const update = async (boardId, id, task) => {
  const newList = DB.map(o => {
    if (o.id === id && o.boardId === boardId) {
      return {id, ...task};
    }
    return o
  })
  DB = newList
  return get(boardId, id)
}

module.exports = { getAll, get, save, remove, update, removeTasksBoard, removeUserTasks };

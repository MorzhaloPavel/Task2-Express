// const Task = require('./tasks.model')

let DBTasks = []

const getAll = (boardId) => DBTasks.filter(all => all.boardId === boardId);

const get = async (boardId, id) => {
  const task = await DBTasks.find(ts => ts.boardId === boardId && ts.id === id)
  return task
}

const save = async (task) => {
  DBTasks = [...DBTasks, task]
  return task
}

const remove = async (boardId, id) => {
  DBTasks = await DBTasks.filter(ts => ts.id !== id && ts.boardId === boardId  )
}

const removeTasksBoard = async (boardId) => {
  DBTasks = await DBTasks.filter(ts => ts.boardId !== boardId)
}

const removeUserTasks =  (userId) => {
  DBTasks =  DBTasks.map(obj => {
    if (obj.userId === userId) {
      return {...obj, userId: null};
    }
    return obj
  })
}

const update = async (boardId, id, task) => {
  DBTasks = DBTasks.map(obj => {
    if (obj.id === id && obj.boardId === boardId) {
      return {id, ...task};
    }
    return obj
  })
  return get(boardId, id)
}

module.exports = { getAll, get, save, remove, update, removeTasksBoard, removeUserTasks };

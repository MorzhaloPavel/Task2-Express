export {}
const Task = require('./tasks.model.ts')

let DBTasks: typeof Task[] = []

const getAll = async (boardId: string): Promise<object> => DBTasks.filter(all => all.boardId === boardId);

const get = async (boardId: string, id: string): Promise<object> => {
  const task = await DBTasks.find(ts => ts.boardId === boardId && ts.id === id)
  return task!
}

const save = async (boardId: string, task: object): Promise<object> => {
  const newTask = new Task({...task, boardId})
  DBTasks = [...DBTasks, newTask]
  return newTask
}

const update = async (boardId: string, id: string, taskUp: object): Promise<object> => {
  DBTasks = DBTasks.map(task => {
    if (task.id === id && task.boardId === boardId) {
      return {...task, ...taskUp};
    }
    return task
  })
  return get(boardId, id)
}

const remove = async (boardId: string, id: string): Promise<object> => {
  const delTask = get(boardId, id)
  DBTasks = await DBTasks.filter(ts => ts.id !== id && ts.boardId === boardId)
  return delTask
}

const removeTasksBoard = async (boardId: string): Promise<void> => {
  DBTasks = await DBTasks.filter(ts => ts.boardId !== boardId)
}

const AssignmentUserTasks = async (userId: string): Promise<void> => {
  DBTasks = DBTasks.map(obj => {
    if (obj.userId === userId) {
      return {...obj, userId: null};
    }
    return obj
  })
}

module.exports = { getAll, get, save, remove, update, removeTasksBoard, AssignmentUserTasks };
